
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Users, MapPin, Star, Award, Briefcase, ShoppingBag, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import EventCard from "@/components/EventCard";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  // Données de démonstration pour les événements
  const upcomingEvents = [
    {
      id: "1",
      title: "5 à 7 Entrepreneuriat",
      date: "15-17 Mars 2024",
      time: "3 jours complets",
      location: "Centre Culturel, Ouagadougou",
      description: "Événement de networking pour entrepreneurs du vendredi au dimanche. Rencontrez des investisseurs, partagez vos idées et développez votre réseau professionnel dans une ambiance conviviale.",
      sponsor: "Fondation Entrepreneurs BF",
      capacity: 150,
      registered: 89,
      image: "/placeholder.svg",
      startDate: "2024-03-15",
      endDate: "2024-03-17"
    },
    {
      id: "2", 
      title: "5 à 7 Innovation Tech",
      date: "22-24 Mars 2024",
      time: "3 jours complets",
      location: "Tech Hub, Ouagadougou",
      description: "Découverte des innovations technologiques pendant 3 jours complets. Ateliers, conférences et démonstrations d'outils numériques pour les entrepreneurs.",
      sponsor: "Digital Innovation BF",
      capacity: 120,
      registered: 95,
      image: "/placeholder.svg",
      startDate: "2024-03-22",
      endDate: "2024-03-24"
    },
    {
      id: "3",
      title: "5 à 7 Agriculture Moderne",
      date: "29-31 Mars 2024", 
      time: "3 jours complets",
      location: "Centre Agricole, Bobo-Dioulasso",
      description: "Forum sur l'agriculture moderne et durable pendant 3 jours. Techniques innovantes, financement agricole et marchés d'exportation.",
      capacity: 100,
      registered: 67,
      image: "/placeholder.svg",
      startDate: "2024-03-29",
      endDate: "2024-03-31"
    }
  ];

  // Données de démonstration pour les produits
  const featuredProducts = [
    {
      id: 1,
      name: "Sac à main artisanal",
      image: "/placeholder.svg",
      originalPrice: 25000,
      promoPrice: 20000,
      category: "Mode",
      exhibitor: "Maroquinerie Locale",
      isNew: true
    },
    {
      id: 2,
      name: "Miel bio du terroir",
      image: "/placeholder.svg", 
      originalPrice: 8000,
      category: "Alimentation",
      exhibitor: "Ruches d'Or"
    },
    {
      id: 3,
      name: "Bijoux traditionnels",
      image: "/placeholder.svg",
      originalPrice: 15000,
      promoPrice: 12000,
      category: "Artisanat", 
      exhibitor: "Perles & Co",
      isNew: true
    }
  ];

  // Données pour les parrains/sponsors
  const sponsors = [
    {
      name: "Fondation Entrepreneurs BF",
      logo: "/placeholder.svg",
      description: "Soutien aux entrepreneurs burkinabé"
    },
    {
      name: "Digital Innovation BF", 
      logo: "/placeholder.svg",
      description: "Innovation technologique au Burkina"
    },
    {
      name: "AgriTech BF",
      logo: "/placeholder.svg", 
      description: "Agriculture moderne et durable"
    },
    {
      name: "Artisans BF",
      logo: "/placeholder.svg",
      description: "Promotion de l'artisanat local"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Foire Commerciale du Burkina Faso
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            La plus grande plateforme de rencontres commerciales du Burkina Faso. 
            Événements de 3 jours complets pour développer votre réseau professionnel et découvrir les meilleures opportunités d'affaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/evenements">
                Participer aux événements <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/boutique">
                Explorer la boutique
              </Link>
            </Button>
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
              <h3 className="text-3xl font-bold mb-2">52+</h3>
              <p className="text-muted-foreground">Événements par an</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">5000+</h3>
              <p className="text-muted-foreground">Participants</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">200+</h3>
              <p className="text-muted-foreground">Exposants</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-muted-foreground">Années d'expérience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Événements à venir */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Prochains Événements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Participez à nos événements de 3 jours complets pour développer votre réseau et découvrir de nouvelles opportunités
            </p>
          </div>
          
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {upcomingEvents.map((event) => (
                <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <EventCard {...event} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link to="/evenements">
                Voir tous les événements <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Produits en vedette */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Produits en Vedette</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les meilleurs produits locaux de nos exposants
            </p>
          </div>
          
          <Carousel
            plugins={[
              Autoplay({
                delay: 3500,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ProductCard {...product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link to="/boutique">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explorer la boutique complète
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Foire Virtuelle */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Foire Virtuelle</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre foire commerciale en ligne, accessible 24h/24 depuis n'importe où dans le monde
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Accès Global</CardTitle>
                <CardDescription>
                  Participez depuis n'importe où dans le monde
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Networking Digital</CardTitle>
                <CardDescription>
                  Rencontrez des professionnels en ligne
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Boutique En Ligne</CardTitle>
                <CardDescription>
                  Achetez directement depuis la plateforme
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link to="/foire-virtuelle">
                <Globe className="mr-2 h-5 w-5" />
                Visiter la foire virtuelle
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Parrains et Sponsors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Parrains</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ils nous font confiance et soutiennent le développement économique du Burkina Faso
            </p>
          </div>
          
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {sponsors.map((sponsor, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <img 
                          src={sponsor.logo} 
                          alt={sponsor.name}
                          className="w-20 h-20 mx-auto mb-4 object-contain"
                        />
                        <h3 className="font-semibold mb-2">{sponsor.name}</h3>
                        <p className="text-sm text-muted-foreground">{sponsor.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link to="/parrainage">
                <Heart className="mr-2 h-5 w-5" />
                Devenir parrain
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez-nous dès aujourd'hui</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ne manquez pas les prochains événements de 3 jours et les meilleures opportunités d'affaires du Burkina Faso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/inscription">
                Créer un compte
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/connexion">
                Se connecter
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
