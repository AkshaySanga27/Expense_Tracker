import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { getExpenses } from "../api/expenseApi";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);

      const data = await getExpenses();

      setExpenses(data);
      setError("");
    } catch (error) {
      console.error("Error loading expenses:", error);
      setError("Unable to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="expense-list-section">

      <div className="expense-list-header">
        <div>
          <h2>Recent Expenses</h2>
          <p>Your latest expenses</p>
        </div>

        <button className="add-expense-button">
          + Add Expense
        </button>
      </div>

      {loading && <p>Loading expenses...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && expenses.length === 0 && (
        <p>No expenses found.</p>
      )}

      {!loading && !error && expenses.length > 0 && (
        <div className="expense-list">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default ExpenseList;