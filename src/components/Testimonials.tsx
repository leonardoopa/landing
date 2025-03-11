
import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    position: 'CEO da TechStart',
    content: 'Os resultados foram nada menos que incríveis. Vimos um aumento de 215% em leads qualificados em apenas 2 meses de trabalho conjunto. A abordagem estratégica para nossas campanhas de anúncios transformou completamente nosso negócio.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    name: 'Michael Rodriguez',
    position: 'Diretor de Marketing da GrowthBox',
    content: 'Já trabalhei com muitos gestores de tráfego antes, mas nenhum entregou o nível de resultados e insights que experimentei aqui. Nosso custo por aquisição caiu 42% enquanto a qualidade dos leads melhorou significativamente.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    name: 'Emma Chen',
    position: 'Fundadora da DigitalFirst',
    content: 'A diferença está na estratégia. Em vez de apenas veicular anúncios, recebemos uma otimização completa de funil que abordou cada estágio da jornada do cliente. Essa abordagem holística aumentou nossas conversões em 187%.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

const caseStudies = [
  {
    company: 'E-Commerce',
    result: '312% de aumento no ROAS',
    description: 'Reestruturação de campanhas de anúncios e implementação de novas estratégias de segmentação de público.',
    before: '1.4x',
    after: '5.8x'
  },
  {
    company: 'Empresa SaaS',
    result: '247% mais demos qualificadas',
    description: 'Desenvolvimento de landing pages especializadas com formulários otimizados de captura de leads.',
    before: '38/mês',
    after: '132/mês'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const caseStudyRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    caseStudyRefs.current.forEach((study) => {
      if (study) observer.observe(study);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="testimonials" 
      className="section-padding bg-gradient-to-b from-black to-gray-900"
      ref={sectionRef}
    >
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-content">
          <h2 className="heading-2 mb-4">
            Casos de <span className="text-orange-500">Sucesso</span>
          </h2>
          <p className="text-muted-foreground">
            Resultados reais de clientes reais que transformaram seus negócios com gestão estratégica de tráfego
          </p>
        </div>

        <div 
          className="max-w-4xl mx-auto mb-20 glass-card rounded-xl p-10 shadow-lg reveal-content"
          ref={testimonialsRef}
        >
          <div className="relative h-56">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col transition-all duration-500 transform ${
                  index === activeIndex
                    ? 'opacity-100 translate-x-0'
                    : index < activeIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <p className="text-lg italic mb-6 text-gray-300">"{testimonial.content}"</p>
                <div className="mt-auto flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-orange-500' : 'bg-gray-700'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              ref={(el) => (caseStudyRefs.current[index] = el)}
              className="glass-card p-8 rounded-xl reveal-content"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-orange-900/60 text-orange-400 font-medium text-sm py-1 px-3 rounded-full inline-block mb-4">
                Estudo de Caso
              </div>
              <h3 className="text-xl font-semibold mb-2">{study.company}</h3>
              <p className="text-2xl font-bold text-orange-500 mb-4">{study.result}</p>
              <p className="text-muted-foreground mb-6">{study.description}</p>
              
              <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">ANTES</p>
                  <p className="text-xl font-semibold">{study.before}</p>
                </div>
                <div className="w-12 h-0.5 bg-orange-500 relative">
                  <svg className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">DEPOIS</p>
                  <p className="text-xl font-semibold text-orange-500">{study.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
