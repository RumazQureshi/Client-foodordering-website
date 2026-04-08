import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <CartProvider>
      <Toaster />
      <Router />
    </CartProvider>
  );
}

export default App;
