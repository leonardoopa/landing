
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Casos de Sucesso', href: '#testimonials' },
    { name: 'Contato', href: '#contact' }
  ];

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-orange-500">B2YOU</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground hover:text-orange-500 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="button-primary"
          >
            Mais Leads Agora!
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'fixed inset-x-0 bg-black shadow-lg transform transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-y-0' : '-translate-y-full',
          scrolled ? 'top-[65px]' : 'top-[85px]'
        )}
      >
        <nav className="flex flex-col py-4">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-8 py-3 text-foreground hover:bg-gray-900 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="px-8 py-4">
            <a
              href="#contact"
              className="button-primary w-full text-center inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Mais Leads Agora!
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
