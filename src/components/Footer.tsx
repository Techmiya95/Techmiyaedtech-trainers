import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1120] border-t border-slate-800 text-slate-300 text-xs py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* Column 1: Logo, Tagline & Social Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/techmiyaedtech_new_logo.png"
                alt="Techmiya Edtech Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-amber-500 text-lg tracking-wide">
                Techmiya Edtech
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Transforming learning with cutting-edge technology education. Empowering students to build successful careers in tech.
            </p>

            <div className="flex items-center gap-4 text-xs pt-1 text-slate-300">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                Youtube
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base">Quick Links</h4>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li>
                <a href="https://blogs.techmiyaedtech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="https://blogs.techmiyaedtech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="https://blogs.techmiyaedtech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="https://blogs.techmiyaedtech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://blogs.techmiyaedtech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Terms & Condition
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base">Contact Us</h4>
            <ul className="space-y-2.5 text-slate-300 text-xs">
              <li className="flex items-center gap-2.5">
                <span className="p-1 rounded-sm bg-blue-600/20 text-blue-400 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <a href="mailto:hr@techmiyaedtech.com" className="hover:text-amber-400 transition-colors">
                  hr@techmiyaedtech.com
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <span className="p-1 rounded-sm bg-pink-600/20 text-pink-400 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <a href="tel:+916363760275" className="hover:text-amber-400 transition-colors">
                  +91 6363760275
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <span className="p-1 rounded-sm bg-pink-600/20 text-pink-400 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <a href="tel:+916361987951" className="hover:text-amber-400 transition-colors">
                  +91 6361987951
                </a>
              </li>

              <li className="flex items-start gap-2.5 pt-0.5">
                <span className="p-1 rounded-sm bg-rose-600/20 text-rose-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span className="leading-relaxed">
                  Techmiya Ed-Tech, 28th Main Rd, S & C Cross A Road, Jayanagar 9th Block, Bengaluru, Karnataka 560069
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 text-center text-slate-400 text-xs">
          <p>© 2026 Techmiya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
