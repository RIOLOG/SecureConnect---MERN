import React, {useEffect, useState} from 'react'

const Contact = () => {

  const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""});

  const userContact = async () => {
    try{
      const res = await fetch('/getdata', {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, name: data.name, email:data.email, phone:data.phone});


      if (!res.status === 200)
      {
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
        console.log(err);
    }
  }

  useEffect (() => {
    userContact();
  }, []);


  //storing data:
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value});


  }


  //sending data to backend the connect us data:
  const contactForm = async (e) => {
    e.preventDefault();

    const {name,email,phone,message} = userData;

    const res = await fetch('/contact' , {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,email,phone,message
      })
    });

    const data = await res.json();

    if (!data){
      console.log("message not send");
    }
    else{
      alert("message send");
      setUserData({...userData, message:""});
    }

  }

  return (
    <>
    <div className='contact-info'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1 d-flex'>


            <div className='contact_info_item d-flex justify-content-start align-item-center'>
              <img src='https://img.icons8.com/office/24/00000/iphone.png' alt=''/>
              <div className='contact_info_content'>
                <div className='contact_info_title'>
                Phone
                </div>
                <div className='contact_info_text'>
                  +91 936993XXXX
                </div>
              </div>
            </div>
           

            <div className='email_info_item d-flex justify-content-start align-item-center'>
              <img src='https://img.icons8.com/office/24/00000/iphone.png' alt=''/>
              <div className='contact_info_content'>
                <div className='contact_info_title'>
                Email
                </div>
                <div className='contact_info_text'>
                  heelriolog@gmail.com
                </div>
              </div>
            </div>

            <div className='address_info_item d-flex justify-content-start align-item-center'>
              <img src='https://img.icons8.com/office/24/00000/iphone.png' alt=''/>
              <div className='contact_info_content'>
                <div className='contact_info_title'>
                Address
                </div>
                <div className='contact_info_text'>
                  Uttar Pradesh , India
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>



    <div className='contact_from'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1'>
            <div className='contact_form_containerpy-5'>
              <div className='contact_form_title mt-4'>
                Get in Touch</div>
              <form method="POST" id='contact_form'>
                <div className='contact_form_name d-flex justify-content-between align-items-between mt-4'>

                  <input type="text" id='contact_form_name'
                    className='contact_form_name input_field'
                    name='name'
                    value={userData.name}
                    onChange={handleInputs}
                    placeholder='Your name' required />

                  <input type="email" id='contact_form_email'
                    className='contact_form_email input_field'
                    name='email'
                    value={userData.email}
                    onChange={handleInputs}
                    placeholder='Your Email' required />

                  <input type="number" id='contact_form_phone'
                    className='contact_form_phone input_field'
                    name='phone'
                    value={userData.phone}
                    onChange={handleInputs}
                    placeholder='Your phone number' required />
                </div>

                <div className='contact_form_text mt-5'> 
                  <textarea className='text_field_contact_form_message' 
                  name='message'
                  value={userData.message}
                  onChange={handleInputs}
                  placeholder='Message'
                  cols='30' rows="10"></textarea>
                </div>

              <div className='contact_form_button'>
                <button type='submit' className='button contact_submit_button'
                onClick={contactForm}>Send Message</button>
              </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

    
    </>
  )
}

export default Contact