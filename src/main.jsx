import React, { useState }  from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react'


export const server =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1";
 
if (server === "https://todo-backend-stgg.onrender.com/api/v1") {
  console.log(server);
} else {
  console.log(server);
}
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Context.Provider value={{
      isAuthenticated,
      setIsAuthenticated
    }}>
      <App />
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
