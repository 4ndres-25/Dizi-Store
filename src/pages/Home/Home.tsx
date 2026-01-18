import BotonSimple from "../../components/BotonSimple/Index"
import styles from './Home.module.css'
import Header from "../../components/Header/Index"
import TarjetaHome from "../../components/TarjetaHome/Index"
import type {Vestido} from "../../types/Vestidos"
import vestidos from "../../data/vestidos.json";
import { useEffect, useState } from "react"




const Home = () => {
  
  
  const [idFavoritos, setidFavoritos] = useState<number[]>(() => {
    const datosLS = localStorage.getItem("Favoritos");
    if (!datosLS) return []; 
    try {
      return JSON.parse(datosLS); 
    } catch {
      return []; 
    }
  });

  
  
  
  

  

  useEffect(() => {
   
    

    localStorage.setItem("Favoritos", JSON.stringify(idFavoritos?idFavoritos:[]))
  
    
  }, [idFavoritos])
  

  const funcionFavoritos = (id : number) =>{
    if(id){
      setidFavoritos(prev => prev.includes(id)? prev.filter(favid => favid !==id): [...prev, id])
    }
  }
  /* console.log(idFavoritos) */

  const [data, setData] = useState<Vestido[]>([])
  useEffect(() => {
    setData(vestidos)  
    
  }, [])
  
  const changeDataforSearch = (newData: Vestido[]) => {    
    if (newData.length !== 0){
      setData(newData)      
    }    
  }
  return (
    <div className={styles.home__container}>
        <Header changeData={changeDataforSearch}></Header>
        <h1>DIZI STORE</h1>
        <h2 className={styles.home__h2}>VESTIDOS</h2>
        <div className={styles.home__tallas}>
            <BotonSimple>XS</BotonSimple>
            <BotonSimple>S</BotonSimple>
            <BotonSimple>M</BotonSimple>
            <BotonSimple>L</BotonSimple>
            <BotonSimple>XL</BotonSimple>
            <BotonSimple>XXL</BotonSimple>
        </div>
        <div className={styles["home__cards-container"]}>
          {data.map((producto, key)=>(
            <>
            <TarjetaHome
            key={key} 
            imagen={producto.image[0]} 
            nombreProducto={producto.name}
            slug={producto.slug}
            handleFavoritos={()=>funcionFavoritos(producto.id)} ></TarjetaHome>
            </>
          ))
          
          }


        </div>
        <div>
            <p>
            ¡Bienvenidos a DIZI STORE! 🌸✨
            En nuestra tienda online encontrarás vestidos, tacones, maquillaje y más, pensados para que luzcas increíble en cada ocasión. Nos ubicamos en Cochabamba, Bolivia, y realizamos envíos a todos los departamentos y provincias del país, para que disfrutes de tus compras sin importar dónde estés. Calidad, estilo y comodidad al alcance de un clic.
            </p>
        </div>      
    </div>
  )
}

export default Home