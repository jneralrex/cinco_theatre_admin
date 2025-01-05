import React, { createContext, useState } from "react";

export const GlobalController = createContext();

export const Global = ({children}) => {
  const [addEvent, setAddEvent] = useState("");
  const [addMovie, setAddMovie] = useState("");
  const [addTheatreAdmin, setAddTheatreAdmin] = useState("");
  const [addScreen, setAddScreen] = useState("");
  const [addTheatre, setAddTheatre] = useState("");
  const [addTicket, setAddTicket] = useState("");
  const [addAds, setAddAds] = useState("");
  const [addLocation, setAddLocation] = useState("");
  const [addNews, setAddNews] = useState("");
  const [addReport, setAddReport] = useState("");
  return (
    <GlobalController.Provider
      value={{ addEvent, setAddEvent, addMovie, setAddMovie, addTheatreAdmin, setAddTheatreAdmin, addTheatre, setAddTheatre, addScreen, setAddScreen, addTicket, setAddTicket, addAds, setAddAds, addLocation, setAddLocation, addNews, setAddNews, addReport, setAddReport }}
    >
      {children}
    </GlobalController.Provider>
  );
};

export default Global;
