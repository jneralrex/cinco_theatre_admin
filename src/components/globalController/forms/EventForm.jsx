import React, { useContext } from 'react'
import { MdCancel } from 'react-icons/md'
import { GlobalController } from '../Global'

const EventForm = () => {
    const {addEvent, setAddEvent} = useContext(GlobalController)
  return (
    <div className='bg-black/20 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen'>
      <div onClick={()=>setAddEvent("")}><MdCancel/></div>
        <div>
            <form className=''>
                <input type="text" name="" id="" placeholder='Event Name'/>
                <input type="text" name="" id="" placeholder='Time'/>
            </form>
        </div>  
    </div>
  )
}

export default EventForm 