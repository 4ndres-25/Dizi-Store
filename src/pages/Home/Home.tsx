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

const Home = ({ datosDesdeHeader, setNoEncontro, setSearchClicked }: Props) => {
  const [params, setParams] = useSearchParams()
  const sizes = ["Todas las tallas", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
  
  // 1. ESTADOS ESENCIALES
  const [sizeSelected, setSizeSelected] = useState("Todas las tallas")
  const [notificacionFavoritos, setNotificacionFavoritos] = useState(false)
  const [coincide, setCoincide] = useState<boolean>(false)
  
  // Extraemos la búsqueda actual de la URL
  const searchQuery = params.get("search") || "";

  // 2. SINCRONIZACIÓN DE ESTADO DURANTE EL RENDER (Evita Render Cascada)
  // Guardamos la búsqueda anterior para saber cuándo el usuario escribió algo nuevo
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  if (searchQuery !== prevSearchQuery) {
    // Si la búsqueda cambió, reseteamos la talla y actualizamos la marca de "anterior"
    setPrevSearchQuery(searchQuery);
    setSizeSelected("Todas las tallas");
    // Al hacer esto aquí, React reinicia el renderizado internamente con los nuevos valores
  }

  const [idFavoritos, setidFavoritos] = useState<number[]>(() => {
    const datosLS = localStorage.getItem("Favoritos");
    return datosLS ? JSON.parse(datosLS) : [];
  });

  // 3. LÓGICA DE FILTRADO (Memoizada para máximo rendimiento)
  const dataFinal = useMemo(() => {
    let resultado = vestidos;

    // Filtro por palabras clave (Búsqueda)
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

    // Filtro por talla (Solo si no es "Todas")
    if (sizeSelected !== "Todas las tallas") {
      resultado = resultado.filter(p => p.tallas.includes(sizeSelected));
    }

    return resultado;
  }, [searchQuery, sizeSelected]);

  // 4. VALORES DERIVADOS (Variables simples, no estados)
  const noHayResultados = dataFinal.length === 0;

  // 5. EFECTOS PARA COMUNICACIÓN EXTERNA (Padre, LocalStorage, Timers)
  
  // Informar al Header/Padre sobre el estado de la búsqueda
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

  // Manejar el reset manual (botón de limpiar filtros si existiera)
  useEffect(() => {
    if (params.get("reset") === "true") {
      setSizeSelected("Todas las tallas");
      setParams({}, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [params, setParams]);

  // Persistencia de Favoritos
  useEffect(() => {
    localStorage.setItem("Favoritos", JSON.stringify(idFavoritos));
  }, [idFavoritos]);

  // Timer de la notificación
  useEffect(() => {
    if (notificacionFavoritos) {
      const timer = setTimeout(() => setNotificacionFavoritos(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [notificacionFavoritos]);

  const funcionFavoritos = (id: number) => {
    const yaEsFavorito = idFavoritos.includes(id);
    setCoincide(!yaEsFavorito);
    setidFavoritos(prev => 
      yaEsFavorito ? prev.filter(favid => favid !== id) : [...prev, id]
    );
    setNotificacionFavoritos(true);
  };

  return (
    <div className={`${styles.home__container} ${noHayResultados ? styles["home__container--sinTallas"] : ""}`}>
      <NotificacionFavoritos estado={notificacionFavoritos} coincide={coincide} />
      
      <h1 className={styles.home__h2}>VESTIDOS</h1>
      
      <div className={styles.home__tallas}>
        {sizes.map((talla) => (
          <BotonSimple 
            key={talla} 
            changeSize={() => setSizeSelected(talla)} 
            active={sizeSelected === talla}
          >
            {talla}
          </BotonSimple>
        ))}
      </div>

      <div className={styles["home__cards-container"]}>
        {dataFinal.map((producto) => (
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