import React from "react";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { RadioButton } from "../radiobutton/RadioButton";

interface IAnswerProp {
    answerNumber: number,
    cardNumber: number,
}

export const Answer: React.FC<IAnswerProp> = function({ cardNumber, answerNumber }: IAnswerProp) {

    const answerText = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[cardNumber - 1].answers[answerNumber]);

    const checked = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[cardNumber - 1].selectedAnswer === answerNumber);
        
    const id = useAppSelector(({ main: { quiz: { ticket } } }: RootState) =>
        ticket?.length !== 0 && ticket[cardNumber - 1].id);

    const labelId = `card_${cardNumber}_${id}_answer_${answerNumber}`

    console.log("Рендер Answer: ", labelId);

    return (
        <RadioButton
            name={`card_${cardNumber}_${id}`}
            value={answerNumber}
            checked={checked}
            id={labelId}
        >
            {answerText}
        </RadioButton>
    );
}

// export default React.memo(Answer)