import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchServerQuiz as fetchLocalQuiz } from "../api/quizAPI_PHP";

export interface ICard {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number;
    selectedAnswer: number;
}

export interface IMainState {
    quiz: {
        ticket: ICard[];
        readyToCheck: boolean;
        showModal: boolean;
        title: string;
        id: string;
        selectedCard: number;
        isTesting: boolean;
    };
    status: "idle" | "loading" | "success" | "failed";
    error: [];
}

export const fetchQuiz = createAsyncThunk(
    "main/fetchQuiz",
    async (testId: string, { rejectWithValue }) => {
        try {
            const res = await fetchLocalQuiz(testId);
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

interface ISetSelectedCardPayload {
	selectedCard: number
}

const initialState: IMainState = {
    quiz: {
        ticket: [],
        readyToCheck: false,
        showModal: false,
        title: '',
        id: '',
        selectedCard: 1,
        isTesting: true
    },
    status: "idle",
    error: [],
};

export const mainSlice = createSlice({
    name: "main",
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
                state.quiz.ticket[cardNumber - 1].selectedAnswer =
                    selectedAnswer;
            }
            const selectedCount = state.quiz.ticket.reduce(
                (akk, card) => akk + (card.selectedAnswer ? 1 : 0),
                0
            );
            if (selectedCount === 10) state.quiz.readyToCheck = true;
        },
        // Записывает в стор выбранный номер вопроса selectedCard
        setSelectedCard: (
            state,
            action: PayloadAction<ISetSelectedCardPayload>
        ) => {
            const { selectedCard } = action.payload;
            if (state.quiz) {
                state.quiz.selectedCard = selectedCard;
            }
        },
        // Записывает в стор состояние модального окна
        setShowModal: (
            state,
            action: PayloadAction<{ showModal: boolean }>
        ) => {
            const { showModal } = action.payload;
            if (state.quiz) {
                state.quiz.showModal = showModal;
            }
        },
        // Записывает в стор состояние режима тестирования
        setIsTesting: (
            state,
            action: PayloadAction<{ isTesting: boolean }>
        ) => {
            const { isTesting } = action.payload;
            if (state.quiz) {
                state.quiz.isTesting = isTesting;
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
                state.quiz.ticket = action.payload.ticket as ICard[];
                state.quiz.id = action.payload.id;
                state.quiz.title = action.payload.title;
                state.quiz.readyToCheck = false;
                state.quiz.isTesting = true;
                console.log("payload:", action.payload);
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const { 
    setSelectedAnswer, 
    setSelectedCard, 
    setShowModal, 
    setIsTesting } = mainSlice.actions;

// Приведенная ниже функция называется селектором и позволяет нам выбирать значение из состояния. 
// Селекторы также могут быть определены внутри файла, где они используются, а не в файле слайса. 
// Например: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

// Мы также можем вручную написать переходники, которые могут содержать как синхронную, так и асинхронную логику. 
// Вот пример условной отправки действий на основе текущего состояния.

export default mainSlice.reducer;
