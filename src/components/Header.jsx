import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  
  const logoutHandler = async () => {
    setLoading(true);
        try {
            const { data } = await axios.get(`${server}/user/logout`, {
                withCredentials: true,
            });
            toast.success(data.message);
            setIsAuthenticated(false);
            setLoading(false); 
        } catch (error) {
            toast.error(error.response.data.message);
          setIsAuthenticated(true);
          setLoading(false);
        }
    };  
  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
       {isAuthenticated && (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        )}
      </article>
    </nav>
  );
}

export default Header
