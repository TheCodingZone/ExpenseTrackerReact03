import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Pages/Home.css'

import { useSelector } from 'react-redux/es/hooks/useSelector'
import AuthContext from './auth-context'
const Home = (props) => {
  const isLoggedIn=useSelector(state=>state.auth.isAuthenticated);
  const token=useSelector(state=>state.auth.token);
  
  const[message,setMessage]=useState(false); 
  const[isVerified,setIsVerified]=useState(false);
 
    // const authCtx=useContext(AuthContext);
    console.log(token);
    const verifyEmailHandler=(event)=>{
      event.preventDefault();
      console.log(token);
    
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCXWPLAZ6pK9fLCJJ2u-IE4RT2Ymk71Z68', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ "requestType": "VERIFY_EMAIL", "idToken": token })
})
.then((response) => {
  if (response.ok) {
    setMessage('Check your email, you might have received a verification link. Click on it to verify.');
    setIsVerified(true);
    console.log(response);
  } else {
    console.log(`Error: ${response.status}`);
    setMessage('An error occurred while verifying your email.');
  }
})
.catch((error) => {
  console.log(error);
  
  setMessage('An error occurred while verifying your email.');
});
setTimeout(() => {
      setMessage(null)
    }, 4000);
    }
  return (
    <div className="homepage">
   
    <div className='home'>
        <h4 className='heading'>Welcome To Expense Tracker!!!</h4>
        {isLoggedIn && 
        <div className='heading'>Your Profile is incomplete<Link to='/CompleteProfile'>Complete now</Link></div>

      }
      {isLoggedIn &&  !isVerified && <div>Your Email is not verified.
      
      <button type="button" class="btn btn-link"  onClick={verifyEmailHandler}
      style={{color:'red',fontWeight:'bold',fontStyle:'italic'}}>Verify Email</button>

  </div>}
  <div style={{color:'red',fontWeight:'bold',fontStyle:'italic'}}>{message}</div>
 </div>
 </div>  
  )
}

export default Home
