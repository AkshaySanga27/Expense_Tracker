import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenseApi";

function SummaryCards({ refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, [refresh]);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error loading summary:", error);
    } finally {
      setLoading(false);
    }
  };

  // Total amount of all expenses
  const totalSpending = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  // Current month
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Expenses from current month
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.expense_date);

    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const monthlySpending = monthlyExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  // Number of expenses
  const expenseCount = expenses.length;

  // Average expense
  const averageExpense =
    expenseCount > 0
      ? totalSpending / expenseCount
      : 0;

  // Highest expense
  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((expense) => Number(expense.amount))
        )
      : 0;

  if (loading) {
    return (
      <section className="summary-cards">
        <p>Loading summary...</p>
      </section>
    );
  }

  return (
    <section className="summary-cards">

      <div className="summary-card">
        <h3>Total Spending</h3>
        <p>AED {totalSpending.toFixed(2)}</p>
      </div>

      <div className="summary-card">
        <h3>This Month</h3>
        <p>AED {monthlySpending.toFixed(2)}</p>
      </div>

      <div className="summary-card">
        <h3>Total Expenses</h3>
        <p>{expenseCount}</p>
      </div>

      <div className="summary-card">
        <h3>Average Expense</h3>
        <p>AED {averageExpense.toFixed(2)}</p>
      </div>

      <div className="summary-card">
        <h3>Highest Expense</h3>
        <p>AED {highestExpense.toFixed(2)}</p>
      </div>

    </section>
  );
}

export default SummaryCards;