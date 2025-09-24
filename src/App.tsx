import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Missions from "./pages/Missions";
import PlayerOne from "./pages/PlayerOne";
import Guild from "./pages/Guild";
import BossFights from "./pages/BossFights";
import StartQuest from "./pages/StartQuest";
import WallOfFame from "./pages/WallOfFame";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/player-1" element={<PlayerOne />} />
          <Route path="/guild" element={<Guild />} />
          <Route path="/boss-fights" element={<BossFights />} />
          <Route path="/start-quest" element={<StartQuest />} />
          <Route path="/wall-of-fame" element={<WallOfFame />} />
          <Route path="/blog" element={<Blogs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
