import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, X, Trash2, CreditCard, Clock, Tag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const CartToggle = () => {
  const { state, toggleCart } = useCart();

  return (
    <Button 
      variant="outline" 
      onClick={toggleCart}
      className="relative border-navy-200 text-navy-700 hover:bg-navy-50"
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      Carrinho
      {state.itemCount > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-brand-600 text-white text-xs w-5 h-5 flex items-center justify-center p-0">
          {state.itemCount}
        </Badge>
      )}
    </Button>
  );
};

export const CartSidebar = () => {
  const { state, removeFromCart, clearCart, closeCart } = useCart();

  if (!state.isOpen) return null;

  const handleCheckout = () => {
    window.location.href = '/checkout';
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform">
        <Card className="h-full rounded-none border-l border-gray-200">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Carrinho ({state.itemCount})</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={closeCart}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {state.items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div>
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Carrinho vazio</h3>
                  <p className="text-navy-600 mb-4">Adicione cursos ao seu carrinho para continuar</p>
                  <Button 
                    onClick={closeCart}
                    className="bg-brand-600 hover:bg-brand-700"
                  >
                    Explorar Cursos
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <Card key={item.id} className="border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-navy-900 text-sm line-clamp-2 mb-1">
                                {item.title}
                              </h4>
                              <p className="text-xs text-navy-600 mb-2">
                                Por {item.instructor}
                              </p>
                              <div className="flex items-center space-x-2 text-xs text-navy-600">
                                <Clock className="w-3 h-3" />
                                <span>{item.duration}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 mb-1">
                                <span className="font-semibold text-brand-600">R$ {item.price}</span>
                                <span className="text-xs text-gray-500 line-through">R$ {item.originalPrice}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>

                {/* Cart Summary */}
                <div className="border-t border-gray-100 p-4 space-y-4">
                  {/* Savings */}
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-700">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Você está economizando R$ {state.items.reduce((total, item) => total + (item.originalPrice - item.price), 0)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-600">Subtotal:</span>
                      <span className="text-navy-900">R$ {state.total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-navy-600">Desconto:</span>
                      <span className="text-green-600">
                        -R$ {state.items.reduce((total, item) => total + (item.originalPrice - item.price), 0)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-navy-900">Total:</span>
                      <span className="text-brand-600">R$ {state.total}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-lg py-6"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Finalizar Compra
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={clearCart}
                      className="w-full border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      Limpar Carrinho
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <div className="text-center text-xs text-gray-500">
                    🔒 Pagamento 100% seguro
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default function ShoppingCart() {
  return (
    <>
      <CartToggle />
      <CartSidebar />
    </>
  );
}
