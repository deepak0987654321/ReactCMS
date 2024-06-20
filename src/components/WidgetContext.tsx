// src/components/WidgetContext.tsx
import React, { createContext, useContext } from "react";

interface WidgetContextProps {
  isEditMode: boolean;
}

const WidgetContext = createContext<WidgetContextProps | undefined>(undefined);

export const WidgetContextProvider: React.FC<{ value: WidgetContextProps }> = ({
  value,
  children,
}) => {
  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  );
};

export const useWidgetContext = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error(
      "useWidgetContext must be used within a WidgetContextProvider"
    );
  }
  return context;
};
