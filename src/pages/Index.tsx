
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import EventCard from "@/components/EventCard";
import { ArrowRight, ShoppingBag, Calendar, Users, Award, Star, TrendingUp, Heart, Store, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Données de démonstration pour les carrousels
const heroSlides = [
  {
    id: 1,
    title: "Découvrez les Produits Locaux",
    subtitle: "Plus de 2,500 produits artisanaux et locaux",
    description: "Soutenez l'économie locale en achetant directement auprès de nos artisans et producteurs",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    cta: "Explorer la boutique",
    ctaLink: "/boutique"
  },
  {
    id: 2,
    title: "Événements 5 à 7",
    subtitle: "Networking et développement professionnel",
    description: "Participez à nos événements pour développer votre réseau et découvrir de nouvelles opportunités",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop",
    cta: "Voir les événements",
    ctaLink: "/evenements"
  },
  {
    id: 3,
    title: "Foire Virtuelle",
    subtitle: "Explorez nos exposants en ligne",
    description: "Découvrez plus de 150 exposants et leurs produits depuis chez vous",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    cta: "Visiter la foire",
    ctaLink: "/foire-virtuelle"
  },
  {
    id: 4,
    title: "Devenez Exposant",
    subtitle: "Vendez vos produits en ligne",
    description: "Rejoignez notre communauté d'exposants et développez votre activité",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    cta: "Devenir exposant",
    ctaLink: "/exposants"
  }
];

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
  },
  {
    id: 4,
    name: "Savon naturel au karité",
    image: "/placeholder.svg",
    originalPrice: 3000,
    category: "Cosmétiques",
    exhibitor: "Karité Bio",
    isNew: false
  },
  {
    id: 5,
    name: "Panier en osier tressé",
    image: "/placeholder.svg",
    originalPrice: 12000,
    promoPrice: 9000,
    category: "Artisanat",
    exhibitor: "Artisans Unis",
    isNew: true
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "5 à 7 Entrepreneuriat Jeunesse",
    date: "Du 15 au 17 Mars 2024",
    time: "3 jours complets",
    location: "Centre Culturel, Ouagadougou",
    description: "Événement de 3 jours avec networking, formations et mentoring pour jeunes entrepreneurs.",
    sponsor: "Fondation Entrepreneurs BF",
    capacity: 100,
    registered: 78,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Salon des Produits Locaux",
    date: "Du 20 au 22 Mars 2024",
    time: "3 jours complets",
    location: "Place de la Nation, Ouagadougou",
    description: "Salon de 3 jours pour découvrir les meilleurs produits artisanaux et agricoles de la région.",
    capacity: 200,
    registered: 145,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Forum Innovation Tech",
    date: "Du 25 au 27 Mars 2024",
    time: "3 jours complets",
    location: "Hôtel Splendid, Ouagadougou",
    description: "Forum de 3 jours sur l'innovation technologique et le marketing digital pour PME.",
    sponsor: "Digital Marketing BF",
    capacity: 50,
    registered: 32,
    image: "/placeholder.svg"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Aminata SANKARA",
    role: "Fondatrice, Sankara Cosmetics",
    content: "Grâce à la plateforme 5 à 7, j'ai pu développer mon réseau et augmenter mes ventes de 300% en 6 mois.",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    id: 2,
    name: "Ibrahim OUEDRAOGO",
    role: "CEO, Tech Solutions BF",
    content: "Les événements networking m'ont permis de trouver des partenaires stratégiques pour mon entreprise.",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    id: 3,
    name: "Fatou TRAORE",
    role: "Directrice, AgriPro",
    content: "Une plateforme exceptionnelle qui valorise vraiment l'entrepreneuriat local au Burkina Faso.",
    avatar: "/placeholder.svg",
    rating: 5
  }
];

const virtualFairHighlights = [
  {
    id: 1,
    name: "Stand Virtuel Premium",
    description: "Découvrez nos stands virtuels interactifs",
    image: "/placeholder.svg",
    type: "Technologie"
  },
  {
    id: 2,
    name: "Démonstrations Live",
    description: "Assistez aux démonstrations en direct",
    image: "/placeholder.svg",
    type: "Formation"
  },
  {
    id: 3,
    name: "Networking Virtuel",
    description: "Connectez-vous avec d'autres participants",
    image: "/placeholder.svg",
    type: "Réseau"
  }
];

const sponsorOfTheMonth = {
  name: "Aminata SANKARA",
  title: "Fondatrice & CEO de Sankara Cosmetics",
  image: "/placeholder.svg",
  quote: "L'entrepreneuriat, c'est avant tout avoir le courage de transformer ses rêves en réalité.",
  achievement: "800M FCFA de CA annuel"
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel avec autoplay */}
      <section className="relative">
        <Carousel 
          className="w-full"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[600px] bg-gradient-to-r from-primary to-blue-600 text-white overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90"></div>
                  
                  <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl">
                      <Badge variant="secondary" className="mb-4">
                        {slide.subtitle}
                      </Badge>
                      <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        {slide.title}
                      </h1>
                      <p className="text-xl mb-8 opacity-90">
                        {slide.description}
                      </p>
                      <Button size="lg" variant="secondary" asChild>
                        <Link to={slide.ctaLink}>
                          {slide.cta}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
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

      {/* Featured Products Carousel avec autoplay */}
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
          
          <Carousel 
            className="w-full"
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <ProductCard {...product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Virtual Fair Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Foire Virtuelle</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explorez notre foire virtuelle interactive avec plus de 150 exposants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {virtualFairHighlights.map((highlight) => (
              <Card key={highlight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <img
                    src={highlight.image}
                    alt={highlight.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
                  />
                  <h3 className="font-semibold mb-2">{highlight.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{highlight.description}</p>
                  <Badge variant="secondary">{highlight.type}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/foire-virtuelle">
                <Globe className="mr-2 h-5 w-5" />
                Entrer dans la foire virtuelle
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsor of the Month */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Parrain/Marraine du Mois</h2>
            <p className="text-muted-foreground">Découvrez le parcours inspirant de notre entrepreneur modèle</p>
          </div>
          
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <Badge className="mb-4">Marraine de Mars 2024</Badge>
                <h3 className="text-2xl font-bold mb-2">{sponsorOfTheMonth.name}</h3>
                <p className="text-muted-foreground mb-4">{sponsorOfTheMonth.title}</p>
                <div className="flex items-start gap-3 mb-6">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <p className="italic text-lg">"{sponsorOfTheMonth.quote}"</p>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg mb-6">
                  <div className="text-sm text-muted-foreground">Réalisation clé</div>
                  <div className="font-semibold text-primary">{sponsorOfTheMonth.achievement}</div>
                </div>
                <Button asChild>
                  <Link to="/parrainage">
                    Découvrir son parcours
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <img
                  src={sponsorOfTheMonth.image}
                  alt={sponsorOfTheMonth.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Upcoming Events avec autoplay */}
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
          
          <Carousel 
            className="w-full"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {upcomingEvents.map((event) => (
                <CarouselItem key={event.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <EventCard {...event} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Testimonials Carousel avec autoplay */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos membres</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les témoignages de nos entrepreneurs qui ont réussi grâce à notre plateforme
            </p>
          </div>
          
          <Carousel 
            className="w-full max-w-4xl mx-auto"
            plugins={[
              Autoplay({
                delay: 6000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="mx-4">
                    <CardContent className="pt-8 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-lg italic mb-6">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center justify-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Call to Action Sections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <Store className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Foire Virtuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explorez nos stands virtuels et découvrez de nouveaux produits
                </p>
                <Button asChild>
                  <Link to="/foire-virtuelle">Visiter la foire</Link>
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
