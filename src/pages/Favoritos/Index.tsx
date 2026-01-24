import Header from '../../components/Header/Index';
import vestidos from '../../data/vestidos.json'
import type {Vestido} from "../../types/Vestidos"
import TarjetaHome from '../../components/TarjetaHome/Index';
import { useState, useEffect } from 'react';
import styles from './Favoritos.module.css'
import NotificacionFavoritos from '../../components/NotificacionFavoritos/Index';

type Props = {}

function Favoritos({}: Props) {
    const datosVestidos: Vestido[] = vestidos;
    const [notificacionFavoritos, setNotificacionFavoritos] = useState(false)
    const [coincide, setCoincide] = useState<boolean>()
    

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
    if(notificacionFavoritos){
      const timer = setTimeout(() => {
        setNotificacionFavoritos(false)
      }, 4000);
    return () => clearTimeout(timer);
    }
  
    
  }, [notificacionFavoritos])
  

      useEffect(() => {
         
          
      
          localStorage.setItem("Favoritos", JSON.stringify(idFavoritos?idFavoritos:[]))
        
          
        }, [idFavoritos])
        
      
        const funcionFavoritos = (id : number) =>{
          setCoincide(idFavoritos.includes(id)?false:true)
          if(id){
            setidFavoritos(prev => prev.includes(id)? prev.filter(favid => favid !==id): [...prev, id])
          }
          setNotificacionFavoritos(true)
        } 
    
  return (
    <>
      <div className={styles.favoritos__contenedor}>
        <Header></Header>
        <NotificacionFavoritos estado={notificacionFavoritos} coincide={coincide}></NotificacionFavoritos>
        <h1 className={styles.favoritos__h1}>TUS FAVORITOS</h1>
        <div className={styles.favorito__elemento}>
          {datosVestidos.map((item, index: number) => (
          <>
            {
            idFavoritos.some(elem => elem === item.id ) &&
            
            
            <TarjetaHome 
            key={index} 
            imagen={item.image[0]} 
            nombreProducto={item.name} 
            slug={item.slug} 
            handleFavoritos={()=>funcionFavoritos(item.id)}
            id={item.id}></TarjetaHome>
          }
          </>
          ))}
        </div>
      </div>
    </>
    )
}

export default Favoritos