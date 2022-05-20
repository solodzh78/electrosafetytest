import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { RadioButton } from "../radiobutton/RadioButton";

interface IProps {
    name: string;
    id: string;
    value: number;
    checked: boolean;
    classNames: {readonly [key: string]: string;};
}

export const QlineButton: React.FC<IProps> = function ({ name, id, value, checked, classNames, children  }) {
    const isAnswerSelected = useAppSelector(({main: { quiz }}: RootState) => 
    !!quiz.ticket[value - 1].selectedAnswer);
    
    const isCorrect = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[value - 1].correctAnswer === ticket[value - 1].selectedAnswer);
    
    const isTesting = useAppSelector(({ main: { quiz: { isTesting } } }: RootState) => isTesting);
    
    const classAdded = !isTesting
        ? (isCorrect
            ? classNames['--passed']
            : classNames['--failed']
        )
        : '';

    const classButtonLabel = isAnswerSelected
        ? classNames['question-line__button-label'] + ' ' + classNames['--answer-selected'] + ' ' + classAdded
        : classNames['question-line__button-label'] + ' ' + classAdded;

    return (
        <RadioButton 
            name={name}
            id={id}
            value={value}
            checked={checked}
            classButtonLabel={classButtonLabel}
        >
            {children}
        </RadioButton>)

}
