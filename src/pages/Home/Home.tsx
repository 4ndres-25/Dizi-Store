import BotonSimple from "../../components/BotonSimple/Index"
import styles from './Home.module.css'
import Header from "../../components/Header/Index"
import TarjetaHome from "../../components/TarjetaHome/Index"
import type {Vestido} from "../../types/Vestidos"
import vestidos from "../../data/vestidos.json";
import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Index"
import NotificacionFavoritos from "../../components/NotificacionFavoritos/Index"
import daisy from "../../assets/Images/daisy.png"




const Home = () => {
  const [data, setData] = useState<Vestido[]>([])
  const sizes = ["Todas las tallas","XXS","XS","S","M","L","XL","XXL"]
  const [hayBusqueda, setHayBusqueda] = useState<Vestido[]>([])
  const [sizeSelected, setSizeSelected] = useState("")
  const [notificacionFavoritos, setNotificacionFavoritos] = useState(false)
  const [coincide, setCoincide] = useState<boolean>()
  const [noHayTalla, setNoHayTalla] = useState(false)

  
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
  
  useEffect(() => {
    if(notificacionFavoritos){
      const timer = setTimeout(() => {
        setNotificacionFavoritos(false)
      }, 4000);
    return () => clearTimeout(timer);
    }
  
    
  }, [notificacionFavoritos])
  

  const funcionFavoritos = (id : number) =>{
    setCoincide(idFavoritos.includes(id)?false:true)
    if(id){
      setidFavoritos(prev => prev.includes(id)? prev.filter(favid => favid !==id): [...prev, id])
    }
    setNotificacionFavoritos(true)
    
  }
  

  useEffect(() => {
    setData(vestidos)
    setHayBusqueda(vestidos)      
  }, [])

  useEffect(() => {
    if(data.length  === 0){
      setNoHayTalla(true)
        
    }
    else{
      setNoHayTalla(false)
    }
  
    
  }, [data])
  
  
  const changeDataforSearch = (newData: Vestido[]) => {  
    setHayBusqueda(newData)
    if (newData.length !== 0){
      setData(newData)      
    }    
  }

  const handleChangeSize = (talla : string) =>{
    if(talla === "Todas las tallas"){
      setSizeSelected(talla)
      setData(hayBusqueda)
    }else{
      setSizeSelected(talla)
      setData(hayBusqueda.filter(p => p.tallas.some(t => t === talla)))
      

    }

    
    
  }
  console.log(noHayTalla)
  return (
    <div className={`${styles.home__container} ${noHayTalla ? styles["home__container--sinTallas"]: ""}`}>
        
        <Header changeData={changeDataforSearch}></Header>
        <NotificacionFavoritos estado={notificacionFavoritos} coincide={coincide}></NotificacionFavoritos>
        <h1 className={styles.home__h2}>VESTIDOS</h1>
        <div className={styles.home__tallas}>
          {sizes.map((value, key)=>(
            <BotonSimple key={key} changeSize={handleChangeSize} active={sizeSelected === value}>{value}</BotonSimple>
          ))}
            
        </div>
        <div className={styles["home__cards-container"]}>
          {data.map((producto, key)=>(
            <>
            <TarjetaHome
            key={key} 
            imagen={producto.image[0]} 
            nombreProducto={producto.name}
            slug={producto.slug}
            handleFavoritos={()=>funcionFavoritos(producto.id)} 
            id={producto.id}></TarjetaHome>
            </>
          ))
          
          }


        </div>
        {noHayTalla === true &&

        <div className={styles.home__noHayTallas}>
          Lo sentimos, la talla que busca ya no está disponible.

        </div>
        }
        <div className={`${styles.home__descripcion} ${noHayTalla ? styles["home__descripcion--sin"] : ""}`}>
          <div className={styles.home__dizi}>

            <img src={daisy} alt="Imagen de flor margarita" />
            <h2>DIZI STORE</h2>
            <img src={daisy} alt="Imagen de flor margarita" />
          </div>
            <p>
            En nuestra tienda online encontrarás vestidos, tacones, maquillaje y más, pensados para que luzcas increíble en cada ocasión. Nos ubicamos en Cochabamba, Bolivia, y realizamos envíos a todos los departamentos y provincias del país, para que disfrutes de tus compras sin importar dónde estés. Calidad, estilo y comodidad al alcance de un clic.
            </p>
          
        </div> 
        <Footer></Footer>
    </div>
  )
}

export default Home