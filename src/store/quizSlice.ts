import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLocalQuiz } from "../api/quizAPI";

export interface ICard {
    id: number;
    question: string;
    answers: {
        text: string;
        checked: boolean;
    }[];
    correctAnswer: number;
    selectedAnswer: number;
}

export interface IQuizState {
    quiz: ICard[] | [];
    status: "idle" | "loading" | "success" | "failed";
    error: [];
}

export const fetchQuiz = createAsyncThunk(
    "quiz/fetchQuiz",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchLocalQuiz();
            const data = res.data;
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

interface ISetSelectedAnswerPayload {
	cardNumber: number,
	selectedAnswer: number
}

const initialState: IQuizState = {
    quiz: [],
    status: "idle",
    error: [],
};

export const quizSlice = createSlice({
    name: "quiz",
    initialState,

    // Поле «редьюсеры» позволяет нам определять редьюсеры и генерировать связанные действия.
    reducers: {

        // Записывает в стор выбранный номер ответа на вопрос cardNumber
        setSelectedAnswer: (
            state,
            action: PayloadAction<ISetSelectedAnswerPayload>
        ) => {
            const { cardNumber, selectedAnswer } = action.payload;
            if (state.quiz) {
                state.quiz[cardNumber - 1].selectedAnswer = selectedAnswer;
            }
        },
    },

    // Поле `extraReducers` позволяет срезу обрабатывать действия, определенные в другом месте,
    // включая действия, созданные createAsyncThunk или в других срезах.

    extraReducers: (builder) => {
        builder
            .addCase(fetchQuiz.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.status = "success";
                state.quiz = action.payload;
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const { setSelectedAnswer } = quizSlice.actions;

// Приведенная ниже функция называется селектором и позволяет нам выбирать значение из состояния. 
// Селекторы также могут быть определены внутри файла, где они используются, а не в файле слайса. 
// Например: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

// Мы также можем вручную написать переходники, которые могут содержать как синхронную, так и асинхронную логику. 
// Вот пример условной отправки действий на основе текущего состояния.

export default quizSlice.reducer;
