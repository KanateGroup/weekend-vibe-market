
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ShoppingBag, 
  Calendar, 
  Users, 
  TrendingUp, 
  Package, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  BarChart3
} from "lucide-react";

// Données de démonstration
const mockData = {
  stats: {
    totalProducts: 12,
    totalViews: 1247,
    totalSales: 8,
    monthlyRevenue: 156000
  },
  products: [
    {
      id: 1,
      name: "Sac à main artisanal",
      price: 25000,
      views: 234,
      sales: 3,
      status: "active",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Bijoux en perles",
      price: 15000,
      views: 156,
      sales: 2,
      status: "active",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Savon au karité",
      price: 3000,
      views: 89,
      sales: 3,
      status: "draft",
      image: "/placeholder.svg"
    }
  ],
  events: [
    {
      id: 1,
      name: "5 à 7 Entrepreneuriat",
      date: "2024-03-15",
      registered: true,
      status: "upcoming"
    },
    {
      id: 2,
      name: "Salon des Produits Locaux",
      date: "2024-03-16",
      registered: false,
      status: "upcoming"
    }
  ]
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Veuillez vous connecter pour accéder à votre tableau de bord.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bonjour, {user.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Déconnexion
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="products">Mes produits</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Produits</p>
                      <p className="text-2xl font-bold">{mockData.stats.totalProducts}</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Vues totales</p>
                      <p className="text-2xl font-bold">{mockData.stats.totalViews}</p>
                    </div>
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ventes</p>
                      <p className="text-2xl font-bold">{mockData.stats.totalSales}</p>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenus (mois)</p>
                      <p className="text-2xl font-bold">{mockData.stats.monthlyRevenue.toLocaleString()} FCFA</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Nouveau produit "Sac à main artisanal" ajouté</span>
                    <span className="text-xs text-muted-foreground ml-auto">Il y a 2 heures</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Inscription à l'événement "5 à 7 Entrepreneuriat"</span>
                    <span className="text-xs text-muted-foreground ml-auto">Hier</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Vente de 2 bijoux en perles</span>
                    <span className="text-xs text-muted-foreground ml-auto">Il y a 2 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes produits</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un produit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.products.map((product) => (
                <Card key={product.id}>
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <Badge
                      variant={product.status === "active" ? "default" : "secondary"}
                      className="absolute top-2 right-2"
                    >
                      {product.status === "active" ? "Actif" : "Brouillon"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-primary mb-2">
                      {product.price.toLocaleString()} FCFA
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>{product.views} vues</span>
                      <span>{product.sales} ventes</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <h2 className="text-2xl font-bold">Mes événements</h2>

            <div className="space-y-4">
              {mockData.events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={event.registered ? "default" : "outline"}>
                          {event.registered ? "Inscrit" : "Non inscrit"}
                        </Badge>
                        {!event.registered && (
                          <Button variant="outline" size="sm">
                            S'inscrire
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Membre depuis</label>
                  <p className="text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Button>Modifier le profil</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
