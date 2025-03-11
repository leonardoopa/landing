
import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { toast } from "sonner";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent! We'll contact you shortly.");
      setName('');
      setEmail('');
      setPhone('');
      setBusinessType('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="section-padding bg-gradient-to-b from-gray-50 to-white"
      ref={sectionRef}
    >
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-content">
          <h2 className="heading-2 mb-4">
            Stop Wasting Money on Ads That Don't <span className="text-orange-500">Convert</span>
          </h2>
          <p className="text-muted-foreground">
            Let's grow your business with strategic traffic management and qualified lead generation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-xl space-y-6 reveal-content"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium mb-2">
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select your business type</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Local Business">Local Business</option>
                    <option value="Agency">Agency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Tell us about your goals"
                  rows={4}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary w-full flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                ) : null}
                {isSubmitting ? 'Sending...' : 'Get Started Now'}
              </button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl reveal-content">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-100 p-3 flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground mb-2">
                    Speak directly with a traffic expert
                  </p>
                  <a href="tel:+1234567890" className="text-orange-500 hover:text-orange-600 font-medium">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl reveal-content" style={{ transitionDelay: '100ms' }}>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-100 p-3 flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground mb-2">
                    Send us an email anytime
                  </p>
                  <a href="b2you_crew@gmail.com" className="text-orange-500 hover:text-orange-600 font-medium">
                    b2you_crew@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl reveal-content" style={{ transitionDelay: '200ms' }}>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-100 p-3 flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground mb-2">
                    Connect with us on WhatsApp
                  </p>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 font-medium">
                    Message Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
