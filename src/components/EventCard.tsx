
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  sponsor?: string;
  capacity: number;
  registered: number;
  image: string;
}

const EventCard = ({ 
  title, 
  date, 
  time, 
  location, 
  description, 
  sponsor, 
  capacity, 
  registered, 
  image 
}: EventCardProps) => {
  const spotsLeft = capacity - registered;
  const isAlmostFull = spotsLeft <= 10;
  
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
          <span>{date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{time}</span>
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
          <Button className="flex-1">
            S'inscrire
          </Button>
          <Button variant="outline">
            Détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
