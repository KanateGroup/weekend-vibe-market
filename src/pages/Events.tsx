import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/EventCard";
import { Calendar, MapPin, Users, Clock, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Tables } from "@/integrations/supabase/types";

type Event = Tables<'events'>;

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrationCounts, setRegistrationCounts] = useState<{[key: string]: number}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    start_date: '',
    max_participants: 100,
    sponsor: '',
    image_url: '/placeholder.svg'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(profile?.role === 'admin');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data: eventsData, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;

      setEvents(eventsData || []);

      // Récupérer le nombre d'inscriptions pour chaque événement
      if (eventsData && eventsData.length > 0) {
        const eventIds = eventsData.map((event) => event.id);
        const { data: registrations } = await supabase
          .from('event_registrations')
          .select('event_id');

        const counts: {[key: string]: number} = {};
        registrations?.forEach((reg) => {
          counts[reg.event_id] = (counts[reg.event_id] || 0) + 1;
        });
        setRegistrationCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les événements.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      setIsCreatingEvent(true);
      
      // Calculer la date de fin (2 jours après la date de début)
      const startDate = new Date(newEvent.start_date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 2); // 3 jours au total (vendredi à dimanche)

      const { error } = await supabase
        .from('events')
        .insert({
          ...newEvent,
          end_date: endDate.toISOString().split('T')[0]
        });

      if (error) throw error;

      toast({
        title: "Événement créé !",
        description: "Le nouvel événement de 3 jours a été créé avec succès.",
      });

      // Réinitialiser le formulaire
      setNewEvent({
        title: '',
        description: '',
        location: '',
        start_date: '',
        max_participants: 100,
        sponsor: '',
        image_url: '/placeholder.svg'
      });

      // Recharger les événements
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'événement.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingEvent(false);
    }
  };

  const upcomingEvents = events.filter(event => new Date(event.start_date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.start_date) < new Date());

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des événements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Événements 5 à 7</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Participez à nos événements de networking de 3 jours et développez votre réseau professionnel
          </p>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un événement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer un nouvel événement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Titre</label>
                    <Input
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="Titre de l'événement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Description de l'événement"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Lieu</label>
                    <Input
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      placeholder="Lieu de l'événement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date de début (Vendredi)</label>
                    <Input
                      type="date"
                      value={newEvent.start_date}
                      onChange={(e) => setNewEvent({...newEvent, start_date: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      L'événement durera 3 jours (vendredi à dimanche)
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Capacité maximale</label>
                    <Input
                      type="number"
                      value={newEvent.max_participants}
                      onChange={(e) => setNewEvent({...newEvent, max_participants: parseInt(e.target.value)})}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Parrain (optionnel)</label>
                    <Input
                      value={newEvent.sponsor}
                      onChange={(e) => setNewEvent({...newEvent, sponsor: e.target.value})}
                      placeholder="Nom du parrain"
                    />
                  </div>
                  <Button 
                    onClick={handleCreateEvent} 
                    disabled={isCreatingEvent || !newEvent.title || !newEvent.location || !newEvent.start_date}
                    className="w-full"
                  >
                    {isCreatingEvent ? "Création..." : "Créer l'événement"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{events.length}</div>
              <div className="text-sm text-muted-foreground">Événements totaux</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {Object.values(registrationCounts).reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Participants inscrits</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{new Set(events.map(e => e.location)).size}</div>
              <div className="text-sm text-muted-foreground">Lieux différents</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Jours par événement</div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Événements à venir</h2>
            <Badge variant="secondary" className="text-sm">
              {upcomingEvents.length} événements
            </Badge>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  id={event.id}
                  title={event.title}
                  date={`Du ${new Date(event.start_date).toLocaleDateString('fr-FR')} au ${new Date(event.end_date).toLocaleDateString('fr-FR')}`}
                  time="3 jours complets"
                  location={event.location}
                  description={event.description || ''}
                  sponsor={event.sponsor || undefined}
                  capacity={event.max_participants || 100}
                  registered={registrationCounts[event.id] || 0}
                  image={event.image_url || '/placeholder.svg'}
                  startDate={event.start_date}
                  endDate={event.end_date}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun événement à venir pour le moment.</p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white rounded-lg p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Rejoignez notre communauté</h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Participez à nos événements de 3 jours pour développer votre réseau professionnel 
            et découvrir de nouvelles opportunités d'affaires.
          </p>
          <Button variant="secondary" size="lg">
            Voir tous les événements
          </Button>
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Événements passés</h2>
              <Badge variant="outline" className="text-sm">
                {pastEvents.length} événements
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="opacity-75">
                  <EventCard 
                    id={event.id}
                    title={event.title}
                    date={`Du ${new Date(event.start_date).toLocaleDateString('fr-FR')} au ${new Date(event.end_date).toLocaleDateString('fr-FR')}`}
                    time="3 jours complets"
                    location={event.location}
                    description={event.description || ''}
                    sponsor={event.sponsor || undefined}
                    capacity={event.max_participants || 100}
                    registered={registrationCounts[event.id] || 0}
                    image={event.image_url || '/placeholder.svg'}
                    startDate={event.start_date}
                    endDate={event.end_date}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Events;
