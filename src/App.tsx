import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductoSeleccionado from './pages/ProductoSelecionado/Index'
import Favoritos from './pages/Favoritos/Index'

import './App.css'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/producto/:slug' element={<ProductoSeleccionado/>}></Route>
        <Route path='/favoritos' element={<Favoritos/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
