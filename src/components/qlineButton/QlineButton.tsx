import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { RadioButton } from "../radiobutton/RadioButton";

interface IProps {
    name: string;
    id: string;
    value: number;
    checked: boolean;
    className?: string;
}

export const QlineButton: React.FC<IProps> = function ({ name, id, value, checked, className, children  }) {
    const isAnswerSelected = useAppSelector(({main: { quiz }}: RootState) => 
        !!quiz.ticket[value - 1].selectedAnswer);
        
    return (
        <RadioButton 
            name={name}
            id={id}
            value={value}
            checked={checked}
            className={isAnswerSelected ? className : ''}
        >
            {children}
        </RadioButton>)

}
    // <>
    //     <input
    //         type="radio"
    //         readOnly
    //         name={name}
    //         id={id}
    //         value={value}
    //         checked={checked}
    //     />
    //     <label htmlFor={id} className={className}>{children}</label></>