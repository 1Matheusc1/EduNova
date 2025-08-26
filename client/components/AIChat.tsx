import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User, Zap, Clock, Star, BookOpen, CreditCard, HelpCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  { icon: BookOpen, label: "Ver cursos", action: "mostrar-cursos" },
  { icon: Star, label: "Mais vendidos", action: "mais-vendidos" },
  { icon: CreditCard, label: "Formas de pagamento", action: "pagamento" },
  { icon: HelpCircle, label: "Dúvidas frequentes", action: "faq" }
];

const aiResponses: Record<string, { content: string; suggestions?: string[] }> = {
  "oi": {
    content: "Olá! 👋 Eu sou a Ana, sua assistente virtual da EduPro. Como posso ajudar você hoje?",
    suggestions: ["Ver cursos disponíveis", "Dúvidas sobre pagamento", "Como funciona a plataforma"]
  },
  "hello": {
    content: "Olá! 👋 Eu sou a Ana, sua assistente virtual da EduPro. Como posso ajudar você hoje?",
    suggestions: ["Ver cursos disponíveis", "Dúvidas sobre pagamento", "Como funciona a plataforma"]
  },
  "cursos": {
    content: "Temos mais de 186 cursos disponíveis nas seguintes categorias:\n\n📈 Marketing Digital (45 cursos)\n💻 Programação (32 cursos)\n💰 Vendas (28 cursos)\n🎨 Design (24 cursos)\n📊 Negócios (38 cursos)\n⚡ Produtividade (19 cursos)\n\nQual área te interessa mais?",
    suggestions: ["Marketing Digital", "Programação", "Vendas", "Design"]
  },
  "marketing": {
    content: "Excelente escolha! 🚀 Nossos cursos de Marketing Digital mais populares são:\n\n1. **Marketing Digital Completo 2024** - R$ 197 (Ana Silva)\n2. **Instagram Marketing Profissional** - R$ 127 (Camila Rodrigues)\n\nInclui: Google Ads, Facebook Ads, SEO, Analytics e muito mais!\n\nGostaria de saber mais sobre algum deles?",
    suggestions: ["Ver Marketing Completo", "Ver Instagram Marketing", "Outros cursos de marketing"]
  },
  "programacao": {
    content: "Ótima escolha para sua carreira! 💻 Nossos cursos de programação incluem:\n\n1. **Desenvolvimento Web Full Stack** - R$ 297 (Carlos Santos)\n2. **Python para Análise de Dados** - R$ 197 (Lucas Ferreira)\n\nVocê aprenderá: React, Node.js, Python, APIs e muito mais!\n\nQual linguagem te interessa mais?",
    suggestions: ["Desenvolvimento Web", "Python", "Ver todos os cursos"]
  },
  "pagamento": {
    content: "💳 Aceitamos diversas formas de pagamento:\n\n✅ **PIX** - Desconto de 5%\n✅ **Cartão de Crédito** - Até 12x sem juros\n✅ **Boleto Bancário** - À vista\n✅ **Cartão de Débito**\n\n🔒 **100% Seguro** - Seus dados estão protegidos\n🎯 **Garantia de 30 dias** - Satisfação garantida ou seu dinheiro de volta\n\nTem alguma dúvida específica sobre pagamentos?",
    suggestions: ["Parcelamento", "Desconto PIX", "Política de reembolso"]
  },
  "certificado": {
    content: "📜 **Certificado Digital Incluído!**\n\nTodos os nossos cursos incluem certificado de conclusão:\n\n✅ Reconhecido no mercado\n✅ Download imediato após conclusão\n✅ Sem custo adicional\n✅ Válido em todo território nacional\n\nPara receber, você precisa:\n• Assistir pelo menos 80% das aulas\n• Concluir as atividades práticas\n\nPrecisa de mais informações?",
    suggestions: ["Como baixar certificado", "Validade do certificado", "Ver um exemplo"]
  },
  "suporte": {
    content: "🎯 **Suporte Completo para Alunos:**\n\n💬 **Chat 24/7** - Resposta em até 2 horas\n📧 **Email** - contato@edupro.com\n📱 **WhatsApp** - (11) 9999-9999\n🎥 **Fórum da Comunidade** - Tire dúvidas com outros alunos\n\n**Nossos especialistas ajudam com:**\n• Dúvidas sobre o conteúdo\n• Problemas técnicos\n• Orientação de carreira\n• Certificados\n\nComo posso ajudar você agora?",
    suggestions: ["Problema técnico", "Dúvida sobre conteúdo", "Falar com especialista"]
  },
  "default": {
    content: "Desculpe, não entendi bem sua pergunta. 😅 Mas estou aqui para ajudar! Posso te auxiliar com:\n\n📚 Informações sobre cursos\n💳 Dúvidas sobre pagamento\n📜 Certificados\n🎯 Suporte técnico\n\nO que você gostaria de saber?",
    suggestions: ["Ver cursos", "Formas de pagamento", "Falar com humano"]
  }
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Olá! 👋 Eu sou a Ana, sua assistente virtual da EduPro. Como posso ajudar você hoje?',
      timestamp: new Date(),
      suggestions: ["Ver cursos disponíveis", "Dúvidas sobre pagamento", "Como funciona a plataforma"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(content.toLowerCase());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): { content: string; suggestions?: string[] } => {
    const keywords = Object.keys(aiResponses);
    const foundKeyword = keywords.find(keyword => 
      input.includes(keyword) || keyword.includes(input.split(' ')[0])
    );
    
    return aiResponses[foundKeyword || 'default'];
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'mostrar-cursos':
        sendMessage('cursos');
        break;
      case 'mais-vendidos':
        sendMessage('marketing');
        break;
      case 'pagamento':
        sendMessage('pagamento');
        break;
      case 'faq':
        sendMessage('suporte');
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 shadow-lg relative"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-24 right-4 z-50 w-auto max-w-md sm:inset-x-auto sm:right-6 sm:w-96 md:max-w-lg">
          <Card className="shadow-2xl border-brand-200 h-[70vh] sm:h-auto max-h-[80vh] flex flex-col">
            <CardHeader className="bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-t-lg pb-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-white text-base sm:text-lg truncate">Ana - IA Assistant</CardTitle>
                    <div className="flex items-center space-x-1 text-brand-100 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="truncate">Online agora</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Quick Actions */}
              <div className="p-3 sm:p-4 border-b border-gray-100 flex-shrink-0">
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="flex items-center space-x-1 text-xs h-7 sm:h-8 px-2 sm:px-3"
                    >
                      <action.icon className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-3 sm:p-4 min-h-0">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user'
                            ? 'bg-brand-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {message.type === 'user' ? <User className="w-3 h-3 sm:w-4 sm:h-4" /> : <Bot className="w-3 h-3 sm:w-4 sm:h-4" />}
                        </div>
                        <div className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2 ${
                          message.type === 'user'
                            ? 'bg-brand-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">{message.content}</div>
                          <div className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-brand-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Suggestions */}
                  {messages.length > 0 && messages[messages.length - 1].type === 'ai' && messages[messages.length - 1].suggestions && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
                      {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-6 sm:h-7 px-2 sm:px-3 rounded-full border-brand-200 text-brand-700 hover:bg-brand-50"
                        >
                          <span className="truncate max-w-[120px] sm:max-w-none">{suggestion}</span>
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-gray-100 flex-shrink-0">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                    placeholder="Digite sua pergunta..."
                    className="flex-1 border-gray-200 focus:border-brand-500 text-sm sm:text-base"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-brand-600 hover:bg-brand-700 px-3 sm:px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-brand-500 flex-shrink-0" />
                    <span className="hidden sm:inline">Resposta em segundos</span>
                    <span className="sm:hidden">Rápido</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span className="hidden sm:inline">Disponível 24/7</span>
                    <span className="sm:hidden">24/7</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
