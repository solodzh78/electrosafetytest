import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { RadioButton } from "../radiobutton/RadioButton";
import styles from './QlineButton.module.scss';

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
    
    const isCorrect = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[value - 1].correctAnswer === ticket[value - 1].selectedAnswer);
    
    const isTesting = useAppSelector(({ main: { quiz: { isTesting } } }: RootState) => isTesting);
    
    console.log('isCorrect: ', isCorrect);

    const classAdded = !isTesting
        ? (isCorrect
            ? styles.passed
            : styles.failed
        )
        : '';

    const classNameButton = isAnswerSelected && className 
    ? className + ' ' + classAdded
    : '';
    console.log('className: ', className);

    return (
        <RadioButton 
            name={name}
            id={id}
            value={value}
            checked={checked}
            className={classNameButton}

        >
            {children}
        </RadioButton>)

}
