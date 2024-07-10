import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Settings, GitBranch } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/navbar";
import Index from "./pages/Index";
import ConfigureAPI from "./pages/ConfigureAPI";
import TaskTree from "./pages/TaskTree";
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Configure API",
    to: "/configure-api",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "Task Tree",
    to: "/task-tree",
    icon: <GitBranch className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="configure-api" element={<ConfigureAPI />} />
              <Route path="task-tree" element={<TaskTree />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;