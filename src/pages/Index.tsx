
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import EventCard from "@/components/EventCard";
import { ArrowRight, ShoppingBag, Calendar, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

// Données de démonstration
const featuredProducts = [
  {
    id: 1,
    name: "Sac à main artisanal en cuir",
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
    exhibitor: "Ruches d'Or",
    isNew: false
  },
  {
    id: 3,
    name: "Bijoux en perles traditionnelles",
    image: "/placeholder.svg",
    originalPrice: 15000,
    promoPrice: 12000,
    category: "Artisanat",
    exhibitor: "Perles & Co",
    isNew: true
  }
];

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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue au <span className="text-yellow-300">5 à 7</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              La plateforme qui connecte entrepreneurs, artisans et consommateurs pour valoriser l'économie locale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/boutique">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Découvrir la boutique
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/evenements">
                  <Calendar className="mr-2 h-5 w-5" />
                  Voir les événements
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Exposants actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Produits en ligne</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24</div>
              <div className="text-muted-foreground">Événements/mois</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Visiteurs mensuels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Produits en vedette</h2>
            <Button variant="outline" asChild>
              <Link to="/boutique">
                Voir tout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Événements à venir</h2>
            <Button variant="outline" asChild>
              <Link to="/evenements">
                Voir tous les événements <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Vendez vos produits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Rejoignez notre communauté d'exposants et vendez vos produits en ligne
                </p>
                <Button asChild>
                  <Link to="/exposants">Devenir exposant</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Participez aux événements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Découvrez nos événements networking et développez votre réseau
                </p>
                <Button asChild>
                  <Link to="/evenements">Voir les événements</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Découvrez nos parrains</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Inspirez-vous des parcours de nos entrepreneurs modèles
                </p>
                <Button asChild>
                  <Link to="/parrainage">Voir les parrains</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
