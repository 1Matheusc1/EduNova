import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Eye, EyeOff, Mail, Lock, ArrowRight, Users } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, state } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const success = await login(formData.email, formData.password);
    
    if (success) {
      navigate('/');
    } else {
      setError('Email ou senha incorretos. Tente: admin@edupro.com / 123456');
    }
  };

  const fillTestCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setFormData({
        email: 'admin@edupro.com',
        password: '123456'
      });
    } else {
      setFormData({
        email: 'usuario@teste.com',
        password: '123456'
      });
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-brand-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-navy-900">EduPro</span>
          </div>
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Bem-vindo de volta!</h1>
          <p className="text-navy-600">Entre na sua conta para continuar aprendendo</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-navy-900">Entrar</CardTitle>
            <CardDescription className="text-center text-navy-600">
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Demo Credentials */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => fillTestCredentials('admin')}
                className="border-brand-200 text-brand-700 hover:bg-brand-50"
              >
                <Users className="w-4 h-4 mr-1" />
                Admin
              </Button>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => fillTestCredentials('user')}
                className="border-brand-200 text-brand-700 hover:bg-brand-50"
              >
                <Users className="w-4 h-4 mr-1" />
                Usuário
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 border-gray-200 focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 border-gray-200 focus:border-brand-500 focus:ring-brand-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700 text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-6 text-lg"
                disabled={state.isLoading}
              >
                {state.isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Entrar</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Forgot Password */}
            <div className="text-center">
              <button 
                type="button"
                className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
                onClick={() => alert('Funcionalidade em desenvolvimento!')}
              >
                Esqueceu sua senha?
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-navy-600">
                Não tem uma conta?{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-brand-600 hover:text-brand-700 font-medium hover:underline"
                >
                  Cadastre-se agora
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mx-auto">
              <BookOpen className="w-5 h-5 text-brand-600" />
            </div>
            <p className="text-xs text-navy-600">186+ Cursos</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mx-auto">
              <Users className="w-5 h-5 text-brand-600" />
            </div>
            <p className="text-xs text-navy-600">10k+ Alunos</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mx-auto">
              <ArrowRight className="w-5 h-5 text-brand-600" />
            </div>
            <p className="text-xs text-navy-600">Acesso Vitalício</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-navy-600 hover:text-brand-600"
          >
            ← Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
}
