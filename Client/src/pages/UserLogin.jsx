import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {loginUser} from  '../redux/slices/userSlice'
import toast from 'react-hot-toast';
function UserLogin() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loginDetail,setLoginDetail]=useState({
        email:'',
        password:'',
    })
    const handleUserInput=(e)=>{
        e.preventDefault();
      const {name,value}=e.target;
     setLoginDetail({
        ...loginDetail,
        [name]: value,
     })
    }
    const loginHandler=async (e)=>{
        e.preventDefault();
        if(!loginDetail.email || !loginDetail.password ){
             toast.error('please enter email and password');
             return;
        }

        const response =await  dispatch(loginUser(loginDetail));
        if (response?.payload?.data?.success) {
            navigate('/');
       }
       setLoginDetail({
           email: '',
           password: '',
       })
    }
    return (
        <div className="  m-auto w-[100%]  h-[100vh] flex    items-center   justify-evenly  gap-2  bg-gradient-to-r from-cyan-500 to-blue-200 select-none" >
            <form onSubmit={loginHandler} className='    flex  flex-col    text-white      rounded-lg  w-[50%]' >
                <h1 className='text-2xl  text-center   '> Login </h1>
                <input type="text" 
                placeholder='email id '
                name='email'
                value={loginDetail.email}
                onChange={handleUserInput}
                    className='  p-1 m-3  bg-transparent  border-b-2  border-white  placeholder:text-white' />
                <input type="password" 
                placeholder='password'
                name='password'
                value={loginDetail.password}
                onChange={handleUserInput}
                    className='  p-1 m-3  bg-transparent   border-b-2 border-white placeholder:text-white' />
                    <button type='submit'
                    className='text-2xl text-center  m-2 bg-blue-600  border border-blue-600 rounded-lg '
                     >Login</button>
                
                <p className='text-center'>--or--</p>
                <Link to={'/register'} className='text-2xl text-center  m-2 bg-green-500  border border-green-500 rounded-lg ' > Register</Link>
            </form>

            <div className="  bg-transparent  ">
               <img src="..\src\assets\doctor.png" className='  object-cover  ' alt="" />
            </div>
        </div>
    )
}

export default UserLogin