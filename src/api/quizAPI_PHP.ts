import { ICard } from "../store/mainSlice";
import { isValidate } from "../assets/variables/tests";
import { postData } from "../utils/post";
import { dbURL } from "../assets/variables/dbURL";

interface IData {
    id: string;
    title: string;
    ticket: Omit<ICard, 'selectedAnswer'>[];
}

// Запрос данных с сервера
export const fetchServerQuiz: (id: string) => Promise<{data: IData}> = async function (id) {
    const { isValid, href, title } = isValidate(id);
    if (!isValid) throw new Error("Не найдено соответствия данной ссылке");

    const card = await postData(dbURL, {gruppa: href});
    // card.array.forEach((elem: { [x: string]: string; }) => {
    //     elem["answers"] = JSON.parse(elem["answers"]);
    // });
    console.log(card[0].answers[0]);
    const quiz = {
        data: {
            id: href,
            title: title,
            ticket: card as Omit<ICard, 'selectedAnswer'>[],
        },
    };

    return quiz;
};
