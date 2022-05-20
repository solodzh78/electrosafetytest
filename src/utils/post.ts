type Data = {[index: string]: any};

//Преобразование объекта в FormData
const objectToFormData = function (data: Data) {
    const formData = new FormData();
    for (let key in data) {
        formData.set(key, data[key]);
    }
    return formData;
};


//Отправка POST запроса
export const postData = async function (url: string, data: Data) {

    try {
        const response = await fetch(url, {
            method: "POST",
            body: objectToFormData(data),
        });
        const temp = await response.text();
        return  JSON.parse(temp);
    } catch (error) {
        console.error(error);
    }
};