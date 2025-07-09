
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  promoPrice?: number;
  category: string;
  exhibitor: string;
  isNew?: boolean;
}

const ProductCard = ({ 
  id,
  name, 
  image, 
  originalPrice, 
  promoPrice, 
  category, 
  exhibitor, 
  isNew 
}: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const hasPromo = promoPrice && promoPrice < originalPrice;
  const finalPrice = promoPrice || originalPrice;
  
  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      
      // Simuler l'ajout au panier
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Récupérer le panier existant du localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Vérifier si le produit est déjà dans le panier
      const existingItem = existingCart.find((item: any) => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCart.push({
          id,
          name,
          image,
          price: finalPrice,
          quantity: 1,
          exhibitor
        });
      }
      
      // Sauvegarder dans localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      toast({
        title: "Produit ajouté !",
        description: `${name} a été ajouté à votre panier.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${name} ${isFavorite ? "retiré de" : "ajouté à"} vos favoris.`,
    });
  };
  
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            Nouveau
          </Badge>
        )}
        {hasPromo && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            -{Math.round((1 - promoPrice / originalPrice) * 100)}%
          </Badge>
        )}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white ${
            hasPromo ? 'top-12' : ''
          }`}
          onClick={toggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">Par {exhibitor}</p>
        <Badge variant="secondary" className="text-xs mb-3">
          {category}
        </Badge>
        
        <div className="flex items-center gap-2">
          {hasPromo ? (
            <>
              <span className="text-lg font-bold text-red-600">
                {promoPrice?.toLocaleString()} FCFA
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toLocaleString()} FCFA
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">
              {originalPrice.toLocaleString()} FCFA
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          className="flex-1" 
          size="sm"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAddingToCart ? "Ajout..." : "Ajouter au panier"}
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img src={image} alt={name} className="w-full h-64 object-cover rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Exposant</h4>
                  <p className="text-sm">{exhibitor}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Catégorie</h4>
                  <p className="text-sm">{category}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prix</h4>
                  <div className="flex items-center gap-2">
                    {hasPromo ? (
                      <>
                        <span className="text-lg font-bold text-red-600">
                          {promoPrice?.toLocaleString()} FCFA
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {originalPrice.toLocaleString()} FCFA
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">
                        {originalPrice.toLocaleString()} FCFA
                      </span>
                    )}
                  </div>
                </div>
                {isNew && (
                  <div>
                    <h4 className="font-semibold mb-2">Statut</h4>
                    <Badge className="bg-green-500">Nouveau produit</Badge>
                  </div>
                )}
              </div>
              <div className="pt-4">
                <Button 
                  className="w-full" 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isAddingToCart ? "Ajout..." : "Ajouter au panier"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
