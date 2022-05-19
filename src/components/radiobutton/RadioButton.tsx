
interface IProps {
    name: string;
    id: string;
    value: number;
    checked: boolean;
    className?: string;
    style?: React.CSSProperties;
}


export const RadioButton: React.FC<IProps> = function ({ 
    name, 
    id, 
    value, 
    checked, 
    className, 
    children, 
    style }) {
        
        const onLoad: (e: any)=>void = e => e.target.innerText = children;
        
        return <>
        <input
            type="radio"
            readOnly
            name={name}
            id={id}
            value={value}
            checked={checked}
        />
            <label htmlFor={id} className={className} onLoad={onLoad} >
                {children}
            </label>
        </>
    
}