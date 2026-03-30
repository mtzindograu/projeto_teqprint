"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { supabase, type Service } from "@/lib/supabase";
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
  Award,
  Zap,
  Shield,
  FileCheck,
  ArrowLeft,
  Star,
  Trophy,
  Loader2
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

// Category configuration
const CATEGORIES = [
  { value: "impressao", label: "Impressão", icon: Printer, color: "blue" },
  { value: "informatica", label: "Informática", icon: Monitor, color: "red" },
  { value: "personalizados", label: "Personalizados", icon: Palette, color: "blue" },
] as const;

export default function CatalogoPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"todos" | "impressao" | "informatica" | "personalizados">("todos");
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }
      // Normalize categories to lowercase to ensure consistent filtering
      const normalizedData = (data || []).map(service => ({
        ...service,
        category: (service.category || '').toLowerCase().trim()
      }));
      setServices(normalizedData);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWhatsAppNumber = (category: string) => {
    const cat = (category || '').toLowerCase().trim();
    switch (cat) {
      case "impressao": return whatsappContacts.impressao;
      case "personalizados": return whatsappContacts.personalizados;
      default: return whatsappContacts.informatica;
    }
  };

  const filteredServices = activeCategory === "todos"
    ? services
    : services.filter(s => s.category === activeCategory);

  const groupedServices = {
    impressao: filteredServices.filter(s => s.category === "impressao"),
    informatica: filteredServices.filter(s => s.category === "informatica"),
    personalizados: filteredServices.filter(s => s.category === "personalizados"),
  };

  const getCategoryCount = (cat: string) => {
    return services.filter(s => s.category === cat).length;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#0056b3]" />
          <p className="text-muted-foreground">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 relative transition-transform group-hover:scale-110">
                <Image
                  src="/logo-teqprint .png"
                  alt="Teq Print Informática"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block text-foreground">
                <span className="font-bold text-lg md:text-xl tracking-tight">Teq Print</span>
                <span className="block text-xs md:text-sm text-muted-foreground">Informática</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/#inicio" className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-secondary hover:text-[#0056b3] text-foreground">
                Início
              </Link>
              <Link href="/#sobre" className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-secondary hover:text-[#0056b3] text-foreground">
                Serviços
              </Link>
              <Link href="/catalogo" className="px-4 py-2 text-sm font-medium rounded-lg transition-all bg-secondary text-[#0056b3]">
                Catálogo
              </Link>
              <Link href="/#diferenciais" className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-secondary hover:text-[#0056b3] text-foreground">
                Diferenciais
              </Link>
              <Link href="/#contato" className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-secondary hover:text-[#0056b3] text-foreground">
                Contato
              </Link>
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
            <nav className="lg:hidden flex items-center gap-2">
              <a
                href={getWhatsAppLink(whatsappContacts.informatica)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-2 px-4">
              <Link href="/#inicio" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-secondary text-foreground">
                Início
              </Link>
              <Link href="/#sobre" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-secondary text-foreground">
                Serviços
              </Link>
              <Link href="/catalogo" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-lg bg-secondary text-[#0056b3] font-medium">
                Catálogo
              </Link>
              <Link href="/#diferenciais" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-secondary text-foreground">
                Diferenciais
              </Link>
              <Link href="/#contato" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-secondary text-foreground">
                Contato
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#0056b3] to-[#e30613] text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Voltar para o início
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Serviços e Soluções da Teq Print
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Confira tudo o que oferecemos em impressão, informática e personalizados
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={activeCategory === "todos" ? "default" : "outline"}
                  onClick={() => setActiveCategory("todos")}
                  className={activeCategory === "todos" ? "bg-[#0056b3] hover:bg-[#004494]" : ""}
                >
                  Todos ({services.length})
                </Button>
                {CATEGORIES.map((cat) => {
                  const count = getCategoryCount(cat.value);
                  return (
                    <Button
                      key={cat.value}
                      variant={activeCategory === cat.value ? "default" : "outline"}
                      onClick={() => setActiveCategory(cat.value)}
                      className={activeCategory === cat.value ? `bg-[#${cat.color === 'red' ? 'e30613' : '0056b3'}] hover:opacity-90` : ""}
                    >
                      <cat.icon className="w-4 h-4 mr-2" />
                      {cat.label} ({count})
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Services by Category */}
        {CATEGORIES.map((cat) => {
          const categoryServices = activeCategory === "todos" || activeCategory === cat.value
            ? groupedServices[cat.value as keyof typeof groupedServices]
            : [];

          if (categoryServices.length === 0 && activeCategory !== "todos") return null;

          return (
            <section key={cat.value} className="py-16 md:py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <Badge variant="secondary" className={`mb-4 px-4 py-1.5 bg-${cat.color}-50 text-[#${cat.color === 'red' ? 'e30613' : '0056b3'}] border-${cat.color}-200`}>
                      <cat.icon className="w-4 h-4 mr-2" />
                      {cat.label}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {cat.label === "Impressão" ? "Serviços de Impressão" : cat.label === "Informática" ? "Serviços de Informática" : "Produtos Personalizados"}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {cat.label === "Impressão" 
                        ? "Qualidade profissional em impressões de todos os tipos e tamanhos."
                        : cat.label === "Informática"
                        ? "Assistência técnica especializada para computadores, impressoras e videogames."
                        : "Crie produtos únicos com sua marca, fotos ou arte personalizada."}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryServices.map((service) => {
                      const whatsappNumber = getWhatsAppNumber(service.category);
                      return (
                        <Card key={service.id} className="card-hover border-2 relative">
                          {service.is_featured && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                              <Trophy className="w-3 h-3" />
                              Mais pedido
                            </div>
                          )}
                          <CardHeader className="pb-4">
                            {service.image_url ? (
                              <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-gray-100">
                                <img
                                  src={service.image_url}
                                  alt={service.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"%3E%3Crect fill="%23ddd" width="24" height="24"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="8"%3EIMG%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              </div>
                            ) : (
                              <div className={`w-12 h-12 rounded-xl bg-${cat.color}-600 flex items-center justify-center mb-4`}>
                                <cat.icon className="w-6 h-6 text-white" />
                              </div>
                            )}
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <CardDescription className="text-sm">{service.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 mb-4">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className={`font-semibold text-[#${cat.color === 'red' ? 'e30613' : '0056b3'}]`}>{service.price}</span>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={getWhatsAppLink(whatsappNumber, `Olá! Gostaria de orçamento para ${service.name}.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1"
                              >
                                <Button className={`w-full bg-green-600 hover:bg-green-700 text-white gap-2 text-sm`}>
                                  <MessageCircle className="w-4 h-4" />
                                  WhatsApp
                                </Button>
                              </a>
                              <Button variant="outline" className={`flex-1 text-[#${cat.color === 'red' ? 'e30613' : '0056b3'}] border-[#${cat.color === 'red' ? 'e30613' : '0056b3'}] hover:bg-${cat.color}-50 text-sm`}>
                                Orçamento
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Differentials Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4 px-4 py-1.5">Por Que Escolher a Teq Print</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Nossos Diferenciais
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Award, title: "24 Anos", desc: "De experiência no mercado" },
                  { icon: Shield, title: "Qualidade", desc: "Garantida em todos os serviços" },
                  { icon: FileCheck, title: "Prazos", desc: "Cumprimento rigoroso" },
                  { icon: Zap, title: "Atendimento", desc: "Rápido e eficiente" },
                ].map((diff, i) => (
                  <Card key={i} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0056b3] to-[#e30613] flex items-center justify-center mx-auto mb-4">
                        <diff.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-semibold mb-1">{diff.title}</h3>
                      <p className="text-sm text-muted-foreground">{diff.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-[#0056b3] to-[#e30613] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Pronto para fazer seu orçamento?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Entre em contato conosco e solicite um orçamento sem compromisso. 
                Respondemos rapidamente!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppLink(whatsappContacts.informatica, "Olá! Gostaria de fazer um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-[#0056b3] hover:bg-white/90 h-12 px-8">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chamar no WhatsApp
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

        {/* Contact Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#0056b3]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <a href="tel:+554435283046" className="font-medium hover:text-[#0056b3]">(44) 3528-3046</a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#0056b3]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">E-mail</p>
                      <a href="mailto:teqprintinfo@hotmail.com" className="font-medium hover:text-[#0056b3]">teqprintinfo@hotmail.com</a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#0056b3]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p className="font-medium">Av. Tupassi, 2866</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a1a2e] to-[#0056b3] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div>
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
                  Referência em informática, especialista em impressos e expert em assistência técnica.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Links Rápidos</h4>
                <ul className="space-y-2">
                  <li><Link href="/#inicio" className="text-sm hover:text-white/80 transition-colors text-white/70">Início</Link></li>
                  <li><Link href="/#sobre" className="text-sm hover:text-white/80 transition-colors text-white/70">Serviços</Link></li>
                  <li><Link href="/catalogo" className="text-sm hover:text-white/80 transition-colors text-white/70">Catálogo</Link></li>
                  <li><Link href="/#contato" className="text-sm hover:text-white/80 transition-colors text-white/70">Contato</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold mb-4">Serviços</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-white/70">Impressão Rápida</li>
                  <li className="text-sm text-white/70">Informática</li>
                  <li className="text-sm text-white/70">Personalizados</li>
                  <li className="text-sm text-white/70">Assistência Técnica</li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold mb-4">Contato</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <Phone className="w-4 h-4" />
                    (44) 3528-3046
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    (44) 99842-6252
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <Mail className="w-4 h-4" />
                    teqprintinfo@hotmail.com
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="bg-white/10 mb-6" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
              <p>© {new Date().getFullYear()} Teq Print Informática. Todos os direitos reservados.</p>
              <p>24 anos de qualidade e confiança</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp 
        phoneNumber={whatsappContacts.informatica} 
        message="Olá, vim pelo catálogo e gostaria de um orçamento."
      />
    </div>
  );
}
