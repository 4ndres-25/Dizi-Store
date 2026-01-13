import { Link } from "react-router-dom"
import styles from "./TarjetaHome.module.css"
import { useEffect, useState } from "react";
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
    <Link to={`/${slug}`} className={styles.tarjetaHome__link}>
        <div className={styles.tarjetaHome__container}>
            <div className={styles["tarjetaHome__img-container"]}>
                <img src={imagen} className={styles.tarjetaHome__img} alt="Vista previa imagen de Vestido" />
                <button className={styles.tarjetaHome__like}>X</button>

            </div>
            <p className={styles.tarjetaHome__name}>{nombreUpercase} </p>
        </div>
    </Link>
  )
}

export default TarjetaHome