import styles from "./Contacto.module.css"

type Props = {}

function Contacto({}: Props) {
  return (
    <div className={styles.contacto__container}>
        <h1 className={styles.contacto__h1}>Contacto</h1>
        <div className={styles.contacto__tarjeta}>
        <p>Si deseas consultar sobre algún producto, precios, tallas o disponibilidad, puedes escribirnos por WhatsApp o mediante nuestros canales de contacto.
          <br /><br />
          <span className={styles.contacto__span}>WhatsApp:</span> +591 72234794
          <br />
          <span className={styles.contacto__span}>Correo electrónico: </span>
          <br />
          <span className={styles.contacto__span}>Horario de atención: </span>          

          Lunes a Domingo — 09:00 a 20:00 (Bolivia)</p>

        </div>
    </div>
  )
}

export default Contacto