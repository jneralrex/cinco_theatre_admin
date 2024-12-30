import React, { createContext, useState } from "react";

export const GlobalController = createContext();

export const Global = ({children}) => {
  const [addEvent, setAddEvent] = useState("");
  const [addMovie, setAddMovie] = useState("");
  return (
    <GlobalController.Provider
      value={{ addEvent, setAddEvent, addMovie, setAddMovie }}
    >
      {children}
    </GlobalController.Provider>
  );
};

export default Global;
