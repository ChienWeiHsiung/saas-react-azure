// LinkContext.js
import React, { createContext, useState } from 'react';

const LinkContext = createContext();

const LinkProvider = ({ children }) => {
    const [pathData, setPathData] = useState([]);

    const addPathData = (path) => {
        setPathData([...pathData, path]);
    };

    const contextValue = {
        pathData,
        addPathData,
    };

    return (
        <LinkContext.Provider value={contextValue}>
            {children}
        </LinkContext.Provider>
    );
};

export { LinkContext, LinkProvider };
