import React, { useState, createContext, useContext } from "react";

const BoxContext = createContext();

export const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <BoxContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {children}
      </div>
    </BoxContext.Provider>
  );
};

export const useBoxContext = () => {
  return useContext(BoxContext);
};
