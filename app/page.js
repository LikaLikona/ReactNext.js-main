'use client'
import Image from 'next/image'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './Signin/page'
import Signup from './Signup/page'
import Dashboard from './dashboard/page'


export default function Home() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = '/dashboard' element = {<Dashboard/>}/>
        <Route path = '/' element = {<signin/>}/>
        <Route path = '/signup' element = {<signup/>}/>

      </Routes>

      </BrowserRouter>
      <Signin />
    </div>
  )
}
