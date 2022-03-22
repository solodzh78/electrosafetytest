import React from "react";
import { useGetValueFromStore } from "../../store/hooks";

interface IAnswer {
    answerNumber: number,
    cardNumber: number,
}
export const Answer = ({ cardNumber, answerNumber }: IAnswer) => {

    const answer = useGetValueFromStore("answers", cardNumber, answerNumber); 
    console.log('answer: ', answer);
    const answerText = (answer.text) ? answer.text : '';
    const id = useGetValueFromStore("id", cardNumber); 
    const selectedAnswer = useGetValueFromStore("selectedAnswer", cardNumber); 

    const labelId = `card_${cardNumber}_${id}_answer_${answerNumber}`

    console.log("Рендер: ", labelId);
    return (
        <> 
            <input
                type="radio"
                value={answerNumber}
                name={`card_${cardNumber}_${id}`}
                checked={selectedAnswer === answerNumber ? true : false}
                id={labelId}
                readOnly
            />
            <label htmlFor={labelId}>{answerText}</label>
        </>
    );
}

export default React.memo(Answer)