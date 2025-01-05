import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate();

    const register = () =>{
        navigate('sign-in')
    };
  return (
    <div>
          <div className='flex justify-center items-center'>
        <img src="/public/cinco-logo.png" alt="" className='h-40'/>
      </div>
        <div className="p-3 max-w-lg mx-auto">
            <form className='flex flex-col gap-4'>
                <label htmlFor="">
                    <input type="text" name="" id="" className='w-full border rounded-lg p-2' placeholder='name'/>
                </label>
                <label htmlFor="">
                    Email
                    <input type="text" name="" id="" className='w-full border rounded-lg p-2' placeholder='email@mail.com'/>
                </label>
                <label htmlFor="">
                    Mobile Number
                    <input type="text" name="" id="" className='w-full border rounded-lg p-2' placeholder='+11 111 11'/>
                </label>
                <label htmlFor="">
                    Password
                    <input type="password" name="" id="" className='w-full border rounded-lg p-2' placeholder='password'/>
                </label>
                <button className='w-full bg-purple-700 rounded-lg p-2 text-white text-lg' onClick={register}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp