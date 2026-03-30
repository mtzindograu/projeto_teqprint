"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  Printer,
  Monitor,
  Palette,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  Users,
  Building2,
  GraduationCap,
  BookOpen,
  Award,
  Zap,
  Shield,
  Heart,
  Star,
  ArrowRight,
  Calendar,
  TrendingUp,
  Target,
  Headphones,
  FileCheck
} from "lucide-react";

// WhatsApp contact numbers
const whatsappContacts = {
  impressao: "44998426252",
  personalizados: "44997735048",
  informatica: "4435283046",
};

// Generate WhatsApp link
const getWhatsAppLink = (number: string, message?: string) => {
  const msg = message ? encodeURIComponent(message) : "";
  return `https://wa.me/55${number}${msg ? `?text=${msg}` : ""}`;
};

// Navigation items
const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Serviços" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#contato", label: "Contato" },
];

// Services data
const servicesData = [
  {
    id: "impressao",
    title: "Impressão Rápida",
    icon: Printer,
    description: "Serviços de impressão de alta qualidade com agilidade e profissionalismo.",
    items: [
      { name: "Xerox", desc: "Cópias em preto e branco e coloridas" },
      { name: "Impressão Colorida", desc: "Impressões vibrantes em diversos formatos" },
      { name: "Impressão P&B", desc: "Impressões econômicas para documentos" },
      { name: "Encadernação", desc: "Acabamento profissional para trabalhos" },
      { name: "Plastificação", desc: "Proteção durável para documentos" },
    ],
    whatsapp: whatsappContacts.impressao,
    color: "text-blue-600",
    bgColor: "bg-blue-600",
    lightBg: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "informatica",
    title: "Informática",
    icon: Monitor,
    description: "Assistência técnica completa para computadores, impressoras e videogames.",
    items: [
      { name: "Formatação", desc: "Restauração do sistema com backup" },
      { name: "Limpeza e Manutenção", desc: "Limpeza interna e preventiva" },
      { name: "Troca de Peças", desc: "Substituição de componentes" },
      { name: "Conserto de Impressoras", desc: "Reparo em todas as marcas" },
      { name: "Manutenção de Videogames", desc: "Reparo em consoles e acessórios" },
      { name: "Suporte Técnico", desc: "Atendimento e orientação especializada" },
    ],
    whatsapp: whatsappContacts.informatica,
    color: "text-red-600",
    bgColor: "bg-red-600",
    lightBg: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "personalizados",
    title: "Personalizados",
    icon: Palette,
    description: "Crie produtos únicos e especiais com sua marca ou design exclusivo.",
    items: [
      { name: "Canecas Personalizadas", desc: "Canecas com fotos e logotipos" },
      { name: "Adesivos", desc: "Etiquetas em diversos tamanhos" },
      { name: "Convites", desc: "Convites personalizados para eventos" },
      { name: "Produtos Sob Encomenda", desc: "Desenvolvemos o que você precisa" },
    ],
    whatsapp: whatsappContacts.personalizados,
    color: "text-blue-700",
    bgColor: "bg-blue-700",
    lightBg: "bg-blue-50",
    borderColor: "border-blue-200",
  },
];

// Differentials
const differentials = [
  { icon: Zap, title: "Atendimento Rápido", desc: "Resposta ágil e eficiente" },
  { icon: Award, title: "Alta Qualidade", desc: "Padrão de excelência" },
  { icon: Shield, title: "24 Anos", desc: "Experiência consolidada" },
  { icon: FileCheck, title: "Prazos Definidos", desc: "Compromisso com entregas" },
  { icon: Heart, title: "Transparência", desc: "Atendimento claro e honesto" },
  { icon: Users, title: "Variedade de Soluções", desc: "Ampla gama de serviços" },
];

// Target audience
const targetAudience = [
  { icon: Users, label: "Pessoas Físicas" },
  { icon: Building2, label: "Empresas" },
  { icon: GraduationCap, label: "Estudantes" },
  { icon: BookOpen, label: "Professores" },
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-lg shadow-md border-b border-gray-100"
            : "bg-gradient-to-r from-[#0056b3] to-[#e30613]"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 relative transition-transform group-hover:scale-110">
                <Image
                  src="/logo-teqprint .png"
                  alt="Teq Print Informática"
                  fill
                  className="object-contain"
                />
              </div>
              <div className={`hidden sm:block ${isScrolled ? "text-foreground" : "text-white"}`}>
                <span className="font-bold text-lg md:text-xl tracking-tight">Teq Print</span>
                <span className={`block text-xs md:text-sm ${isScrolled ? "text-muted-foreground" : "text-white/90"}`}>Informática</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                item.href.startsWith("/") ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-white/10 ${
                      isScrolled ? "text-foreground hover:text-[#0056b3]" : "text-white hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-white/10 ${
                      isScrolled ? "text-foreground hover:text-[#0056b3]" : "text-white hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de mais informações sobre os serviços da Teq Print.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg shadow-green-600/25">
                  <MessageCircle className="w-4 h-4" />
                  Fale Conosco
                </Button>
              </a>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className={isScrolled ? "" : "text-white hover:bg-white/10"}>
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-8 pt-4">
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/logo-teqprint .png"
                        alt="Teq Print Informática"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-lg text-[#0056b3]">Teq Print</span>
                      <span className="block text-sm text-muted-foreground">Informática</span>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      item.href.startsWith("/") ? (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
                        >
                          {item.label}
                        </a>
                      )
                    ))}
                  </nav>
                  <div className="mt-auto pt-8 pb-8">
                    <a
                      href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de mais informações sobre os serviços da Teq Print.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 h-12">
                        <MessageCircle className="w-5 h-5" />
                        Fale Conosco pelo WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="inicio"
          className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.png"
              alt="Teq Print - Soluções em Tecnologia"
              fill
              className="object-cover"
              priority
            />
            <div className="hero-gradient absolute inset-0" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <Badge variant="secondary" className="mb-6 text-sm md:text-base px-4 py-2 bg-white/10 text-white border-white/20 backdrop-blur-sm animate-fade-in-up">
                <Award className="w-4 h-4 mr-2" />
                24 Anos de Experiência
              </Badge>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                Soluções completas em{" "}
                <span className="text-white">tecnologia</span>,{" "}
                <span className="text-white">impressão</span>{" "}
                e{" "}
                <span className="text-white">personalizados</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up">
                Qualidade, agilidade e confiança há mais de duas décadas em Assis Chateaubriand. 
                Trabalhamos com prazos definidos para garantir qualidade e segurança em cada serviço.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
                <a
                  href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de solicitar um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white gap-2 h-14 px-8 text-lg shadow-lg shadow-green-600/30">
                    <MessageCircle className="w-5 h-5" />
                    Solicite um Orçamento
                  </Button>
                </a>
                <a href="#sobre">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 h-14 px-8 text-lg backdrop-blur-sm">
                    Conheça Nossos Serviços
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto animate-fade-in-up">
                {[
                  { value: "24+", label: "Anos de Mercado" },
                  { value: "3", label: "Áreas de Atuação" },
                  { value: "1000+", label: "Clientes Atendidos" },
                  { value: "100%", label: "Compromisso" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <a href="#sobre" className="text-white/70 hover:text-white transition-colors">
              <ChevronRight className="w-8 h-8 rotate-90" />
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section id="sobre" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 md:mb-16">
                <Badge variant="secondary" className="mb-4 px-4 py-1.5 badge-brand text-[#0056b3]">Nossos Serviços</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  O que oferecemos para{" "}
                  <span className="gradient-text">você</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Serviços especializados com qualidade e profissionalismo que você confia.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {servicesData.map((service) => (
                  <Card key={service.id} className="group card-hover border-2 hover:border-[#0056b3]/50 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {service.items.slice(0, 4).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className={`w-4 h-4 ${service.color} mt-0.5 flex-shrink-0`} />
                            <span className="text-muted-foreground">{item.name}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={getWhatsAppLink(service.whatsapp, `Olá! Gostaria de informações sobre ${service.title}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className={`w-full ${service.bgColor} hover:opacity-90 text-white gap-2`}>
                          <MessageCircle className="w-4 h-4" />
                          Solicitar Orçamento
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Full service details */}
              <div className="mt-16 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-center mb-8">Detalhes dos Serviços</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {servicesData.map((service) => (
                    <div key={service.id} className="space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg ${service.bgColor} flex items-center justify-center`}>
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg">{service.title}</h4>
                      </div>
                      {service.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
                          <ChevronRight className={`w-4 h-4 ${service.color} mt-0.5 flex-shrink-0`} />
                          <div>
                            <span className="font-medium text-sm">{item.name}</span>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ver Catálogo Button */}
              <div className="text-center mt-12">
                <Link href="/catalogo">
                  <Button size="lg" className="bg-gradient-to-r from-[#0056b3] to-[#e30613] hover:opacity-90 text-white gap-2 h-12 px-8">
                    <ChevronRight className="w-5 h-5" />
                    Ver Catálogo Completo
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-3">
                  Confira todos os nossos serviços com preços e detalhes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Differentials Section */}
        <section id="diferenciais" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 md:mb-16">
                <Badge variant="secondary" className="mb-4 px-4 py-1.5 badge-brand text-[#0056b3]">Por Que Nos Escolher</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Nossos{" "}
                  <span className="gradient-text">Diferenciais</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Mais de duas décadas de mercado nos trouxeram experiência e reconhecimento.
                </p>
              </div>

              {/* Differentials Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {differentials.map((diff, i) => (
                  <Card key={i} className="card-hover border-2 hover:border-[#0056b3]/30">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0056b3] to-[#e30613] flex items-center justify-center flex-shrink-0">
                          <diff.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{diff.title}</h4>
                          <p className="text-sm text-muted-foreground">{diff.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="mt-16 grid md:grid-cols-4 gap-6">
                {[
                  { icon: Star, value: "1000+", label: "Clientes Satisfeitos" },
                  { icon: Calendar, value: "24", label: "Anos de Experiência" },
                  { icon: Target, value: "100%", label: "Satisfação Garantida" },
                  { icon: TrendingUp, value: "3", label: "Áreas de Atuação" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <item.icon className="w-8 h-8 text-[#0056b3] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-[#0056b3] mb-1">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Target Audience */}
              <div className="mt-16 text-center">
                <h3 className="text-xl font-semibold mb-6">Público que Atendemos</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {targetAudience.map((audience, i) => (
                    <Badge key={i} variant="secondary" className="py-3 px-5 text-sm gap-2">
                      <audience.icon className="w-4 h-4 text-[#0056b3]" />
                      {audience.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-[#0056b3] to-[#e30613] text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Headphones className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Precisa de Nossa Ajuda?
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/95 mb-8 max-w-2xl mx-auto font-medium">
                Nossa equipe está pronta para atender você. Entre em contato agora mesmo
                e solicite um orçamento sem compromisso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de solicitar um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-[#0056b3] hover:bg-gray-100 h-14 px-8 text-lg font-semibold shadow-lg shadow-black/20">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Atendimento via WhatsApp
                  </Button>
                </a>
                <a href="tel:+554435283046">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white/20 h-14 px-8 text-lg font-semibold backdrop-blur-sm">
                    <Phone className="w-5 h-5 mr-2" />
                    Ligar Agora
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 md:mb-16">
                <Badge variant="secondary" className="mb-4 px-4 py-1.5 badge-brand text-[#0056b3]">Contato</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Fale{" "}
                  <span className="gradient-text">Conosco</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Estamos à disposição para atendê-lo. Escolha o canal de comunicação
                  mais conveniente para você.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  {/* WhatsApp Cards */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Impressão */}
                    <Card className="card-hover border-blue-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Printer className="w-5 h-5 text-[#0056b3]" />
                          </div>
                          <div>
                            <CardTitle className="text-base">Impressão Rápida</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">Xerox, impressões, encadernação e plastificação</p>
                        <a
                          href={getWhatsAppLink(whatsappContacts.impressao, "Olá! Gostaria de informações sobre serviços de impressão.")}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="w-full text-[#0056b3] border-[#0056b3] hover:bg-blue-50">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            (44) 99842-6252
                          </Button>
                        </a>
                      </CardContent>
                    </Card>

                    {/* Personalizados */}
                    <Card className="card-hover border-red-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <Palette className="w-5 h-5 text-[#e30613]" />
                          </div>
                          <div>
                            <CardTitle className="text-base">Personalizados</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">Canecas, adesivos, convites e mais</p>
                        <a
                          href={getWhatsAppLink(whatsappContacts.personalizados, "Olá! Gostaria de informações sobre produtos personalizados.")}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="w-full text-[#e30613] border-[#e30613] hover:bg-red-50">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            (44) 99773-5048
                          </Button>
                        </a>
                      </CardContent>
                    </Card>

                    {/* Informática */}
                    <Card className="sm:col-span-2 card-hover border-blue-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Monitor className="w-5 h-5 text-[#0056b3]" />
                          </div>
                          <div>
                            <CardTitle className="text-base">Informática e Assistência Técnica</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">Manutenção, formatação, consertos e suporte técnico</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de informações sobre serviços de informática.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button variant="outline" className="w-full text-[#0056b3] border-[#0056b3] hover:bg-blue-50">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              WhatsApp
                            </Button>
                          </a>
                          <a href="tel:+554435283046" className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Phone className="w-4 h-4 mr-2" />
                              (44) 3528-3046
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Other Contact Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <Card className="card-hover">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#0056b3]" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">E-mail</p>
                          <a href="mailto:teqprintinfo@hotmail.com" className="font-medium hover:text-[#0056b3]">
                            teqprintinfo@hotmail.com
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Hours */}
                    <Card className="card-hover">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-[#0056b3]" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Horário</p>
                          <p className="font-medium">Seg-Sex: 8h-18h | Sáb: 8h-12h</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Address */}
                  <Card className="card-hover">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#0056b3]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Endereço</p>
                        <p className="font-medium">Avenida Tupassi, 2866</p>
                        <p className="text-muted-foreground">Assis Chateaubriand - PR</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Map */}
                <div className="h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.1!2d-53.4256!3d-24.4169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f0a1c415c6b2e5%3A0x0!2sAv.%20Tupassi%2C%202866%20-%20Assis%20Chateaubriand%2C%20PR!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Teq Print Informática"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a1a2e] to-[#0056b3] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 relative">
                    <Image
                      src="/logo-teqprint .png"
                      alt="Teq Print Informática"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-lg">Teq Print</span>
                    <span className="block text-xs text-white/70">Informática</span>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4">
                  Referência em informática, especialista em impressos e expert em assistência técnica
                  há mais de 24 anos em Assis Chateaubriand.
                </p>
                <div className="flex gap-3">
                  <a
                    href={getWhatsAppLink(whatsappContacts.informatica)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold mb-4">Serviços</h4>
                <ul className="space-y-2">
                  <li><a href="#sobre" className="text-sm hover:text-white/80 transition-colors text-white/70">Impressão Rápida</a></li>
                  <li><a href="#sobre" className="text-sm hover:text-white/80 transition-colors text-white/70">Personalizados</a></li>
                  <li><a href="#sobre" className="text-sm hover:text-white/80 transition-colors text-white/70">Assistência Técnica</a></li>
                  <li><a href="#sobre" className="text-sm hover:text-white/80 transition-colors text-white/70">Manutenção de Computadores</a></li>
                  <li><a href="#sobre" className="text-sm hover:text-white/80 transition-colors text-white/70">Conserto de Impressoras</a></li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Links Rápidos</h4>
                <ul className="space-y-2">
                  <li><a href="#inicio" className="text-sm hover:text-white/80 transition-colors text-white/70">Início</a></li>
                  <li><a href="#sobre" className="text-sm hover:text-white/80 transition-colors text-white/70">Serviços</a></li>
                  <li><a href="#diferenciais" className="text-sm hover:text-white/80 transition-colors text-white/70">Diferenciais</a></li>
                  <li><a href="#contato" className="text-sm hover:text-white/80 transition-colors text-white/70">Contato</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold mb-4">Contato</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <Phone className="w-4 h-4 text-[#0056b3]" />
                    (44) 3528-3046
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    (44) 99842-6252
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <Mail className="w-4 h-4 text-[#0056b3]" />
                    teqprintinfo@hotmail.com
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/70">
                    <MapPin className="w-4 h-4 text-[#0056b3] mt-0.5" />
                    Av. Tupassi, 2866<br />Assis Chateaubriand - PR
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="bg-white/10 mb-8" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
              <p>© {new Date().getFullYear()} Teq Print Informática. Todos os direitos reservados.</p>
              <p>24 anos de qualidade e confiança em Assis Chateaubriand - PR</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp 
        phoneNumber={whatsappContacts.informatica} 
        message="Olá, vim pelo site e gostaria de um orçamento."
      />
    </div>
  );
}
