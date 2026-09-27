import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenseApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CategorySpending({ refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, [refresh]);

  const loadExpenses = async () => {
    try {
      setLoading(true);

      const data = await getExpenses();

      setExpenses(data);
    } catch (error) {
      console.error("Error loading category spending:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate spending by category
  const categoryTotals = expenses.reduce((totals, expense) => {
    const category = expense.category || "Other";
    const amount = Number(expense.amount);

    if (!totals[category]) {
      totals[category] = 0;
    }

    totals[category] += amount;

    return totals;
  }, {});

  // Convert category totals into chart data
  const chartData = Object.entries(categoryTotals).map(
    ([category, total]) => ({
      category,
      total,
    })
  );

  if (loading) {
    return (
      <section className="category-spending">
        <h2>Spending by Category</h2>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="category-spending">

      <h2>Spending by Category</h2>

      {chartData.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <div className="category-chart">

          <ResponsiveContainer width="100%" height={280}>
            <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 10,
                  bottom: 10,
                }}
              >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="category" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `AED ${Number(value).toFixed(2)}`,
                  "Spending",
                ]}
              />

              <Bar
                dataKey="total"
                name="Spending"
              />

            </BarChart>
          </ResponsiveContainer>

        </div>
      )}

    </section>
  );
}

export default CategorySpending;