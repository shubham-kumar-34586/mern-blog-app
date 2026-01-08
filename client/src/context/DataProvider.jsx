import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔥 HYDRATE AUTH ON REFRESH
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    const name = localStorage.getItem("name");

    if (token && username) {
      setIsAuthenticated(true);
      setAccount({ username, name });
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
