
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Clock, UserPlus, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  sponsor?: string;
  capacity: number;
  registered: number;
  image: string;
  startDate: string;
  endDate: string;
}

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  description,
  sponsor,
  capacity,
  registered,
  image,
  startDate,
  endDate
}: EventCardProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkRegistration();
    }
  }, [user, id]);

  const checkRegistration = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('id')
        .eq('event_id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setIsRegistered(!!data);
    } catch (error) {
      console.error('Error checking registration:', error);
    }
  };

  const handleRegistration = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour vous inscrire à un événement.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isRegistered) {
        // Désinscrire
        const { error } = await supabase
          .from('event_registrations')
          .delete()
          .eq('event_id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        setIsRegistered(false);
        toast({
          title: "Désinscription réussie",
          description: "Vous avez été désinscrit de l'événement.",
        });
      } else {
        // Inscrire
        const { error } = await supabase
          .from('event_registrations')
          .insert({
            event_id: id,
            user_id: user.id
          });

        if (error) throw error;

        setIsRegistered(true);
        toast({
          title: "Inscription réussie",
          description: "Vous êtes maintenant inscrit à l'événement.",
        });
      }
    } catch (error) {
      console.error('Error with registration:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isEventPast = new Date(endDate) < new Date();
  const isFull = registered >= capacity;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          {sponsor && (
            <Badge variant="secondary" className="text-xs">
              {sponsor}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {time}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {location}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            {registered}/{capacity} participants
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((registered / capacity) * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.round((registered / capacity) * 100)}%
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          {isEventPast ? (
            <Badge variant="outline" className="w-full justify-center">
              Événement terminé
            </Badge>
          ) : isFull ? (
            <Badge variant="destructive" className="w-full justify-center">
              Complet
            </Badge>
          ) : (
            <Button 
              onClick={handleRegistration}
              disabled={isLoading}
              variant={isRegistered ? "outline" : "default"}
              className="w-full"
            >
              {isLoading ? (
                "Traitement..."
              ) : isRegistered ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Inscrit - Cliquer pour se désinscrire
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  S'inscrire
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
