import React, { useState, createContext } from "react";
export const DarkMode = createContext();

const DarkModeProvider = (props) => {
  const [toggleDarkMode, setToggleDarkmode] = useState();

  function handleToggleDarkMode() {
    return setToggleDarkmode((prev) => !prev);
  }

  return <DarkMode.Provider value={{ toggleDarkMode, handleToggleDarkMode }}>{props.children}</DarkMode.Provider>;
};

export default DarkModeProvider;
