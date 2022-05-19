import React from "react";
import { useTraceUpdate } from "../../hooks/useTraceUpdate";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { RadioButton } from "../radiobutton/RadioButton";
import styles from './Answer.module.scss';

interface IAnswerProp {
    answerNumber: number,
    cardNumber: number,
}

export const Answer: React.FC<IAnswerProp> = function(props) {

    const { cardNumber, answerNumber } = props;

    // Получение текста ответа из стейта
    let answerText = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
    ticket.length !== 0? ticket[cardNumber - 1].answers[answerNumber - 1]: '');

    // Получение состояния выбрано ответа из стейта
    const checked = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[cardNumber - 1].selectedAnswer === answerNumber);

    // Получение идентификатора вопроса из стейта
    const id = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[cardNumber - 1].id);

    const correctAnswer = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[cardNumber - 1].correctAnswer);

    const isTesting = useAppSelector(({ main: { quiz: { isTesting } } }: RootState) => isTesting);

    const labelId = `card_${cardNumber}_${id}_answer_${answerNumber}`;

    const classes = checked && !isTesting
        ? (correctAnswer === answerNumber 
            ? styles.passed
            : styles.failed
        ) : '';



    console.log("Рендер Answer: ", labelId);
    useTraceUpdate(props);
    return (
        <RadioButton
            name={`card_${cardNumber}_${id}`}
            value={answerNumber}
            checked={checked}
            id={labelId}
            className={classes}
        >
            {answerText}
        </RadioButton>
    );
}
