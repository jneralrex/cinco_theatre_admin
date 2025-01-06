import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/cinco-logo.png'
const SignIn = () => {

  return (
    <div>
      <div className='flex justify-center items-center'>
        <img src={Logo} alt="" className=''/>
      </div>
    <div className="p-3 max-w-lg mx-auto">
         <p className='text-center text-2xl text-gray-500 p-2'>Web Admin</p>
        <form className='flex flex-col gap-4'>
            <label htmlFor="">
                <input type="text" name="" id="" className='w-full border rounded-lg p-2' placeholder='name or email'/>
            </label>
            <label htmlFor="">
                Password
                <input type="password" name="" id="" className='w-full border rounded-lg p-2' placeholder='password'/>
            </label>
           <Link to='/dashboard'>
           <button className='w-full bg-purple-700 rounded-lg p-2 text-white text-lg'>Submit</button>
           </Link> 
        </form>
    </div>
</div>
  )
}

export default SignIn