import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [Password, setpassword] = useState("");
  const [length, setlength] = useState(6);
  const [numAllow, setnumAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);

  const copypassword = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = ''

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


    if (numAllow) str += '1234567890'
    if (charAllow) str += `!@#$%&*()_+=[]{}.<>`

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass);

  }, [length, numAllow, charAllow, setpassword])


  useEffect(() => {
    passwordgenerator()
  }, [length, numAllow, charAllow, setpassword])

  function copytext() {
    copypassword.current.select();
    window.navigator.clipboard.writeText(Password);
  }


  return (
    <>
      <div className="flex justify-center bg-black w-screen h-screen p-14">
        <div className="container w-1/2 h-min text-center flex flex-col justify-center content-center p-5 bg-gray-600 rounded-md ">
          <h1 className='text-center text-3xl text-white m-5'>Password Generator</h1>
          <div className='flex'>
            <input
              type="text"
              value={Password}
              placeholder='password'
              readOnly
              className='text-xl text-black p-2 outline-none rounded-s-md w-full'
              ref={copypassword}
            />

            <button
              onClick={copytext}
              className='outline-none bg-blue-700 text-white p-2 rounded-e-md shrink-0 '
            >copy
            </button>
          </div>

          <div className="flex mt-5 text-orange-500 text-xl items-center gap-x-9">
            <div
              className='flex gap-2'
            >

              <input
                type="range"
                className='cursor-pointer '
                value={length}
                onChange={(e) => { setlength(e.target.value) }}
                min={6}
                max={20} />
              <label > length: {length}</label>
            </div>

            <div
              className='flex gap-2' >

              <input
                type='checkbox'
                className='cursor-pointer'
                value={numAllow}
                onClick={() => {
                  setnumAllow((pre) => !pre)
                }}
              />
              <label
                onClick={() => { }} >Number</label>
            </div>

            <div
              className='flex gap-2' >

              <input
                type='checkbox'
                className='cursor-pointer'
                value={charAllow}
                onClick={() => {
                  setcharAllow((pre) => !pre)
                }}
              />
              <label >Special character</label>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
