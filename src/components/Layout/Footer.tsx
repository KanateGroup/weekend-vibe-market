
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <span className="text-xl font-bold">5à7</span>
              </div>
              <span className="font-bold text-lg">Plateforme 5 à 7</span>
            </div>
            <p className="text-gray-400 text-sm">
              La plateforme qui connecte entrepreneurs, artisans et consommateurs pour valoriser l'économie locale du Burkina Faso.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/boutique" className="text-gray-400 hover:text-white transition-colors">Boutique</Link></li>
              <li><Link to="/evenements" className="text-gray-400 hover:text-white transition-colors">Événements</Link></li>
              <li><Link to="/exposants" className="text-gray-400 hover:text-white transition-colors">Exposants</Link></li>
              <li><Link to="/foire-virtuelle" className="text-gray-400 hover:text-white transition-colors">Foire Virtuelle</Link></li>
              <li><Link to="/parrainage" className="text-gray-400 hover:text-white transition-colors">Parrainage</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Vendre en ligne</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Réserver un stand</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Organiser un événement</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Devenir parrain</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support client</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-gray-400">Ouagadougou, Burkina Faso</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-400">+226 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-400">contact@5a7.bf</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Plateforme 5 à 7. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
