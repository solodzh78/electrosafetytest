import { ICard } from "../store/mainSlice";
import { isValidate } from "../assets/variables/tests";
import { postData } from "../utils/post";

interface ICardFromServer {
    id: number;
    question: string;
    answers: string;
    correctAnswer: number;
}
interface IData {
    id: string;
    title: string;
    ticket: Omit<ICard, 'selectedAnswer'>[];
}

// Запрос данных с сервера
export const fetchServerQuiz: (id: string) => Promise<{data: IData}> = async function (id) {
    const { isValid, href, title } = isValidate(id);
    if (!isValid) throw new Error("Не найдено соответствия данной ссылке");
    
    const card: ICardFromServer[] = await postData(
        "http://temp-bd.ru/php/getQuiz.php",
        {
            gruppa: href,
        }
        );

    const stringToArray: (elem: ICardFromServer) => void = (elem) => {
        console.log('id:', elem.id, 'answers: ', elem.answers);
        elem["answers"] = JSON.parse(elem["answers"]);
    };
    card.forEach((elem) => stringToArray(elem));

    const quiz = {
        data: {
            id: href,
            title: title,
            ticket: card as unknown as Omit<ICard, "selectedAnswer">[],
        },
    };

    // console.log('quiz: ', quiz);
    return quiz;
};
