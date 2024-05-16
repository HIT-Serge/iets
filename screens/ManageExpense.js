import { useContext, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { storeExpense, fetchExpenses, deleteExpense, putExpense } from '../util/http';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);


  const editedExpenseId = route.params?.expenseId;
  // console.log('route param', route.params)
  const isEditing = !!editedExpenseId;
  // console.log('isEditing', isEditing);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => {
      // console.log('selectedExpense', expense.key, editedExpenseId);
      return expense.key === editedExpenseId
    }
  );
  // console.log('selectedExpense', selectedExpense);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);


  async function deleteExpenseHandler() {
    console.log('deleteExpenseHandler', editedExpenseId)
    deleteExpense(editedExpenseId);
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      // console.log('isEditing', expenseData);
      putExpense(editedExpenseId, expenseData);
      expensesCtx.updateExpense(editedExpenseId, expenseData);
      console.log('ManageExpense49', expensesCtx.expenses)
    } else {
      // console.log('confirmHandler');
      // const id = new Date().toString() + Math.random().toString();
      // console.log('manageExpense', expenseData);
      const id = await storeExpense(expenseData);
      // console.log('id_ManageExpense', id)
      expensesCtx.addExpense(id, expenseData);
    }
    // console.log('expensesCtx_ManageExpense', expensesCtx)
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
