import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";

// Context for global state
const AppContext = createContext<any>(null);

// Modern Navigation Component
const Navigation = ({ currentPage }: { currentPage: string }) => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">🎓</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduPro
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: "Início", path: "/", key: "home" },
              { name: "Cursos", path: "/cursos", key: "cursos" },
              { name: "Comunidade", path: "/social", key: "social" },
              { name: "Podcasts", path: "/podcasts", key: "podcasts" },
              { name: "Blog", path: "/blog", key: "blog" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                  currentPage === item.key
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <span className="hidden md:block">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-600 hover:text-red-600 rounded-xl hover:bg-red-50 transition-all"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all"
                >
                  Entrar
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Cadastrar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Enhanced AI Chat Component
const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "👋 Olá! Sou a Ana, sua assistente inteligente da EduPro. Como posso ajudar você hoje?",
      time: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputValue,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(
      () => {
        const aiResponse = {
          id: Date.now() + 1,
          type: "ai",
          text: getSmartAIResponse(inputValue),
          time: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      },
      Math.random() * 2000 + 1000,
    );
  };

  const getSmartAIResponse = (input: string) => {
    const lower = input.toLowerCase();

    // Mais respostas inteligentes
    if (lower.includes("curso") || lower.includes("aula")) {
      return "📚 Temos 186+ cursos nas áreas mais procuradas! Marketing Digital, Programação, Design, Vendas e muito mais. Qual área te interessa?";
    }
    if (
      lower.includes("preço") ||
      lower.includes("valor") ||
      lower.includes("custa")
    ) {
      return "💰 Nossos cursos têm preços acessíveis: R$ 97 a R$ 297. Oferecemos parcelamento em até 12x sem juros e desconto de 5% no PIX!";
    }
    if (lower.includes("certificado")) {
      return "🏆 Sim! Todos os cursos incluem certificado digital reconhecido. Você recebe automaticamente após completar 80% do conteúdo.";
    }
    if (lower.includes("suporte") || lower.includes("ajuda")) {
      return "🤝 Oferecemos suporte completo: chat 24/7, fórum da comunidade, WhatsApp e email. Nossa equipe responde em até 2 horas!";
    }
    if (lower.includes("comunidade") || lower.includes("instagram")) {
      return "👥 Nossa comunidade é incrível! +10k alunos ativos compartilhando conhecimento, projetos e conquistas. Participe!";
    }
    if (lower.includes("podcast")) {
      return "🎧 Temos uma seção exclusiva de podcasts com especialistas da área! Episódios semanais sobre carreira, tecnologia e negócios.";
    }
    if (lower.includes("mobile") || lower.includes("celular")) {
      return "📱 Claro! Nossa plataforma funciona perfeitamente em celular, tablet e desktop. Estude onde e quando quiser!";
    }
    if (lower.includes("tempo") || lower.includes("prazo")) {
      return "⏰ Acesso vitalício! Não há pressa. Estude no seu ritmo e revisitei o conteúdo sempre que precisar.";
    }
    if (lower.includes("iniciante") || lower.includes("começar")) {
      return "🌟 Perfeito para iniciantes! Nossos cursos começam do zero e te levam ao nível profissional. Metodologia exclusiva!";
    }

    return "🤔 Interessante! Posso te ajudar com: 📚 Cursos, 💰 Preços, 🏆 Certificados, 🤝 Suporte, 👥 Comunidade, 🎧 Podcasts. O que deseja saber?";
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen
            ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        }`}
      >
        <span className="text-white text-2xl">{isOpen ? "✕" : "🤖"}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold">Ana - IA Assistant</h3>
                <p className="text-sm text-blue-100 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Online agora
                </p>
              </div>
            </div>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <div className="text-sm leading-relaxed">{msg.text}</div>
                  <div
                    className={`text-xs mt-1 ${
                      msg.type === "user" ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {msg.time.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200/50 bg-white">
            <div className="flex space-x-3">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Digite sua pergunta..."
                className="flex-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Enhanced Homepage
const Index = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <div className="relative py-20 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-gray-200/50">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-700">
              +10.000 alunos conectados agora
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transforme
            </span>
            <br />
            <span className="text-gray-900">sua carreira</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            A plataforma educacional mais completa do Brasil. Cursos,
            comunidade, podcasts e IA para acelerar seu crescimento
            profissional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              🚀 Começar Agora - Grátis
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
              📱 Ver Demo
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "186+", label: "Cursos Premium", icon: "📚" },
              { number: "10.5k+", label: "Alunos Ativos", icon: "👥" },
              { number: "4.9★", label: "Avaliação Média", icon: "⭐" },
              { number: "95%", label: "Taxa de Conclusão", icon: "🏆" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-2xl">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a milhares de profissionais que já transformaram suas
            carreiras
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            🎯 Quero Começar Agora
          </button>
        </div>
      </div>

      <AIChat />
    </div>
  );
};

// Enhanced Login with real functionality
const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate login process
    setTimeout(() => {
      const success = login(formData.email, formData.password);
      setLoading(false);

      if (success) {
        navigate("/");
      } else {
        setError("Email ou senha incorretos. Tente: teste@email.com / 123456");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200/50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-600">Entre na sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Não tem conta?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Cadastre-se aqui
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700 font-medium mb-2">Teste com:</p>
          <p className="text-sm text-blue-600">Email: teste@email.com</p>
          <p className="text-sm text-blue-600">Senha: 123456</p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Register with real functionality
const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("Preencha todos os campos");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      const success = register(
        formData.name,
        formData.email,
        formData.password,
      );
      setLoading(false);

      if (success) {
        navigate("/");
      } else {
        setError("Este email já está cadastrado");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200/50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🚀</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Crie sua conta
          </h2>
          <p className="text-gray-600">
            Comece sua jornada de aprendizado hoje
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome completo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar senha
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem conta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Podcasts Page
const Podcasts = () => {
  const podcasts = [
    {
      id: 1,
      title: "Carreira em Tech: Do Zero ao Senior",
      description: "Como construir uma carreira sólida em tecnologia",
      duration: "45:30",
      plays: "12.5k",
      image:
        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
      guest: "João Silva - Tech Lead Google",
    },
    {
      id: 2,
      title: "Marketing Digital que Funciona",
      description: "Estratégias práticas para aumentar vendas online",
      duration: "38:20",
      plays: "9.8k",
      image:
        "https://images.unsplash.com/photo-1553028826-f4804151e4cd?w=400&h=400&fit=crop",
      guest: "Maria Santos - CMO Startup Unicórnio",
    },
    {
      id: 3,
      title: "Empreendedorismo Digital",
      description: "Como criar um negócio online do zero",
      duration: "52:15",
      plays: "15.2k",
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=400&fit=crop",
      guest: "Pedro Costa - Fundador 3 Startups",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="podcasts" />
      <div className="py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎧 EduPro Podcasts
            </h1>
            <p className="text-xl text-gray-600">
              Conversas inspiradoras com especialistas da área
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative">
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <button className="bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform">
                      ▶️
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
                    {podcast.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {podcast.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{podcast.description}</p>
                  <p className="text-sm text-blue-600 font-medium mb-3">
                    {podcast.guest}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      🎧 {podcast.plays} plays
                    </span>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                      Ouvir Agora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AIChat />
    </div>
  );
};

// Enhanced Social with videos
const Social = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Ana Silva",
      avatar: "👩‍💼",
      content:
        "Acabei de finalizar o curso de Marketing Digital! 🚀 As estratégias de funil de vendas aumentaram minha conversão em 300%!",
      likes: 234,
      comments: 45,
      shares: 12,
      time: "2h",
      hasVideo: true,
      videoUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      user: "Carlos Santos",
      avatar: "👨‍💻",
      content:
        "Meu primeiro app React Native está no ar! 📱 Obrigado EduPro pelo curso incrível. Já consegui meu primeiro cliente!",
      likes: 189,
      comments: 32,
      shares: 8,
      time: "4h",
      hasVideo: false,
    },
    {
      id: 3,
      user: "Maria Costa",
      avatar: "👩‍🚀",
      content:
        "Workshop de Python foi incrível! 🐍 Automatizei 5 processos na empresa e economizei 20h por semana. Produtividade nas alturas!",
      likes: 456,
      comments: 67,
      shares: 23,
      time: "6h",
      hasVideo: true,
      videoUrl:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const { user } = useContext(AppContext);

  const addPost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: user?.name || "Você",
      avatar: "🧑‍🎓",
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      time: "agora",
      hasVideo: false,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const likePost = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="social" />
      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            👥 Comunidade EduPro
          </h1>

          {/* New Post */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🧑‍🎓</div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Compartilhe sua conquista, projeto ou aprendizado..."
                  className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50">
                      <span>📷</span>
                      <span className="text-sm">Foto</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50">
                      <span>🎥</span>
                      <span className="text-sm">Vídeo</span>
                    </button>
                  </div>
                  <button
                    onClick={addPost}
                    disabled={!newPost.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{post.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="font-semibold text-gray-900">
                        {post.user}
                      </span>
                      <span className="text-blue-600 text-sm">✓</span>
                      <span className="text-gray-500 text-sm">{post.time}</span>
                    </div>
                    <p className="text-gray-800 mb-4 leading-relaxed">
                      {post.content}
                    </p>

                    {post.hasVideo && (
                      <div className="relative mb-4 rounded-xl overflow-hidden">
                        <img
                          src={post.videoUrl}
                          alt="Post content"
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <button className="bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform">
                            ▶️
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button
                        onClick={() => likePost(post.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all"
                      >
                        <span>❤️</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 px-3 py-2 rounded-lg hover:bg-green-50 transition-all">
                        <span>🔄</span>
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AIChat />
    </div>
  );
};

// Enhanced Settings with real functionality
const Settings = () => {
  const { user, updateProfile } = useContext(AppContext);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });
  const [preferences, setPreferences] = useState({
    notifications: true,
    updates: true,
    marketing: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const saveProfile = () => {
    setLoading(true);
    setTimeout(() => {
      updateProfile(profile);
      setLoading(false);
      setSuccess("Perfil salvo com sucesso!");
      setTimeout(() => setSuccess(""), 3000);
    }, 1000);
  };

  const savePreferences = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("preferences", JSON.stringify(preferences));
      setLoading(false);
      setSuccess("Preferências salvas com sucesso!");
      setTimeout(() => setSuccess(""), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="settings" />
      <div className="py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            ⚙️ Configurações
          </h1>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-2">👤</span>
                Informações do Perfil
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
                <button
                  onClick={saveProfile}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? "Salvando..." : "Salvar Perfil"}
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-2">🔔</span>
                Notificações
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Novos cursos</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        notifications: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-blue-600"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">
                    Atualizações da comunidade
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.updates}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        updates: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-blue-600"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Marketing e promoções</span>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        marketing: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-blue-600"
                  />
                </label>
                <button
                  onClick={savePreferences}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? "Salvando..." : "Salvar Preferências"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AIChat />
    </div>
  );
};

// Enhanced Courses Page
const Cursos = () => {
  const courses = [
    {
      id: 1,
      title: "Marketing Digital Completo 2024",
      instructor: "Ana Silva",
      price: 197,
      originalPrice: 497,
      rating: 4.9,
      students: 2847,
      duration: "32h",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "Marketing",
    },
    {
      id: 2,
      title: "Desenvolvimento Web Full Stack",
      instructor: "Carlos Santos",
      price: 297,
      originalPrice: 697,
      rating: 4.8,
      students: 1923,
      duration: "45h",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      category: "Programação",
    },
    {
      id: 3,
      title: "Vendas Online que Convertem",
      instructor: "Maria Costa",
      price: 147,
      originalPrice: 397,
      rating: 4.9,
      students: 3156,
      duration: "28h",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      category: "Vendas",
    },
    {
      id: 4,
      title: "Design UI/UX Profissional",
      instructor: "Pedro Almeida",
      price: 247,
      originalPrice: 597,
      rating: 4.7,
      students: 1456,
      duration: "38h",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      category: "Design",
    },
    {
      id: 5,
      title: "Python para Análise de Dados",
      instructor: "Lucas Ferreira",
      price: 197,
      originalPrice: 497,
      rating: 4.7,
      students: 1567,
      duration: "35h",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
      category: "Programação",
    },
    {
      id: 6,
      title: "Excel Avançado para Negócios",
      instructor: "Roberto Lima",
      price: 97,
      originalPrice: 297,
      rating: 4.6,
      students: 2234,
      duration: "22h",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      category: "Produtividade",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="cursos" />
      <div className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📚 Todos os Cursos
            </h1>
            <p className="text-xl text-gray-600">
              Mais de 186 cursos para acelerar sua carreira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
                      {course.duration}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">Por {course.instructor}</p>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>👥</span>
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        R$ {course.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        R$ {course.originalPrice}
                      </span>
                      <div className="text-sm text-green-600 font-medium">
                        {Math.round(
                          (1 - course.price / course.originalPrice) * 100,
                        )}
                        % OFF
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium">
                    Ver Curso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AIChat />
    </div>
  );
};

// Blog Page
const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Como o Marketing Digital Transformou Minha Empresa",
      excerpt:
        "Descubra as estratégias que geraram 300% de aumento nas vendas...",
      author: "Ana Silva",
      date: "15 Nov 2024",
      readTime: "5 min",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Programação em 2024: Tendências e Oportunidades",
      excerpt: "As linguagens e frameworks mais procurados pelo mercado...",
      author: "Carlos Santos",
      date: "12 Nov 2024",
      readTime: "8 min",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="blog" />
      <div className="py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            📝 Blog EduPro
          </h1>

          <div className="space-y-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="md:flex">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full md:w-64 h-48 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>Por {article.author}</span>
                      <span>{article.date}</span>
                      <span>{article.readTime} de leitura</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AIChat />
    </div>
  );
};

// Error Pages
const NotFound = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
    <div className="text-center">
      <div className="text-8xl mb-4">🤔</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Página não encontrada
      </h1>
      <p className="text-gray-600 mb-8">
        A página que você procura não existe ou foi movida.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all"
      >
        🏠 Voltar ao Início
      </button>
    </div>
  </div>
);

// Main App with Context
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Simple authentication simulation
    if (email === "teste@email.com" && password === "123456") {
      const userData = {
        name: "Usuário Teste",
        email,
        bio: "Estudante da EduPro",
      };
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    const userData = { name, email, bio: "Novo estudante na EduPro" };
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const updateProfile = (profileData: any) => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const contextValue = {
    user,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/social" element={<Social />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
