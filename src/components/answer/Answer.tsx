import React from "react";
import { useTraceUpdate } from "../../hooks/useTraceUpdate";
import { useAppSelector } from "../../store/hooks";

interface IAnswer {
    answerNumber: number,
    cardNumber: number,
}
export const Answer = (props: IAnswer) => {
    const { cardNumber, answerNumber } = props;

    const answerText = useAppSelector(state => {
        if (state.quiz.quiz && state.quiz.quiz.length !== 0) {
            return state.quiz.quiz[(cardNumber - 1)]["answers"][answerNumber - 1]
        }
    });

    const id = useAppSelector(state => {
        if (state.quiz.quiz && state.quiz.quiz.length !== 0) {
            return state.quiz.quiz[(cardNumber - 1)]["id"]
        }
    });

    const selectedAnswer = React.useMemo(useAppSelector(state => {
        if (state.quiz.quiz && state.quiz.quiz.length !== 0) {
            return state.quiz.quiz[(cardNumber - 1)]["selectedAnswer"]
        }
    }));

    const labelId = `card_${cardNumber}_${id}_answer_${answerNumber}`

    console.log("Рендер: ", labelId);
    useTraceUpdate(props);
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