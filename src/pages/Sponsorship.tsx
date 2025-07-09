
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Star, Award, Users, TrendingUp, Heart, Play } from "lucide-react";

const currentSponsor = {
  name: "Aminata SANKARA",
  title: "Fondatrice & CEO de Sankara Cosmetics",
  age: 34,
  experience: "12 ans d'entrepreneuriat",
  image: "/placeholder.svg",
  quote: "L'entrepreneuriat, c'est avant tout avoir le courage de transformer ses rêves en réalité. Chaque échec est une leçon, chaque succès une motivation pour aller plus loin.",
  story: "Aminata a commencé avec 50 000 FCFA d'économies et une passion pour les cosmétiques naturels. Aujourd'hui, son entreprise emploie 45 personnes et exporte dans 8 pays de la sous-région.",
  achievements: [
    "Chiffre d'affaires : 800 millions FCFA/an",
    "45 employés permanents",
    "Exportation dans 8 pays",
    "Prix de la Meilleure Entrepreneuse 2023"
  ],
  values: ["Innovation", "Qualité", "Durabilité", "Solidarité"],
  advice: "Commencez petit, pensez grand, et n'ayez jamais peur d'échouer. L'échec fait partie du processus d'apprentissage."
};

const pastSponsors = [
  {
    name: "Ibrahim OUEDRAOGO",
    title: "CEO Tech Solutions BF",
    period: "Février 2024",
    image: "/placeholder.svg",
    achievement: "Création de 200 emplois tech"
  },
  {
    name: "Fatou TRAORE",
    title: "Directrice AgriPro",
    period: "Janvier 2024",
    image: "/placeholder.svg",
    achievement: "1000 producteurs accompagnés"
  },
  {
    name: "Moussa KABORE",
    title: "Fondateur EcoConstruct",
    period: "Décembre 2023",
    image: "/placeholder.svg",
    achievement: "100 maisons écologiques construites"
  }
];

const Sponsorship = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Parrain/Marraine du Mois</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez le parcours inspirant de nos entrepreneurs modèles
          </p>
        </div>

        {/* Current Sponsor Spotlight */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Marraine de Mars 2024</Badge>
              <h2 className="text-3xl font-bold mb-2">{currentSponsor.name}</h2>
              <p className="text-xl text-primary-foreground/90 mb-4">{currentSponsor.title}</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="font-bold">{currentSponsor.age} ans</div>
                  <div className="text-sm text-primary-foreground/80">Âge</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">12 ans</div>
                  <div className="text-sm text-primary-foreground/80">Expérience</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Quote className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <p className="text-lg italic text-primary-foreground/95 leading-relaxed">
                  "{currentSponsor.quote}"
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={currentSponsor.image}
                  alt={currentSponsor.name}
                  className="w-64 h-64 rounded-full object-cover mx-auto border-4 border-white/20"
                />
                <Button
                  size="lg"
                  variant="secondary"
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Voir la vidéo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Story */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Son Parcours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {currentSponsor.story}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Réalisations clés :</h4>
                  <ul className="space-y-2">
                    {currentSponsor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Valeurs :</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSponsor.values.map((value, index) => (
                      <Badge key={index} variant="outline">{value}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Conseil aux jeunes entrepreneurs
                  </h4>
                  <p className="text-sm italic text-muted-foreground">
                    "{currentSponsor.advice}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Contact */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">45</div>
                    <div className="text-sm text-muted-foreground">Emplois créés</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">800M</div>
                    <div className="text-sm text-muted-foreground">FCFA de CA annuel</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-muted-foreground">Pays d'exportation</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Suivre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Profil LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Page Facebook
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Site web
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Past Sponsors */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Nos anciens parrains/marraines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastSponsors.map((sponsor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-semibold mb-1">{sponsor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{sponsor.title}</p>
                  <Badge variant="secondary" className="mb-3">{sponsor.period}</Badge>
                  <p className="text-sm text-primary font-medium">{sponsor.achievement}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Vous voulez devenir notre prochain parrain/marraine ?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Partagez votre expérience avec la communauté entrepreneuriale et inspirez la prochaine génération
          </p>
          <Button size="lg">
            Candidater comme parrain/marraine
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sponsorship;
