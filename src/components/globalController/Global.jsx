import React, { createContext, useState } from "react";

export const GlobalController = createContext();

export const Global = ({children}) => {
  const [addEvent, setAddEvent] = useState("");
  const [addMovie, setAddMovie] = useState("");
  const [addTheatreAdmin, setAddTheatreAdmin] = useState("");
  const [addScreen, setAddScreen] = useState("");
  const [addTheatre, setAddTheatre] = useState("");


  return (
    <GlobalController.Provider
      value={{ addEvent, setAddEvent, addMovie, setAddMovie, addTheatreAdmin, setAddTheatreAdmin, addTheatre, setAddTheatre, addScreen, setAddScreen, }}
    >
      {children}
    </GlobalController.Provider>
  );
};

export default Global;
