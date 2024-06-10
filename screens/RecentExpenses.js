import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays, getFormattedDate } from '../util/date';
import { fetchExpenses } from '../util/http';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { createErrorHandler } from 'expo/build/errors/ExpoErrorManager';

function RecentExpenses() {

  const navigation = useNavigation();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      try {
        const data = await fetchExpenses();
        expensesCtx.setExpenses(data);
      } catch (error) {
        setError('Could not fetch expenses. Please try again later.');
      }
      finally {
        setIsFetching(false);
      }
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    let itemDate = new Date(expense.value.date);
    let today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return itemDate >= date7DaysAgo;
  });
  // // console.log('recentExpenses', recentExpenses)

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (

    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
