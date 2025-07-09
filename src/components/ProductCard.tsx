
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";

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
  name, 
  image, 
  originalPrice, 
  promoPrice, 
  category, 
  exhibitor, 
  isNew 
}: ProductCardProps) => {
  const hasPromo = promoPrice && promoPrice < originalPrice;
  
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
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">Par {exhibitor}</p>
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>
        
        <div className="flex items-center gap-2 mt-3">
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
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
