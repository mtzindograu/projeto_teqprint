"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Wrench,
  HardDrive,
  Gamepad2,
  ShoppingCart,
  FileText,
  Image,
  Award,
  Zap,
  Shield,
  Heart,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

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
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#produtos", label: "Produtos" },
  { href: "#contato", label: "Contato" },
];

// Services data
const servicesData = {
  impressao: {
    title: "Impressão Rápida",
    icon: Printer,
    description: "Serviços de impressão de alta qualidade com agilidade e profissionalismo. Ideal para estudantes, profissionais e empresas que necessitam de materiais impressos com excelência.",
    items: [
      { name: "Xerox", desc: "Cópias em preto e branco e coloridas com qualidade profissional" },
      { name: "Impressão Colorida", desc: "Impressões vibrantes em diversos formatos de papel" },
      { name: "Impressão P&B", desc: "Impressões econômicas para documentos de texto" },
      { name: "Encadernação", desc: "Acabamento profissional para trabalhos e documentos" },
      { name: "Plastificação", desc: "Proteção durável para documentos importantes" },
    ],
    image: "/impressao-icon.png",
    whatsapp: whatsappContacts.impressao,
  },
  personalizados: {
    title: "Personalizados",
    icon: Palette,
    description: "Crie produtos únicos e especiais com sua marca ou design exclusivo. Perfeito para presentes corporativos, lembranças e materiais promocionais.",
    items: [
      { name: "Canecas Personalizadas", desc: "Canecas com fotos, logotipos e mensagens especiais" },
      { name: "Adesivos", desc: "Etiquetas e adesivos em diversos tamanhos e formatos" },
      { name: "Convites", desc: "Convites personalizados para festas e eventos" },
      { name: "Produtos Sob Encomenda", desc: "Desenvolvemos o produto que você precisa" },
    ],
    image: "/personalizados-img.png",
    whatsapp: whatsappContacts.personalizados,
  },
  informatica: {
    title: "Informática",
    icon: Monitor,
    description: "Assistência técnica completa para computadores, impressoras e videogames. Nossa equipe especializada está preparada para resolver qualquer problema tecnológico.",
    items: [
      { name: "Formatação de Computadores", desc: "Restauração do sistema com backup e instalação de programas" },
      { name: "Limpeza e Manutenção", desc: "Limpeza interna e preventiva para maior durabilidade" },
      { name: "Troca de Peças", desc: "Substituição de componentes com garantia de qualidade" },
      { name: "Venda de Peças", desc: "Componentes e acessórios para seu computador" },
      { name: "Conserto de Impressoras", desc: "Reparo em impressoras de todas as marcas" },
      { name: "Manutenção de Videogames", desc: "Reparo em consoles e acessórios de games" },
      { name: "Suporte Técnico Completo", desc: "Atendimento e orientação técnica especializada" },
    ],
    image: "/informatica-img.png",
    whatsapp: whatsappContacts.informatica,
  },
};

// Products data
const productsData = [
  {
    category: "Impressoras",
    icon: Printer,
    items: ["Impressoras jato de tinta", "Impressoras a laser", "Impressoras multifuncionais", "Impressoras térmicas"],
  },
  {
    category: "Cartuchos e Toners",
    icon: FileText,
    items: ["Cartuchos originais", "Cartuchos compatíveis", "Toners coloridos", "Toners P&B"],
  },
  {
    category: "Acessórios de Informática",
    icon: HardDrive,
    items: ["Teclados e mouses", "Memórias RAM", "HDs e SSDs", "Cabos e adaptadores"],
  },
];

// Differentials
const differentials = [
  { icon: Zap, title: "Atendimento Rápido", desc: "Resposta ágil e eficiente para suas necessidades" },
  { icon: Award, title: "Alta Qualidade", desc: "Serviços com padrão de excelência reconhecido" },
  { icon: Shield, title: "24 Anos de Experiência", desc: "Mais de duas décadas de mercado consolidado" },
  { icon: CheckCircle2, title: "Cumprimento de Prazos", desc: "Organização e compromisso com entregas" },
  { icon: Heart, title: "Transparência", desc: "Atendimento claro com definição de prazos honestos" },
  { icon: Users, title: "Variedade de Soluções", desc: "Ampla gama de serviços em um só lugar" },
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
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <Image
                  src="/logo-teqprint.png"
                  alt="Teq Print Informática"
                  fill
                  className="object-contain"
                />
              </div>
              <div className={`hidden sm:block ${isScrolled ? "text-primary" : "text-white"}`}>
                <span className="font-bold text-lg md:text-xl">Teq Print</span>
                <span className="block text-xs md:text-sm opacity-80">Informática</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isScrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de mais informações sobre os serviços da Teq Print.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Fale Conosco
                </Button>
              </a>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className={isScrolled ? "" : "text-white"}>
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/logo-teqprint.png"
                        alt="Teq Print Informática"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-lg text-primary">Teq Print</span>
                      <span className="block text-sm text-muted-foreground">Informática</span>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium py-2 border-b border-border hover:text-primary transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                  <div className="mt-auto pt-8">
                    <a
                      href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de mais informações sobre os serviços da Teq Print.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                        <MessageCircle className="w-4 h-4" />
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
              <Badge variant="secondary" className="mb-6 text-sm md:text-base px-4 py-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2" />
                24 Anos de Experiência
              </Badge>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Referência em informática,{" "}
                <span className="text-blue-400">especialista em impressos</span>{" "}
                e expert em assistência técnica
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Soluções completas em tecnologia, impressão e personalizados para você e sua empresa.
                Qualidade, agilidade e confiança há mais de duas décadas em Assis Chateaubriand.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a
                  href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de solicitar um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white gap-2 h-12 px-8">
                    <MessageCircle className="w-5 h-5" />
                    Solicite um Orçamento
                  </Button>
                </a>
                <a href="#servicos">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 h-12 px-8">
                    Conheça Nossos Serviços
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
                {[
                  { value: "24+", label: "Anos de Mercado" },
                  { value: "3", label: "Áreas de Atuação" },
                  { value: "1000+", label: "Clientes Atendidos" },
                  { value: "100%", label: "Compromisso" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <a href="#sobre" className="text-white/70 hover:text-white">
              <ChevronRight className="w-8 h-8 rotate-90" />
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 md:mb-16">
                <Badge variant="secondary" className="mb-4">Quem Somos</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  24 Anos de Confiança e Qualidade
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Conheça a história da Teq Print Informática, uma empresa familiar que se tornou
                  referência em tecnologia na região.
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
                {/* Text Content */}
                <div className="space-y-6">
                  <p className="text-lg text-foreground leading-relaxed">
                    A <strong className="text-primary">Teq Print Informática</strong> nasceu há mais de 
                    <strong className="text-primary"> 24 anos</strong> com uma missão clara: oferecer 
                    soluções completas em tecnologia para a comunidade de Assis Chateaubriand e região. 
                    Como uma <strong>empresa familiar</strong>, construímos nossa reputação sobre bases 
                    sólidas de confiança, qualidade e proximidade com nossos clientes.
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    Ao longo de mais de duas décadas, nos tornamos um ponto de referência na cidade, 
                    atendendo pessoas físicas, empresas, estudantes e professores com a mesma dedicação 
                    e excelência. Nossa trajetória é marcada pelo compromisso inabalável com a qualidade 
                    dos serviços e o respeito aos prazos acordados com cada cliente.
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    Nossa equipe é formada por profissionais experientes e atualizados, preparados para 
                    resolver desde os problemas mais simples até os mais complexos em informática, além 
                    de oferecer serviços de impressão de alta qualidade e produtos personalizados que 
                    atendem às mais diversas necessidades.
                  </p>

                  {/* Values */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { icon: Shield, label: "Confiança" },
                      { icon: Award, label: "Qualidade" },
                      { icon: Zap, label: "Agilidade" },
                      { icon: CheckCircle2, label: "Compromisso" },
                    ].map((value, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                        <value.icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{value.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Side */}
                <div className="relative">
                  <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/informatica-img.png"
                      alt="Teq Print Informática - Equipe e Serviços"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Floating Card */}
                  <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl max-w-xs">
                    <div className="text-4xl font-bold mb-1">24+</div>
                    <div className="text-sm opacity-90">Anos de experiência e dedicação</div>
                  </div>
                </div>
              </div>

              {/* Differentials */}
              <div className="bg-background rounded-2xl p-6 md:p-8 border">
                <h3 className="text-2xl font-bold text-center mb-8">Nossos Diferenciais</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {differentials.map((diff, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <diff.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{diff.title}</h4>
                        <p className="text-sm text-muted-foreground">{diff.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold mb-6">Público que Atendemos</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {targetAudience.map((audience, i) => (
                    <Badge key={i} variant="secondary" className="py-2 px-4 text-sm">
                      <audience.icon className="w-4 h-4 mr-2" />
                      {audience.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 md:mb-16">
                <Badge variant="secondary" className="mb-4">Nossos Serviços</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Soluções Completas Para Você
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Oferecemos uma ampla variedade de serviços para atender todas as suas necessidades
                  em tecnologia, impressão e personalização.
                </p>
              </div>

              {/* Services Tabs */}
              <Tabs defaultValue="impressao" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
                  <TabsTrigger value="impressao" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Printer className="w-4 h-4 mr-2 hidden sm:inline" />
                    Impressão
                  </TabsTrigger>
                  <TabsTrigger value="personalizados" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Palette className="w-4 h-4 mr-2 hidden sm:inline" />
                    Personalizados
                  </TabsTrigger>
                  <TabsTrigger value="informatica" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Monitor className="w-4 h-4 mr-2 hidden sm:inline" />
                    Informática
                  </TabsTrigger>
                </TabsList>

                {Object.entries(servicesData).map(([key, service]) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Image */}
                      <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden order-2 lg:order-1">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="order-1 lg:order-2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <service.icon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">{service.description}</p>

                        {/* Service Items */}
                        <div className="space-y-3 mb-8">
                          {service.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <a
                          href={getWhatsAppLink(service.whatsapp, `Olá! Gostaria de informações sobre ${service.title}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Solicitar Orçamento
                          </Button>
                        </a>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Quick Service Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                {Object.entries(servicesData).map(([key, service]) => (
                  <Card key={key} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.items.length} serviços disponíveis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {service.items.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            {item.name}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={getWhatsAppLink(service.whatsapp, `Olá! Gostaria de informações sobre ${service.title}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Fale Conosco
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 md:mb-16">
                <Badge variant="secondary" className="mb-4">Produtos</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Equipamentos e Acessórios
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Trabalhamos com uma linha completa de produtos para suprir todas as suas
                  necessidades em informática e impressão.
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/produtos-img.png"
                    alt="Produtos Teq Print"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Categories */}
                <div className="space-y-6">
                  {productsData.map((category, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <category.icon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{category.category}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          {category.items.map((item, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm">
                              <ChevronRight className="w-4 h-4 text-primary" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* CTA */}
                  <a
                    href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de informações sobre os produtos disponíveis.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Consultar Disponibilidade e Preços
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Precisa de Nossa Ajuda?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Nossa equipe está pronta para atender você. Entre em contato agora mesmo
                e solicite um orçamento sem compromisso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de solicitar um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Atendimento via WhatsApp
                  </Button>
                </a>
                <a href="tel:+554435283046">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8">
                    <Phone className="w-5 h-5 mr-2" />
                    Ligar Agora
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 md:mb-16">
                <Badge variant="secondary" className="mb-4">Contato</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Fale Conosco
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
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Printer className="w-5 h-5 text-green-600" />
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
                          <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-50">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            (44) 99842-6252
                          </Button>
                        </a>
                      </CardContent>
                    </Card>

                    {/* Personalizados */}
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Palette className="w-5 h-5 text-purple-600" />
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
                          <Button variant="outline" className="w-full text-purple-600 border-purple-600 hover:bg-purple-50">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            (44) 99773-5048
                          </Button>
                        </a>
                      </CardContent>
                    </Card>

                    {/* Informática */}
                    <Card className="sm:col-span-2 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Monitor className="w-5 h-5 text-blue-600" />
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
                            <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
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
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">E-mail</p>
                        <a href="mailto:teqprintinfo@hotmail.com" className="font-medium hover:text-primary">
                          teqprintinfo@hotmail.com
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Horário</p>
                        <p className="font-medium">Seg-Sex: 8h-18h | Sáb: 8h-12h</p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p className="font-medium">Avenida Tupassi, 2866</p>
                      <p className="text-muted-foreground">Assis Chateaubriand - PR</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
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
      <footer className="bg-zinc-900 text-zinc-300 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 relative">
                    <Image
                      src="/logo-teqprint.png"
                      alt="Teq Print Informática"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-lg text-white">Teq Print</span>
                    <span className="block text-xs text-zinc-400">Informática</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-4">
                  Referência em informática, especialista em impressos e expert em assistência técnica
                  há mais de 24 anos em Assis Chateaubriand.
                </p>
                <div className="flex gap-3">
                  <a
                    href={getWhatsAppLink(whatsappContacts.informatica)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold text-white mb-4">Serviços</h4>
                <ul className="space-y-2">
                  <li><a href="#servicos" className="text-sm hover:text-white transition-colors">Impressão Rápida</a></li>
                  <li><a href="#servicos" className="text-sm hover:text-white transition-colors">Personalizados</a></li>
                  <li><a href="#servicos" className="text-sm hover:text-white transition-colors">Assistência Técnica</a></li>
                  <li><a href="#servicos" className="text-sm hover:text-white transition-colors">Manutenção de Computadores</a></li>
                  <li><a href="#servicos" className="text-sm hover:text-white transition-colors">Conserto de Impressoras</a></li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
                <ul className="space-y-2">
                  <li><a href="#inicio" className="text-sm hover:text-white transition-colors">Início</a></li>
                  <li><a href="#sobre" className="text-sm hover:text-white transition-colors">Sobre Nós</a></li>
                  <li><a href="#servicos" className="text-sm hover:text-white transition-colors">Serviços</a></li>
                  <li><a href="#produtos" className="text-sm hover:text-white transition-colors">Produtos</a></li>
                  <li><a href="#contato" className="text-sm hover:text-white transition-colors">Contato</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-white mb-4">Contato</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    (44) 3528-3046
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    (44) 99842-6252
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    teqprintinfo@hotmail.com
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    Av. Tupassi, 2866<br />Assis Chateaubriand - PR
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="bg-zinc-800 mb-8" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
              <p>© {new Date().getFullYear()} Teq Print Informática. Todos os direitos reservados.</p>
              <p>24 anos de qualidade e confiança em Assis Chateaubriand - PR</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Visitei o site da Teq Print e gostaria de mais informações.")}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-pulse flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </a>
      </div>
    </div>
  );
}
