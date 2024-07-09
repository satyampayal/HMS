import React, { useEffect, useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
const [toogle,setToogle]=useState(false);
const {isLoggedIn,data} =useSelector((state)=>state.auth);
const userData=JSON.parse(data);
  const showHideMenuEvent=()=>{
const menuBar=document.querySelector('.menuBar');
menuBar.classList.toggle('anim_menu');
 menuBar.classList.toggle('hidden');
  }

  useEffect(()=>{

    showHideMenuEvent();
  },[toogle])
  return (
    <div className='select-none'>
      <div className=' w-[100%] h-[10vh]  flex flex-row justify-around items-center '>
        <h2 className='text-yellow-400  font-bold  absolute left-3 '>Logo</h2>
        <div className='not_mobile '>
          <ul className=' flex flex-row  justify-between items-center gap-5'>
          <li className='hover:text-red-300  transition-all duration-150 cursor-pointer text-[24px] font-thin hover:border-b border-red-500' >Home</li>
            <li className='hover:text-red-300  transition-all duration-150 cursor-pointer text-[24px] font-thin hover:border-b border-red-500'>Appointments</li>
            <li className='hover:text-red-300  transition-all duration-150 cursor-pointer text-[24px] font-thin hover:border-b border-red-500'>doctors</li>
            <li className='hover:text-red-300  transition-all duration-150 cursor-pointer text-[24px] font-thin hover:border-b border-red-500' >menu</li>
            <li className='hover:text-red-300  transition-all duration-150 cursor-pointer text-[24px] font-thin hover:border-b border-red-500'>menu</li>
            <div className='absolute right-[2em]'>
              {
                !isLoggedIn
                ?
                <ul className='flex justify-evenly gap-4 items-center'> 
                  <li>   <Link to={'/login'} className='hover:text-red-500  transition-all duration-150 hover:border-b border-red-300 font-thin w-[30px]' >Login</Link></li>
                  <li>    <Link to={'/register'} className='border rounded-[12px] pl-4 pr-4 pt-1 pb-1 p-1 bg-green-500 text-white  w-[30px] '>Register</Link></li>
                </ul>
                :
                <div className='w-fit p-[1px] bg-red-500 rounded-full cursor-pointer '>
                 <img src={userData?.user?.avatar?.secure_url}  className="rounded-full w-12 h-12 " alt="" />
                </div>
                
              }
           
            
            </div>
          </ul>
        </div>
        <div className='mobile  cursor-pointer  '>
          {
            toogle?
            <ImCross onClick={()=>setToogle(!toogle)} className='absolute right-3  font-bold text-[40px] text-red-300'  />
            :
         <IoMdMenu onClick={()=>setToogle(!toogle)} className='absolute right-3  font-bold text-[40px] text-green-300 ' />

          }
        
        </div>
      </div>
      <div className='h-[90vh] w-[100%] menuBar anim_menu' > 
      <ul className=' flex   flex-col  justify-between items-center  gap-10 text-center'>
            <Link to={'/'} className='hover:text-red-300  transition-all duration-150 cursor-pointer
             text-[36px] font-thin hover:border-b border-red-500' >Home</Link>
            <Link  to={'/appointments'} className='hover:text-red-300  transition-all duration-150 cursor-pointer
             text-[36px] font-thin hover:border-b border-red-500'>Appointments</Link>
            <Link to={'/doctors'} className='hover:text-red-300  transition-all duration-150 cursor-pointer
             text-[36px] font-thin hover:border-b border-red-500'>doctors</Link>
            <Link to={'/my-record'} className='hover:text-red-300  transition-all duration-150 cursor-pointer
             text-[36px] font-thin hover:border-b border-red-500' >my record</Link>
            <Link to={'/about'} className='hover:text-red-300  transition-all duration-150 cursor-pointer
             text-[36px] font-thin hover:border-b border-red-500'>about</Link>
            {
              isLoggedIn?
              <>
              <li className='  transition-all duration-150 cursor-pointer
               text-[36px] font-thin hover:bg-red-600 border-red-500 bg-red-500 rounded-lg
                w-[100%] text-white  m-1'>my profile</li>
              </>:
              <>
              </>
            }
          </ul>
      </div>
    </div>
  )
}

export default Header