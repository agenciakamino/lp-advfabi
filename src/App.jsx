import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from './components/Icon';
import WhatsAppButton from './components/WhatsAppButton';
import MethodStep from './components/MethodStep';
import ReviewCard from './components/ReviewCard';
import FAQItem from './components/FAQItem';

// Import images
import heroImage from './assets/hero.png';
import bioImage from './assets/sobre-mim.png';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Refresh ScrollTrigger periodically to ensure markers and positions are correct
    ScrollTrigger.refresh();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Scroll Progress Bar
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3
        }
      });

      // Hero Animations
      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        let { isDesktop } = context.conditions;
        const tl = gsap.timeline();

        if (isDesktop) {
          tl.fromTo(".hero-image-container", 
            { clipPath: "inset(0 0 0 100%)" },
            { clipPath: "inset(0 0 0 0%)", duration: 1, ease: "expo.inOut" }
          )
          .from(".hero-image", {
            scale: 1.1,
            duration: 1.5,
            ease: "power3.out"
          }, 0)
          .from(".hero-content > div > *", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
          }, 0.2)
          .from(".hero-avatar", {
            y: 10,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out"
          }, "-=0.3")
          .from(".hero-stars svg", {
            scale: 0.5,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          }, "-=0.3");
        } else {
          tl.from(".hero-content > div > *", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
          })
          .from(".hero-avatar", {
            y: 10,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out"
          }, "-=0.4")
          .from(".hero-stars svg", {
            scale: 0.5,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          }, "-=0.3")
          .fromTo(".hero-image-container", 
            { clipPath: "inset(0 0 0 100%)" },
            { clipPath: "inset(0 0 0 0%)", duration: 1, ease: "expo.inOut" },
            0.15
          )
          .from(".hero-image", {
            scale: 1.1,
            duration: 1.5,
            ease: "power3.out"
          }, 0.15);
        }
      });

      // Parallax
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        const container = img.closest('.parallax-container');
        gsap.to(img, {
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          y: 40,
          ease: "none"
        });
      });

      const staggeredLists = [
        { parent: ".problem-list", items: ".problem-list li", x: -20 },
        { parent: ".solution-list", items: ".solution-list > div", x: -20 },
        { parent: ".negativas-grid", items: ".negativas-grid > div", y: 20 },
        { parent: ".authority-cards", items: ".authority-cards > div", y: 20 }
      ];

      staggeredLists.forEach(list => {
        const elements = gsap.utils.toArray(list.items);
        if (elements.length > 0) {
          gsap.from(elements, {
            scrollTrigger: {
              trigger: list.parent,
              start: "top 90%",
            },
            x: list.x || 0,
            y: list.y || 0,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });

      // Transformation Cards
      const transCards = gsap.utils.toArray(".transformation-grid > div");
      if (transCards.length > 0) {
        gsap.fromTo(transCards, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".transformation-grid",
              start: "top 85%",
            }
          }
        );
      }

      const reviews = gsap.utils.toArray(".reviews-grid .review-card");
      if (reviews.length > 0) {
        gsap.set(reviews, { opacity: 0, y: 30 });
        gsap.to(reviews, {
          scrollTrigger: {
            trigger: ".reviews-grid",
            start: "top 92%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out"
        });
      }

      const faqs = gsap.utils.toArray(".faq-item");
      if (faqs.length > 0) {
        gsap.set(faqs, { opacity: 0, y: 30 });
        gsap.to(faqs, {
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 92%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out"
        });
      }

      ScrollTrigger.refresh();

      gsap.from(".method-step", {
        scrollTrigger: {
          trigger: "#como-funciona .grid",
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power4.out"
      });

      gsap.utils.toArray('section h2').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: "top 95%",
          },
          y: "100%",
          duration: 1,
          ease: "power4.out"
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
      
      <div className="fixed top-0 left-0 w-full h-1 bg-brand-accent origin-left scale-x-0 z-[100] scroll-progress opacity-60"></div>

      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="w-full mx-auto px-6 lg:px-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Scale" className="text-brand-accent" size={32} />
            <div>
              <div className="font-serif text-lg md:text-xl font-bold tracking-tight text-brand-dark leading-none">
                Dra. Fabiana Golembiewski
              </div>
              <div className="text-[10px] text-[#8A7B74] font-bold tracking-widest uppercase mt-1.5">
                Especialista em Direito da Saúde
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className={`text-sm font-bold transition-colors uppercase tracking-wide ${scrolled ? 'text-[#5A514D] hover:text-brand-accent' : 'text-white hover:text-white/80'}`}>Início</a>
            <a href="#importancia" className={`text-sm font-bold transition-colors uppercase tracking-wide ${scrolled ? 'text-[#5A514D] hover:text-brand-accent' : 'text-white hover:text-white/80'}`}>A Cirurgia</a>
            <a href="#direitos" className={`text-sm font-bold transition-colors uppercase tracking-wide ${scrolled ? 'text-[#5A514D] hover:text-brand-accent' : 'text-white hover:text-white/80'}`}>Seus Direitos</a>
            <a href="#como-funciona" className={`text-sm font-bold transition-colors uppercase tracking-wide ${scrolled ? 'text-[#5A514D] hover:text-brand-accent' : 'text-white hover:text-white/80'}`}>Como Funciona</a>
            <WhatsAppButton text="Falar com a Dra." size="sm" className="hidden lg:flex" />
          </nav>

          <button className="md:hidden p-2 text-brand-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon name={isMenuOpen ? "X" : "Menu"} size={28} />
          </button>
        </div>

        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-brand-medium/30 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen py-8 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
          <nav className="flex flex-col items-center gap-6 px-6">
            <a href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-brand-dark uppercase tracking-widest">Início</a>
            <a href="#importancia" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-brand-dark uppercase tracking-widest">A Cirurgia</a>
            <a href="#direitos" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-brand-dark uppercase tracking-widest">Seus Direitos</a>
            <a href="#como-funciona" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-brand-dark uppercase tracking-widest">Como Funciona</a>
            <WhatsAppButton text="Falar com a Dra. pelo WhatsApp" fullWidth onClick={() => setIsMenuOpen(false)} />
          </nav>
        </div>
      </header>

      <main>
        {/* SESSÃO 1: HERO */}
        <section className="relative bg-brand-light min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center pt-32 pb-16 px-8 lg:py-16 lg:px-16 order-1 lg:order-1 bg-brand-light hero-content">
            <div className="w-full max-w-xl">
              <div className="overflow-hidden">
                <h1 className="text-5xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-8 text-brand-dark">
                  Negativa de Cirurgia Reparadora? <span className="text-brand-accent underline decoration-brand-accent/30 underline-offset-8">Seu direito garantido.</span>
                </h1>
              </div>
              <p className="text-xl text-[#5A514D] mb-10 leading-relaxed">
                A Dra. Fabiana Golembiewski é especialista em reverter negativas de planos de saúde para <strong>cirurgias reparadoras pós-bariátrica</strong> em todo o Brasil. Recupere sua saúde e dignidade com agilidade jurídica.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 scale-90 sm:scale-100 origin-left">
                <WhatsAppButton text="Quero analisar meu caso gratuitamente" pulse icon />
              </div>
              <div className="flex items-center gap-5 bg-white p-5 border border-brand-medium/50 inline-flex hero-review-box">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-brand-medium overflow-hidden hero-avatar">
                       <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Paciente satisfeito" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 gap-1 mb-1 hero-stars">
                    <Icon name="Star" size={16} fill="currentColor" />
                    <Icon name="Star" size={16} fill="currentColor" />
                    <Icon name="Star" size={16} fill="currentColor" />
                    <Icon name="Star" size={16} fill="currentColor" />
                    <Icon name="Star" size={16} fill="currentColor" />
                  </div>
                  <p className="text-sm font-bold text-[#5A514D]">Mais de 150 avaliações 5 estrelas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-screen order-2 lg:order-2 overflow-hidden hero-image-container parallax-container">
            <img 
              src={heroImage} 
              alt="Advogada Dra. Fabiana Golembiewski" 
              className="absolute -top-[10%] left-0 w-full h-[120%] object-cover object-top parallax-img"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <p className="text-2xl font-serif italic font-medium leading-relaxed max-w-md">"O emagrecimento foi só o começo. O seu espelho precisa refletir a sua vitória por completo."</p>
            </div>
          </div>
        </section>

        {/* SESSÃO 2: TRANSFORMAÇÃO (3 QUADROS) */}
        <section id="importancia" className="py-24 px-6 bg-white border-t border-brand-medium/30 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-4 uppercase tracking-tight">
                O Caminho para a sua <span className="text-brand-accent italic">Nova Vida</span>
              </h2>
              <p className="text-lg text-[#8A7B74] max-w-2xl mx-auto font-medium">
                Sua jornada não é apenas um processo judicial, é a retomada da sua dignidade em três etapas fundamentais.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transformation-grid">
              <div className="bg-brand-light p-10 border border-brand-medium/50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Users" size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-dark mb-4">Ecossistema de Saúde</h3>
                <p className="text-[#5A514D] leading-relaxed">Não é apenas advocacia. É uma rede de apoio com suporte especializado para que você se sinta segura em cada decisão.</p>
              </div>
              <div className="bg-brand-light p-10 border border-brand-medium/50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Activity" size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-dark mb-4">O Início da Mudança</h3>
                <p className="text-[#5A514D] leading-relaxed">A cirurgia bariátrica é o primeiro grande passo. Garantimos que seu plano de saúde cubra o início da sua transformação.</p>
              </div>
              <div className="bg-brand-light p-10 border border-brand-medium/50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Destaque</div>
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Sparkles" size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-dark mb-4">A Cereja do Bolo</h3>
                <p className="text-[#5A514D] leading-relaxed">A retirada do excesso de pele é a devolução da sua vida social, íntima e a cura definitiva para as dores e assaduras.</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <WhatsAppButton text="QUERO INICIAR MINHA TRANSFORMAÇÃO" size="lg" icon pulse />
            </div>
          </div>
        </section>

        {/* SESSÃO 3: A SOLUÇÃO DETALHADA */}
        <section id="direitos" className="bg-brand-light border-t border-brand-medium/30 scroll-mt-24">
          <div className="flex flex-col md:flex-row-reverse items-stretch">
            <div className="w-full md:w-1/2 py-20 px-8 lg:px-20 flex flex-col justify-center">
              <div className="max-w-2xl mr-auto">
                <div className="overflow-hidden">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 leading-tight uppercase">
                    Cirurgias Reparadoras comuns após a Bariátrica
                  </h2>
                </div>
                <p className="text-[#8A7B74] italic mb-6 font-serif text-lg">Com laudo médico, as mais realizadas incluem:</p>
                <div className="space-y-4 mb-8 solution-list">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-none shadow-sm border border-brand-medium/40">
                    <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent font-bold">A</div>
                    <span className="text-brand-dark text-lg"><strong>Abdominoplastia</strong> (retirada da barriga de avental)</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-none shadow-sm border border-brand-medium/40">
                    <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent font-bold">B</div>
                    <span className="text-brand-dark text-lg"><strong>Braquioplastia</strong> (retirada da flacidez nos braços)</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-none shadow-sm border border-brand-medium/40">
                    <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent font-bold">C</div>
                    <span className="text-brand-dark text-lg"><strong>Cruroplastia</strong> (retirada de excesso nas coxas)</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-none shadow-sm border border-brand-medium/40">
                    <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent font-bold">M</div>
                    <span className="text-brand-dark text-lg"><strong>Mamoplastia</strong> (elevação e correção das mamas)</span>
                  </div>
                </div>
                <div className="bg-brand-accent p-6 rounded-none shadow-lg">
                  <p className="font-bold text-white flex items-center gap-3 text-lg">
                    <Icon name="ShieldCheck" className="text-white flex-shrink-0" size={28} />
                    Todas podem ser cobertas pelo plano de saúde.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[500px] overflow-hidden parallax-container">
              <img 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80" 
                alt="Paciente analisando resultados" 
                loading="lazy"
                className="absolute -top-[10%] left-0 w-full h-[120%] object-cover parallax-img" 
              />
            </div>
          </div>
        </section>

        {/* SESSÃO 4: NEGATIVAS */}
        <section className="py-20 px-6 bg-white border-t border-brand-medium/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
                O que o seu plano alegou para negar?
              </h2>
              <p className="text-[#5A514D] text-lg">Mesmo com a guia do seu médico, os convênios usam desculpas padrão para não pagar a cirurgia. <strong>Nenhuma delas está acima da sua saúde.</strong></p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 negativas-grid">
              <div className="bg-red-50/40 border border-red-100 p-8 rounded-2xl flex gap-4 items-start hover:shadow-md transition-shadow group">
                <Icon name="XCircle" className="text-red-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={28} />
                <div>
                  <h3 className="font-bold text-brand-dark text-lg mb-2">"Procedimento Estético"</h3>
                  <p className="text-[#5A514D] leading-relaxed">O STJ já definiu que retirar o excesso de pele para evitar infecções e recuperar a saúde psicológica é tratamento de continuidade, não estética.</p>
                </div>
              </div>
              <div className="bg-red-50/40 border border-red-100 p-8 rounded-2xl flex gap-4 items-start hover:shadow-md transition-shadow group">
                <Icon name="XCircle" className="text-red-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={28} />
                <div>
                  <h3 className="font-bold text-brand-dark text-lg mb-2">"Fora do Rol da ANS"</h3>
                  <p className="text-[#5A514D] leading-relaxed">O rol da ANS é apenas uma lista básica. Se o seu médico atestou a necessidade física, o plano deve cobrir independente dessa lista.</p>
                </div>
              </div>
              <div className="bg-red-50/40 border border-red-100 p-8 rounded-2xl flex gap-4 items-start hover:shadow-md transition-shadow group">
                <Icon name="XCircle" className="text-red-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={28} />
                <div>
                  <h3 className="font-bold text-brand-dark text-lg mb-2">"Falta de Carência"</h3>
                  <p className="text-[#5A514D] leading-relaxed">Em casos de risco iminente de infecções graves ou dores agudas, a carência contratual pode ser quebrada pelo juiz.</p>
                </div>
              </div>
              <div className="bg-red-50/40 border border-red-100 p-8 rounded-2xl flex gap-4 items-start hover:shadow-md transition-shadow group">
                <Icon name="XCircle" className="text-red-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={28} />
                <div>
                  <h3 className="font-bold text-brand-dark text-lg mb-2">"Contrato antigo"</h3>
                  <p className="text-[#5A514D] leading-relaxed">A lei evolui para proteger você. Cláusulas antigas que restringem direitos fundamentais à saúde são consideradas abusivas e nulas.</p>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
               <WhatsAppButton text="Minha cirurgia foi negada. Quero reverter!" icon />
            </div>
          </div>
        </section>

        {/* SESSÃO 5: MÉTODO */}
        <section id="como-funciona" className="py-24 px-6 bg-brand-dark text-white scroll-mt-24">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Como revertermos essa situação?</h2>
            <p className="text-brand-medium text-lg mb-16 max-w-2xl mx-auto">Um método validado, sem burocracia desnecessária e com foco total na velocidade que a sua saúde exige.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-[#4A4542] z-0"></div>
              <MethodStep number="1" title="Contato Direto" desc="Você fala direto comigo pelo WhatsApp, sem passar por robôs ou intermediários confusos." />
              <MethodStep number="2" title="Análise Rápida" desc="Avaliamos sua negativa, pedido médico e laudos de forma totalmente gratuita." />
              <MethodStep number="3" title="Ação Liminar" desc="Entramos com o processo na justiça com um pedido de urgência (Liminar) para o juiz." />
              <MethodStep number="4" title="Cirurgia Liberada" desc="Com a ordem do juiz, o plano é obrigado a custear o hospital, médicos e a sua cirurgia." />
            </div>
            <div className="mt-16 inline-flex items-center gap-3 bg-brand-accent/20 text-brand-medium px-6 py-4 rounded-full font-bold border border-brand-accent/50">
              <Icon name="Clock" size={24} className="text-brand-accent" />
              <span className="text-lg">Nós agimos rápido porque sabemos que a sua dor não espera.</span>
            </div>
          </div>
        </section>

        {/* SESSÃO 6: AUTORIDADE */}
        <section className="py-0 bg-white">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 min-h-[500px] relative overflow-hidden parallax-container">
              <img src={bioImage} alt="Dra. Fabiana" loading="lazy" className="absolute -top-[10%] left-0 w-full h-[120%] object-cover object-top parallax-img" />
            </div>
            <div className="w-full md:w-1/2 p-10 lg:p-20 flex flex-col justify-center">
              <div className="inline-block px-4 py-1.5 bg-brand-light border border-brand-medium rounded-full text-xs font-bold text-brand-accent uppercase tracking-widest mb-6 w-max">
                Compromisso e Experiência em Direito da Saúde
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Dra. Fabiana Golembiewski</h2>
              <div className="space-y-4 text-[#5A514D] text-lg leading-relaxed mb-10">
                <p>"Atrás de toda negativa de plano de saúde existe uma mulher que lutou muito para vencer a obesidade e que agora só quer colocar um biquíni, se olhar no espelho e se amar por completo."</p>
                <p>Sou especialista em Direito da Saúde. Com sede física em <strong>Joinville/SC</strong> e atendimento <strong>100% digital</strong> para todo o Brasil, ajudo pacientes a resgatarem sua dignidade.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 authority-cards">
                <div className="flex items-center gap-4 p-5 bg-brand-light rounded-xl border border-brand-medium/50">
                  <Icon name="MapPin" className="text-brand-accent" size={28} />
                  <div><p className="font-bold text-brand-dark">Sede em Joinville/SC</p><p className="text-sm text-[#5A514D]">Atendimento em todo o Brasil</p></div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-brand-light rounded-xl border border-brand-medium/50">
                  <Icon name="ShieldCheck" className="text-brand-accent" size={28} />
                  <div><p className="font-bold text-brand-dark">Especialista em Saúde</p><p className="text-sm text-[#5A514D]">Foco total em reparadoras</p></div>
                </div>
              </div>
              <WhatsAppButton text="Falar com a Dra. Fabiana" icon />
              </div>
              </div>
              </section>

              {/* SESSÃO 7: PROVA SOCIAL */}
              <section className="py-24 px-6 bg-brand-light">
              <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-brand-dark mb-4">Vozes de quem já venceu</h2>
              <p className="text-center text-[#5A514D] text-lg mb-16">Histórias reais de pacientes que não aceitaram o "Não" do plano.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reviews-grid">
              <ReviewCard name="Juliana S." time="1 mês atrás" text="Estava há 2 anos tentando liberar a reparadora. A Dra. pegou meu caso e em menos de um mês o juiz deu a liminar. Opero semana que vem!" />
              <ReviewCard name="Carla R." time="3 meses atrás" text="O plano negou dizendo que era estética. Eu tinha assaduras e muita vergonha de me relacionar. Achei a Fabiana, que parcelou em 10x e fez um trabalho impecável. Minha autoestima mudaram." />
              <ReviewCard name="Marta V." time="5 meses atrás" text="Profissional humana, explicou tudo mastigadinho. Eu sou de SP e o processo online fluiu super bem. Recomendo muito." />
              </div>
              </div>
              </section>

              {/* SESSÃO 8: FAQ */}
              <section className="py-24 px-6 bg-white border-t border-brand-medium/50">
              <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark text-center mb-12">Dúvidas Frequentes</h2>
              <div className="space-y-4 faq-list">
              <FAQItem question="Atendem SUS ou só Plano de Saúde?" answer="Atuamos EXCLUSIVAMENTE contra Planos de Saúde. Se o seu caso é SUS, recomendamos a Defensoria Pública." />
              <FAQItem question="Quanto tempo demora para o juiz decidir?" answer="Com bons laudos, o juiz costuma analisar a Liminar em questão de dias." />
              <FAQItem question="Como funciona o pagamento dos honorários?" answer="Oferecemos condições facilitadas com parcelamento em até 10x sem juros no cartão de crédito. O financeiro não será a barreira para sua saúde." highlight />
              <FAQItem question="O plano pode cancelar meu contrato?" answer="De forma alguma! É proibido por lei o plano cancelar ou retaliar você por buscar seus direitos." />
              </div>            <div className="mt-16 text-center bg-brand-light p-8 rounded-2xl border border-brand-medium">
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-2">Ainda tem dúvidas?</h3>
              <p className="text-[#5A514D] mb-6">Nossa equipe está pronta para avaliar sua negativa agora mesmo.</p>
              <WhatsAppButton text="Falar com a equipe pelo WhatsApp" outline />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-dark pt-20 pb-10 px-6 text-sm text-[#8A7B74]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Icon name="Scale" className="text-brand-accent" size={28} />
              <div className="font-serif text-xl font-bold text-white">Dra. Fabiana Golembiewski</div>
            </div>
            <p className="mb-4 text-brand-medium text-base leading-relaxed">Referência em Direito da Saúde. Protegendo vidas e sonhos contra as negativas abusivas dos convênios médicos em todo o Brasil.</p>
            <p className="font-bold text-brand-accent text-base">OAB/SC XXXX</p>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-widest mb-6">Contato e Endereço</h4>
            <ul className="space-y-5 text-base">
              <li>
                <a href="#" className="inline-flex items-center gap-3 text-white hover:text-brand-accent transition-colors">
                  <Icon name="Phone" size={20} className="text-brand-accent" /> (47) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={20} className="mt-1 flex-shrink-0 text-brand-accent" />
                <span className="text-brand-medium"><strong>Sede Principal:</strong><br/> Rua Exemplo, 123, Sala 45<br/>Centro, Joinville - SC</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-white uppercase tracking-widest mb-6">Nossas Facilidades</h4>
            <ul className="space-y-5 text-base">
              <li className="flex items-center gap-3">
                <Icon name="Stethoscope" size={20} className="text-brand-accent" />
                <span className="text-brand-medium">Análise gratuita de Laudos Médicos</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="CreditCard" size={20} className="text-brand-accent" />
                <span className="text-brand-medium">Honorários em até 10x sem juros</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Clock" size={20} className="text-brand-accent" />
                <span className="text-brand-medium">Atendimento 100% Online Nacional</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center border-t border-[#4A4542] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Fabiana Golembiewski Advocacia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;