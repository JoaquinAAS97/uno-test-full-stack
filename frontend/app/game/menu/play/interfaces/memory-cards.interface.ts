import { CardProps } from "./cards.interface";

export type MemoryCard = CardProps & {
    gameId: string; 
    pairId: string; 
    match: boolean; 
    flipped?: boolean;
};