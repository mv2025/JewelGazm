import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'success', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast container portal */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => {
            const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? AlertCircle : Info;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-sm border shadow-lg bg-surface text-primary transition-luxury ${
                  toast.type === 'success'
                    ? 'border-gold/30 bg-surface/95 backdrop-blur-md'
                    : toast.type === 'error'
                    ? 'border-red-500/20 bg-red-50/95 dark:bg-red-950/25'
                    : 'border-border bg-surface/95 backdrop-blur-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 shrink-0 ${
                    toast.type === 'success' ? 'text-gold' : toast.type === 'error' ? 'text-red-500' : 'text-primary'
                  }`} />
                  <p className="text-sm font-sans font-medium leading-tight">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-1 hover:bg-surface-hover rounded-full transition-colors text-primary/40 hover:text-primary"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
