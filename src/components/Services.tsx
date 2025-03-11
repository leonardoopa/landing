
import React, { useEffect, useRef } from 'react';
import { BarChart4, Target, Monitor, RefreshCw, Search } from 'lucide-react';

const services = [
  {
    title: 'Gestão de Anúncios Meta e Google',
    description: 'Gestão estratégica de campanhas nas principais plataformas para maximizar seu ROI e alcançar seus clientes ideais.',
    icon: <BarChart4 className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Estratégias de Geração de Leads',
    description: 'Funis de geração de leads personalizados e projetados para atrair e converter prospects de alta qualidade em clientes.',
    icon: <Target className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Otimização de Landing Pages',
    description: 'Otimização baseada em dados para criar páginas de destino de alta conversão que transformam visitantes em leads.',
    icon: <Monitor className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Estratégias de Retargeting e Conversão',
    description: 'Campanhas avançadas de retargeting que reengajam visitantes e os guiam pelo seu funil de conversão.',
    icon: <RefreshCw className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Análise de Desempenho e Otimização',
    description: 'Análise e relatórios abrangentes para melhorar continuamente o desempenho das campanhas e o ROI.',
    icon: <Search className="w-10 h-10 text-orange-500" />
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="services" className="section-padding bg-black" ref={sectionRef}>
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-content">
          <h2 className="heading-2 mb-4">
            Expanda seu Negócio com <span className="text-orange-500">Gestão</span> Especializada de Tráfego
          </h2>
          <p className="text-muted-foreground">
            Soluções abrangentes projetadas para atrair leads qualificados e aumentar suas taxas de conversão
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="glass-card p-8 rounded-xl flex flex-col transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] reveal-content"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-5">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
