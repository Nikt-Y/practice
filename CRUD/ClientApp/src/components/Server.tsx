import axios from 'axios'

const baseUrl = "http://localhost:5186/api/Products"

export const update = (setData: (data: any[]) => void) => {
    axios.get(baseUrl)
        .then(res => setData(res.data))
        .catch(function (error) {
            console.log(error);
        });
}

export const edit = (id: number, obj: any) => {
    axios.put(baseUrl + `/${id}`, obj)
}

export const addNew = (obj: any, getId: (id: number) => void) => {
    axios.post(baseUrl, obj).then(res => getId(res.data.id));
}

export const del = (id: number) => {
    axios.delete(baseUrl + `/${id}`)
}
