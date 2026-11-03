import BotonSimple from "../../components/BotonSimple/Index"
import styles from './Home.module.css'
import TarjetaHome from "../../components/TarjetaHome/Index"
import type { Vestido } from "../../types/Vestidos"
import vestidos from "../../data/vestidos.json";
import { useEffect, useState, useMemo } from "react"
import Footer from "../../components/Footer/Index"
import NotificacionFavoritos from "../../components/NotificacionFavoritos/Index"
import daisy from "../../assets/Images/daisy.png"
import { useSearchParams } from "react-router-dom"

type Props = {
  datosDesdeHeader: Vestido[];
  setNoEncontro: (resultado: boolean) => void
  setSearchClicked: (clicked: boolean) => void
}

const ITEMS_POR_PAGINA = 16; // 16 productos por página para una cuadrícula perfecta de 4x4

const Home = ({ datosDesdeHeader, setNoEncontro, setSearchClicked }: Props) => {
  const [params, setParams] = useSearchParams()
  const sizes = ["Todas las tallas", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
  
  const [sizeSelected, setSizeSelected] = useState("Todas las tallas")
  const [notificacionFavoritos, setNotificacionFavoritos] = useState(false)
  const [coincide, setCoincide] = useState<boolean>(false)
  
  const paginaActual = Number(params.get("page")) || 1;
  const searchQuery = params.get("search") || "";
  
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setSizeSelected("Todas las tallas");
    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    setParams(newParams, { replace: true });
  }

  const [idFavoritos, setidFavoritos] = useState<number[]>(() => {
    const datosLS = localStorage.getItem("Favoritos");
    return datosLS ? JSON.parse(datosLS) : [];
  });

  const dataFinal = useMemo(() => {
    let resultado = vestidos;

    const keywords = searchQuery.toLowerCase().split(" ").filter(k => k !== "");
    
    if (keywords.length > 0) {
      resultado = vestidos.map(vestido => {
        const coincidencias = keywords.filter(kw => 
          vestido.tags.some(tag => tag.toLowerCase().includes(kw))
        ).length;
        return { vestido, coincidencias };
      })
      .filter(item => item.coincidencias > 0) 
      .sort((a, b) => b.coincidencias - a.coincidencias) 
      .map(item => item.vestido); 
    }

    if (sizeSelected !== "Todas las tallas") {
      resultado = resultado.filter(p => p.tallas.includes(sizeSelected));
    }

    return resultado;
  }, [searchQuery, sizeSelected]);

  const totalPaginas = Math.ceil(dataFinal.length / ITEMS_POR_PAGINA);
  
  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    return dataFinal.slice(inicio, inicio + ITEMS_POR_PAGINA);
  }, [dataFinal, paginaActual]);

  const noHayResultados = dataFinal.length === 0;

  useEffect(() => {
    if (searchQuery !== "") {
      setSearchClicked(true);
      setNoEncontro(noHayResultados);
      
      if (noHayResultados) {
        const timer = setTimeout(() => setNoEncontro(false), 6000);
        return () => clearTimeout(timer);
      }
    } else {
      setNoEncontro(false);
    }
  }, [searchQuery, noHayResultados, setNoEncontro, setSearchClicked]);

  useEffect(() => {
    if (params.get("reset") === "true") {
      setSizeSelected("Todas las tallas");
      const newParams = new URLSearchParams(params);
      newParams.delete("page");
      newParams.delete("reset");
      setParams(newParams, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [params, setParams]);

  useEffect(() => {
    localStorage.setItem("Favoritos", JSON.stringify(idFavoritos));
  }, [idFavoritos]);

  useEffect(() => {
    if (notificacionFavoritos) {
      const timer = setTimeout(() => setNotificacionFavoritos(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [notificacionFavoritos]);

  const cambiarTalla = (talla: string) => {
    setSizeSelected(talla);
    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    setParams(newParams);
  }

  const cambiarPagina = (nuevaPagina: number) => {
    const newParams = new URLSearchParams(params);
    if (nuevaPagina === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(nuevaPagina));
    }
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const funcionFavoritos = (id: number) => {
    const yaEsFavorito = idFavoritos.includes(id);
    setCoincide(!yaEsFavorito);
    setidFavoritos(prev => 
      yaEsFavorito ? prev.filter(favid => favid !== id) : [...prev, id]
    );
    setNotificacionFavoritos(true);
  };

  // Componente reutilizable de Paginación Profesional Visible
  const renderPaginacion = () => (
    totalPaginas > 1 ? (
      <div className={styles.home__paginacionContainer}>
        <button 
          className={styles.home__paginacionBoton}
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          ◀ Anterior
        </button>
        <span className={styles.home__paginacionTexto}>
          Página <strong>{paginaActual}</strong> de <strong>{totalPaginas}</strong>
        </span>
        <button 
          className={styles.home__paginacionBoton}
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente ▶
        </button>
      </div>
    ) : null
  );

  return (
    <div className={`${styles.home__container} ${noHayResultados ? styles["home__container--sinTallas"] : ""}`}>
      <NotificacionFavoritos estado={notificacionFavoritos} coincide={coincide} />
      
      <h1 className={styles.home__h2}>VESTIDOS</h1>
      
      <div className={styles.home__tallas}>
        {sizes.map((talla) => (
          <BotonSimple 
            key={talla} 
            changeSize={() => cambiarTalla(talla)} 
            active={sizeSelected === talla}
          >
            {talla}
          </BotonSimple>
        ))}
      </div>

      {/* Paginación Superior Sincronizada */}
      {renderPaginacion()}

      <div className={styles["home__cards-container"]}>
        {productosPaginados.map((producto) => (
          <TarjetaHome
            key={producto.id}
            imagen={producto.image[0]}
            nombreProducto={producto.name}
            slug={producto.slug}
            handleFavoritos={funcionFavoritos}
            id={producto.id}
          />
        ))}
      </div>

      {/* Paginación Inferior Sincronizada */}
      {renderPaginacion()}

      {noHayResultados && (
        <div className={styles.home__noHayTallas}>
          Ups, por el momento no hay coincidencias. Puedes probar con otra búsqueda o talla.
        </div>
      )}

      <div className={`${styles.home__descripcion} ${noHayResultados ? styles["home__descripcion--sin"] : ""}`}>
        <div className={styles.home__dizi}>
          <img src={daisy} alt="Imagen de flor margarita" />
          <h2>DIZI STORE</h2>
          <img src={daisy} alt="Imagen de flor margarita" />
        </div>
        <p>
          En nuestra tienda online encontrarás vestidos, tacones, maquillaje y más... 
          Ubicados en Cochabamba, realizamos envíos a toda Bolivia.
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default Home