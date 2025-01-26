import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignUp = () => {
  const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [captainData, setCaptainData] = useState({})
    
    const submitHandler = (e) => {
      e.preventDefault()
      setCaptainData({
        fullName:{
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      })
      
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-10'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTubIbwtYu-INmobyw_6hosgjqoQtkw7YwiXA&s"
          alt="Uber Logo"
        />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>

        <h3 className='text-base font-medium mb-2'>What's our Captain's name</h3>
        <div className='flex gap-4 mb-6'>
        <input
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-sm'
            required
            type="text"
            placeholder='First name'
            value={firstName}
            onChange={(e)=>
              setFirstName(e.target.value)
            }
          />
          <input
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-sm'
            required
            type="text"
            placeholder='Last name'
            value={lastName}
            onChange={(e)=>
              setLastName(e.target.value)
            }
          />
        </div>
          <h3 className='text-base font-medium mb-2'>What's our Captain's email</h3>
          <input
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm'
            required
            type="email"
            placeholder='email@example.com'
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm'
            type="password"
            placeholder='password'
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
          />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
            Login
          </button>
          <p className='text-center'>
            Already have a account? <Link to="/captain-login" className='text-blue-600'>Login here</Link>
          </p>
        </form>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore corrupti ipsa placeat voluptate, similique officia velit non distinctio, veniam magni fugit dolor sapiente iste? Error.</p>
      </div>
    </div>
  )
}

export default CaptainSignUp
