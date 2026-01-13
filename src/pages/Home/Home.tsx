import BotonSimple from "../../components/BotonSimple/Index"
import styles from './Home.module.css'
import TarjetaHome from "../../components/TarjetaHome/Index"


const Home = () => {
  return (
    <div className={styles.home__container}>
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
        <TarjetaHome 
        imagen="https://www.verawangbride.com/media/catalog/product/l/e/lecros_b.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=747&width=560&canvas=560:747"
        nombreProducto="Vestido verde largo de gala"
        slug="vestido-verde-de-gala"
        ></TarjetaHome>
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