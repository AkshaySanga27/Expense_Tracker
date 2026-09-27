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

function MonthlySpending({ refresh }) {
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
      console.error("Error loading monthly spending:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total spending for each month
  const monthlyTotals = expenses.reduce((totals, expense) => {
    const date = new Date(expense.expense_date);

    const year = date.getFullYear();
    const month = date.getMonth();

    const monthKey = `${year}-${month}`;

    if (!totals[monthKey]) {
      totals[monthKey] = {
        year,
        month,
        amount: 0,
      };
    }

    totals[monthKey].amount += Number(expense.amount);

    return totals;
  }, {});

  // Convert object into array and sort newest month first
  const monthlyData = Object.values(monthlyTotals).sort(
    (a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }

      return b.month - a.month;
    }
  );

  const formatMonth = (year, month) => {
    const date = new Date(year, month, 1);

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Chart should display oldest → newest
  const chartData = [...monthlyData]
    .reverse()
    .map((item) => ({
      month: formatMonth(item.year, item.month),
      amount: item.amount,
    }));

  if (loading) {
    return (
      <section className="monthly-spending">
        <h2>Monthly Spending</h2>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="monthly-spending">

      <h2>Monthly Spending</h2>

      {monthlyData.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <div className="monthly-chart">

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

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value) => [
                  `AED ${Number(value).toFixed(2)}`,
                  "Spending",
                ]}
              />

              <Bar
                dataKey="amount"
                name="Spending"
                barSize={45}
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>
      )}

    </section>
  );
}

export default MonthlySpending;