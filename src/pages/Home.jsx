import React, { useEffect, useState } from 'react'
import { server } from "../main";
import axios from 'axios';
import toast from 'react-hot-toast';
import Todoitems from '../components/Todoitems';
import { Context } from '../main';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  
  const updateHandler = async (id) => {
    
    try {
       setTasks((prevTasks) =>
         prevTasks.map((task) =>
           task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
         )
       );
      const { data } = await axios.put(`${server}/task/${id}`, {}, {
        withCredentials: true
      });
      toast.success(data.message)
      setRefresh((prev) => !prev);
      
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }
  const deleteHandler = async (id) => { 
   try {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true
      });
      toast.success(data.message)
      setRefresh((prev) => !prev);
      
    } catch (error) {
      toast.error(error.response.data.message);
     
    } 
  }
  const submitHandler = async (event) => {
    event.preventDefault();
   try {
     setTasks((prevTasks) => [
       ...prevTasks,
       {
         _id: Date.now(),
         title,
         description,
         isCompleted: false, 
       },
     ]);

     const { data } = await axios.post(
       `${server}/task/new`,
       {
         title,
         description,
       },
       {
         withCredentials: true,
         headers: {
           "Content-Type": "application/json",
         },
       }
     );

     setTasks((prevTasks) =>
       prevTasks.map((task) =>
         task._id === Date.now() ? { ...task, _id: data.task._id } : task
       )
     );

     setTitle("");
     setDescription("");
     toast.success(data.message);
    
   } catch (error) {
      toast.error(error.response.data.message);

    setTasks((prevTasks) =>
       prevTasks.filter((task) => task._id !== Date.now())
     );

     
   }
  }
  useEffect(() => {
    axios.get(`${server}/task/my`, {
      withCredentials: true,
    }).then((response) => { 
      setTasks(response.data.taskOfUser);
      console.log(response.data.taskOfUser);
    }).catch((error) => { 
      toast.error(error.response.data.message);
    })  
  }, [refresh])
  if(!isAuthenticated) return navigate("/");
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
            />
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description"
            />
            <button type="submit" disabled={loading} className="login-btn">
              ADD TASK
            </button>
          </form>
        </section>
      </div>
      <section>
        {loading ? (
          <PulseLoader color="#D0D4CA" loading={loading} size={40} />
        ) : (
          <div className='todo-cont'>
           {
            tasks.map((task) => (
            <div key={task._id} className="todo-item">
              <Todoitems
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
                id={task._id}
              />
            </div>
            ))
            }
          </div>
        )}
      </section>
    </div>
  );
}

export default Home
