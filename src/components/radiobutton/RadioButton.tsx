interface IProps {
    name: string;
    id: string;
    value: number;
    checked: boolean;
    classButtonInput?: string;
    classButtonLabel?: string;
    style?: React.CSSProperties;
}

export const RadioButton: React.FC<IProps> = function ({ 
    name, 
    id, 
    value, 
    checked, 
    classButtonInput, 
    classButtonLabel, 
    children, 
    style }) {
        
    return <>
        <input
            className={classButtonInput}
            type="radio"
            readOnly
            name={name}
            id={id}
            value={value}
            checked={checked}
        />
        <label className={classButtonLabel} htmlFor={id}>
            {children}
        </label>
    </>
}