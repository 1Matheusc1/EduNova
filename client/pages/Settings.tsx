import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { BookOpen, User, Bell, Shield, CreditCard, Download, Trash2, Camera, Save, Lock, Mail, Phone, Globe, Eye, Moon, Sun, Volume2, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ShoppingCart from "@/components/ShoppingCart";

export default function Settings() {
  const { state, updateProfile, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    bio: state.user?.bio || '',
    phone: '',
    website: '',
    location: ''
  });
  const [notifications, setNotifications] = useState({
    emailCourses: true,
    emailMarketing: false,
    pushNotifications: true,
    weeklyDigest: true,
    courseReminders: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showProgress: true,
    showCertificates: true,
    allowMessages: true
  });
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'pt',
    autoplay: true,
    playbackSpeed: '1.0'
  });
  const [saveMessage, setSaveMessage] = useState('');

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-navy-900 mb-2">Área Restrita</h2>
            <p className="text-navy-600 mb-6">Faça login para acessar as configurações da sua conta.</p>
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

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    updateProfile({
      name: profileData.name,
      bio: profileData.bio
    });
    setSaveMessage('Perfil atualizado com sucesso!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePreferenceChange = (setting: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e você perderá acesso a todos os seus cursos e progresso.'
    );
    if (confirmed) {
      const doubleConfirm = window.confirm(
        'Esta é sua última chance! Tem ABSOLUTA certeza que deseja excluir permanentemente sua conta?'
      );
      if (doubleConfirm) {
        logout();
        alert('Conta excluída com sucesso. Sentiremos sua falta! 😢');
        window.location.href = '/';
      }
    }
  };

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
              <a href="/social" className="text-navy-600 hover:text-brand-600 transition-colors">Comunidade</a>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Configurações</h1>
          <p className="text-navy-600">Gerencie sua conta e preferências da plataforma</p>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">
              {saveMessage}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="privacy">Privacidade</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
            <TabsTrigger value="account">Conta</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais que serão exibidas no seu perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={state.user?.avatar} alt={state.user?.name} />
                    <AvatarFallback className="text-2xl">{state.user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>Alterar Foto</span>
                    </Button>
                    <p className="text-sm text-navy-600">JPG, PNG ou GIF. Máximo 5MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      disabled
                    />
                    <p className="text-xs text-navy-500">O email não pode ser alterado</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleProfileChange('website', e.target.value)}
                      placeholder="https://seusite.com"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      placeholder="São Paulo, SP, Brasil"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      placeholder="Conte um pouco sobre você..."
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                      maxLength={500}
                    />
                    <p className="text-xs text-navy-500">{profileData.bio.length}/500 caracteres</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="bg-brand-600 hover:bg-brand-700">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Escolha como e quando você quer receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Novos Cursos e Atualizações</Label>
                      <p className="text-sm text-navy-600">Receba emails sobre novos cursos e atualizações de conteúdo</p>
                    </div>
                    <Switch
                      checked={notifications.emailCourses}
                      onCheckedChange={(checked) => handleNotificationChange('emailCourses', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Marketing e Promoções</Label>
                      <p className="text-sm text-navy-600">Receba ofertas especiais e promoções exclusivas</p>
                    </div>
                    <Switch
                      checked={notifications.emailMarketing}
                      onCheckedChange={(checked) => handleNotificationChange('emailMarketing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Notificações Push</Label>
                      <p className="text-sm text-navy-600">Receba notificações no navegador</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Resumo Semanal</Label>
                      <p className="text-sm text-navy-600">Receba um resumo do seu progresso toda semana</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Lembretes de Curso</Label>
                      <p className="text-sm text-navy-600">Receba lembretes para continuar seus cursos</p>
                    </div>
                    <Switch
                      checked={notifications.courseReminders}
                      onCheckedChange={(checked) => handleNotificationChange('courseReminders', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Privacidade</CardTitle>
                <CardDescription>
                  Controle quem pode ver suas informações e atividades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Perfil Público</Label>
                      <p className="text-sm text-navy-600">Permite que outros usuários vejam seu perfil</p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Mostrar Progresso</Label>
                      <p className="text-sm text-navy-600">Exibir seu progresso nos cursos publicamente</p>
                    </div>
                    <Switch
                      checked={privacy.showProgress}
                      onCheckedChange={(checked) => handlePrivacyChange('showProgress', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Mostrar Certificados</Label>
                      <p className="text-sm text-navy-600">Exibir seus certificados no perfil público</p>
                    </div>
                    <Switch
                      checked={privacy.showCertificates}
                      onCheckedChange={(checked) => handlePrivacyChange('showCertificates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Permitir Mensagens</Label>
                      <p className="text-sm text-navy-600">Permite que outros usuários enviem mensagens privadas</p>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => handlePrivacyChange('allowMessages', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências da Plataforma</CardTitle>
                <CardDescription>
                  Personalize sua experiência de aprendizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange('theme', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center space-x-2">
                            <Sun className="w-4 h-4" />
                            <span>Claro</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center space-x-2">
                            <Moon className="w-4 h-4" />
                            <span>Escuro</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="auto">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4" />
                            <span>Automático</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Velocidade de Reprodução</Label>
                    <Select value={preferences.playbackSpeed} onValueChange={(value) => handlePreferenceChange('playbackSpeed', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5x</SelectItem>
                        <SelectItem value="0.75">0.75x</SelectItem>
                        <SelectItem value="1.0">1.0x (Normal)</SelectItem>
                        <SelectItem value="1.25">1.25x</SelectItem>
                        <SelectItem value="1.5">1.5x</SelectItem>
                        <SelectItem value="2.0">2.0x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Reprodução Automática</Label>
                      <p className="text-sm text-navy-600">Próxima aula inicia automaticamente</p>
                    </div>
                    <Switch
                      checked={preferences.autoplay}
                      onCheckedChange={(checked) => handlePreferenceChange('autoplay', checked.toString())}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>
                  Gerencie a segurança e acesso da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Alterar Email
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Autenticação em Duas Etapas
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Dados da Conta
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessões Ativas</CardTitle>
                <CardDescription>
                  Dispositivos conectados à sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Navegador Atual</div>
                        <div className="text-sm text-navy-600">Chrome • São Paulo, SP • Agora</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Ativo</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
                <CardDescription>
                  Ações irreversíveis para sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Excluir Conta</h4>
                  <p className="text-sm text-red-700 mb-4">
                    Esta ação não pode ser desfeita. Todos os seus dados, progresso e certificados serão permanentemente removidos.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Conta Permanentemente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
