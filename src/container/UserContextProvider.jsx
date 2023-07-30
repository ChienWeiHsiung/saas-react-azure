import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [factoryData, setFactoryData] = useState([]);
  const [factoryClickedIndex, setFactoryClickedIndex] = useState({});
  const [equipmentClicked, setEquipmentClicked] = useState({});

  return (
    <UserContext.Provider value={{
      userName, setUserName,
      factoryClickedIndex, setFactoryClickedIndex,
      factoryData, setFactoryData,
      equipmentClicked, setEquipmentClicked
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export { UserContext };
