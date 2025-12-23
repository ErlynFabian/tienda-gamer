import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "@/context/StoreContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Configurator from "./pages/Configurator";
import NotFound from "./pages/NotFound";
import SobreNosotros from "./pages/SobreNosotros";
import Garantia from "./pages/Garantia";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

import { AdminLayout } from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminCategories from "@/pages/admin/Categories";
import AdminReports from "@/pages/admin/Reports";
import AdminSettings from "@/pages/admin/Settings";
import AdminBuilder from "@/pages/admin/Builder";
import { ProductsSection } from "@/components/admin/ProductsSection";
import { SalesSection } from "@/components/admin/SalesSection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/arma-tu-pc" element={<Configurator />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ProductsSection />} />
                <Route path="builder" element={<AdminBuilder />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="sales" element={<SalesSection />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/garantia" element={<Garantia />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
            <Route path="/" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </StoreProvider>
  </QueryClientProvider>
);

export default App;
