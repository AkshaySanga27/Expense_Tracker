import { useState } from "react";
import { createExpense } from "../api/expenseApi";

function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // Clean title
    const cleanedTitle = title.trim();

    // Validate title
    if (!cleanedTitle) {
      setError("Please enter an expense title.");
      return;
    }

    if (cleanedTitle.length > 100) {
      setError("Title must be 100 characters or less.");
      return;
    }

    // Validate amount
    const numericAmount = Number(amount);

    if (!amount || Number.isNaN(numericAmount)) {
      setError("Please enter a valid amount.");
      return;
    }

    if (numericAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    // Validate date
    if (!expenseDate) {
      setError("Please select an expense date.");
      return;
    }

    // Prevent future dates
    const selectedDate = new Date(`${expenseDate}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setError("Expense date cannot be in the future.");
      return;
    }

    const expense = {
      title: cleanedTitle,
      amount: numericAmount,
      category,
      description: description.trim() || null,
      expense_date: expenseDate,
    };

    try {
      setLoading(true);

      const newExpense = await createExpense(expense);

      console.log("Expense created:", newExpense);

      // Clear form
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDescription("");
      setExpenseDate("");

      // Refresh dashboard
      if (onExpenseAdded) {
        onExpenseAdded();
      }

    } catch (error) {
      console.error("Error creating expense:", error);
      setError("Unable to create expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="expense-form-section">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">
            Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            maxLength="100"
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Example: Lunch"
            required
          />
        </div>


        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">
            Amount
          </label>

          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder="Example: 25.50"
            required
          />
        </div>


        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">
              Entertainment
            </option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>


        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            value={description}
            maxLength="500"
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Optional description"
            rows="3"
          />
        </div>


        {/* Date */}
        <div className="form-group">
          <label htmlFor="expenseDate">
            Date
          </label>

          <input
            id="expenseDate"
            type="date"
            value={expenseDate}
            onChange={(event) =>
              setExpenseDate(event.target.value)
            }
            required
          />
        </div>


        {/* Error */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        {/* Submit */}
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>

      </form>
    </section>
  );
}

export default ExpenseForm;