import styles from "./TerminosCondiciones.module.css"
type Props = {}

function TerminosCondiciones({}: Props) {
  return (
    <div className={styles.terminos__container}>
        <h1 className={styles.terminos__titulo}>Términos y Condiciones</h1>
        <p>Este sitio web funciona únicamente como un catálogo informativo de productos. No se realizan compras, pagos ni transacciones dentro del sitio. La comunicación y posibles ventas se realizan de manera externa mediante WhatsApp u otros medios.

          Los precios, tallas, disponibilidad y características de los productos pueden variar sin previo aviso. La información y las imágenes de los productos son solo referenciales.

          Este sitio no asume responsabilidad por:

          Errores tipográficos o cambios de stock

          Información proporcionada por terceros

          Problemas de conexión o acceso al sitio

          Todo el contenido del sitio, incluyendo imágenes, texto y diseño, está protegido por derechos de propiedad y no puede ser copiado ni distribuido sin autorización.

          El acceso y uso del sitio implica la aceptación de estos términos.</p>
    </div>
  )
}

export default TerminosCondiciones