import React, { useState, useEffect } from 'react';

export const ActiveContext = React.createContext();

export const ActiveContextProvider = props => {

  const [activeElement, setActiveElement] = useState();
  const [activeModal, setActiveModal] = useState();

  return(
    <ActiveContext.Provider value={{ activeElement, setActiveElement, activeModal, setActiveModal }}>
      {props.children}
    </ActiveContext.Provider>
  );
}