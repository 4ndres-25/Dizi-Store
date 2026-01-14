export interface Vestido {
  id: number;
  name: string;
  category: string;     
  estilo: string;       
  descripcion: string;
  color: string;        
  tono: string;         
  tipo_tela: string;    
  temporada: string[];  
  tallas: string[];     
  estado: string;     
  price: number;
  currency: string; 
  tags: string[];
  image: string;
  stock: number;
  materiales: string[];
  slug: string;        
}