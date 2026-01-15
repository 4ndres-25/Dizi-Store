import { Link } from "react-router-dom"
import styles from "./TarjetaHome.module.css"
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";

type Props = {
    imagen: string;
    nombreProducto: string;
    slug: string;
}

function TarjetaHome({imagen, nombreProducto, slug}: Props) { 
    const [nombreUpercase, setNombreUpercase] = useState("")
    useEffect(() => {
      setNombreUpercase(nombreProducto.toUpperCase())
    }, [])
    
  return (
        <div className={styles.tarjetaHome__container}>
          <div className={styles["tarjetaHome__img-container"]}>
            <Link to={`/producto/${slug}`} className={styles["tarjetaHome__link-img"]}>
              <img src={imagen} className={styles.tarjetaHome__img} alt="Vista previa imagen de Vestido" />
            </Link>
              <button className={styles.tarjetaHome__like}><FaRegHeart className={styles.tarjetaHome__icon}/></button>
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