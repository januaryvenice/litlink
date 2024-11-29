import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import bg from './images/hero0.png'
import Header from './components/Header';

function App() {
  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }
  return (
    <main className="h-[75vh] w-screen" style={style}>
      <Header />
      <div className='h-full w-full text text-center flex flex-col items-center justify-center px-[4rem]'>
        <h1 className='text-[#FFFFFF] font-bold text-[5rem]'>Welcome to LitLink</h1>
        <h3 className='text-white text-[2rem] font-thin'>Community for All Book Lovers</h3>
      </div>
    </main>
    
  )
}

export default App;

