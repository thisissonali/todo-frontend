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
    setLoading(true);
    try {
      const { data } = await axios.put(`${server}/task/${id}`, {}, {
        withCredentials: true
      });
      toast.success(data.message)
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  const deleteHandler = async (id) => { 
    setLoading(true);
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true
      });
      toast.success(data.message)
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    } 
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/task/new`, {
        title,
        description,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type":"application/json"
        }
      });
      setTitle("");
      setDescription("");
      toast.success(data.message);
     
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    
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
            <button type="submit" disabled={loading}>
              ADD TASK
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {loading ? (
          <PulseLoader color="#36d7b7" loading={loading} size={150} />
        ) : (
          tasks.map((task) => (
            <div key={task._id}>
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
        )}
      </section>
    </div>
  );
}

export default Home
