import React from 'react'
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


const App = () => {
  return (
    <>
    <BrowserRouter>
     <Navbar />
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/shop' element={<Shop/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
     </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
