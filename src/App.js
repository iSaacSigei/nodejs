import React, { useEffect, useState } from 'react';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './components/home'
import AddItem from './components/Item';
import EditItem from './components/EditItem';
export default function App() {
  const[items, setItems]=useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/api/items')
    .then(r=>r.json())
    .then(data=>{
      console.log(data)
      setItems(data)
    })
  },[])
  

  return (
    <Routes>
     <Route path='/' element={<Home items={items}/>}/>
     <Route path='/additem' element={<AddItem/>}/>
     <Route path='/items/:id' element={<EditItem/>}/>
    </Routes>
  );
}


