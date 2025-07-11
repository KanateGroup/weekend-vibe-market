
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/EventCard";
import { Calendar, Users, Award, ArrowRight, Star, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Événements factices pour la démonstration
  const upcomingEvents = [
    {
      id: "1",
      title: "Networking Tech 2024",
      date: "15-17 Février 2024",
      time: "3 jours complets",
      location: "Centre-ville Montréal",
      description: "Rencontrez les leaders de l'industrie technologique dans un cadre professionnel décontracté sur 3 jours.",
      sponsor: "TechMTL",
      capacity: 150,
      registered: 127,
      image: "/placeholder.svg",
      startDate: "2024-02-15",
      endDate: "2024-02-17"
    },
    {
      id: "2", 
      title: "Innovation Summit",
      date: "10-12 Mars 2024",
      time: "3 jours complets",
      location: "Québec City",
      description: "Un sommet de 3 jours dédié à l'innovation et aux nouvelles technologies avec des experts internationaux.",
      capacity: 200,
      registered: 89,
      image: "/placeholder.svg",
      startDate: "2024-03-10",
      endDate: "2024-03-12"
    }
  ];

  const featuredExhibitors = [
    {
      name: "TechCorp Solutions",
      category: "Technologie",
      booth: "A12",
      image: "/placeholder.svg"
    },
    {
      name: "Innovation Lab",
      category: "R&D",
      booth: "B05",
      image: "/placeholder.svg"
    },
    {
      name: "Digital Marketing Pro",
      category: "Marketing",
      booth: "C08",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Plateforme 5 à 7
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/90">
            Connectez-vous avec des professionnels lors de nos événements de networking de 3 jours, 
            découvrez des produits innovants et développez votre réseau d'affaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/evenements">
              <Button size="lg" variant="secondary" className="px-8">
                <Calendar className="mr-2 h-5 w-5" />
                Voir les événements
              </Button>
            </Link>
            <Link to="/exposants">
              <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white hover:text-primary">
                <Users className="mr-2 h-5 w-5" />
                Découvrir les exposants
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">12+</div>
              <div className="text-muted-foreground">Événements par an</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">2500+</div>
              <div className="text-muted-foreground">Participants actifs</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-muted-foreground">Exposants partenaires</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">4.8/5</div>
              <div className="text-muted-foreground">Satisfaction moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Prochains événements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos événements de networking de 3 jours qui vous permettront de développer 
              votre réseau professionnel et de découvrir les dernières innovations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/evenements">
              <Button variant="outline" size="lg">
                Voir tous les événements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Exhibitors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Exposants vedettes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez quelques-uns de nos exposants partenaires qui présenteront leurs 
              innovations lors de nos événements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredExhibitors.map((exhibitor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img 
                    src={exhibitor.image} 
                    alt={exhibitor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-xl">{exhibitor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-2">
                    {exhibitor.category}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Stand {exhibitor.booth}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/exposants">
              <Button variant="outline" size="lg">
                Voir tous les exposants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez notre communauté</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Inscrivez-vous dès aujourd'hui pour ne manquer aucun de nos événements 
            et faire partie d'un réseau professionnel dynamique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inscription">
              <Button size="lg" variant="secondary">
                Créer un compte
              </Button>
            </Link>
            <Link to="/parrainage">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Devenir parrain
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
