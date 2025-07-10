
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  exhibitor: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const { toast } = useToast();

  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: ""
  });

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier.",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés de votre panier.",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!checkoutForm.firstName || !checkoutForm.lastName || !checkoutForm.email || !checkoutForm.phone) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setIsCheckingOut(true);
    
    // Simuler le traitement de la commande
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Créer un objet commande
    const order = {
      id: Date.now(),
      items: cartItems,
      total: getTotalPrice(),
      customerInfo: checkoutForm,
      date: new Date().toISOString(),
      status: "En attente"
    };

    // Sauvegarder la commande dans le localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Vider le panier
    clearCart();
    setShowCheckoutForm(false);
    setIsCheckingOut(false);

    toast({
      title: "Commande validée !",
      description: `Votre commande n°${order.id} a été enregistrée avec succès.`,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-6">
              Découvrez nos produits et ajoutez-les à votre panier
            </p>
            <Button asChild>
              <a href="/boutique">Continuer mes achats</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mon panier</h1>
          <p className="text-muted-foreground">
            {getTotalItems()} article(s) dans votre panier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Par {item.exhibitor}
                      </p>
                      <p className="text-lg font-bold text-primary mt-1">
                        {item.price.toLocaleString()} FCFA
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Résumé de la commande */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total ({getTotalItems()} articles)</span>
                  <span>{getTotalPrice().toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>Gratuit</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{getTotalPrice().toLocaleString()} FCFA</span>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowCheckoutForm(true)}
                  >
                    Valider la commande
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <a href="/boutique">Continuer mes achats</a>
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={clearCart}
                  >
                    Vider le panier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Formulaire de commande */}
        {showCheckoutForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Finaliser votre commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={checkoutForm.firstName}
                      onChange={(e) => setCheckoutForm(prev => ({
                        ...prev,
                        firstName: e.target.value
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={checkoutForm.lastName}
                      onChange={(e) => setCheckoutForm(prev => ({
                        ...prev,
                        lastName: e.target.value
                      }))}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Adresse de livraison</Label>
                  <Input
                    id="address"
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm(prev => ({
                      ...prev,
                      city: e.target.value
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={checkoutForm.notes}
                    onChange={(e) => setCheckoutForm(prev => ({
                      ...prev,
                      notes: e.target.value
                    }))}
                    placeholder="Instructions spéciales pour la livraison..."
                  />
                </div>

                <Separator />
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Récapitulatif</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{getTotalItems()} article(s)</span>
                      <span>{getTotalPrice().toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>Gratuit</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>{getTotalPrice().toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCheckoutForm(false)}
                    disabled={isCheckingOut}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Traitement..." : "Confirmer la commande"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
