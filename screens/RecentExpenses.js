import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays, getFormattedDate } from '../util/date';
import { fetchExpenses } from '../util/http';
import { useNavigation } from '@react-navigation/native';

function RecentExpenses() {

  const navigation = useNavigation();
  // const [expenses, setExpenses] = useState([]);
  const expensesCtx = useContext(ExpensesContext);

  // console.log('expensesCtxRecent', expensesCtx.expenses);
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    // console.log('focusonRecentExpenses');

    async function getExpenses() {
      const data = await fetchExpenses();
      expensesCtx.setExpenses(data);
    }
    getExpenses();
  }, []);




  // Return the unsubscribe function to clean up the listener
  // return unsubscribe;
  // }, []);



  // const updateExpenses = expensesCtx.expenses;
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    // const recentExpenses = expenses.filter((expense) => {
    // console.log('recentExpense', expense.value.date);
    // let itemDate = getDateMinusDays(new Date())
    let itemDate = new Date(expense.value.date);
    console.log('itemDate', itemDate);
    let today = new Date();
    // today.setHours(0, 0, 0, 0);
    const date7DaysAgo = getDateMinusDays(today, 7);
    console.log("dates", itemDate, date7DaysAgo);


    return itemDate >= date7DaysAgo;

  });
  // console.log('recentExpenses', recentExpenses)

  return (

    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
