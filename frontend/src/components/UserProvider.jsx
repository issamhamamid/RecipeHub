import { createContext } from "react";
import { useLocalState } from "../customHooks/useLocalState";

const UserContext = createContext(); // Declare but do not export

const UserProvider = ({ children }) => {
    const [jwt, setJwt] = useLocalState('jwt');

    return (
        <UserContext.Provider value={{ jwt, setJwt }}>
            {children}
        </UserContext.Provider>
    );
};

// Export both the Provider and the Context as part of the same component object
export { UserProvider, UserContext };
