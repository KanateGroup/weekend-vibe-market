
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Store, Users, Award, Package, MapPin, Phone, Mail, Globe } from "lucide-react";

const standTypes = [
  { id: "9m2", name: "Stand 9 m²", price: 75000, description: "Stand basique 3x3m" },
  { id: "16m2", name: "Stand 16 m²", price: 120000, description: "Stand standard 4x4m" },
  { id: "25m2", name: "Stand 25 m²", price: 180000, description: "Stand premium 5x5m" },
  { id: "virtual", name: "Stand virtuel", price: 25000, description: "Présence sur écran uniquement" }
];

const categories = [
  "Alimentation & Boissons",
  "Mode & Textile",
  "Artisanat & Décoration",
  "Cosmétiques & Bien-être",
  "Technologie & Services",
  "Agriculture & Élevage",
  "Autres"
];

const Exhibitors = () => {
  const [selectedStand, setSelectedStand] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    description: "",
    experience: "",
    acceptTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", { ...formData, selectedStand });
    // Ici, vous ajouteriez la logique de soumission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Devenir Exposant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rejoignez notre communauté d'exposants et faites connaître vos produits
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Store className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Visibilité accrue</h3>
              <p className="text-sm text-muted-foreground">
                Exposez vos produits à plus de 10,000 visiteurs mensuels
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Réseau professionnel</h3>
              <p className="text-sm text-muted-foreground">
                Connectez-vous avec d'autres entrepreneurs et clients
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Support marketing</h3>
              <p className="text-sm text-muted-foreground">
                Bénéficiez de notre accompagnement marketing et communication
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stand Selection */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Choisissez votre type de stand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {standTypes.map((stand) => (
                    <div
                      key={stand.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedStand === stand.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedStand(stand.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{stand.name}</h4>
                          <p className="text-sm text-muted-foreground">{stand.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{stand.price.toLocaleString()} FCFA</div>
                          <div className="text-sm text-muted-foreground">par événement</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informations sur votre entreprise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom de l'entreprise *</label>
                    <Input
                      placeholder="Nom de votre entreprise"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom du contact *</label>
                    <Input
                      placeholder="Votre nom complet"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input
                        type="email"
                        placeholder="contact@entreprise.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Téléphone *</label>
                      <Input
                        placeholder="+226 XX XX XX XX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Site web</label>
                    <Input
                      placeholder="https://www.votresite.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Catégorie d'activité *</label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description de votre activité *</label>
                    <Textarea
                      placeholder="Décrivez brièvement votre activité et vos produits..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Années d'expérience</label>
                    <Input
                      placeholder="Ex: 5 ans"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange('acceptTerms', checked === true)}
                    />
                    <label htmlFor="terms" className="text-sm">
                      J'accepte les conditions générales et la politique de confidentialité
                    </label>
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    disabled={!selectedStand || !formData.acceptTerms}
                    className="w-full"
                    size="lg"
                  >
                    Soumettre ma candidature
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exhibitors;
