import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductoSeleccionado from './pages/ProductoSelecionado/Index'
import Favoritos from './pages/Favoritos/Index'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad/Index'
import TerminosCondiciones from './pages/TerminosCondiciones/Index'
import Contacto from './pages/Contacto/Index'
import SobreNosotros from './pages/SobreNosotros/Index'
import ScrollToTop from './components/Scroll/Index'
import './App.css'

function App() {


  return (
    <>
    <BrowserRouter>
        <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/producto/:slug' element={<ProductoSeleccionado/>}></Route>
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
