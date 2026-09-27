function ExpenseItem({ expense }) {
  return (
    <div className="expense-item">
      <div className="expense-info">
        <h3>{expense.title}</h3>

        <p>{expense.description}</p>

        <span className="expense-category">
          {expense.category}
        </span>
      </div>

      <div className="expense-details">
        <strong>AED {expense.amount.toFixed(2)}</strong>

        <span>{expense.expenseDate}</span>
      </div>

      <div className="expense-actions">
        <button className="edit-button">
          Edit
        </button>

        <button className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;