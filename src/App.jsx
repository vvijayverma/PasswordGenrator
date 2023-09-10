import { useState,useCallback,useEffect,useRef } from 'react'
// import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [Password,setPassword]=useState('');
  const PasswordRef = useRef(null);
  const PasswordGenrator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed)  str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-+=_[]{}~`"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordTOClipBoard = useCallback(()=>{
    PasswordRef.current?.select()
    PasswordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    PasswordGenrator();
  },[length,numberAllowed,charAllowed,PasswordGenrator])
  return (
    <>
     <h1 className='text-4xl text-center'>Password Genrator</h1>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 gb-gray-700'>text</div>
     <div className='flex shadow rounded-lg overflow-hidden mg-4'>
      <input 
      type='text'
      value={Password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      ref={PasswordRef}
      />
      <button onClick={copyPasswordTOClipBoard} className='bg-blue-700'>copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div flex items-center gap-x-1>
        <input 
        type='range'
        min={6}
        max={100}
        value={length}
        onChange={(e)=>setLength(e.target.value)}
        className='cursor-pointer'
        />
        <label>Length: {length}</label>
      </div>
      <div flex items-center gap-x-1>
        <input 
        type='checkbox'
        defaultChecked = {numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}
        className='cursor-pointer'
        />.
        <label>Numbers</label>
     </div>
     <div flex items-center gap-x-1>
        <input 
        type='checkbox'
        defaultChecked = {charAllowed}
        id='numberInput'
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}
        className='cursor-pointer'
        />.
        <label>Characters</label>
     </div>
     </div>
    </>
  )
}

export default App
