
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Store, MapPin, Phone, Mail, Star, MessageCircle, Search, Filter } from "lucide-react";

// Données de démonstration des exposants
const exhibitors = [
  {
    id: 1,
    name: "Maroquinerie Locale",
    category: "Mode",
    description: "Spécialiste des articles en cuir artisanal depuis 2010",
    logo: "/placeholder.svg",
    rating: 4.8,
    reviews: 23,
    location: "Ouagadougou",
    phone: "+226 XX XX XX XX",
    email: "contact@maroquinerie-locale.bf",
    productsCount: 15,
    standType: "16m²",
    isOnline: true
  },
  {
    id: 2,
    name: "Ruches d'Or",
    category: "Alimentation",
    description: "Production de miel bio et dérivés de la ruche",
    logo: "/placeholder.svg",
    rating: 4.9,
    reviews: 34,
    location: "Bobo-Dioulasso",
    phone: "+226 XX XX XX XX",
    email: "info@ruches-or.bf",
    productsCount: 8,
    standType: "9m²",
    isOnline: true
  },
  {
    id: 3,
    name: "Perles & Co",
    category: "Artisanat",
    description: "Création de bijoux traditionnels en perles",
    logo: "/placeholder.svg",
    rating: 4.7,
    reviews: 18,
    location: "Koudougou",
    phone: "+226 XX XX XX XX",
    email: "perles.co@gmail.com",
    productsCount: 25,
    standType: "25m²",
    isOnline: false
  },
  {
    id: 4,
    name: "Karité Bio",
    category: "Cosmétiques",
    description: "Produits cosmétiques naturels à base de karité",
    logo: "/placeholder.svg",
    rating: 4.6,
    reviews: 42,
    location: "Ouahigouya",
    phone: "+226 XX XX XX XX",
    email: "contact@karite-bio.bf",
    productsCount: 12,
    standType: "Virtual",
    isOnline: true
  },
  {
    id: 5,
    name: "Artisans Unis",
    category: "Artisanat",
    description: "Coopérative d'artisans pour l'art traditionnel",
    logo: "/placeholder.svg",
    rating: 4.5,
    reviews: 27,
    location: "Fada N'Gourma",
    phone: "+226 XX XX XX XX",
    email: "info@artisans-unis.bf",
    productsCount: 32,
    standType: "16m²",
    isOnline: true
  },
  {
    id: 6,
    name: "Moringa Plus",
    category: "Alimentation",
    description: "Transformation et commercialisation de moringa",
    logo: "/placeholder.svg",
    rating: 4.4,
    reviews: 19,
    location: "Tenkodogo",
    phone: "+226 XX XX XX XX",
    email: "moringa.plus@outlook.com",
    productsCount: 6,
    standType: "9m²",
    isOnline: false
  }
];

const categories = ["Toutes", "Mode", "Alimentation", "Artisanat", "Cosmétiques"];

const VirtualFair = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredExhibitors = exhibitors.filter(exhibitor => {
    const matchesSearch = exhibitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exhibitor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Toutes" || exhibitor.category === selectedCategory;
    const matchesOnline = !showOnlineOnly || exhibitor.isOnline;
    
    return matchesSearch && matchesCategory && matchesOnline;
  });

  const handleContactWhatsApp = (phone: string, name: string) => {
    const message = `Bonjour, je vous contacte depuis la Foire Virtuelle 5 à 7 concernant ${name}`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Foire Virtuelle</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos exposants et leurs produits depuis chez vous
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-primary">{exhibitors.length}</div>
              <div className="text-sm text-muted-foreground">Exposants</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-primary">
                {exhibitors.filter(e => e.isOnline).length}
              </div>
              <div className="text-sm text-muted-foreground">En ligne</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-primary">
                {exhibitors.reduce((sum, e) => sum + e.productsCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Produits</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-primary">4.7</div>
              <div className="text-sm text-muted-foreground">Note moyenne</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un exposant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant={showOnlineOnly ? "default" : "outline"}
                onClick={() => setShowOnlineOnly(!showOnlineOnly)}
                className="w-full md:w-auto"
              >
                En ligne seulement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exhibitors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExhibitors.map((exhibitor) => (
            <Card key={exhibitor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={exhibitor.logo}
                  alt={exhibitor.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge variant={exhibitor.isOnline ? "default" : "secondary"}>
                    {exhibitor.isOnline ? "En ligne" : "Hors ligne"}
                  </Badge>
                  <Badge variant="outline">{exhibitor.standType}</Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{exhibitor.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{exhibitor.rating}</span>
                  </div>
                </div>
                
                <Badge variant="secondary" className="mb-2">
                  {exhibitor.category}
                </Badge>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {exhibitor.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    <span>{exhibitor.productsCount} produits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{exhibitor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{exhibitor.reviews} avis</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContactWhatsApp(exhibitor.phone, exhibitor.name)}
                  >
                    Contacter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Voir produits
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredExhibitors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Aucun exposant trouvé avec ces critères.</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Toutes");
                setShowOnlineOnly(false);
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualFair;
