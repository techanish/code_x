import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  BookOpen,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeView, setActiveView }) => {
  const { logout } = useAuth();

  const menuItems = [
    { icon: Brain, label: 'AI Analysis', view: 'ai-analysis' },
    { icon: BookOpen, label: 'Courses', view: 'courses' },
    { icon: BarChart3, label: 'Analytics', view: 'analytics' },
    { icon: MessageSquare, label: 'Chat', view: 'chat' },
    { icon: Settings, label: 'Settings', view: 'settings' }, // ✅ Ensure Settings view works
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.aside
      initial={{ width: isOpen ? 240 : 80 }}
      animate={{ width: isOpen ? 240 : 80 }}
      className="h-screen sticky top-0 glass border-r border-border"
    >
      <div className="p-4 flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
            >
              CODE X
            </motion.span>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform ${!isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveView(item.view)} // ✅ Ensure it updates activeView correctly
              className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors group ${
                activeView === item.view ? 'bg-accent/50' : ''
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                activeView === item.view ? 'text-primary' : 'text-muted-foreground'
              } group-hover:text-primary transition-colors`} />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors group"
          >
            <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
