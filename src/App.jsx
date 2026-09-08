import React, { useState, useEffect, useRef } from 'react';
import Icon from './components/Icon';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MethodStep from './components/MethodStep';
import { patientServices, providerServices, faqs } from './constants/content';
import FAQItem from './components/FAQItem';
import ServiceDetails from './components/ServiceDetails';

// Import images
import bioWebp from './assets/sobre-mim.webp';
import bioJpg from './assets/sobre-mim.jpg';
import logoMark from './assets/logo-fg-mark.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const track = mainRef.current.querySelector('.method-track');
    if (!track || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        track.classList.add('is-in-view');
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    track.classList.add('is-ready');
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ctx;
    let cancelled = false;

    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
          }
        });

      }, mainRef);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-accent selection:text-brand-dark overflow-x-hidden">
      
      <div className="fixed top-0 left-0 w-full h-1 bg-brand-accent origin-left scale-x-0 z-[100] scroll-progress opacity-60"></div>

      <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
      {/* HEADER */}
      <header className="site-header fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm py-4">
        <div className="w-full mx-auto px-6 lg:px-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-brand-dark flex items-center justify-center">
              <img src={logoMark} alt="FG Advocacia" className="h-6 w-auto" />
            </div>
            <div>
              <div className="font-serif text-lg md:text-xl font-bold tracking-tight leading-none text-brand-dark">
                FG Advocacia
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase mt-1.5 text-brand-muted">
                Direito da Saúde
              </div>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-6">
            <a href={import.meta.env.BASE_URL} className={"text-sm font-bold transition-colors uppercase tracking-wide text-brand-dark hover:text-brand-wine"}>Início</a>
            <a href="#importancia" className={"text-sm font-bold transition-colors uppercase tracking-wide text-brand-dark hover:text-brand-wine"}>Nossa atuação</a>
            <a href="#direitos" className={"text-sm font-bold transition-colors uppercase tracking-wide text-brand-dark hover:text-brand-wine"}>Serviços</a>
            <a href="#parceiros" className={"text-sm font-bold transition-colors uppercase tracking-wide text-brand-dark hover:text-brand-wine"}>Parceiros</a>
            <a href="#como-funciona" className={"text-sm font-bold transition-colors uppercase tracking-wide text-brand-dark hover:text-brand-wine"}>Como Funciona</a>
            <a href="#sobre" className={"text-sm font-bold transition-colors uppercase tracking-wide text-brand-dark hover:text-brand-wine"}>Sobre a Dra.</a>
            <WhatsAppButton 
              text="Falar com a Dra." 
              size="sm" 
              variant="dark" 
              className="hidden lg:flex" 
            />
          </nav>

          <button className="xl:hidden p-2 text-brand-dark" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMenuOpen} aria-controls="menu-mobile">
            <Icon name={isMenuOpen ? "X" : "Menu"} size={28} />
          </button>
        </div>

          <nav id="menu-mobile" aria-label="Menu principal" aria-hidden={!isMenuOpen} inert={!isMenuOpen} data-open={isMenuOpen} className="mobile-menu xl:hidden absolute top-full left-0 w-full bg-white border-t border-brand-medium/30 flex flex-col items-center gap-5 px-6 py-6 max-h-[calc(100dvh-80px)] overflow-y-auto">
            {[['#importancia', 'Nossa atuação'], ['#direitos', 'Serviços'], ['#parceiros', 'Parceiros'], ['#como-funciona', 'Como funciona'], ['#sobre', 'Sobre a Dra.']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-brand-dark">{label}</a>
            ))}
            <WhatsAppButton text="Falar pelo WhatsApp" onClick={() => setIsMenuOpen(false)} />
          </nav>
      </header>

      <main id="conteudo">
        {/* SESSÃO 1: HERO */}
        <section className="institutional-hero relative bg-brand-dark flex flex-col lg:flex-row items-stretch overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center pt-32 pb-16 px-8 lg:pt-36 lg:pb-20 lg:px-16 order-1 hero-content">
            <div className="w-full max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="overflow-hidden">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif leading-[1.12] mb-8 text-brand-light">
                  Proteção jurídica para quem precisa de saúde e para quem cuida dela.
                </h1>
              </div>
              <p className="text-lg text-brand-light/85 mb-8 leading-relaxed">
                O FG Advocacia atua na defesa dos pacientes e na proteção jurídica de profissionais, clínicas e empresas da saúde. Atendimento em Joinville e em todo o Brasil.
              </p>
              <div className="hero-actions flex flex-col items-center lg:items-start gap-6">
                <WhatsAppButton text="Falar com a equipe" icon />
                <a href="#importancia" className="explore-link inline-flex items-center gap-3 text-sm text-brand-light/85 py-2">
                  Conheça nossa atuação <Icon name="ChevronDown" size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative min-h-[440px] lg:min-h-[760px] order-2 overflow-hidden hero-image-container parallax-container bg-brand-dark">
            <picture>
              <source media="(max-width: 1023px)" type="image/avif" srcSet={`${import.meta.env.BASE_URL}hero-mobile.avif`} />
              <source media="(max-width: 1023px)" type="image/webp" srcSet={`${import.meta.env.BASE_URL}hero-mobile.webp`} />
              <source media="(max-width: 1023px)" type="image/jpeg" srcSet={`${import.meta.env.BASE_URL}hero-mobile.jpg`} />
              <source type="image/avif" srcSet={`${import.meta.env.BASE_URL}hero.avif`} />
              <source type="image/webp" srcSet={`${import.meta.env.BASE_URL}hero.webp`} />
              <source type="image/jpeg" srcSet={`${import.meta.env.BASE_URL}hero.jpg`} />
              <img
                src={`${import.meta.env.BASE_URL}hero.jpg`}
                alt="Advogada Dra. Fabiana Golembiewski, especialista em direito da saúde"
                width="853"
                height="853"
                className="absolute top-0 left-0 w-full h-full object-cover object-top lg:object-center hero-image"
                loading="eager"
                decoding="async"
                {...{ fetchpriority: 'high' }}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
            <div className="absolute bottom-10 left-8 right-8 lg:bottom-16 lg:left-auto lg:right-12 lg:text-right text-white">
              <p className="text-lg md:text-xl lg:text-2xl font-serif italic font-medium leading-tight max-w-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Dra. Fabiana Golembiewski</p>
              <p className="text-sm text-brand-light/85 mt-3">Direito da Saúde · OAB/SC 67.289</p>
            </div>
          </div>
        </section>

        <section id="importancia" className="py-20 lg:py-24 px-6 bg-brand-light scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Duas frentes de atuação. O mesmo cuidado com a saúde.</h2>
              <p className="section-intro">Mais do que conduzir processos judiciais, buscamos compreender cada situação e construir soluções jurídicas seguras para as relações que envolvem a saúde.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="p-8 lg:p-10 bg-white border-t-4 border-brand-wine">
                <Icon name="Heart" size={32} className="text-brand-wine mb-5" />
                <h3 className="font-serif text-2xl mb-4">Proteção de pacientes</h3>
                <p className="text-brand-muted leading-relaxed">Defendemos quem enfrenta dificuldades para acessar tratamentos e cuidados essenciais. Buscamos o acesso ao tratamento adequado e a continuidade do cuidado, pelo plano de saúde ou pelo SUS.</p>
              </article>
              <article className="p-8 lg:p-10 bg-white border-t-4 border-brand-accent">
                <Icon name="ShieldCheck" size={32} className="text-brand-dark mb-5" />
                <h3 className="font-serif text-2xl mb-4">Proteção de quem cuida da saúde</h3>
                <p className="text-brand-muted leading-relaxed">Atuamos ao lado de clínicas, empresas e profissionais da saúde, com foco na prevenção de conflitos e na construção de uma atuação com mais segurança jurídica, prevenção e organização.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="direitos" className="py-20 lg:py-24 px-6 bg-white scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <p className="font-bold text-brand-wine mb-3">Serviços para pacientes</p>
              <h2 className="section-title">Sua saúde é o bem mais precioso.</h2>
              <p className="section-intro">Atuamos diante de negativas de cobertura, demora no atendimento, interrupção de tratamentos e falhas na assistência da rede pública ou privada. Conheça os serviços para cada necessidade.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {patientServices.map(({ title, description, icon, services }) => (
                <article key={title} className="service-card bg-brand-light p-7 border border-brand-medium/50 rounded-xl">
                  <Icon name={icon} className="text-brand-wine mb-5" size={28} />
                  <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
                  <p className="text-brand-muted leading-relaxed mb-5">{description}</p>
                  <ServiceDetails title={title} services={services} />
                </article>
              ))}
            </div>
            <p className="text-sm text-brand-muted mt-7">Cada situação é analisada individualmente, considerando a documentação e os requisitos aplicáveis.</p>
            <div className="mt-10"><WhatsAppButton text="Conversar sobre meu caso" icon /></div>
          </div>
        </section>

        <section className="py-20 lg:py-24 px-6 bg-brand-light border-t border-brand-medium/30">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
            <div>
              <p className="font-bold text-brand-wine mb-3">Serviços para empresas</p>
              <h2 className="section-title">Sua segurança jurídica para quem cuida da saúde.</h2>
              <p className="section-intro">Assessoria e defesa de clínicas, empresas e profissionais da saúde, com foco na prevenção de conflitos e na organização das relações com pacientes, equipes e planos de saúde.</p>
              <div className="mt-8"><WhatsAppButton text="Falar sobre assessoria jurídica" /></div>
              <div className="mt-10 flex items-start gap-4 text-brand-wine">
                <Icon name="ShieldCheck" size={30} className="shrink-0" />
                <p className="font-serif text-xl">Prevenção hoje, tranquilidade sempre.</p>
              </div>
            </div>
            <div className="space-y-7">
              {providerServices.map(([title, description]) => (
                <article key={title} className="border-b border-brand-medium pb-7 last:border-0 last:pb-0">
                  <h3 className="font-serif font-bold text-2xl mb-3">{title}</h3>
                  <p className="text-brand-muted leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="parceiros" className="py-20 lg:py-24 px-6 bg-white border-t border-brand-medium/30 scroll-mt-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <div className="max-w-2xl">
              <div className="w-14 h-14 rounded-full border border-brand-accent flex items-center justify-center text-brand-wine mb-7">
                <Icon name="Users" size={28} />
              </div>
              <h2 className="section-title">Ecossistema da saúde</h2>
              <p className="section-intro">O cuidado com a saúde envolve diferentes especialidades. Por isso, o FG Advocacia constrói parcerias com clínicas e profissionais de confiança para ampliar a rede de apoio oferecida aos pacientes.</p>
            </div>
            <div className="border-l-4 border-brand-accent bg-brand-light p-8 lg:p-10">
              <h3 className="font-serif text-2xl lg:text-3xl mb-4">Precisa de uma indicação?</h3>
              <p className="text-brand-muted leading-relaxed mb-8">Converse com nossa equipe. Podemos apresentar profissionais parceiros de acordo com a sua necessidade e com a disponibilidade da nossa rede.</p>
              <WhatsAppButton
                text="Pedir indicação de parceiro"
                icon
                message="Olá! Vim pelo site do FG Advocacia e gostaria de pedir a indicação de um profissional parceiro da área da saúde."
              />
            </div>
          </div>
        </section>

        <section id="como-funciona" className="px-6 bg-brand-dark scroll-mt-24">
          <div className="max-w-7xl mx-auto text-center py-20 lg:py-24">
            <h2 className="section-title text-brand-light">Como conduzimos cada caso</h2>
            <p className="text-brand-light/80 text-lg mb-14 max-w-2xl mx-auto">Acolhemos cada história, analisamos suas particularidades e orientamos cada etapa com clareza.</p>
            <div className="method-track grid lg:grid-cols-5 gap-10">
              <MethodStep number="1" title="Entendimento" desc="Na reunião inicial, conhecemos sua história e os detalhes da situação para definir a estratégia jurídica." />
              <MethodStep number="2" title="Preparação" desc="Indicamos os documentos necessários e orientamos sua organização, com suporte da nossa equipe." />
              <MethodStep number="3" title="Atuação jurídica" desc="Adotamos as medidas adequadas ao caso. Quando necessário, ingressamos com ação judicial e pedido de liminar, se cabível." />
              <MethodStep number="4" title="Acompanhamento" desc="Acompanhamos as etapas e decisões, orientamos você sobre o andamento e adotamos as medidas e recursos necessários." />
              <MethodStep number="5" title="Cumprimento" desc="Após uma decisão favorável, acompanhamos seu cumprimento para buscar a efetivação do cuidado ou da proteção jurídica." />
            </div>
            <div className="mt-14"><WhatsAppButton text="Iniciar atendimento" icon /></div>
          </div>
        </section>

        {/* SESSÃO 6: AUTORIDADE */}
        <section id="sobre" className="py-0 bg-white scroll-mt-24">
          <div className="flex flex-col md:flex-row md:min-h-screen">
            <div
              className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative overflow-hidden parallax-container bg-brand-dark"
            >
              <picture>
                <source srcSet={bioWebp} type="image/webp" />
                <img src={bioJpg} alt="Dra. Fabiana Golembiewski, advogada em Direito da Saúde" width="853" height="853" loading="lazy" decoding="async" className="absolute top-0 left-0 w-full h-full object-cover object-top transition-transform duration-700" />
              </picture>
            </div>
            <div className="w-full md:w-1/2 p-10 lg:p-20 flex flex-col justify-center text-center md:text-left items-center md:items-start min-h-[50vh] md:min-h-screen">
              <div className="inline-block px-4 py-1.5 bg-brand-dark rounded-full text-xs font-bold text-brand-accent uppercase tracking-widest mb-6 w-max">
                Experiência em Direito da Saúde
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Dra. Fabiana Golembiewski</h2>
              <div className="space-y-4 text-brand-muted text-lg leading-relaxed mb-10">
                <p>À frente do FG Advocacia, a Dra. Fabiana Golembiewski atua em Direito da Saúde, na defesa de pacientes e na proteção jurídica de quem presta esse cuidado.</p>
                <p>Com sede em <strong>Joinville/SC</strong> e atendimento em todo o Brasil, o escritório une análise jurídica e acolhimento para compreender cada situação e orientar os próximos passos.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 authority-cards w-full">
                <div className="flex items-center gap-4 p-5 bg-brand-light rounded-xl border border-brand-medium/50">
                  <Icon name="MapPin" className="text-brand-dark" size={28} />
                  <div className="text-left"><p className="font-bold text-brand-dark">Sede em Joinville/SC</p><p className="text-sm text-brand-muted">Presencial e Digital</p></div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-brand-light rounded-xl border border-brand-medium/50">
                  <Icon name="ShieldCheck" className="text-brand-dark" size={28} />
                  <div className="text-left"><p className="font-bold text-brand-dark">Direito da Saúde</p><p className="text-sm text-brand-muted">Pacientes e prestadores</p></div>
                </div>
              </div>
              <WhatsAppButton text="Falar com nossa equipe" icon />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-6 bg-brand-dark text-brand-light">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl leading-snug mb-6">Compreender cada história faz parte da nossa atuação.</h2>
            <p className="text-lg leading-relaxed text-brand-light/90">De um lado, trabalhamos pelo acesso ao tratamento adequado e pela continuidade do cuidado. Do outro, ajudamos quem presta esse atendimento a trabalhar com mais segurança jurídica, prevenção e organização.</p>
          </div>
        </section>

        <section className="py-20 lg:py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-12">Dúvidas frequentes</h2>
            <div className="space-y-4 faq-list">
              {faqs.map(([question, answer]) => <FAQItem key={question} question={question} answer={answer} />)}
            </div>
            <div className="mt-14 text-center bg-brand-dark p-8 md:p-10 rounded-2xl">
              <h3 className="text-2xl font-serif text-brand-light mb-4">Vamos conversar sobre sua necessidade?</h3>
              <p className="text-brand-light/80 mb-8 leading-relaxed">Nossa equipe está pronta para compreender sua situação e orientar seus próximos passos.</p>
              <WhatsAppButton text="Falar pelo WhatsApp" variant="outline" />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-dark pt-20 pb-10 px-6 text-sm text-white/70">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logoMark} alt="FG Advocacia" className="h-8 w-auto" />
              <div className="font-serif text-xl font-bold text-white">Dra. Fabiana Golembiewski</div>
            </div>
            <p className="mb-1 text-white/60 text-sm">OAB/SC 67.289</p>
            <p className="mb-4 text-white/70 text-base leading-relaxed">FG Advocacia. Proteção jurídica para quem precisa de saúde e para quem cuida dela.</p>
            <div className="flex flex-col gap-2 mt-2">
              <a href="https://instagram.com/fabianagolembiewski" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/60 hover:text-brand-accent transition-colors text-sm">
                <Icon name="Instagram" size={16} className="text-brand-accent" /> @fabianagolembiewski
              </a>
              <a href="https://instagram.com/fgadvocaciaintegrada" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/60 hover:text-brand-accent transition-colors text-sm">
                <Icon name="Instagram" size={16} className="text-brand-accent" /> @fgadvocaciaintegrada
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-widest mb-6 text-xs">Contato e Endereço</h4>
            <ul className="space-y-5 text-base">
              <li>
                <a href="tel:+5547989205601" className="inline-flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors">
                  <Icon name="Phone" size={20} className="text-brand-accent" /> (47) 98920-5601
                </a>
              </li>
              <li>
                <a href="mailto:fabiana.golk@hotmail.com" className="inline-flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors">
                  <Icon name="Mail" size={20} className="text-brand-accent" /> fabiana.golk@hotmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={20} className="mt-1 flex-shrink-0 text-brand-accent" />
                <span className="text-white/70"><strong>Sede Principal:</strong><br/>Atrás do Fórum Edifício Everest<br/>R. Dona Francisca, 1.113 - Sala 707<br/>Saguaçu, Joinville - SC, 89221-006</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-widest mb-6 text-xs">Nossa atuação</h4>
            <ul className="space-y-5 text-base">
              <li className="flex items-center gap-3">
                <Icon name="Stethoscope" size={20} className="text-brand-accent" />
                <span className="text-white/70">Pacientes, clínicas e profissionais</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Clock" size={20} className="text-brand-accent" />
                <span className="text-white/70">Atendimento em todo o Brasil</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60">
          <p>© {new Date().getFullYear()} Fabiana Golembiewski Advocacia. OAB/SC 67.289. Todos os direitos reservados.</p>
        </div>
      </footer>
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
