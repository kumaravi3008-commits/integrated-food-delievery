import { Send, Share2, Globe } from 'lucide-react';

const Footer = () => {
  return (
<footer className="relative w-full bg-black border-t border-neutral-900 overflow-hidden flex justify-center">
      
      {/* Background radial ambient glow to enhance the glass transparency depth */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      {/* Content container matching Navbar's exact padding and max-width */}
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6"> 
            <div className="text-3xl font-bold text-[#FF7A00] tracking-tight">
              DineExpress
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The fastest food delivery network in the world, bringing joy to your doorstep one meal at a time.
            </p>
            {/* Glass Social Icons */}
            <div className="flex gap-3 pt-1">
              <button className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 flex items-center justify-center text-gray-300 transition-all">
                <Share2 size={14} />
              </button>
              <button className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 flex items-center justify-center text-gray-300 transition-all">
                <Globe size={14} />
              </button>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-bold text-white">
              Company
            </h4> 
            <ul className="flex flex-col gap-3 text-[14px] text-gray-400 font-normal"> 
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><span className="text-gray-400">Partner with Us</span></li>
              <li><span className="text-gray-400">Careers</span></li>

            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-bold text-white">
              Support
            </h4>
            <ul className="flex flex-col gap-3 text-[14px] text-gray-400 font-normal">
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>

            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-bold text-white">
              Newsletter
            </h4>
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 text-[14px] leading-normal">
                Get exclusive deals in your inbox.
              </p>
              
              {/* Glassmorphic Input Box Container */}
              <div className="relative flex items-center max-w-xs bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-1.5 focus-within:border-orange-500/50 transition-colors">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-transparent pl-3 pr-12 py-2 text-[14px] text-white placeholder-gray-500 focus:outline-none"
                />
                <button className="absolute right-1.5 w-9 h-9 bg-[#b23c00] hover:bg-[#d94e00] rounded-lg text-white flex items-center justify-center transition-all shadow-lg shadow-orange-950/20">
                  <Send size={14} className="rotate-45 -mt-[1px] -mr-[1px]" />
                </button>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 pb-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-normal">
          <p>
            © 2026 DineExpress Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Cookie Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
