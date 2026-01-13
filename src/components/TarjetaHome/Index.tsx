import { Link } from "react-router-dom"
import styles from "./TarjetaHome.module.css"
type Props = {
    imagen: string;
    nombreProducto: string;
    slug: string;
}

function TarjetaHome({imagen, nombreProducto, slug}: Props) {
  return (
    <Link to={`/${slug}`}>
        <div className={styles.tarjetaHome__container}>
            <img src={imagen} className={styles.tarjetaHome__img} alt="Vista previa imagen de Vestido" />
            <p className={styles.tarjetaHome__name}>{nombreProducto} </p>
        </div>
    </Link>
  )
}

export default TarjetaHome