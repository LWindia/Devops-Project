// src/components/ui/use-toast.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

type ToastType = {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'success' | 'destructive' | 'warning';
};

type ToastContextType = {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...toast }]);
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 3000);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded shadow-md flex justify-between items-start ${
              toast.variant === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-800' :
              toast.variant === 'destructive' ? 'bg-red-100 border-l-4 border-red-500 text-red-800' :
              toast.variant === 'warning' ? 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800' :
              'bg-white border-l-4 border-blue-500 text-gray-800'
            }`}
          >
            <div>
              {toast.title && <p className="font-medium text-sm">{toast.title}</p>}
              {toast.description && <p className="text-xs mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const toast = {
  custom: (props: Omit<ToastType, 'id'>) => {
    // This is a workaround since we can't use hooks outside of components
    // In a real application, you should use the useToast hook inside components
    const toastEvent = new CustomEvent('toast', { detail: props });
    document.dispatchEvent(toastEvent);
  },
  success: (message: string | Omit<ToastType, 'id' | 'variant'>) => {
    const props = typeof message === 'string' 
      ? { description: message, variant: 'success' as const } 
      : { ...message, variant: 'success' as const };
    toast.custom(props);
  },
  error: (message: string | Omit<ToastType, 'id' | 'variant'>) => {
    const props = typeof message === 'string' 
      ? { description: message, variant: 'destructive' as const } 
      : { ...message, variant: 'destructive' as const };
    toast.custom(props);
  },
};

// Event listener component to handle toast events
export const ToastListener = () => {
  const { addToast } = useToast();
  
  React.useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<Omit<ToastType, 'id'>>;
      addToast(customEvent.detail);
    };
    
    document.addEventListener('toast', handleToast);
    return () => {
      document.removeEventListener('toast', handleToast);
    };
  }, [addToast]);
  
  return null;
};