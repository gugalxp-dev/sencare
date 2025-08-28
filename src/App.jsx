import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Heart, Shield, Clock, Users, Phone, Mail, MapPin, Star, CheckCircle, ArrowRight, Sparkles, Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from './assets/logo.png'
import './App.css'

// Registrar plugins do GSAP
gsap.registerPlugin(ScrollTrigger)

// Componente da logo do WhatsApp
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
)

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    // Animações de entrada
    const tl = gsap.timeline()
    
    // Animação do hero
    tl.from('.hero-title', {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-description', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-buttons', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-stats', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.2')

    // Animações com scroll
    gsap.utils.toArray('.gsap-fade-up').forEach((element) => {
      gsap.fromTo(element, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    gsap.utils.toArray('.gsap-scale').forEach((element) => {
      gsap.fromTo(element,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Animação de partículas flutuantes
    const createParticles = () => {
      const particles = document.querySelector('.particles')
      if (particles) {
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div')
          particle.className = 'particle'
          particle.style.left = Math.random() * 100 + '%'
          particle.style.top = Math.random() * 100 + '%'
          particle.style.width = Math.random() * 4 + 2 + 'px'
          particle.style.height = particle.style.width
          particle.style.animationDelay = Math.random() * 6 + 's'
          particles.appendChild(particle)
        }
      }
    }

    createParticles()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const form = e.target
    const formData = new FormData(form)
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: ''
        })
      } else {
        throw new Error('Erro ao enviar mensagem')
      }
    } catch (error) {
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      })
    }
  }

  const services = [
    {
      icon: <Heart className="w-8 h-8" color='#000'/>,
      title: "Acompanhamento Domiciliar",
      description: "Cuidados domiciliares personalizados com profissionais qualificados",
      features: ["Atendimento 24h", "Profissionais certificados", "Planos personalizados"]
    },
    {
      icon: <Users className="w-8 h-8" color='#000' />,
      title: "Cuidado de Idosos",
      description: "Assistência especializada para terceira idade com carinho e dedicação",
      features: ["Cuidados especializados", "Acompanhamento médico", "Atividades terapêuticas"]
    },
    {
      icon: <Shield className="w-8 h-8" color='#000' />,
      title: "Cuidado Infantil",
      description: "Cuidados especializados para crianças com segurança e atenção",
      features: ["Pediatria especializada", "Ambiente seguro", "Desenvolvimento infantil"]
    },
    {
      icon: <Clock className="w-8 h-8" color='#000' />,
      title: "Acompanhante Hospitalar",
      description: "Suporte durante internações com presença constante e cuidadosa",
      features: ["Presença 24h", "Suporte emocional", "Comunicação com família"]
    },
    {
      icon: <Heart className="w-8 h-8" color='#000' />,
      title: "Curativos e Procedimentos",
      description: "Cuidados médicos especializados realizados por profissionais habilitados",
      features: ["Procedimentos seguros", "Equipamentos modernos", "Técnicas avançadas"]
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Excelente atendimento! Os profissionais da SENCARE cuidaram da minha mãe com muito carinho e dedicação.",
      rating: 5,
      role: "Filha de paciente"
    },
    {
      name: "João Santos",
      text: "Recomendo muito! Serviço de qualidade, pontualidade e profissionalismo exemplares.",
      rating: 5,
      role: "Cliente há 2 anos"
    },
    {
      name: "Ana Costa",
      text: "Equipe muito preparada e atenciosa. Meu pai se sente seguro e bem cuidado.",
      rating: 5,
      role: "Familiar de paciente"
    }
  ]

  const stats = [
    { number: "500+", label: "Famílias Atendidas" },
    // { number: "24 horas por dia, 7 dias por semana/7", label: "Atendimento" },
    { number: "15+", label: "Anos de Experiência" },
    { number: "98%", label: "Satisfação" }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md shadow-2xl z-50 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="SENCARE Home Care" className="h-12 w-auto" />
            <div>
              <h1 className="text-xl font-bold gradient-text">SENCARE</h1>
              <p className="text-xs text-muted-foreground">Home Care</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-all duration-300 font-medium">Início</a>
            <a href="#servicos" className="text-foreground hover:text-primary transition-all duration-300 font-medium">Serviços</a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-all duration-300 font-medium">Sobre</a>
            <a href="#contato" className="text-foreground hover:text-primary transition-all duration-300 font-medium">Contato</a>
          </nav>
          
          {/* WhatsApp Button */}
          <Button 
            onClick={() => window.open('https://wa.me/5513988833950', '_blank')}
            className="hidden md:flex bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 modern-button"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-primary/20">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#inicio" className="text-foreground hover:text-primary transition-all duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Início</a>
              <a href="#servicos" className="text-foreground hover:text-primary transition-all duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Serviços</a>
              <a href="#sobre" className="text-foreground hover:text-primary transition-all duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a href="#contato" className="text-foreground hover:text-primary transition-all duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Contato</a>
              <Button 
                onClick={() => {
                  window.open('https://wa.me/5513988833950', '_blank')
                  setIsMenuOpen(false)
                }}
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="particles absolute inset-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center px-6 py-3 gradient-gold rounded-full border border-primary/30 backdrop-blur-sm text-black font-semibold">
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Cuidado Premium</span>
              </div>
            </div>
            
            <h1 className="hero-title text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="gradient-text">Cuidado</span>
              <br />
              <span className="text-white">Profissional e</span>
              <br />
              <span className="gradient-text">Humanizado</span>
            </h1>
            
            <h2 className="hero-subtitle text-3xl md:text-5xl font-semibold mb-8 text-primary">
              para Toda Família
            </h2>
            
            <p className="hero-description text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed text-muted-foreground">
              Oferecemos serviços de <span className="text-primary font-semibold">acompanhamento domiciliar</span>, 
              <span className="text-primary font-semibold"> acompanhamento hospitalar</span> e 
              <span className="text-primary font-semibold"> cuidados especializados</span> com carinho e dedicação
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="gradient-gold text-black font-bold text-lg px-12 py-6 rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 modern-button"
                onClick={() => document.getElementById('contato').scrollIntoView({ behavior: 'smooth' })}
              >
                Solicite um Orçamento
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-black font-bold text-lg px-12 py-6 rounded-full transition-all duration-300 transform hover:scale-105 modern-button"
                onClick={() => document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' })}
              >
                Conheça Nossos Serviços
              </Button>
            </div>

            {/* Stats Section */}
            <div className="hero-stats grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-card/20 backdrop-blur-sm rounded-2xl border border-primary/20 modern-card">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" ref={servicesRef} className="py-24 bg-gradient-to-b from-black to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 gsap-fade-up">
            <div className="inline-flex items-center px-6 py-3 gradient-gold rounded-full border border-primary/30 backdrop-blur-sm mb-8 text-black font-semibold">
              <Heart className="w-5 h-5 mr-2" />
              <span>Nossos Serviços</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">Cuidados</span>
              <br />
              <span className="text-white">Especializados</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Oferecemos uma ampla gama de serviços de cuidados profissionais para atender às necessidades de toda a família
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="gsap-scale bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group modern-card">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-6 relative">
                    <div className="p-6 gradient-gold rounded-full group-hover:scale-110 transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-center text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-3 pt-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" ref={aboutRef} className="py-24 bg-gradient-to-b from-secondary/20 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="gsap-fade-up">
              <div className="inline-flex items-center px-6 py-3 gradient-gold rounded-full border border-primary/30 backdrop-blur-sm mb-8 text-black font-semibold">
                <Shield className="w-5 h-5 mr-2" />
                <span>Por que nos escolher</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="gradient-text">Excelência</span>
                <br />
                <span className="text-white">em Cuidados</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group gsap-fade-up">
                  <div className="p-4 gradient-gold rounded-full group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <Shield className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      Profissionais Qualificados
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Equipe certificada e experiente em cuidados de saúde, com formação continuada e especialização em diferentes áreas
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group gsap-fade-up">
                  <div className="p-4 gradient-gold rounded-full group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      Atendimento 24 Horas
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Disponibilidade total para quando você mais precisar, com plantão 24 horas e resposta rápida em emergências
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group gsap-fade-up">
                  <div className="p-4 gradient-gold rounded-full group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <Heart className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      Cuidado Humanizado
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Tratamento com carinho, respeito e dignidade, priorizando o bem-estar emocional e físico de cada paciente
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gsap-scale">
              <div className="relative">
                <div className="absolute inset-0 gradient-gold rounded-3xl blur-xl opacity-20"></div>
                <div className="relative bg-card/30 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 modern-card">
                  <h3 className="text-3xl font-bold mb-6 gradient-text">Depoimentos</h3>
                  <div className="space-y-6">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="p-6 bg-background/50 rounded-2xl border border-primary/10">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-primary fill-current" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" ref={contactRef} className="py-24 bg-gradient-to-b from-black to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 gsap-fade-up">
            <div className="inline-flex items-center px-6 py-3 gradient-gold rounded-full border border-primary/30 backdrop-blur-sm mb-8 text-black font-semibold">
              <Mail className="w-5 h-5 mr-2" />
              <span>Entre em Contato</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">Solicite seu</span>
              <br />
              <span className="text-white">Orçamento</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Solicite um orçamento personalizado para suas necessidades
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="gsap-fade-up">
              <Card className="bg-card/30 backdrop-blur-sm border-primary/20 modern-card">
                <CardHeader>
                  <CardTitle className="text-3xl gradient-text">Solicite um Orçamento</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Preencha o formulário e entraremos em contato em breve
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form 
                    onSubmit={handleSubmit} 
                    action="https://formsubmit.co/sencare.homecare@gmail.com" 
                    method="POST"
                    className="space-y-6"
                  >
                    {/* Configurações do Formsubmit */}
                    <input type="hidden" name="_subject" value="Nova solicitação de orçamento - SENCARE" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    
                    <div>
                      <Input
                        name="name"
                        placeholder="Nome completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-primary/20 focus:border-primary text-lg py-4 rounded-xl"
                      />
                    </div>
                    <div>
                      <Input
                        name="phone"
                        placeholder="Telefone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-primary/20 focus:border-primary text-lg py-4 rounded-xl"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-primary/20 focus:border-primary text-lg py-4 rounded-xl"
                      />
                    </div>
                    <div>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={(e) => handleSelectChange(e.target.value)}
                        required
                        className="w-full bg-input border border-primary/20 focus:border-primary text-lg py-4 px-4 rounded-xl text-foreground"
                      >
                        <option value="">Selecione o serviço desejado</option>
                        <option value="Acompanhamento Domiciliar">Acompanhamento domiciliar</option>
                        <option value="Cuidado de Idosos">Cuidado de Idosos</option>
                        <option value="Cuidado Infantil">Cuidado Infantil</option>
                        <option value="Acompanhante Hospitalar">Acompanhante Hospitalar</option>
                        <option value="Curativos e Procedimentos">Curativos e Procedimentos</option>
                        <option value="Reabilitação">Reabilitação</option>
                        <option value="Outros Serviços">Outros</option>
                      </select>
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Descreva suas necessidades..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        className="bg-input border-primary/20 focus:border-primary text-lg rounded-xl"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full gradient-gold text-black font-bold text-lg py-6 rounded-xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 modern-button" 
                      size="lg"
                    >
                      Enviar Solicitação
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="gsap-fade-up space-y-8">
              <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 modern-card">
                <h3 className="text-2xl font-bold mb-6 gradient-text">Informações de Contato</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 gradient-gold rounded-full">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Telefone</p>
                      <p className="text-muted-foreground">(13) 98883-3950</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 gradient-gold rounded-full">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">E-mail</p>
                      <p className="text-muted-foreground">sencare.homecare@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 gradient-gold rounded-full">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Localização</p>
                      <p className="text-muted-foreground">Baixada Santista e região</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-green-600/20 backdrop-blur-sm border border-green-500/20 rounded-3xl p-8 text-center modern-card">
                <WhatsAppIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-foreground">Fale Conosco no WhatsApp</h3>
                <p className="text-muted-foreground mb-6">
                  Entre em contato direto conosco pelo WhatsApp para um atendimento mais rápido
                </p>
                <Button 
                  onClick={() => window.open('https://wa.me/5513988833950', '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 modern-button"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  Abrir WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-black to-secondary/20 text-white py-16 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="gsap-fade-up">
              <div className="flex items-center space-x-3 mb-6">
                <img src={logo} alt="SENCARE Home Care" className="h-16 w-auto" />
                <div>
                  <h1 className="text-2xl font-bold gradient-text">SENCARE</h1>
                  <p className="text-sm text-muted-foreground">Home Care</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Cuidado profissional e humanizado para toda família. 
                Sua saúde e bem-estar são nossa prioridade.
              </p>
            </div>
            
            <div className="gsap-fade-up">
              <h3 className="text-xl font-bold mb-6 gradient-text">Serviços</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Acompanhamento domiciliar</li>
                <li>• Cuidado de Idosos</li>
                <li>• Cuidado Infantil</li>
                <li>• Acompanhante Hospitalar</li>
                <li>• Curativos e Procedimentos</li>
                <li>• Reabilitação</li>
              </ul>
            </div>
            
            <div className="gsap-fade-up">
              <h3 className="text-xl font-bold mb-6 gradient-text">Contato</h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  (13) 98883-3950
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  sencare.homecare@gmail.com
                </p>
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  Baixada Santista e região
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary/20 mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 SENCARE. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => window.open('https://wa.me/5513988833950', '_blank')}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110 modern-button"
          size="lg"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}

export default App
