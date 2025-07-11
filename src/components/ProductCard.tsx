
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  description?: string;
  inStock?: boolean;
}

const ProductCard = ({ 
  id, 
  title, 
  price, 
  image, 
  category, 
  rating = 4.5, 
  description,
  inStock = true 
}: ProductCardProps) => {
  const handleAddToCart = () => {
    // Logique pour ajouter au panier
    console.log(`Adding product ${id} to cart`);
    
    // Dispatch custom event pour notifier l'header
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { productId: id, action: 'add' } 
    }));
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">{rating}</span>
            </div>
          )}
        </div>
        
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          {!inStock && (
            <Badge variant="destructive" className="text-xs">
              Rupture de stock
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        
        <Button 
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-full"
          variant={inStock ? "default" : "secondary"}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock ? "Ajouter au panier" : "Non disponible"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
