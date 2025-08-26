import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Heart, MessageCircle, Share2, Send, Camera, Users, Trophy, Star, Clock, Eye, ThumbsUp, Award, Search, Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ShoppingCart from "@/components/ShoppingCart";
import AIChat from "@/components/AIChat";

const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Ana Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c913?w=150&h=150&fit=crop&crop=face',
      verified: true,
      title: 'Especialista em Marketing'
    },
    content: 'Acabei de finalizar mais um curso incrível! 🚀 O "Marketing Digital Completo 2024" superou todas as minhas expectativas. As estratégias são práticas e realmente funcionam!',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: '2 horas atrás',
    course: 'Marketing Digital Completo 2024'
  },
  {
    id: '2',
    user: {
      name: 'Carlos Santos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true,
      title: 'Desenvolvedor Full Stack'
    },
    content: 'Quem mais está animado com as novas atualizações do React? 💻 Acabei de aplicar os conceitos do curso de "Desenvolvimento Web Full Stack" em um projeto real. Os resultados foram impressionantes!',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    likes: 189,
    comments: 67,
    shares: 23,
    timestamp: '4 horas atr��s',
    course: 'Desenvolvimento Web Full Stack'
  },
  {
    id: '3',
    user: {
      name: 'Maria Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: false,
      title: 'Consultora de Vendas'
    },
    content: 'Minha primeira semana aplicando as técnicas do curso de "Vendas Online que Convertem" e já tive um aumento de 180% na conversão! 📈 Obrigada EduPro por transformar minha carreira! 🙏',
    likes: 456,
    comments: 89,
    shares: 34,
    timestamp: '6 horas atrás',
    course: 'Vendas Online que Convertem'
  },
  {
    id: '4',
    user: {
      name: 'Pedro Almeida',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: true,
      title: 'UI/UX Designer'
    },
    content: 'Compartilhando meu projeto final do curso de Design UI/UX! 🎨 Foi incrível aprender sobre pesquisa de usuário, prototipagem e design systems. Agora me sinto muito mais confiante nas minhas criações!',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    likes: 312,
    comments: 78,
    shares: 45,
    timestamp: '8 horas atrás',
    course: 'Design UI/UX Profissional'
  }
];

const mockSuggestedUsers = [
  {
    id: '1',
    name: 'Julia Fernandes',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    title: 'Data Scientist',
    mutualConnections: 12,
    verified: true
  },
  {
    id: '2',
    name: 'Roberto Lima',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'Analista de Negócios',
    mutualConnections: 8,
    verified: false
  },
  {
    id: '3',
    name: 'Fernanda Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c913?w=150&h=150&fit=crop&crop=face',
    title: 'Product Manager',
    mutualConnections: 15,
    verified: true
  }
];

const mockTrendingTopics = [
  { tag: 'MarketingDigital', posts: 1234 },
  { tag: 'Programação', posts: 987 },
  { tag: 'DesignUX', posts: 654 },
  { tag: 'VendasOnline', posts: 432 },
  { tag: 'IA', posts: 321 }
];

export default function Social() {
  const { state } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(mockPosts);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    alert('Post compartilhado com sucesso!');
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now().toString(),
      user: {
        name: state.user?.name || 'Usuário',
        avatar: state.user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        verified: false,
        title: 'Estudante'
      },
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'agora',
      course: ''
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-navy-900 mb-2">Área Restrita</h2>
            <p className="text-navy-600 mb-6">Faça login para acessar a comunidade e interagir com outros alunos.</p>
            <Button 
              onClick={() => window.location.href = '/login'}
              className="bg-brand-600 hover:bg-brand-700"
            >
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
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
              <a href="/social" className="text-brand-600 font-medium">Comunidade</a>
              <ShoppingCart />
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={state.user?.avatar} alt={state.user?.name} />
                  <AvatarFallback>{state.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-navy-900">{state.user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* User Profile Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Avatar className="w-20 h-20 mx-auto">
                      <AvatarImage src={state.user?.avatar} alt={state.user?.name} />
                      <AvatarFallback className="text-2xl">{state.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-navy-900">{state.user?.name}</h3>
                      <p className="text-sm text-navy-600">Estudante</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-xl font-bold text-brand-600">{state.user?.coursesCompleted}</div>
                        <div className="text-xs text-navy-600">Cursos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-brand-600">{state.user?.certificates}</div>
                        <div className="text-xs text-navy-600">Certificados</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tópicos em Alta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTrendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-navy-900">#{topic.tag}</div>
                          <div className="text-xs text-navy-600">{topic.posts} posts</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* New Post */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={state.user?.avatar} alt={state.user?.name} />
                      <AvatarFallback>{state.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <Input
                        placeholder="Compartilhe seu progresso ou conquista..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="border-gray-200"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Camera className="w-4 h-4 mr-1" />
                            Foto
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trophy className="w-4 h-4 mr-1" />
                            Conquista
                          </Button>
                        </div>
                        <Button 
                          onClick={handleNewPost}
                          disabled={!newPost.trim()}
                          className="bg-brand-600 hover:bg-brand-700"
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Publicar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={post.user.avatar} alt={post.user.name} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-navy-900">{post.user.name}</span>
                              {post.user.verified && (
                                <Badge className="bg-blue-100 text-blue-700 text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Verificado
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-navy-600">{post.user.title} • {post.timestamp}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Post Content */}
                      <div className="space-y-4">
                        <p className="text-navy-800 leading-relaxed">{post.content}</p>
                        
                        {post.course && (
                          <Badge variant="outline" className="border-brand-200 text-brand-700">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {post.course}
                          </Badge>
                        )}

                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Post"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                        <div className="flex items-center space-x-6">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={likedPosts.has(post.id) ? 'text-red-600' : ''}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleShare(post.id)}
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            {post.shares}
                          </Button>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-navy-500">
                          <Eye className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 1000) + 500}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar na comunidade..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sugestões para Você</CardTitle>
                  <CardDescription>Conecte-se com outros estudantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSuggestedUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-navy-900 text-sm">{user.name}</span>
                              {user.verified && (
                                <Star className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                            <div className="text-xs text-navy-600">{user.title}</div>
                            <div className="text-xs text-navy-500">{user.mutualConnections} conexões em comum</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Seguir
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <ThumbsUp className="w-4 h-4 text-blue-500 mt-1" />
                      <div className="text-sm">
                        <span className="font-medium">Ana Silva</span> curtiu seu post
                        <div className="text-xs text-navy-500">2 horas atrás</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MessageCircle className="w-4 h-4 text-green-500 mt-1" />
                      <div className="text-sm">
                        <span className="font-medium">Carlos Santos</span> comentou no seu post
                        <div className="text-xs text-navy-500">4 horas atrás</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Award className="w-4 h-4 text-yellow-500 mt-1" />
                      <div className="text-sm">
                        Você conquistou um novo certificado!
                        <div className="text-xs text-navy-500">1 dia atrás</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat */}
      <AIChat />
    </div>
  );
}
