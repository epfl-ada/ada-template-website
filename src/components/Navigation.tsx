import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dataset-methods', label: 'Data & Methods', icon: null },
    { path: '/rq1-spatial', label: 'Spatial Analysis', icon: null },
    { path: '/rq2-temporal', label: 'Temporal Evolution', icon: null },
    { path: '/rq3-celltypes', label: 'Cell-Type Vulnerability', icon: null },
    { path: '/about', label: 'About', icon: Users },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#050814]/90 backdrop-blur-lg border-b border-blue-900/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Brain className="size-8 text-blue-500 group-hover:text-purple-500 transition-colors" />
            <span className="gradient-text">Alzheimer's Energy Crisis</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-slate-300 hover:text-blue-400 hover:bg-blue-600/10'
                  }`}
                >
                  {Icon && <Icon className="size-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
