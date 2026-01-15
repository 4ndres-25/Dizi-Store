import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type {Vestido} from '../../types/Vestidos'
import vestidos from '../../data/vestidos.json'
import styles from './ProductoSeleccionado.module.css'
import TarjetaHome from '../../components/TarjetaHome/Index'




type Props = {}

function ProductoSeleccionado({}: Props) {
    const { slug } = useParams<{ slug: string }>();
    const [datosProducto, setDatosProducto] = useState<Vestido | null>(null)
    
    const data: Vestido[] = vestidos
    /* console.log(data[1].image) */

    useEffect(() => {
      
        data.map((element)=>{
            
            if(element.slug===slug){
                setDatosProducto(element)
            }
        })
      
    }, [slug])
    console.log(datosProducto?.image)
  return (

    <div className={styles.productoSeleccionado}>
        <h1>{datosProducto?.name}</h1>
        <h2>DISPONIBLE</h2>
        <div className={styles.productoSeleccionado__ContainerImagenPrincipal}>
            <img className={styles.productoSeleccionado__ImagenPrincipal} src={datosProducto?.image[0]} alt="" />
        </div>
        <div className={styles.productoSeleccionado__otrasImagenes}>
            {datosProducto?.image.map((element, key)=>(
                
                <div key={key} className={styles.productoSeleccionado__ConImagenCarrusel}>
                    <img className={styles.productoSeleccionado__ImagenCarrusel} src={element} alt="" />
                </div>
            )
            )}
           
        </div>
        <label htmlFor="">¿Te interesa este producto? Escribenos</label>
        <h3 className={styles.productoSeleccionado__h3Descripcion}>Descripción</h3>
        <div className={styles.productoSeleccionado__descripcion}>
            {datosProducto?.descripcion}
        </div>
        <h3>PRODUCTOS RELACIONADOS</h3>
        <div className={styles.carrusel__container}>
            {
            data.map((element, key)=>(
                
                <div>
                { element.tags.some(item=> datosProducto?.tags.includes(item))?(

                
                ((element.id!==datosProducto?.id)?
                        (
                    <><div className={styles.carrusel__containerimg}>
                        <TarjetaHome 
                        imagen={element.image[0]} 
                        nombreProducto={element.name} 
                        slug={element.slug}
                        key={key}
                        clase='tarjetaHome__container--carrusel'></TarjetaHome>
                        </div>
                         
                        
                
                        </>
                        
                    )
                    :(null))
                




               )

                :(null)
                }</div>
            ))}
        </div>
    </div>
  )
}

export default ProductoSeleccionado 