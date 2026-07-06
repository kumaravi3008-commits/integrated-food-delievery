import { Send } from 'lucide-react';




const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 px-8 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-2xl font-bold tracking-tighter">
              Crave<span className="text-orange-600">Dash</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Elevating the art of home dining. We connect you with the finest premium restaurants for a world-class culinary experience.
            </p>
            <div className="flex gap-5 text-gray-400">
              <span className="w-[20px] h-[20px]" aria-hidden="true" />
              <span className="w-[20px] h-[20px]" aria-hidden="true" />
              <span className="w-[20px] h-[20px]" aria-hidden="true" />
              <span className="w-[20px] h-[20px]" aria-hidden="true" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600 mb-8">Discover</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Fine Dining</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Healthy Options</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Member Exclusives</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600 mb-8">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Delivery Areas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600 mb-8">Newsletter</h4>
            <p className="text-gray-500 text-xs mb-6 tracking-wide">Subscribe for exclusive offers and culinary updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-600 transition-colors"
              />
              <button className="absolute right-2 top-1.5 bg-orange-600 p-1.5 rounded-lg hover:bg-orange-700 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
            © 2024 CraveDash Technologies Inc.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            <span className="cursor-pointer hover:text-white transition-colors">Security</span>
            <span className="cursor-pointer hover:text-white transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;