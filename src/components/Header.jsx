import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
function Header() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  
    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(`${server}/user/logout`, {
                withCredentials: true,
            });
            toast.success(data.message);
            setIsAuthenticated(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
        }
    };  
  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
            isAuthenticated ? (
                <button onClick={logoutHandler} className='btn'>Logout</button>
            ):(
            <Link to={"/login"}>Login</Link>
            )
        }
      </article>
    </nav>
  );
}

export default Header
