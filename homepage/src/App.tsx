import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, BarChart3, MessageSquare, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardMetrics from './components/DashboardMetrics';
import SkillsAnalysis from './components/SkillsAnalysis';
import AIChat from './components/AIChat';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeView, setActiveView] = React.useState('dashboard');
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'ai-analysis':
        return <SkillsAnalysis />;
      case 'courses':
        return (
          <div className="glass rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Course Management</h2>
            <p className="text-muted-foreground">Your courses will appear here.</p>
          </div>
        );
      case 'analytics':
        return <DashboardMetrics />;
      case 'chat':
        return <AIChat />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <DashboardMetrics />
            </div>
            <SkillsAnalysis />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                AI Curriculum Mapper
              </h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {user?.email}
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg glass hover:bg-accent/50 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;