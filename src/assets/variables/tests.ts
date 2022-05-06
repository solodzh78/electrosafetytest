export const tests = [
    {
        title: "ЭБ 1260.12 V группа по электробезопасности выше 1000 В",
        href: "h5",
    },
    {
        title: "ЭБ 1259.11 IV группа по электробезопасности выше 1000 В",
        href: "h4",
    },
    {
        title: "ЭБ 1258.11 IV группа по электробезопасности до 1000 В",
        href: "l4",
    },
    {
        title: "ЭБ 1256.11 III группа по электробезопасности до 1000 В",
        href: "l3",
    },
    {
        title: "ЭБ 1254.11 II группа по электробезопасности до 1000 В",
        href: "l2",
    },
];

export const isValidate = (id: string) => {

    const data = {
        isValid: false,
        title: '',
        href: ''
    };

    tests.forEach((elem) => {
        if (elem.href === id) {
            data.isValid = true;
            data.title = elem.title;
            data.href = elem.href
        }
    });

    return data;
}