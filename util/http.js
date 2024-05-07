import axios from 'axios';

const BACKEND_URL = 'https://piet-148d3-default-rtdb.firebaseio.com/';

export async function storeExpense({ amount, date, description }) {
    console.log('storeExpense', amount, date, description);
    const response = await axios.post(BACKEND_URL + `/expenses.json`,
        { amount: amount, date: date, description: description })
        .catch(error => {
            console.log('error', error)
        });
    // { amount: amount, date: date, description: description })
    const id = response.data.name;
    console.log('id_HTTP', id);
    return id;
}

export async function fetchExpenses() {

    // const [expenses, setExpenses] = useState([]);

    const response = await axios.get(BACKEND_URL + `/expenses.json`)
        // const response = await axios.get(BACKEND_URL)
        .catch(error => {
            console.log('fetchError', error)
        });

    const expenses = [];
    // console.log('reponsedata', response.data)
    Object.entries(response.data).forEach(([key, value]) => { expenses.push({ key: key, value: value }) });
    // Object.entries(response.data).forEach(([key, value]) => { expenses.push({ key, value }) });

    console.log('httpExpenses', expenses);
    return expenses;

}

export function deleteExpense(id) {
    // let record = BACKEND_URL + `expenses/` + id;
    // let record = `${BACKEND_URL}/expenses/${id}.json`
    // console.log('record', record)
    axios.delete(`${BACKEND_URL}/expenses/${id}.json`)

        .catch(error => {
            console.log('deleteError', error);
        });

}

export function putExpense(id, { amount, date, description }) {
    axios.put(`${BACKEND_URL}/expenses/${id}.json`, { amount, date, description })
        .catch(error => {
            console.log('putExpense', error);
        });
}