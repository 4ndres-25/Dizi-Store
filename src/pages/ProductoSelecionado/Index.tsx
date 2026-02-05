import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type {Vestido} from '../../types/Vestidos'
import vestidos from '../../data/vestidos.json'
import styles from './ProductoSeleccionado.module.css'
import TarjetaHome from '../../components/TarjetaHome/Index'
import { ImWhatsapp } from "react-icons/im";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRef } from "react";
import Header from '../../components/Header/Index'
import Footer from '../../components/Footer/Index'
import { GiDress } from "react-icons/gi";
import { IoColorPalette } from "react-icons/io5";
import { GiRolledCloth } from "react-icons/gi";
import { MdOutlineWbSunny } from "react-icons/md";
import { GiYarn } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { GiForearm } from "react-icons/gi";
import { FaMinus } from "react-icons/fa6"
import { MdOutlineCheckroom } from "react-icons/md";
import NotificacionFavoritos from '../../components/NotificacionFavoritos/Index'

import { TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";




type Props = {}

function ProductoSeleccionado({}: Props) {
    const { slug } = useParams<{ slug: string }>();
    const [datosProducto, setDatosProducto] = useState<Vestido | null>(null)
    const [indexImg, setIndexImg] = useState(0)
    const [modalState, setmodalState] = useState(false)
    const zoomRef = useRef<ReactZoomPanPinchRef | null>(null);
    const [animationImg, setanimationImg] = useState<number>()
    const [stateInformation, setstateInformation] = useState(false)
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
    
    const data: Vestido[] = vestidos
    /* console.log(data[1].image) */

    useEffect(() => {
      
        data.map((element)=>{
            
            if(element.slug===slug){
                setDatosProducto(element)
            }
        })
      
    }, [slug])

    useEffect(() => {
      
        setIndexImg(0)
      
    }, [datosProducto])
    
    console.log(datosProducto?.image)

    const handleWhatsapp = () => {
        const mensaje = encodeURIComponent(`Hola!😊 Quiero el producto:\n${datosProducto?.name}\n Producto: https://dizistore.pages.dev/producto/${datosProducto?.slug}`);
        window.open(`https://wa.me/59172234794?text=${mensaje}`, "_blank");
    }
    const showImage = (index : number , key : number) =>{
        setIndexImg(index)
        setanimationImg(key)

    }

    const openModalImg =()=>{
        setmodalState(!modalState)
        zoomRef.current?.resetTransform(0)
    }

    const funcionFavoritos = (id : number) =>{
    setCoincide(idFavoritos.includes(id)?false:true)
    if(id){
      setidFavoritos(prev => prev.includes(id)? prev.filter(favid => favid !==id): [...prev, id])
    }
    setNotificacionFavoritos(true)
  }
  const mostrarMasInformacion = () =>{
    setstateInformation(!stateInformation)
  }

  return (

    <div className={styles.productoSeleccionado}>
        <Header></Header>
        <NotificacionFavoritos estado={notificacionFavoritos} coincide={coincide}></NotificacionFavoritos>
        <h1 className={styles.productoSeleccionado__h1NameProducto}>{datosProducto?.name}</h1>
        <h3 className={styles.productoSeleccionado__h2Disponible}>{datosProducto?.estado==="Disponible"? "DISPONIBLE": "AGOTADO"}</h3>
        <div className={styles[`${modalState?"productoSeleccionado__modalImg":"productoSeleccionado__modalImg--off"}`]}>
            <IoMdCloseCircleOutline className={styles.modalImg__iconClose} onClick={openModalImg}/>
            <TransformWrapper
            ref={zoomRef}
            initialScale={1}
            centerOnInit={true}
            >
                <TransformComponent wrapperStyle={{
                    width: "100%",
                    height: "100%",
                }}
                contentStyle={{
                    width: "100%",
                    height: "100%",
                }}>

                    <img className={styles.productoSeleccionado__ImagenPrincipal} src={datosProducto?.image[indexImg]} alt="Imagen del Producto Seleccionado" loading='lazy' />
                </TransformComponent>
            </TransformWrapper>
        </div>
        <div className={styles.productoSeleccionado__ContainerImagenPrincipal}>
             <img className={styles.productoSeleccionado__ImagenPrincipal} src={datosProducto?.image[indexImg]} alt="Imagen del Producto Seleccionado" onClick={openModalImg} loading='lazy'/>
        </div>
        <div className={styles.productoSeleccionado__otrasImagenes}>
            {datosProducto?.image.map((element, key)=>(
                
                <div key={key} className={styles.productoSeleccionado__ConImagenCarrusel}>
                    <img className={`${styles["productoSeleccionado__ImagenCarrusel"]} ${animationImg===key? styles["productoSeleccionado__ImagenCarrusel--click"]: ""} ` } src={element} alt="" onClick={()=>showImage(datosProducto.image.indexOf(element), key)} loading='lazy'/>
                </div>
            )
            )}
           
        </div>
        <div className={styles["productoSeleccionado__wp-container"]}>
            <label >¿Te interesa este producto? Escríbenos</label>
            <button className={styles.productoSeleccionado__whatsapp} onClick={handleWhatsapp}>Consultar sobre este producto <ImWhatsapp className={styles["productoSeleccionado__wp-icon"]}/></button>

        </div>
        <h3 className={styles.productoSeleccionado__h3Descripcion}>Descripción</h3>
        <div className={styles.productoSeleccionado__descripcion}>
            {datosProducto?.descripcion}
        </div>
        <div className={styles.productoSeleccionado__masInformacion}>
            <div className={styles.masInformacion__desplegable} onClick={mostrarMasInformacion}>
                <h3 className={styles.masInformacion__h3}>Ver más información del producto</h3>
                {stateInformation?<FaMinus className={styles.masInformacion__iconPlus}/>:<FaPlus className={styles.masInformacion__iconPlus}/>}
            </div>
            <div className={`${stateInformation?styles.masInformacion__container:styles["masInformacion__container--off"]}`}>
                <div className={`${stateInformation?styles.masInformacion__informacion:styles["masInformacion__informacion--off"]}`}>
                    <div className={styles.masInformacion__containerIcon}><GiDress className={styles.masInformacion__icon}/></div> 
                    <p className={styles.masInformacion__p}><strong>Estilo:</strong>  {datosProducto?.largo_del_vestido}</p>
                </div>
                <div className={`${stateInformation?styles.masInformacion__informacion:styles["masInformacion__informacion--off"]}`}>
                    <div className={styles.masInformacion__containerIcon}><IoColorPalette className={styles.masInformacion__icon}/></div> 
                    <p className={styles.masInformacion__p}><strong>Tono:</strong>  {datosProducto?.tono}</p>
                </div>
                <div className={`${stateInformation?styles.masInformacion__informacion:styles["masInformacion__informacion--off"]}`}>
                    <div className={styles.masInformacion__containerIcon}><GiRolledCloth className={styles.masInformacion__icon}/></div> 
                    <p className={styles.masInformacion__p}><strong>Tipo de tela:</strong>  {datosProducto?.tipo_tela}</p>
                </div>
                <div className={`${stateInformation?styles.masInformacion__informacion:styles["masInformacion__informacion--off"]}`}>
                    <div className={styles.masInformacion__containerIcon}><MdOutlineCheckroom className={styles.masInformacion__icon}/></div> 
                    <p className={styles.masInformacion__p}><strong>Corte:</strong>  {datosProducto?.corte}</p>
                </div>
                <div className={`${stateInformation?styles.masInformacion__informacion:styles["masInformacion__informacion--off"]}`}>
                    <div className={styles.masInformacion__containerIcon}><GiYarn className={styles.masInformacion__icon}/></div> 
                    <p className={styles.masInformacion__p}><strong>Materiales:</strong>  {datosProducto?.materiales?.join(", ")}</p>
                </div>
                <div className={`${stateInformation?styles.masInformacion__informacion:styles["masInformacion__informacion--off"]}`}>
                    <div className={styles.masInformacion__containerIcon}><GiForearm className={styles.masInformacion__icon}/></div> 
                    <p className={styles.masInformacion__p}><strong>Mangas:</strong>  {datosProducto?.mangas}</p>
                </div>
            
                
            </div>
        </div>
        <h3 className={styles.productoSeleccionado__h3ProductoRelacionado}>PRODUCTOS RELACIONADOS</h3>
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
                        clase='tarjetaHome__container--carrusel'
                        handleFavoritos={()=>funcionFavoritos(element.id)}
                        id={element.id}></TarjetaHome>
                        </div>
                         
                        
                
                        </>
                        
                    )
                    :(null))
                




               )

                :(null)
                }</div>
            ))}
        </div>
        <Footer></Footer>
    </div>
  )
}

export default ProductoSeleccionado 