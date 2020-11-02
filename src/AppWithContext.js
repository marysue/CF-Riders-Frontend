import React, { useState, useEffect }  from 'react';

import UserContext from './UserContext';
import App from './App';

const AppWithContext = (props) => {
    const [token, setToken] = useState('');

    useEffect(() => {
      (async() => {
        const localToken = window.localStorage.getItem("token");
        if (localToken) {
           setToken(localToken);
        }
      })();
    }, [setToken]);

    const needLogin = !token;

    const value = {
        token,
        setToken,
        needLogin
    }

    return (
        <UserContext.Provider value={value}>
            <App />
        </UserContext.Provider>
    );
};

export default AppWithContext;
