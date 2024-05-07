import { useContext, useEffect, useState, } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../util/http';
import { useNavigation, } from '@react-navigation/native';

function AllExpenses() {
  // const { lastNavigated } = useContext(NavigationContext);
  const navigation = useNavigation();
  // const [expenses, setExpenses] = useState([]);


  const expensesCtx = useContext(ExpensesContext);
  // console.log('expensesCtxAll', expensesCtx.expenses);
  useEffect(() => {

    async function getExpenses() {
      const data = await fetchExpenses();
      console.log('data', data);
      expensesCtx.setExpenses(data);

    }
    getExpenses();
  }, []);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      // expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;

// useEffect(() => {
//   const unsubscribe = navigation.addListener('focus', () => {
//     // console.log('focusonAllExpenses');

//     async function getExpenses() {
//       const data = await fetchExpenses();
//       setExpenses(data);
//     }
//     getExpenses();
//   });

//   // Return the unsubscribe function to clean up the listener
//   return unsubscribe;
// }, []);