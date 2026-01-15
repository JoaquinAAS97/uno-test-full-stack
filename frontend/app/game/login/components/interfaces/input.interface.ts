export type inputProps = {
    label: string;
    name: string;
    value: string;
    type: 'text' | 'password'; 
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};