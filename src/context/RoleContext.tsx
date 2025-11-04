// src/context/RoleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Role } from '../components/Sidebar';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within RoleProvider');
  return context;
};

interface RoleProviderProps {
  children: ReactNode;
  initialRole?: Role;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children, initialRole = 'admin' }) => {
  const [role, setRole] = useState<Role>(initialRole);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
