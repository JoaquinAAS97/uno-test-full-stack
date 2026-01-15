export type ButtonProps = {
    label: string; 
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit'; 
};