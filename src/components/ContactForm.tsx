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
      toast.success("Sua mensagem foi enviada! Entraremos em contato com você em breve.");
      setName('');
      setEmail('');
      setPhone('');
      setBusinessType('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  const generateWhatsAppLink = () => {
    // Encoding values (to prevent issues in URL)
    const messageText = `Olá, gostaria de saber mais sobre os serviços!\nNome: ${encodeURIComponent(name)}\nEmail: ${encodeURIComponent(email)}\nTelefone: ${encodeURIComponent(phone)}\nTipo de Negócio: ${encodeURIComponent(businessType)}\nMensagem: ${encodeURIComponent(message)}`;
    
    // Decoding the message for WhatsApp link
    const decodedMessageText = decodeURIComponent(messageText);

    // Generate the WhatsApp link with the decoded message
    const whatsappLink = `https://api.whatsapp.com/send?phone=5581994088207&text=${encodeURIComponent(decodedMessageText)}`;
    return whatsappLink;
  };

  return (
    <section 
      id="contact" 
      className="section-padding bg-gradient-to-b from-gray-50 to-white"
      ref={sectionRef}
    >
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-content">
          <h2 className="heading-2 mb-4 text-black">
            Pare de desperdiçar dinheiro em anúncios que não <span className="text-orange-500">Convertem</span>
          </h2>
          <p className="text-muted-foreground">
            Vamos expandir seu negócio com gerenciamento estratégico de tráfego e geração de leads qualificados
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
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Seu nome"
                    required
                    style={{ color: 'black' }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Seu email"
                    required
                    style={{ color: 'black' }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Número de telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Seu número de telefone"
                    style={{ color: 'black' }}
                  />
                </div>
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium mb-2">
                    Tipo de Negócio
                  </label>
                  <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Selecione seu tipo de negócio</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Local Business">Negócio Local</option>
                    <option value="Agency">Agência</option>
                    <option value="Other">Outro</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Fale sobre seus objetivos"
                  rows={4}
                  required
                  style={{ color: 'black' }}
                />
              </div>
              
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary w-full flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                ) : null}
                {isSubmitting ? 'Enviando...' : 'Comece Agora'}
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
