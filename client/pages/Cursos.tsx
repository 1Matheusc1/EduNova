import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { BookOpen, Clock, Users, Star, Search, Filter, Grid, List } from "lucide-react";
import { useState } from "react";
import AIChat from "@/components/AIChat";
import ShoppingCart from "@/components/ShoppingCart";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const allCourses = [
  {
    id: 1,
    title: "Marketing Digital Completo 2024",
    description: "Aprenda todas as estratégias de marketing digital do zero ao avançado com cases reais",
    instructor: "Ana Silva",
    rating: 4.9,
    students: 2847,
    duration: "32 horas",
    price: 197,
    originalPrice: 497,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "Marketing",
    level: "Iniciante ao Avançado",
    tags: ["Google Ads", "Facebook Ads", "SEO", "Analytics"]
  },
  {
    id: 2,
    title: "Desenvolvimento Web Full Stack",
    description: "Domine React, Node.js e construa aplicações profissionais do zero",
    instructor: "Carlos Santos",
    rating: 4.8,
    students: 1923,
    duration: "45 horas",
    price: 297,
    originalPrice: 697,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    category: "Programação",
    level: "Intermediário",
    tags: ["React", "Node.js", "JavaScript", "API"]
  },
  {
    id: 3,
    title: "Vendas Online que Convertem",
    description: "Estratégias comprovadas para aumentar suas vendas online e conquistar mais clientes",
    instructor: "Maria Costa",
    rating: 4.9,
    students: 3156,
    duration: "28 horas",
    price: 147,
    originalPrice: 397,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    category: "Vendas",
    level: "Iniciante",
    tags: ["CopyWriting", "Funil de Vendas", "WhatsApp", "E-commerce"]
  },
  {
    id: 4,
    title: "Design UI/UX Profissional",
    description: "Crie interfaces incríveis e experiências de usuário que convertem",
    instructor: "Pedro Almeida",
    rating: 4.7,
    students: 1456,
    duration: "38 horas",
    price: 247,
    originalPrice: 597,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    category: "Design",
    level: "Intermediário",
    tags: ["Figma", "Protótipo", "User Research", "Design System"]
  },
  {
    id: 5,
    title: "Excel Avançado para Negócios",
    description: "Domine fórmulas avançadas, dashboards e automações no Excel",
    instructor: "Roberto Lima",
    rating: 4.6,
    students: 2234,
    duration: "22 horas",
    price: 97,
    originalPrice: 297,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    category: "Produtividade",
    level: "Intermediário",
    tags: ["VBA", "Power BI", "Dashboard", "Automação"]
  },
  {
    id: 6,
    title: "Instagram Marketing Profissional",
    description: "Estratégias para crescer e monetizar seu Instagram como um profissional",
    instructor: "Camila Rodrigues",
    rating: 4.8,
    students: 3892,
    duration: "25 horas",
    price: 127,
    originalPrice: 347,
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=250&fit=crop",
    category: "Marketing",
    level: "Iniciante",
    tags: ["Reels", "Stories", "Hashtags", "Influenciador"]
  },
  {
    id: 7,
    title: "Python para Análise de Dados",
    description: "Aprenda Python e bibliotecas como Pandas, NumPy e Matplotlib",
    instructor: "Lucas Ferreira",
    rating: 4.7,
    students: 1567,
    duration: "35 horas",
    price: 197,
    originalPrice: 497,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    category: "Programação",
    level: "Intermediário",
    tags: ["Python", "Pandas", "Data Science", "Machine Learning"]
  },
  {
    id: 8,
    title: "Gestão de Negócios Digitais",
    description: "Como estruturar, gerenciar e escalar seu negócio digital",
    instructor: "André Martins",
    rating: 4.9,
    students: 2145,
    duration: "30 horas",
    price: 177,
    originalPrice: 447,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    category: "Negócios",
    level: "Avançado",
    tags: ["Empreendedorismo", "Gestão", "Liderança", "Estratégia"]
  }
];

const categories = ["Todos", "Marketing", "Programação", "Vendas", "Design", "Produtividade", "Negócios"];
const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"];

export default function Cursos() {
  const { addToCart, openCart } = useCart();
  const { state: authState, logout } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('popularity');

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

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Todos' || course.level.includes(selectedLevel);
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // popularity
        return b.students - a.students;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
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
              <a href="/cursos" className="text-brand-600 font-medium">Cursos</a>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Todos os Cursos</h1>
          <p className="text-lg text-navy-600">Explore nossa biblioteca completa de cursos profissionais</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filtros</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-navy-900 mb-2 block">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar cursos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-navy-900 mb-2 block">Categoria</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Level */}
                <div>
                  <label className="text-sm font-medium text-navy-900 mb-2 block">Nível</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-navy-900 mb-2 block">
                    Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium text-navy-900 mb-3 block">Avaliação mínima</label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 text-sm cursor-pointer">
                          <span>{rating}</span>
                          <div className="flex">
                            {[...Array(Math.floor(rating))].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            {rating % 1 !== 0 && <Star className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />}
                          </div>
                          <span className="text-gray-500">e acima</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todos');
                    setSelectedLevel('Todos');
                    setPriceRange([0, 500]);
                  }}
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <div className="text-navy-600">
                Mostrando {filteredCourses.length} de {allCourses.length} cursos
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Mais populares</SelectItem>
                    <SelectItem value="rating">Melhor avaliados</SelectItem>
                    <SelectItem value="price-low">Menor preço</SelectItem>
                    <SelectItem value="price-high">Maior preço</SelectItem>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Courses Grid/List */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredCourses.map((course) => (
                <Card key={course.id} className={`group hover:shadow-xl transition-all duration-300 border-gray-100 hover:border-brand-200 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
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
                  
                  <div className="flex-1">
                    <CardHeader className={viewMode === 'list' ? 'pb-2' : 'pb-2'}>
                      <CardTitle className="text-xl text-navy-900 line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="text-navy-600 line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {course.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-navy-600">
                        <span>Por {course.instructor}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                          <span className="text-gray-400">({course.students})</span>
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
                  </div>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Nenhum curso encontrado</h3>
                <p className="text-navy-600">Tente ajustar os filtros ou buscar por outros termos.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Chat */}
      <AIChat />
    </div>
  );
}
