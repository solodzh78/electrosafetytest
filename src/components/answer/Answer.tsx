import React from "react";
import { useTraceUpdate } from "../../hooks/useTraceUpdate";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { RadioButton } from "../radiobutton/RadioButton";

interface IAnswerProp {
    answerNumber: number,
    cardNumber: number,
    classNames: {readonly[key: string]: string;},
    classAnswerInput: string,
    classAnswerLabel: string,
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

    // Получение правильного ответа из стейта
    const correctAnswer = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[cardNumber - 1].correctAnswer);

    // Получение статуса тестирования из стейта
    const isTesting = useAppSelector(({ main: { quiz: { isTesting } } }: RootState) => isTesting);

    // Формирование метки
    const labelId = `card_${cardNumber}_${id}_answer_${answerNumber}`;

    // Формирование классов кнопки
    const classButtonLabel = checked && !isTesting
        ? (correctAnswer === answerNumber 
            ? props.classNames.answer__label + ' ' + props.classNames.passed
            : props.classNames.answer__label + ' ' + props.classNames.failed
        ) : props.classNames.answer__label;

    console.log("Рендер Answer: ", labelId);
    useTraceUpdate(props);

    return (
        <RadioButton
            name={`card_${cardNumber}_${id}`}
            value={answerNumber}
            checked={checked}
            id={labelId}
            classButtonInput={props.classNames.answer__input}
            classButtonLabel={classButtonLabel}
        >
            {answerText}
        </RadioButton>
    );
}
