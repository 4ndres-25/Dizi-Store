import BotonSimple from "../../components/BotonSimple/Index"
import styles from './Home.module.css'
import TarjetaHome from "../../components/TarjetaHome/Index"
import type {Vestido} from "../../types/Vestidos"
import vestidos from "../../data/vestidos.json";
import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Index"
import NotificacionFavoritos from "../../components/NotificacionFavoritos/Index"
import daisy from "../../assets/Images/daisy.png"
import { useSearchParams } from "react-router-dom"


type Props = {
  datosDesdeHeader: Vestido[];
  setNoEncontro: (resultado: boolean) => void
  setSearchClicked: (clicked: boolean) => void
}

const Home = ( {datosDesdeHeader, setNoEncontro, setSearchClicked}:Props) => {
  const [data, setData] = useState<Vestido[]>([])
  const sizes = ["Todas las tallas","XXS","XS","S","M","L","XL","XXL"]
  const [hayBusqueda, setHayBusqueda] = useState<Vestido[]>([])
  const [sizeSelected, setSizeSelected] = useState("")
  const [notificacionFavoritos, setNotificacionFavoritos] = useState(false)
  const [coincide, setCoincide] = useState<boolean>()
  const [noHayTalla, setNoHayTalla] = useState(false)
  const [params, setParams] = useSearchParams()
  const [dataFiltrado, setDataFiltrado] = useState<Vestido[]>([])
  const [inputValue, setInputValue] = useState<string[]>([])
  const [clickBusqueda, setClickBusqueda] = useState(false)


  let nuevo:string[] = []
  let objeto1 = [{id: 0, r: 0}]
  let arrayNum :number[] = []
  let arraySinRepetidos : number[]= []
  let f: any[]= []
  let final: any[] = []



  
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
  const resetHomeState = () => {
    setData(vestidos)
    setHayBusqueda(vestidos)
    setSizeSelected("Todas la tallas")
    setNoHayTalla(false)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  //funcion para buscar producto
  const handleSearchProduct = () =>{
  setDataFiltrado([])
  hayBusqueda.map((value,key)=>{
      nuevo = inputValue.filter(e => value.tags.includes(e))
      

      objeto1.push( {
        id: value.id,
        r: nuevo.length, 
      })
      if(nuevo.length > 0){
        arrayNum.push(nuevo.length)

      }
    
    })
    arrayNum.sort((a,b)=>b-a)
    arraySinRepetidos = [...new Set(arrayNum)]

    
      
    arraySinRepetidos.map(value => {
      f = objeto1.filter(e => e.r === value)
      f.map((df)=>{
        final.push(df)
      })
        
      })

      final.map((value)=>{
        const encontrado = hayBusqueda.find(s => s.id === value.id )
        if(encontrado){
          setDataFiltrado(prev => [...prev,encontrado])
        }
      })
      



  //aqui poner el resultado final
   /* setDataFiltrado(mostrar) */
   //es paraaaaaaaaaaaaaaaaaaaaa el mensaje si no encuentra ninguna coincidenciaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   setClickBusqueda(true)
   setSearchClicked(true) 
  
     
 }
  
 useEffect(() => {
  if(inputValue.length === 0) return
   handleSearchProduct()
 }, [inputValue])

 useEffect(() => {
   if(dataFiltrado.length === 0 && clickBusqueda){
    setNoEncontro(true)
   }
   else{
    setNoEncontro(false)
   }
   setData(dataFiltrado)
   const timer2 = setTimeout(() => {
        console.log("entra el timer del HOME")
        setNoEncontro(false)

    }, 6000)
    return () => {
      clearTimeout(timer2)
    } 
 }, [dataFiltrado])
 
 

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

  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
  
    
  }, [data])
  
  useEffect(() => {
    
    
    if (datosDesdeHeader.length !== 0){
      setHayBusqueda(datosDesdeHeader)
      setSizeSelected("Todas las tallas")      
      
    } 
  
    
  }, [datosDesdeHeader])

  useEffect(() => {
    if (!params.toString()) return
    if (params.get("reset") === "true") {
      resetHomeState()
      setParams({}, { replace: true }) // limpia la URL
    }
    
    const search = params.get("search")
    if (search){
      setInputValue(search.split(" "))
      setParams({}, { replace: true })

    
    }
  }, [params])
  
  
  
  

  const handleChangeSize = (talla : string) =>{
    if(talla === "Todas las tallas"){
      setSizeSelected(talla)
      setData(hayBusqueda)
    }else{
      setSizeSelected(talla)
      setData(hayBusqueda.filter(p => p.tallas.some(t => t === talla)))
      

    }

    
    
  }

  

  
  return (
    <div className={`${styles.home__container} ${noHayTalla ? styles["home__container--sinTallas"]: ""}`}>
        
        <NotificacionFavoritos estado={notificacionFavoritos} coincide={coincide}></NotificacionFavoritos>
        <h1 className={styles.home__h2}>VESTIDOS</h1>
        <div className={styles.home__tallas}>
          {sizes.map((value, key)=>(
            <BotonSimple key={key} changeSize={handleChangeSize} active={sizeSelected === value}>{value}</BotonSimple>
          ))}
            
        </div>
        <div className={styles["home__cards-container"]}>
          {data.map((producto, key)=>(
            
            <TarjetaHome
            key={key} 
            imagen={producto.image[0]} 
            nombreProducto={producto.name}
            slug={producto.slug}
            handleFavoritos={()=>funcionFavoritos(producto.id)} 
            id={producto.id}></TarjetaHome>
            
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