import React from 'react'
import Loader from '../components/Loader';
import { Context } from '../main';
import { useContext } from 'react';
function Profile() {
   const { isAuthenticated, loading, user} =
     useContext(Context);
  return (
    <div>
      {
        loading ? <Loader /> : (
          <div>
            <h1>{user?.name }</h1>
            <p>{ user?.email }</p>
          </div>
        )
      }
    </div>
  )
}

export default Profile
