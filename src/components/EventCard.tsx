
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  startDate?: string;
  endDate?: string;
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
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  
  const spotsLeft = capacity - registered;
  const isAlmostFull = spotsLeft <= 10;
  
  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour vous inscrire à un événement.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: id,
          user_id: user.id
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Déjà inscrit",
            description: "Vous êtes déjà inscrit à cet événement.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setIsRegistered(true);
        toast({
          title: "Inscription réussie !",
          description: "Vous êtes maintenant inscrit à cet événement de 3 jours.",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return `Du ${start.toLocaleDateString('fr-FR')} au ${end.toLocaleDateString('fr-FR')}`;
    }
    return date;
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-40 object-cover"
        />
        {isAlmostFull && (
          <Badge className="absolute top-2 right-2 bg-orange-500">
            Places limitées
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {sponsor && (
          <p className="text-sm text-muted-foreground">
            Parrainé par <span className="font-semibold">{sponsor}</span>
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{formatDateRange()}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>Événement de 3 jours complets</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-primary" />
          <span>{registered}/{capacity} inscrits</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={handleRegister}
            disabled={isRegistering || isRegistered || spotsLeft === 0}
          >
            {isRegistering ? "Inscription..." : isRegistered ? "Inscrit ✓" : spotsLeft === 0 ? "Complet" : "S'inscrire (3 jours)"}
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                Détails
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Dates</h4>
                    <p className="text-sm">{formatDateRange()}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lieu</h4>
                    <p className="text-sm">{location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Capacité</h4>
                    <p className="text-sm">{registered}/{capacity} participants</p>
                  </div>
                  {sponsor && (
                    <div>
                      <h4 className="font-semibold mb-2">Parrain</h4>
                      <p className="text-sm">{sponsor}</p>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm">{description}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
