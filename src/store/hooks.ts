import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";
import { ICard } from "./quizSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetValueFromStore = (
    key: keyof ICard,
    cardNumber: number,
    answerNumber = 0
) =>
    useAppSelector(({ quiz: { quiz } }: RootState) => {
        if (quiz && quiz.length !== 0) {
            if (answerNumber === 0) return quiz[cardNumber - 1][key];

			const answers = quiz[cardNumber - 1][key];
			if (Array.isArray(answers)) return answers[answerNumber];
		} 
    });
