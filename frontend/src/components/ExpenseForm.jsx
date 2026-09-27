import { useState } from "react";

function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const expense = {
      title,
      amount,
      category,
      description,
      expenseDate,
    };

    console.log("Expense submitted:", expense);

    // Clear the form
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDescription("");
    setExpenseDate("");
  };

  return (
    <section className="expense-form-section">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Lunch"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>

          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Example: 25.50"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Optional description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expenseDate">Date</label>

          <input
            id="expenseDate"
            type="date"
            value={expenseDate}
            onChange={(event) => setExpenseDate(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Expense
        </button>

      </form>
    </section>
  );
}

export default ExpenseForm;