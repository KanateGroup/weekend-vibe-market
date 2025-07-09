
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/EventCard";
import { Calendar, MapPin, Users, Clock, Star } from "lucide-react";

// Données de démonstration
const upcomingEvents = [
  {
    id: 1,
    title: "5 à 7 Entrepreneuriat Jeunesse",
    date: "Vendredi 15 Mars 2024",
    time: "17h - 19h",
    location: "Centre Culturel, Ouagadougou",
    description: "Rencontre networking pour jeunes entrepreneurs avec des mentors expérimentés.",
    sponsor: "Fondation Entrepreneurs BF",
    capacity: 100,
    registered: 78,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Salon des Produits Locaux",
    date: "Samedi 16 Mars 2024",
    time: "14h - 18h",
    location: "Place de la Nation",
    description: "Découverte des meilleurs produits artisanaux et agricoles de la région.",
    capacity: 200,
    registered: 145,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Atelier Marketing Digital",
    date: "Dimanche 17 Mars 2024",
    time: "10h - 16h",
    location: "Hôtel Splendid, Ouagadougou",
    description: "Formation pratique sur les stratégies de marketing digital pour PME.",
    sponsor: "Digital Marketing BF",
    capacity: 50,
    registered: 32,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Networking Women in Business",
    date: "Vendredi 22 Mars 2024",
    time: "18h - 20h",
    location: "Villa Rose, Ouagadougou",
    description: "Soirée dédiée aux femmes entrepreneures pour créer des synergies.",
    sponsor: "Women Lead BF",
    capacity: 75,
    registered: 23,
    image: "/placeholder.svg"
  }
];

const pastEvents = [
  {
    id: 5,
    title: "5 à 7 Tech Innovation",
    date: "Vendredi 8 Mars 2024",
    time: "17h - 19h",
    location: "Centre Culturel, Ouagadougou",
    description: "Présentation des startups tech du Burkina Faso.",
    capacity: 120,
    registered: 120,
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Marché des Créateurs",
    date: "Samedi 2 Mars 2024",
    time: "9h - 17h",
    location: "Jardin de l'Amitié",
    description: "Exposition-vente des créateurs locaux.",
    capacity: 300,
    registered: 280,
    image: "/placeholder.svg"
  }
];

const Events = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Événements 5 à 7</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Participez à nos événements de networking et développez votre réseau professionnel
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Événements/mois</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">1,200+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-muted-foreground">Lieux partenaires</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white rounded-lg p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Organisez votre propre événement</h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Vous avez une idée d'événement ? Proposez-nous votre concept et organisez 
            votre propre 5 à 7 avec notre support.
          </p>
          <Button variant="secondary" size="lg">
            Proposer un événement
          </Button>
        </section>

        {/* Past Events */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Événements passés</h2>
            <Button variant="outline">
              Voir tous les événements passés
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="opacity-75">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
