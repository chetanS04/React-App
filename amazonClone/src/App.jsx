import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Category  from "./Components/Category"
import SignIn from './Components/SignIn';
import Members from './Components/Members';
import Signup from './Components/Signup';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        
        <Routes>
          <Route path="/" element={ <Home/> }></Route>
          <Route path="/category" element={ <Category/> }></Route>
          <Route path="/signin" element={ <SignIn/> }></Route>
          <Route path="/signin" element={ <SignIn/> }></Route>
          <Route path="/signup" element={ <Signup/> }></Route>
          <Route path="/members" element={ <Members/> }></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
