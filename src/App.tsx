import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Scanner from "./pages/Scanner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Benefits from "./pages/Benefits";
import SecurityCenter from "./pages/SecurityCenter";
import Settings from "./pages/Settings";
import CadastroUsuario from "./pages/CadastroUsuario";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import AboutChatbot from "./pages/AboutChatbot";
import Assinatura from "./pages/Assinatura";
import NotFound from "./pages/NotFound";
import HistoricoCompras from "./pages/HistoricoCompras";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/dicas" element={<SecurityCenter />} />
        <Route path="/security-center" element={<SecurityCenter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about-chatbot" element={<AboutChatbot />} />
        <Route path="/assinatura" element={<Assinatura />} />
        {/* Protected routes */}
        <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/cadastro-usuario" element={<ProtectedRoute><CadastroUsuario /></ProtectedRoute>} />
        <Route path="/historico-compras" element={<ProtectedRoute><HistoricoCompras /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
