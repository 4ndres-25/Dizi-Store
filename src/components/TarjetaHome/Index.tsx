import { Link } from "react-router-dom"
import styles from "./TarjetaHome.module.css"
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";



type Props = {
    imagen: string;
    nombreProducto: string;
    slug: string;
    clase?: string
    id?: number
    handleFavoritos?: () => void
    
}

function TarjetaHome({imagen, nombreProducto, slug, clase="", handleFavoritos, id=-1}: Props) { 
    const [nombreUpercase, setNombreUpercase] = useState("")  
    const [click, setClick] = useState(false)

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
      setClick(idFavoritos.includes(id))
      
    }, [])
    
    
      
    
    

    useEffect(() => {
      setNombreUpercase(nombreProducto.toUpperCase())

    }, [nombreProducto])

    const clickIcon = () =>{
    
      setClick(!click)
    }
    

  
   
    
  return (
        <div className={styles[clase?clase:"tarjetaHome__container"]}>
          <div className={styles["tarjetaHome__img-container"]}>
            <Link to={`/producto/${slug}`} className={styles["tarjetaHome__link-img"]}>
              <img src={imagen} className={styles.tarjetaHome__img} alt="Vista previa imagen de Vestido" />
            </Link>
              <button className={styles.tarjetaHome__like}>
                {click? <FaHeart className={styles.tarjetaHome__iconOn} onClick={()=>{handleFavoritos?.(); clickIcon()}}/>:<FaRegHeart className={styles.tarjetaHome__icon}onClick={()=>{handleFavoritos?.(); clickIcon()}} />
              } 
                
               </button>
          </div>
          <div className={styles["tarjetaHome__p-container"]}>
            <Link to={`/producto/${slug}`} className={styles.tarjetaHome__link}>
                <p className={styles.tarjetaHome__name}>{nombreUpercase} </p>
            </Link>
          </div>
        </div>
    
  )
}

export default TarjetaHome