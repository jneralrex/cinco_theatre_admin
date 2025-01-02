import React from 'react'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();

    const register = () =>{
        navigate('dashboard')
    };
  return (
    <div>
    <div className="p-3 max-w-lg mx-auto">
        <form className='flex flex-col gap-4'>
            <label htmlFor="">
                <input type="text" name="" id="" className='w-full border rounded-lg p-2' placeholder='name or email'/>
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

export default SignIn