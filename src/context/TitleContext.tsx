'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of our context
type TitleContextType = {
  title: string;
  setTitle: (title: string) => void;
};

// Create the context with a default value
const TitleContext = createContext<TitleContextType | undefined>(undefined);

// Props for the TitleProvider component
type TitleProviderProps = {
  children: ReactNode;
  defaultTitle?: string;
};

// Create the provider component
export function TitleProvider({ 
  children, 
  defaultTitle = 'Josh Peterson | Developer Blog' 
}: TitleProviderProps) {
  const [title, setTitle] = useState<string>(defaultTitle);

  // Update the document title whenever the title state changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  }, [title]);

  // Provide the title state and updater function to children
  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}

// Create a custom hook for easy access to the title context
export function useTitle(): TitleContextType {
  const context = useContext(TitleContext);
  if (context === undefined) {
    throw new Error('useTitle must be used within a TitleProvider');
  }
  return context;
}
