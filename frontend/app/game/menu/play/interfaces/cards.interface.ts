export interface CardProps { 
  id: string; 
  title: string; 
  url_img: string; 
  position: number; 
  flipped?: boolean; 
  onClick?: () => void; 
  match?: boolean;  
}
