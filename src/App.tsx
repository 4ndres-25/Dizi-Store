import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductoSeleccionado from './pages/ProductoSelecionado/Index'
import Favoritos from './pages/Favoritos/Index'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad/Index'
import TerminosCondiciones from './pages/TerminosCondiciones/Index'
import Contacto from './pages/Contacto/Index'
import SobreNosotros from './pages/SobreNosotros/Index'
import ScrollToTop from './components/Scroll/Index'
import LayoutConHeader from './components/LayoutConHeader/Index'
import './App.css'
import { useState } from 'react'
import type {Vestido} from "./types/Vestidos"


function App() {
  const [dataFiltered, setDataFiltred] = useState<Vestido[]>([])



  return (
    <>
    <BrowserRouter>
        <ScrollToTop/>
      <Routes>

        <Route element={<LayoutConHeader onSearch={setDataFiltred}/>} >
          <Route path='/' element={<Home datosDesdeHeader={dataFiltered}/>} ></Route>
          <Route path='/producto/:slug' element={<ProductoSeleccionado/>}></Route>
        </Route>
        <Route path='/favoritos' element={<Favoritos/>}></Route>
        <Route path='/politica-de-privacidad' element={<PoliticaPrivacidad/>}></Route>
        <Route path='/sobre-nosotros' element={<SobreNosotros/>}></Route>
        <Route path='/terminos-y-condiciones' element={<TerminosCondiciones/>}></Route>
        <Route path='/contacto' element={<Contacto/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
