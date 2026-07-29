import React, { createContext, useContext, useState } from 'react';

const LeadFormContext = createContext(null);

export const LeadFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLeadForm = () => setIsOpen(true);
  const closeLeadForm = () => setIsOpen(false);

  return (
    <LeadFormContext.Provider value={{ isOpen, openLeadForm, closeLeadForm }}>
      {children}
    </LeadFormContext.Provider>
  );
};

export const useLeadForm = () => useContext(LeadFormContext);
