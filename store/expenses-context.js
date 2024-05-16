import { createContext, useReducer, useEffect } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => { },
  addExpense: ({ description, amount, date, id }) => { },
  deleteExpense: (id) => { },
  updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {

  switch (action.type) {
    case 'SET':
      let inverted = action.payload.reverse();
      // console.log('set_expenses-context', inverted)
      return inverted;
    case 'ADD':
      // console.log('add_expenses-context', state);
      // console.log('payload_expenses-context', action.payload)
      return [...state, { key: action.payload.id, value: { description: action.payload.data.description, date: action.payload.data.date, amount: action.payload.data.amount, } }];
    case 'UPDATE':
      // console.log('update', state);
      // console.log('action.payload.data', action.payload.data)
      const updatableExpenseIndex = state.findIndex(
        (expense) =>
          expense.key == action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, value: { description: action.payload.data.description, date: action.payload.data.date, amount: action.payload.data.amount, } };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      // console.log('updatedExpenses', updatableExpense)
      return updatedExpenses;
    case 'DELETE':
      // console.log('delete_expenses-context', action.payload);
      // console.log('filter_expenses-context', state.filter((expense) => { console.log(expense.key); return expense.key !== action.payload }))

      return state.filter((expense) => expense.key !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {



  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  // console.log('update_expenses-context', expensesState);

  function addExpense(id, expenseData) {
    // console.log('addExpense_expenses-context', id, expenseData)
    dispatch({ type: 'ADD', payload: { id: id, data: expenseData } });
  }

  function deleteExpense(id) {
    // console.log('delete', id)
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }
  function setExpenses(expenses) {

    dispatch({ type: 'SET', payload: expenses });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;





// useEffect(() => {

//   async function getExpenses() {
//     const data = await fetchExpenses();
//     dispatch({ type: 'SET', payload: data });
//   }
//   getExpenses();

// }, [])



// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     description: 'A pair of shoes',
//     amount: 59.99,
//     date: new Date('2021-12-19'),
//   },
//   {
//     id: 'e2',
//     description: 'A pair of trousers',
//     amount: 89.29,
//     date: new Date('2022-01-05'),
//   },
//   {
//     id: 'e3',
//     description: 'Some bananas',
//     amount: 5.99,
//     date: new Date('2021-12-01'),
//   },
//   {
//     id: 'e4',
//     description: 'A book',
//     amount: 14.99,
//     date: new Date('2022-02-19'),
//   },
//   {
//     id: 'e5',
//     description: 'Another book',
//     amount: 18.59,
//     date: new Date('2022-02-18'),
//   },
//   {
//     id: 'e6',
//     description: 'A pair of trousers',
//     amount: 89.29,
//     date: new Date('2022-01-05'),
//   },
//   {
//     id: 'e7',
//     description: 'Some bananas',
//     amount: 5.99,
//     date: new Date('2021-12-01'),
//   },
//   {
//     id: 'e8',
//     description: 'A book',
//     amount: 14.99,
//     date: new Date('2022-02-19'),
//   },
//   {
//     id: 'e9',
//     description: 'Another book',
//     amount: 18.59,
//     date: new Date('2022-02-18'),
//   },
// ];