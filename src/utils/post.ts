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

    console.log("data: ", data);
    try {
        const response = await fetch(url, {
            method: "POST",
            body: objectToFormData(data),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};