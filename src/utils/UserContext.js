import { useContext } from "react";
import { createContext, useState } from "react";

export const userContext = createContext({
    username: null,
    logIn: () => { },
    logOut : () => { },
});


export function UserContextProvider({ children }) {
    const [username, setUsername] = useState();
    function logIn(name) {
        setUsername(name);
    }
    function logOut() {
        setUsername(null);
    }
    return (
        <userContext.Provider value={{username, logIn, logOut}}>
            {children}
        </userContext.Provider>
    );
    
}

export function useUserContext(){
    const {username, logIn, logOut} = useContext(userContext);

    return {username, logIn, logOut};
}