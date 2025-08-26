import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users, Star, Play, Download, Award, ChevronRight, Heart, Share2, ShoppingCart, CheckCircle, Globe, Smartphone, Trophy, Calendar, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import AIChat from "@/components/AIChat";
import ShoppingCart from "@/components/ShoppingCart";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

// Mock course data - in real app this would come from API
const courseData = {
  id: 1,
  title: "Marketing Digital Completo 2024",
  description: "Aprenda todas as estratégias de marketing digital do zero ao avançado com cases reais e práticos. Este curso vai te ensinar como criar campanhas que realmente convertem e geram resultados para qualquer tipo de negócio.",
  instructor: {
    name: "Ana Silva",
    title: "Especialista em Marketing Digital",
    bio: "Mais de 8 anos de experiência em marketing digital, já ajudou mais de 500 empresas a aumentarem suas vendas online. Formada em Marketing pela USP e certificada pelo Google.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c913?w=150&h=150&fit=crop&crop=face",
    students: 12580,
    courses: 15,
    rating: 4.9
  },
  rating: 4.9,
  totalRatings: 2847,
  students: 2847,
  duration: "32 horas",
  lessons: 156,
  price: 197,
  originalPrice: 497,
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
  category: "Marketing",
  level: "Iniciante ao Avançado",
  language: "Português",
  lastUpdated: "Dezembro 2024",
  tags: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Email Marketing", "Copywriting"],
  features: [
    "32 horas de conteúdo em vídeo",
    "156 aulas práticas",
    "Certificado de conclusão",
    "Acesso vitalício",
    "Suporte direto do instrutor",
    "Material complementar",
    "Garantia de 30 dias"
  ],
  curriculum: [
    {
      title: "Introdução ao Marketing Digital",
      lessons: 8,
      duration: "2h 30min",
      topics: [
        "O que é Marketing Digital",
        "Principais canais e estratégias",
        "Como definir seu público-alvo",
        "Criando personas detalhadas"
      ]
    },
    {
      title: "Google Ads Completo",
      lessons: 25,
      duration: "6h 45min",
      topics: [
        "Configuração da conta Google Ads",
        "Pesquisa de palavras-chave",
        "Criação de campanhas de busca",
        "Campanhas de display e vídeo",
        "Otimização e análise de resultados"
      ]
    },
    {
      title: "Facebook e Instagram Ads",
      lessons: 32,
      duration: "8h 20min",
      topics: [
        "Gerenciador de Anúncios",
        "Segmentação avançada",
        "Criação de criativos que convertem",
        "Funis de vendas no Facebook",
        "Remarketing e lookalike"
      ]
    },
    {
      title: "SEO e Marketing de Conteúdo",
      lessons: 28,
      duration: "7h 15min",
      topics: [
        "Fundamentos do SEO",
        "Pesquisa de palavras-chave",
        "SEO on-page e off-page",
        "Marketing de conteúdo",
        "Blog posts que rankeiam"
      ]
    },
    {
      title: "Email Marketing e Automações",
      lessons: 20,
      duration: "5h 30min",
      topics: [
        "Construindo sua lista de emails",
        "Criando sequências de emails",
        "Automações de marketing",
        "Segmentação avançada",
        "Análise de métricas"
      ]
    },
    {
      title: "Analytics e Métricas",
      lessons: 15,
      duration: "4h 10min",
      topics: [
        "Google Analytics 4",
        "Facebook Pixel",
        "Tag Manager",
        "Relatórios e dashboards",
        "ROI e ROAS"
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      name: "Carlos Mendes",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Excelente curso! Consegui implementar as estratégias e já vi resultados na primeira semana. A Ana explica de forma muito clara e prática.",
      helpful: 24
    },
    {
      id: 2,
      name: "Marina Santos",
      rating: 5,
      date: "1 mês atrás",
      comment: "Melhor investimento que fiz para meu negócio. As aulas de Google Ads me salvaram muito dinheiro em campanhas mal otimizadas.",
      helpful: 18
    },
    {
      id: 3,
      name: "Pedro Oliveira",
      rating: 4,
      date: "2 meses atrás",
      comment: "Conteúdo muito bom e atualizado. Apenas senti falta de mais exemplos práticos em alguns módulos, mas no geral recomendo muito!",
      helpful: 12
    }
  ]
};

export default function Curso() {
  const { id } = useParams();
  const { addToCart, openCart } = useCart();
  const { state: authState, logout } = useAuth();

  const handleAddToCart = () => {
    const cartItem = {
      id: courseData.id,
      title: courseData.title,
      instructor: courseData.instructor.name,
      price: courseData.price,
      originalPrice: courseData.originalPrice,
      image: courseData.image,
      duration: courseData.duration
    };
    addToCart(cartItem);
    openCart();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-navy-900">EduPro</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-navy-600 hover:text-brand-600 transition-colors">Início</a>
              <a href="/cursos" className="text-navy-600 hover:text-brand-600 transition-colors">Cursos</a>
              <a href="/social" className="text-navy-600 hover:text-brand-600 transition-colors">Comunidade</a>
              <ShoppingCart />
              {authState.isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <a href="/settings" className="text-navy-600 hover:text-brand-600 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={authState.user?.avatar} alt={authState.user?.name} />
                      <AvatarFallback>{authState.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </a>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="border-navy-200 text-navy-700"
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/login'}
                    className="border-navy-200 text-navy-700"
                  >
                    Entrar
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/register'}
                    className="bg-brand-600 hover:bg-brand-700"
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-navy-600">
            <a href="/" className="hover:text-brand-600 transition-colors">Início</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/cursos" className="hover:text-brand-600 transition-colors">Cursos</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-navy-900 font-medium">{courseData.category}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-brand-600 text-white">{courseData.category}</Badge>
                <Badge variant="outline">{courseData.level}</Badge>
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  Atualizado {courseData.lastUpdated}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                {courseData.title}
              </h1>
              
              <p className="text-lg text-navy-600 mb-6 leading-relaxed">
                {courseData.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-navy-900">{courseData.rating}</span>
                  <span className="text-navy-600">({courseData.totalRatings.toLocaleString()} avaliações)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5 text-navy-600" />
                  <span className="text-navy-600">{courseData.students.toLocaleString()} alunos</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5 text-navy-600" />
                  <span className="text-navy-600">{courseData.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Play className="w-5 h-5 text-navy-600" />
                  <span className="text-navy-600">{courseData.lessons} aulas</span>
                </div>
              </div>

              {/* Course Video Preview */}
              <div className="relative mb-8">
                <img 
                  src={courseData.image} 
                  alt={courseData.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                  <Button className="bg-white text-brand-600 hover:bg-gray-100 rounded-full w-16 h-16">
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-brand-600 text-white">
                  Preview Gratuito
                </Badge>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {courseData.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curriculum">Conteúdo do Curso</TabsTrigger>
                <TabsTrigger value="instructor">Instrutor</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conteúdo do Curso</CardTitle>
                    <CardDescription>
                      {courseData.lessons} aulas • {courseData.duration} de conteúdo em vídeo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courseData.curriculum.map((module, index) => (
                        <Card key={index} className="border-gray-100">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg">{module.title}</CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {module.lessons} aulas • {module.duration}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-2">
                              {module.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-center space-x-2 text-sm text-navy-600">
                                  <Play className="w-4 h-4 text-brand-500" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre o Instrutor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={courseData.instructor.image} alt={courseData.instructor.name} />
                          <AvatarFallback>{courseData.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-navy-900 mb-1">{courseData.instructor.name}</h3>
                        <p className="text-brand-600 font-medium mb-3">{courseData.instructor.title}</p>
                        <p className="text-navy-600 mb-4 leading-relaxed">{courseData.instructor.bio}</p>
                        
                        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-600">{courseData.instructor.students.toLocaleString()}</div>
                            <div className="text-sm text-navy-600">Alunos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-600">{courseData.instructor.courses}</div>
                            <div className="text-sm text-navy-600">Cursos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-600">{courseData.instructor.rating}</div>
                            <div className="text-sm text-navy-600">Avaliação</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Avaliações dos Alunos</CardTitle>
                    <CardDescription>
                      {courseData.totalRatings.toLocaleString()} avaliações
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Rating Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-brand-600 mb-2">{courseData.rating}</div>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="text-sm text-navy-600">Avaliação do curso</div>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map(stars => (
                          <div key={stars} className="flex items-center space-x-2">
                            <span className="text-sm text-navy-600 w-3">{stars}</span>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <Progress 
                              value={stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 2 : stars === 2 ? 1 : 0} 
                              className="flex-1 h-2" 
                            />
                            <span className="text-sm text-navy-600 w-8">
                              {stars === 5 ? '85%' : stars === 4 ? '12%' : stars === 3 ? '2%' : stars === 2 ? '1%' : '0%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {courseData.reviews.map(review => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-navy-900">{review.name}</h4>
                                <div className="flex">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-sm text-navy-500">{review.date}</span>
                              </div>
                              <p className="text-navy-600 mb-3 leading-relaxed">{review.comment}</p>
                              <div className="flex items-center space-x-4 text-sm text-navy-500">
                                <button className="flex items-center space-x-1 hover:text-brand-600 transition-colors">
                                  <span>👍</span>
                                  <span>Útil ({review.helpful})</span>
                                </button>
                                <button className="hover:text-brand-600 transition-colors">Responder</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-brand-600">R$ {courseData.price}</span>
                    <span className="text-lg text-gray-500 line-through">R$ {courseData.originalPrice}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% de desconto
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    onClick={() => window.location.href = '/checkout'}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-lg py-6"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar Agora
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAddToCart}
                    className="w-full"
                  >
                    Adicionar ao Carrinho
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      Favoritar
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Compartilhar
                    </Button>
                  </div>
                </div>

                {/* Course Includes */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-navy-900">Este curso inclui:</h3>
                  <ul className="space-y-2">
                    {courseData.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-navy-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-600">Idioma:</span>
                    <span className="text-navy-900 font-medium">{courseData.language}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-600">Acesso:</span>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4 text-navy-600" />
                      <Smartphone className="w-4 h-4 text-navy-600" />
                      <span className="text-navy-900 font-medium">Web e Mobile</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-600">Certificado:</span>
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4 text-brand-600" />
                      <span className="text-navy-900 font-medium">Incluído</span>
                    </div>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                  <div className="text-green-700 font-medium mb-1">Garantia de 30 dias</div>
                  <div className="text-sm text-green-600">Devolução do dinheiro garantida</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Chat */}
      <AIChat />
    </div>
  );
}
