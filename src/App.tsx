import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Package region pages
import Caribe from "./pages/paquetes/Caribe";
import LastMinute from "./pages/paquetes/LastMinute";
import Nacionales from "./pages/paquetes/Nacionales";
import Europa from "./pages/paquetes/Europa";
import DestinosExoticos from "./pages/paquetes/DestinosExoticos";
import EstadosUnidos from "./pages/paquetes/EstadosUnidos";
import AmericaLatina from "./pages/paquetes/AmericaLatina";
import Grupales from "./pages/paquetes/Grupales";
import LunasDeMiel from "./pages/paquetes/LunasDeMiel";

// Dynamic destination page (loads from Supabase)
import DestinationPage from "./pages/paquetes/DestinationPage";

// Template demo for testing
import TemplateDemo from "./pages/paquetes/TemplateDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Package region routes */}
          <Route path="/paquetes/caribe" element={<Caribe />} />
          <Route path="/paquetes/last-minute" element={<LastMinute />} />
          <Route path="/paquetes/nacionales" element={<Nacionales />} />
          <Route path="/paquetes/europa" element={<Europa />} />
          <Route path="/paquetes/exoticos" element={<DestinosExoticos />} />
          <Route path="/paquetes/estados-unidos" element={<EstadosUnidos />} />
          <Route path="/paquetes/america-latina" element={<AmericaLatina />} />
          <Route path="/paquetes/grupales" element={<Grupales />} />
          <Route path="/paquetes/lunas-de-miel" element={<LunasDeMiel />} />
          
          {/* Template demo for testing */}
          <Route path="/paquetes/template-demo" element={<TemplateDemo />} />
          
          {/* Dynamic destination page - handles ALL destinations from Supabase */}
          <Route path="/paquetes/:regionSlug/:destinationSlug" element={<DestinationPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
