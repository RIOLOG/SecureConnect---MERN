import React , {useContext, useState} from 'react'
// import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../App";



const Login = () => {

  const {state,dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const loginuser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });


    const data = res.json();

    if (res.status === 400 || !data)
    {
      window.alert("LOGIN failed");
    }
    else
    {
      dispatch({type:"USER",payload:true})
      window.alert("LOGIN success");
      navigate("/");
    }

  }


  return (
    <>

<section className="sign-in">
        <div className='container mt-5'>
          <div className='sign-in-content'>

               {/* <div className='sign-in-image'>
                <figure>
                  <img src={signin} alt='registration pic'/>
                </figure>
                <NavLink to="/signup" className="sign-in-image-link">create account</NavLink>
              </div> */}

            <div className='sign-in-form'>
              <h2 className='form-title'>Sign In</h2>
              <form method="POST" className='register-form' id='register-form'>


                <div className='form-group'>
                  <label htmlFor='email'>
                  <i className="zmdi zmdi-account-o material-icons-name"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete='off'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Your Email'
                  />
                </div>




                <div className='form-group'>
                  <label htmlFor='password'>
                  <i className="zmdi zmdi-account-o material-icons-name"></i>
                  </label>
                  <input type="password" name="password" id="password" autoComplete='off'
                  value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Your passowrd'
                  />
                </div>


                <div className='form-group form-button'>
                  <input type="submit" name="sign-in" id="sign-in" className='form-submit'
                    value="LogIn"
                      onClick={loginuser}
                    />
                </div>
                
              </form>
              </div>
           
          </div>
        </div>
      </section>


    </>
  )
}

export default Login