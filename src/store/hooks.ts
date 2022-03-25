import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";
import { ICard } from "./mainSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetValueFromStore = (
    key: keyof ICard,
    cardNumber: number,
    answerNumber: number = 0
) =>
    useAppSelector(
        ({
            main: {
                quiz: { ticket },
            },
        }: RootState) => {
            if (ticket && ticket.length !== 0) {
                if (answerNumber === 0) return ticket[cardNumber - 1][key];

                const answers = ticket[cardNumber - 1][key];
                if (Array.isArray(answers)) return answers[answerNumber - 1];
            }
        }
    );
