import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock, Users, Star, Play, Award, TrendingUp, MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AIChat from "@/components/AIChat";
import ShoppingCart from "@/components/ShoppingCart";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const featuredCourses = [
  {
    id: 1,
    title: "Marketing Digital Completo 2024",
    description: "Aprenda todas as estratégias de marketing digital do zero ao avançado",
    instructor: "Ana Silva",
    rating: 4.9,
    students: 2847,
    duration: "32 horas",
    price: 197,
    originalPrice: 497,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "Marketing",
    level: "Iniciante ao Avançado"
  },
  {
    id: 2,
    title: "Desenvolvimento Web Full Stack",
    description: "Domine React, Node.js e construa aplica��ões profissionais",
    instructor: "Carlos Santos",
    rating: 4.8,
    students: 1923,
    duration: "45 horas",
    price: 297,
    originalPrice: 697,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    category: "Programação",
    level: "Intermediário"
  },
  {
    id: 3,
    title: "Vendas Online que Convertem",
    description: "Estratégias comprovadas para aumentar suas vendas online",
    instructor: "Maria Costa",
    rating: 4.9,
    students: 3156,
    duration: "28 horas",
    price: 147,
    originalPrice: 397,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    category: "Vendas",
    level: "Iniciante"
  }
];

const categories = [
  { name: "Marketing Digital", courses: 45, icon: TrendingUp },
  { name: "Programação", courses: 32, icon: BookOpen },
  { name: "Vendas", courses: 28, icon: Award },
  { name: "Design", courses: 24, icon: Star },
  { name: "Negócios", courses: 38, icon: Users },
  { name: "Produtividade", courses: 19, icon: Clock }
];

export default function Index() {
  const { addToCart, openCart } = useCart();
  const { state: authState, logout } = useAuth();

  const handleAddToCart = (course: any) => {
    const cartItem = {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      duration: course.duration
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
              <a href="/cursos" className="text-navy-600 hover:text-brand-600 transition-colors">Cursos</a>
              <a href="/social" className="text-navy-600 hover:text-brand-600 transition-colors">Comunidade</a>
              <a href="#sobre" className="text-navy-600 hover:text-brand-600 transition-colors">Sobre</a>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-50 via-white to-brand-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200 text-lg px-4 py-2">
                🚀 Mais de 10.000 alunos já transformaram suas carreiras
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-navy-900 leading-tight max-w-4xl mx-auto">
                Aprenda Habilidades que 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-800"> Geram Resultados</span>
              </h1>
              <p className="text-xl text-navy-600 leading-relaxed max-w-2xl mx-auto">
                Cursos práticos de marketing, programação e vendas criados por especialistas. 
                Comece hoje e veja resultados em semanas, não anos.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Busque por curso, categoria ou instrutor..."
                  className="pl-12 pr-4 py-6 text-lg border-gray-200 rounded-xl shadow-sm"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-600 hover:bg-brand-700">
                  Buscar
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white text-lg px-8 py-6">
                Explorar Cursos Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-navy-200 text-navy-700 hover:bg-navy-50 text-lg px-8 py-6">
                Ver Demo
                <Play className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600">186+</div>
                <div className="text-sm text-navy-600">Cursos Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600">10.5k+</div>
                <div className="text-sm text-navy-600">Alunos Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600">4.8★</div>
                <div className="text-sm text-navy-600">Avaliação Média</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600">95%</div>
                <div className="text-sm text-navy-600">Taxa de Conclusão</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="cursos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-brand-100 text-brand-800">Cursos em Destaque</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              Os Mais Vendidos do Mês
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              Cursos comprovados que já ajudaram milhares de pessoas a alcançar seus objetivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-gray-100 hover:border-brand-200 overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-600 text-white">{course.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-navy-800">
                      {course.level}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-navy-900 line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="text-navy-600 line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-navy-600">
                    <span>Por {course.instructor}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-navy-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-brand-600">R$ {course.price}</span>
                        <span className="text-sm text-gray-500 line-through">R$ {course.originalPrice}</span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/curso/${course.id}`}
                        className="flex-1"
                      >
                        Ver Detalhes
                      </Button>
                      <Button
                        size="sm"
                        className="bg-brand-600 hover:bg-brand-700 flex-1"
                        onClick={() => handleAddToCart(course)}
                      >
                        Comprar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-brand-200 text-brand-700 hover:bg-brand-50">
              Ver Todos os Cursos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="py-24 bg-gradient-to-br from-navy-50 to-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-brand-100 text-brand-800">Categorias</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              Escolha Sua Área de Interesse
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              Explore nossas categorias e encontre o curso perfeito para seus objetivos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-100 hover:border-brand-200 cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-navy-600">{category.courses} cursos</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-brand-100 text-brand-800">Depoimentos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              Histórias de Sucesso dos Nossos Alunos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Juliano Oliveira",
                role: "Empreendedor Digital",
                content: "Graças ao curso de Marketing Digital, consegui triplicar minha receita online em apenas 3 meses. O conteúdo é prático e direto ao ponto!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Fernanda Lima",
                role: "Desenvolvedora Frontend",
                content: "O curso de Desenvolvimento Web me deu todas as ferramentas necessárias para conseguir minha primeira vaga como desenvolvedora. Recomendo muito!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108755-2616b332c913?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Ricardo Santos",
                role: "Consultor de Vendas",
                content: "Apliquei as técnicas do curso de Vendas Online e minha taxa de conversão aumentou 180%. Investimento que se pagou em poucas semanas.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-gray-100">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-navy-600 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
                      <p className="text-sm text-navy-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto Para Começar Sua Jornada?
              </h2>
              <p className="text-xl text-brand-100 max-w-2xl mx-auto">
                Junte-se a milhares de alunos que já transformaram suas carreiras com nossos cursos
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-50 text-lg px-8 py-6">
                Explorar Cursos Gratuitos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Falar com Especialista
                <MessageCircle className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-brand-100">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Certificado incluso</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Acesso vitalício</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">EduPro</span>
              </div>
              <p className="text-gray-400">
                A plataforma completa para acelerar sua carreira com cursos práticos e resultados reais.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Categorias</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Marketing Digital</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Programação</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Vendas</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Design</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Instrutores</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Carreira</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Chat Online</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 EduPro. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-brand-400 transition-colors">Termos</a>
              <a href="#" className="text-gray-400 hover:text-brand-400 transition-colors">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-brand-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat */}
      <AIChat />
    </div>
  );
}
