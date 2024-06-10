import { useContext, useEffect, useState, } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../util/http';
import { useNavigation, } from '@react-navigation/native';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function AllExpenses() {
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


  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;

