interface IInputObject{
    id: number,
    question: string,
    answers: string[],
    correctAnswer: number,
    selectedAnswer?: number | undefined;
}

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

export const changeInputData: (arr: IInputObject[]) => ICard[] = (arr) => {
    const data = [];
    for (let i = 0; i < arr.length; i++) {
        let dataItem: any = {};
        const obj = arr[i];

        let key: keyof IInputObject;
        for (key in obj) {
            if (key === "answers") {
                const answers = [];
                for (let j = 0; j < arr[i].answers.length; j++) {
                    const newAnswer = {
                        text: obj.answers[j],
                        checked: false,
                    };
                    answers.push(newAnswer);
                }
                dataItem[key] = answers;
            } else {
                dataItem[key] = obj[key];
            }
        }
        data.push(dataItem as ICard);
    }
    return data;
};