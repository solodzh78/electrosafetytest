import { ICard } from "../store/mainSlice";
import { isValidate } from "../assets/variables/tests";
import { postData } from "../utils/post";

// A mock function to mimic making an async request for data
interface IData {
    id: string;
    title: string;
    ticket: Omit<ICard, 'selectedAnswer'>[];
}

export const fetchServerQuiz: (id: string) => Promise<{data: IData}> = async function (id) {
    const { isValid, href, title } = isValidate(id);
    if (!isValid) throw new Error("Не найдено соответствия данной ссылке");

    const card = await postData(
        "http://cy34287.tmweb.ru/php/getQuiz.php",
        {
            gruppa: href,
        }
    );
    const quiz = {
        data: {
            id: href,
            title: title,
            ticket: card as unknown as Omit<ICard, "selectedAnswer">[],
        },
    };

    return quiz;
    // const response = await fetch("http://cy34287.tmweb.ru/php/getQuiz.php", {
    //     method: "POST",
    //     mode: "no-cors",
    //     body: (() => {
    //         const formData = new FormData();
    //         formData.set("gruppa", href);
    //         return formData;
    //     })(),
    // });
    // const card = await response.json();
    // const quiz = {
    //     data: {
    //         id: href,
    //         title: title,
    //         ticket: card
    // }}
    
    // return quiz;
    
};
