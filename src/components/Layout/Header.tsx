
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Users, ShoppingBag, Building2, Handshake } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/", label: "Accueil", icon: null },
    { path: "/evenements", label: "Événements", icon: Calendar },
    { path: "/exposants", label: "Exposants", icon: Users },
    { path: "/boutique", label: "Boutique", icon: ShoppingBag },
    { path: "/foire-virtuelle", label: "Foire Virtuelle", icon: Building2 },
    { path: "/parrainage", label: "Parrainage", icon: Handshake },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">5à7</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Plateforme 5 à 7</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-100"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/tableau-bord">
                  <Button variant="outline" size="sm">
                    Tableau de bord
                  </Button>
                </Link>
                <Button onClick={() => signOut()} variant="ghost" size="sm">
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/connexion">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/inscription">
                  <Button size="sm">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:text-primary hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t">
                {user ? (
                  <div className="space-y-2">
                    <Link to="/tableau-bord" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Tableau de bord
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }} 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                    >
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/connexion" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/inscription" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full">
                        S'inscrire
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
