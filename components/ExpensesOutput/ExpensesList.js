import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
  // // console.log('itemData', itemData);

  return <ExpenseItem {...itemData} />;
}

function ExpensesList({ expenses }) {
  // console.log('expensesList', expenses)
  return (
    <FlatList
      data={expenses}
      keyExtractor={() => Math.random().toString()}
      renderItem={renderExpenseItem}
    // keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
