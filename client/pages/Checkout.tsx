import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BookOpen, CreditCard, Shield, Clock, Check, ArrowLeft, Lock, Tag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function Checkout() {
  const { state: cartState, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cpf: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: '1'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderCompleted(true);
      clearCart();
    }, 3000);
  };

  if (cartState.items.length === 0 && !orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-navy-900 mb-2">Carrinho vazio</h2>
            <p className="text-navy-600 mb-6">Adicione cursos ao seu carrinho antes de finalizar a compra.</p>
            <Button 
              onClick={() => window.location.href = '/cursos'}
              className="bg-brand-600 hover:bg-brand-700"
            >
              Explorar Cursos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Compra realizada com sucesso! 🎉</h2>
            <p className="text-lg text-navy-600 mb-6">
              Parabéns! Seus cursos já estão disponíveis na sua área do aluno.
            </p>
            
            <div className="bg-brand-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-brand-900 mb-3">Próximos passos:</h3>
              <ul className="text-left space-y-2 text-brand-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Confirmação enviada para seu email</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Acesso liberado na área do aluno</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Certificados disponíveis após conclusão</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-brand-600 hover:bg-brand-700"
              >
                Ir para Área do Aluno
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/cursos'}
                className="border-brand-200 text-brand-700"
              >
                Explorar Mais Cursos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-navy-900">EduPro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Checkout Seguro</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Preencha seus dados para finalizar a compra</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome *</Label>
                      <Input 
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="João"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Sobrenome *</Label>
                      <Input 
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Silva"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input 
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input 
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Forma de Pagamento</CardTitle>
                  <CardDescription>Escolha como deseja pagar</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">PIX</div>
                              <div className="text-sm text-green-600">5% de desconto</div>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Instantâneo</Badge>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Cartão de Crédito</div>
                              <div className="text-sm text-gray-600">Até 12x sem juros</div>
                            </div>
                            <Badge variant="outline">Parcelado</Badge>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="boleto" id="boleto" />
                        <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Boleto Bancário</div>
                              <div className="text-sm text-gray-600">Vencimento em 3 dias</div>
                            </div>
                            <Badge variant="outline">À vista</Badge>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Credit Card Form */}
                  {paymentMethod === 'credit' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <Input 
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão *</Label>
                        <Input 
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          placeholder="JOÃO SILVA"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Validade *</Label>
                          <Input 
                            id="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            placeholder="MM/AA"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input 
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            placeholder="000"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="installments">Parcelas</Label>
                          <Select value={formData.installments} onValueChange={(value) => handleInputChange('installments', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x à vista</SelectItem>
                              <SelectItem value="2">2x sem juros</SelectItem>
                              <SelectItem value="3">3x sem juros</SelectItem>
                              <SelectItem value="6">6x sem juros</SelectItem>
                              <SelectItem value="12">12x sem juros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PIX Instructions */}
                  {paymentMethod === 'pix' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Como funciona o PIX:</h4>
                      <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Finalize seu pedido</li>
                        <li>Copie o código PIX ou escaneie o QR Code</li>
                        <li>Pague no app do seu banco</li>
                        <li>Acesso liberado em até 5 minutos</li>
                      </ol>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Terms */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-navy-600 leading-relaxed">
                      Eu aceito os <a href="#" className="text-brand-600 hover:underline">Termos de Uso</a> e a{' '}
                      <a href="#" className="text-brand-600 hover:underline">Política de Privacidade</a> da EduPro.
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Course Items */}
                  <div className="space-y-3">
                    {cartState.items.map((item) => (
                      <div key={item.id} className="flex space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-navy-900 text-sm line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-navy-600">Por {item.instructor}</p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center space-x-1 text-xs text-navy-600">
                              <Clock className="w-3 h-3" />
                              <span>{item.duration}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-brand-600">R$ {item.price}</div>
                              <div className="text-xs text-gray-500 line-through">R$ {item.originalPrice}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-600">Subtotal:</span>
                      <span className="text-navy-900">
                        R$ {cartState.items.reduce((total, item) => total + item.originalPrice, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-600">Desconto nos cursos:</span>
                      <span className="text-green-600">
                        -R$ {cartState.items.reduce((total, item) => total + (item.originalPrice - item.price), 0)}
                      </span>
                    </div>
                    {paymentMethod === 'pix' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-navy-600">Desconto PIX (5%):</span>
                        <span className="text-green-600">-R$ {Math.round(cartState.total * 0.05)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-navy-900">Total:</span>
                      <span className="text-brand-600">
                        R$ {paymentMethod === 'pix' ? Math.round(cartState.total * 0.95) : cartState.total}
                      </span>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <Button 
                    type="submit"
                    form="checkout-form"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-lg py-6"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processando...</span>
                      </div>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Finalizar Compra
                      </>
                    )}
                  </Button>

                  {/* Security */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Pagamento 100% seguro</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      🔒 Seus dados estão protegidos com criptografia SSL
                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-green-700 font-medium text-sm mb-1">
                      Garantia de 30 dias
                    </div>
                    <div className="text-xs text-green-600">
                      Satisfação garantida ou seu dinheiro de volta
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
