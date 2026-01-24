import styles from './NotificacionFavoritos.module.css'

type Props = {
    estado?: boolean
    coincide?: boolean
}

function NotificacionFavoritos({estado, coincide}: Props) {


    
  return (
    
    
   
    <>
   
    
    <>
      <div className={`${styles["notificacion__container--off"]} ${estado===true? styles.notificacion__container: ""} `}>
        {coincide === true?
        
        
          <div className={styles.notificacio__containerAdd}>
          <p className={styles.notificacion__p}>El producto se añadió a tu lista de Favorios</p>
          </div>
          :
          <div className={styles.notificacio__containerDelete}>
              <p className={styles.notificacion__p}>El producto se eliminó de tu lista de Favorios</p>
          </div>        
        
        }
      </div>
    </>
    
    </>
    
   
    
    
  )
}

export default NotificacionFavoritos