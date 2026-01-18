import Header from '../../components/Header/Index';
import vestidos from '../../data/vestidos.json'
import type {Vestido} from "../../types/Vestidos"
import TarjetaHome from '../../components/TarjetaHome/Index';
import { useState, useEffect } from 'react';

type Props = {}

function Favoritos({}: Props) {
    const datosVestidos: Vestido[] = vestidos;
    
    
    

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
        
      
        const funcionFavoritos = (id : number) =>{
          if(id){
            setidFavoritos(prev => prev.includes(id)? prev.filter(favid => favid !==id): [...prev, id])
          }
          
        }
    
  return (
    <>
      <Header></Header>
      <div>
        {datosVestidos.map((item, index: number) => (
         <>
          {
          idFavoritos.some(elem => elem === item.id ) &&
          
          
          <TarjetaHome key={index} imagen={item.image[0]} nombreProducto={item.name} slug={item.slug} handleFavoritos={()=>funcionFavoritos(item.id)}></TarjetaHome>
        }
         </>
        ))}
      </div>
    </>
    )
}

export default Favoritos