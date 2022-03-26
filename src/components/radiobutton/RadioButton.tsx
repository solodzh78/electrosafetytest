interface IProps {
    name: string;
    id: string;
    value: number;
    checked: boolean;
    className?: string;
}

export const RadioButton: React.FC<IProps> = function ({ name, id, value, checked, className, children }) {
    return <>
        <input
            type="radio"
            readOnly
            name={name}
            id={id}
            value={value}
            checked={checked}
        />
        <label htmlFor={id} className={className}>{children}</label></>
}