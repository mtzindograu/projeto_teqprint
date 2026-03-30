"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase, type Service } from "@/lib/supabase";
import {
  Printer,
  Monitor,
  Palette,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload
} from "lucide-react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "impressao", label: "Impressão", icon: Printer },
  { value: "informatica", label: "Informática", icon: Monitor },
  { value: "personalizados", label: "Personalizados", icon: Palette },
] as const;

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "impressao" as 'impressao' | 'informatica' | 'personalizados',
    image_url: "",
    is_featured: false,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show notification helper
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Fetch services function
  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      showNotification("error", "Erro ao carregar serviços. Verifique as configurações do Supabase.");
    }
  };

  // Check authentication on mount
  useEffect(() => {
    const authenticated = localStorage.getItem("teqprint_admin_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchServices();
    }
  }, []);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "teqprint2024";

    if (password === adminPassword) {
      localStorage.setItem("teqprint_admin_authenticated", "true");
      setIsAuthenticated(true);
      fetchServices();
      showNotification("success", "Login realizado com sucesso!");
    } else {
      showNotification("error", "Senha incorreta.");
    }

    setIsLoading(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("teqprint_admin_authenticated");
    setIsAuthenticated(false);
    router.push("/");
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification("error", "Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification("error", "A imagem deve ter no máximo 5MB.");
      return;
    }

    setUploadingImage(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `services/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('servicos-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('servicos-images')
        .getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        setFormData({ ...formData, image_url: urlData.publicUrl });
        showNotification("success", "Imagem enviada com sucesso!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showNotification("error", "Erro ao enviar imagem. Verifique se o bucket 'servicos-images' foi criado.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name.trim()) {
      showNotification("error", "Nome é obrigatório.");
      setIsLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      showNotification("error", "Descrição é obrigatória.");
      setIsLoading(false);
      return;
    }

    if (!formData.price.trim()) {
      showNotification("error", "Preço é obrigatório.");
      setIsLoading(false);
      return;
    }

    if (!formData.category || !['impressao', 'informatica', 'personalizados'].includes(formData.category)) {
      showNotification("error", "Categoria inválida.");
      setIsLoading(false);
      return;
    }

    try {
      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update({
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: formData.price.trim(),
            category: formData.category.toLowerCase().trim(),
            image_url: formData.image_url,
            is_featured: formData.is_featured,
          })
          .eq("id", editingService.id);

        if (error) throw error;
        showNotification("success", "Serviço atualizado com sucesso!");
      } else {
        const { error } = await supabase
          .from("services")
          .insert([{
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: formData.price.trim(),
            category: formData.category.toLowerCase().trim(),
            image_url: formData.image_url,
            is_featured: formData.is_featured,
          }]);

        if (error) throw error;
        showNotification("success", "Serviço criado com sucesso!");
      }

      fetchServices();
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
      showNotification("error", "Erro ao salvar serviço.");
    }

    setIsLoading(false);
  };

  // Handle edit
  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category as any,
      image_url: service.image_url || "",
      is_featured: service.is_featured,
    });
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return;

    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);

      if (error) throw error;
      showNotification("success", "Serviço excluído com sucesso!");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      showNotification("error", "Erro ao excluir serviço.");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "impressao",
      image_url: "",
      is_featured: false,
    });
    setEditingService(null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#0056b3] to-[#e30613] rounded-xl flex items-center justify-center">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Administração</CardTitle>
            <CardDescription>Teq Print Informática</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
              </Button>
              {notification && (
                <div className={`p-3 rounded-lg flex items-center gap-2 ${
                  notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {notification.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {notification.message}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0056b3] to-[#e30613] rounded-xl flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Painel Administrativo</h1>
                <p className="text-sm text-muted-foreground">Gerenciamento de Catálogo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/catalogo" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  Ver Catálogo
                </Button>
              </a>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isEditing ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {isEditing ? "Editar Serviço" : "Novo Serviço"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Cartão de Visita"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição *</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrição do serviço..."
                      className="w-full min-h-[100px] px-3 py-2 border rounded-md text-sm"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Preço *</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Ex: R$ 50,00 ou A partir de..."
                      required
                    />
                  </div>

                  <div>
                    <Label>Categoria *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {CATEGORIES.map((cat) => (
                        <Button
                          key={cat.value}
                          type="button"
                          variant={formData.category === cat.value ? "default" : "outline"}
                          className="flex flex-col h-auto py-3"
                          onClick={() => setFormData({ ...formData, category: cat.value as any })}
                        >
                          <cat.icon className="w-4 h-4 mb-1" />
                          <span className="text-xs">{cat.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Imagem do Serviço</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="flex-1 text-sm"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                        >
                          {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        </Button>
                      </div>

                      <div>
                        <Label htmlFor="image_url" className="text-xs">Ou cole a URL da imagem:</Label>
                        <Input
                          id="image_url"
                          value={formData.image_url}
                          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                          placeholder="https://exemplo.com/imagem.jpg"
                          className="mt-1"
                        />
                      </div>

                      {formData.image_url && (
                        <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={formData.image_url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"%3E%3Crect fill="%23ddd" width="24" height="24"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="10"%3EIMG%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image_url: "" })}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {uploadingImage && (
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Enviando imagem...
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="is_featured" className="cursor-pointer">
                      Marcar como "Mais Pedido"
                    </Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      {isEditing ? "Atualizar" : "Salvar"}
                    </Button>
                    {isEditing && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Services List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Serviços Cadastrados ({services.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum serviço cadastrado</p>
                      <p className="text-sm">Comece adicionando um novo serviço</p>
                    </div>
                  ) : (
                    services.map((service) => {
                      const CategoryIcon = CATEGORIES.find(c => c.value === service.category)?.icon || Monitor;
                      return (
                        <div key={service.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          {service.image_url ? (
                            <img
                              src={service.image_url}
                              alt={service.name}
                              className="w-12 h-12 rounded-lg object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"%3E%3Crect fill="%23ddd" width="24" height="24"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="10"%3EIMG%3C/text%3E%3C/svg%3E';
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <CategoryIcon className="w-6 h-6 text-gray-600" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{service.name}</h3>
                              {service.is_featured && (
                                <Badge className="bg-yellow-500 text-white text-xs">Mais Pedido</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                            <p className="text-sm font-medium text-[#0056b3]">{service.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDelete(service.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
