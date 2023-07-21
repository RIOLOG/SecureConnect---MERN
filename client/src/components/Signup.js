import React , {useState} from 'react';
// import signin from "../images/signin.jpg"
// import { NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  });


  let name,value;

  const handleInputs = (e) =>{
    //console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value})

  }

  const PostData = async (e) =>{
    e.preventDefault();


    const {name,email,phone,work,password,cpassword} = user;
    // console.log(name);

    //frontend to backend
    const res = await fetch("/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,work,password,cpassword
      })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 422 || !data)
    {
      window.alert("Registration failed");
      console.log("Registration failed");
    }
    else
    {
      window.alert("Registration success");
      // console.log("Registration success");
      navigate("/login");
    }

  }


  return (
    <>

      <section className="signup">
        <div className='container mt-5'>
          <div className='signup-content'>
            <div className='signup-form'>
              <h2 className='form-title'>Sign up</h2>
              <form method="POST" className='register-form' id='register-form'>

                <div className='form-group'>
                  <label htmlFor='name'>
                  <i className="zmdi zmdi-account-o material-icons-name"></i>
                  </label>
                  <input type="text" name="name" id="name" autoComplete='off'
                    value={user.name}
                    onChange={handleInputs}
                    placeholder='Enter Your Name'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email'>
                  <i className="zmdi zmdi-account-o material-icons-name"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete='off'
                      value={user.email}
                      onChange={handleInputs}
                    placeholder='Enter Your Email'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='phone'>
                  <i className="zmdi zmdi-account-o material-icons-name"></i>
                  </label>
                  <input type="number" name="phone" id="phone" autoComplete='off'
                      value={user.phone}
                      onChange={handleInputs}
                    placeholder='Enter Your phone number'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='work'>
                  <i className="zmdi zmdi-account-o material-icons-name"></i>
                  </label>
                  <input type="text" name="work" id="work" autoComplete='off'
                    value={user.work}
                    onChange={handleInputs}
                    placeholder='Enter Your Profession'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='passwprd'>
                  <i className="zmdi zmdi-account-o material-icons-name"></i>
                  </label>
                  <input type="password" name="password" id="password" autoComplete='off'
                    value={user.password}
                    onChange={handleInputs}
                    placeholder='Enter Your passowrd'
                  />
                </div>

                
                <div className='form-group'>
                  <label htmlFor='cpasswprd'>
                  <i className="zmdi zmdi-account-o material-icons-name"></i>
                  </label>
                  <input type="cpassword" name="cpassword" id="cpassword" autoComplete='off'
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder='Confirm Password'
                  />
                </div>

                <div className='form-group form-button'>
                  <input type="submit" name="signup" id="signup" className='form-submit'
                    value="register" onClick={PostData}
                    />
                </div>
                
              </form>
              </div>


              {/* <div className='signup-image'>
                <figure>
                  <img src={signin} alt='registration pic'/>
                </figure>
                <NavLink to="/login" classNam="signup-image-link">I am Already Registered</NavLink>
              </div> */}


           
          </div>
        </div>
      </section>

    
    </>
  )
}

export default Signup