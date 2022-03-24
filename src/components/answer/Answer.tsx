import React from "react";
import { RootState } from "../../store";
import { useAppSelector, useGetValueFromStore } from "../../store/hooks";

interface IAnswerProp {
    answerNumber: number,
    cardNumber: number,
}

export interface IAnswerObjectFromStore {
    text: string;
    checked: boolean;
}

export const Answer = ({ cardNumber, answerNumber }: IAnswerProp) => {

    const answerText = useGetValueFromStore("answers", cardNumber, answerNumber); 
    const checked = useAppSelector(({ quiz: { quiz } }: RootState) =>
        quiz &&
        quiz.length !== 0 &&
        quiz[cardNumber - 1].selectedAnswer === answerNumber);
    const id = useGetValueFromStore("id", cardNumber); 
    const labelId = `card_${cardNumber}_${id}_answer_${answerNumber}`

    console.log("Рендер Answer: ", labelId);

    return (
        <> 
            <input
                type="radio"
                value={answerNumber}
                name={`card_${cardNumber}_${id}`}
                checked={checked}
                id={labelId}
                readOnly
            />
            <label htmlFor={labelId}>{answerText}</label>
        </>
    );
}

// export default React.memo(Answer)