import React from 'react'

function UserLogin() {
    return (
        <div className="  w-full h-[100vh] flex  justify-center items-center  " >

            <form className='w-[50%] flex  flex-col  bg-gradient-to-r from-cyan-500 to-blue-500  border-[1px ]  rounded-sm' >
                <h1 className='text-2xl   '> Login </h1>
                <input type="text" placeholder='email id '
                    className=' border-none  p-2 m-5   ' />
                <input type="password" placeholder='password'
                    className=' border-none  p-2 m-5 ' />
            </form>
            <div className=" h-[100vh]   ">
               <img src="..\src\assets\doctor.png" className='  text-red-200 ' alt="" />
            </div>

        </div>
    )
}

export default UserLogin