import BotonSimple from "../../components/BotonSimple/Index"
import styles from './Home.module.css'
import Header from "../../components/Header/Index"
import TarjetaHome from "../../components/TarjetaHome/Index"
import type {Vestido} from "../../types/Vestidos"
import vestidos from "../../data/vestidos.json";



const Home = () => {
  const data: Vestido[] = vestidos;
  return (
    <div className={styles.home__container}>
        <Header></Header>
        <h1>DIZI STORE</h1>
        <h2>VESTIDOS</h2>
        <div>
            <BotonSimple>XS</BotonSimple>
            <BotonSimple>S</BotonSimple>
            <BotonSimple>M</BotonSimple>
            <BotonSimple>L</BotonSimple>
            <BotonSimple>XL</BotonSimple>
            <BotonSimple>XXL</BotonSimple>
        </div>
        <div className={styles["home__cards-container"]}>
          {data.map((producto, key)=>(
            <>
            <TarjetaHome 
            imagen={producto.image} 
            nombreProducto={producto.name}
            slug={producto.slug} ></TarjetaHome>
            </>
          ))
          
          }


        </div>
        <div>
            <p>
            ¡Bienvenidos a DIZI STORE! 🌸✨
            En nuestra tienda online encontrarás vestidos, tacones, maquillaje y más, pensados para que luzcas increíble en cada ocasión. Nos ubicamos en Cochabamba, Bolivia, y realizamos envíos a todos los departamentos y provincias del país, para que disfrutes de tus compras sin importar dónde estés. Calidad, estilo y comodidad al alcance de un clic.
            </p>
        </div>

    </div>
  )
}

export default Home