import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: 'https://techmiyaedtech.com/' },
    { name: 'Courses', href: 'https://techmiyaedtech.com/courses' },
    { name: 'Contact', href: 'https://techmiyaedtech.com/contact' },
    { name: 'Trainers', href: 'https://trainers.techmiyaedtech.com/', isHighlighted: true }
  ];

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <a
              href="https://techmiyaedtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 group shrink-0"
            >
              <img
                src="/images/techmiyaedtech_new_logo.png"
                alt="Techmiya Ed-Tech Logo"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <span className="font-bold text-base sm:text-lg tracking-tight text-amber-500">
                Techmiya Ed-Tech
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs xl:text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.isHighlighted ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`transition-colors ${
                  link.isHighlighted
                    ? 'bg-amber-50/90 text-amber-600 px-3.5 py-1.5 rounded-xl border border-amber-200/60 font-semibold shadow-2xs hover:bg-amber-100/80'
                    : 'hover:text-amber-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="https://lms.techmiyaedtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs xl:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-all shadow-xs"
            >
              Access LMS
            </a>
            <a
              href="https://techmiyaedtech.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs xl:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-xl transition-all shadow-xs"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.isHighlighted ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors ${
                  link.isHighlighted
                    ? 'bg-amber-50 text-amber-600 font-semibold border border-amber-200/60 w-fit'
                    : 'hover:bg-slate-50 hover:text-amber-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://lms.techmiyaedtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs"
            >
              Access LMS
            </a>
            <a
              href="https://techmiyaedtech.com/register"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-xl shadow-xs"
            >
              Enquire Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
