export interface Vestido {
  id: number;
  name: string;
  category: string;     
  largo_del_vestido: string;       
  descripcion: string;
  color: string;        
  tono: string;         
  tipo_tela: string;    
  tallas: string[];     
  estado: string;     
  price: number;
  currency: string; 
  tags: string[];
  image: string[];
  stock: number;
  materiales: string[];
  mangas: string;
  corte: string;
  slug: string;        
}