import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    // Simuler l'ajout au panier (stockage local)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ 
        id, 
        name, 
        price: promoPrice || originalPrice, 
        image, 
        exhibitor,
        quantity: 1 
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsInCart(true);
    
    // Déclencher un événement personnalisé pour mettre à jour le compteur du panier
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Produit ajouté !",
      description: `${name} a été ajouté à votre panier.`,
    });
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast({
        title: "Retiré des favoris",
        description: `${name} a été retiré de vos favoris.`,
      });
    } else {
      favorites.push({ id, name, image, price: promoPrice || originalPrice, exhibitor });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      toast({
        title: "Ajouté aux favoris",
        description: `${name} a été ajouté à vos favoris.`,
      });
    }
  };

  const currentPrice = promoPrice || originalPrice;
  const hasDiscount = promoPrice && promoPrice < originalPrice;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-40 object-cover"
        />
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            Nouveau
          </Badge>
        )}
        {hasDiscount && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            -{Math.round(((originalPrice - (promoPrice || 0)) / originalPrice) * 100)}%
          </Badge>
        )}
        <Button
          variant="outline"
          size="icon"
          className={`absolute bottom-2 right-2 ${isFavorite ? 'text-red-500' : ''}`}
          onClick={handleToggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Par <span className="font-semibold">{exhibitor}</span>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              {currentPrice.toLocaleString()} FCFA
            </span>
            {hasDiscount && (
              <span className="text-sm line-through text-muted-foreground ml-2">
                {originalPrice.toLocaleString()} FCFA
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isInCart ? "Ajouté ✓" : "Ajouter au panier"}
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Catégorie</h4>
                    <p className="text-sm">{category}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Exposant</h4>
                    <p className="text-sm">{exhibitor}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prix</h4>
                    <div>
                      <span className="text-lg font-bold text-primary">
                        {currentPrice.toLocaleString()} FCFA
                      </span>
                      {hasDiscount && (
                        <span className="text-sm line-through text-muted-foreground ml-2">
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
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1" 
                    onClick={handleAddToCart}
                    disabled={isInCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isInCart ? "Ajouté au panier ✓" : "Ajouter au panier"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleToggleFavorite}
                    className={isFavorite ? 'text-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? "Favori" : "Favoris"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
