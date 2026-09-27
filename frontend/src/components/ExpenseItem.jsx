import { useState } from "react";
import { deleteExpense, updateExpense } from "../api/expenseApi";

function ExpenseItem({ expense, onExpenseDeleted, onExpenseUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [description, setDescription] = useState(
    expense.description || ""
  );
  const [expenseDate, setExpenseDate] = useState(
    expense.expense_date
  );

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
  if (deleting) {
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete "${expense.title}"?`
  );

  if (!confirmed) {
    return;
  }

  setError("");

  try {
    setDeleting(true);

    await deleteExpense(expense.id);

    if (onExpenseDeleted) {
      onExpenseDeleted();
    }

  } catch (error) {
    console.error("Error deleting expense:", error);

    setError(
      "Unable to delete expense. Please try again."
    );
  } finally {
    setDeleting(false);
  }
  };
  const handleEdit = () => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDescription(expense.description || "");
    setExpenseDate(expense.expense_date);

    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDescription(expense.description || "");
    setExpenseDate(expense.expense_date);

    setError("");
    setIsEditing(false);
  };

  const handleUpdate = async (event) => {
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

  // Validate description
  if (description.length > 500) {
    setError("Description must be 500 characters or less.");
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

  const updatedExpense = {
    title: cleanedTitle,
    amount: numericAmount,
    category,
    description: description.trim() || null,
    expense_date: expenseDate,
  };

  try {
    setSaving(true);

    const result = await updateExpense(
      expense.id,
      updatedExpense
    );

    console.log("Expense updated:", result);

    setIsEditing(false);

    if (onExpenseUpdated) {
      onExpenseUpdated();
    }

  } catch (error) {
    console.error("Error updating expense:", error);
    setError("Unable to update expense.");
  } finally {
    setSaving(false);
  }
  };

  return (
    <>
      {/* Expense Item */}
      <div className="expense-item">

        <div className="expense-info">

          <h3>{expense.title}</h3>

          {expense.description && (
            <p>{expense.description}</p>
          )}

          <span className="expense-category">
            {expense.category}
          </span>

        </div>


        <div className="expense-details">

          <strong>
            AED {Number(expense.amount).toFixed(2)}
          </strong>

          <span>
            {expense.expense_date}
          </span>

        </div>
        {error && (
          <p className="error-message">
            {error}
          </p>
       )}

        <div className="expense-actions">


          <button
            className="edit-button"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>


      {/* Edit Modal */}
      {isEditing && (

        <div className="modal-overlay">

          <div className="edit-modal">

            <div className="edit-modal-header">

              <div>
                <h2>Edit Expense</h2>

                <p>
                  Update your expense details.
                </p>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={handleCancel}
                disabled={saving}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleUpdate}>

              {/* Title */}

              <div className="form-group">

                <label htmlFor={`edit-title-${expense.id}`}>
                  Title
                </label>

                <input
                  id={`edit-title-${expense.id}`}
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  required
                />

              </div>


              {/* Amount */}

              <div className="form-group">

                <label htmlFor={`edit-amount-${expense.id}`}>
                  Amount
                </label>

                <input
                  id={`edit-amount-${expense.id}`}
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                  required
                />

              </div>


              {/* Category */}

              <div className="form-group">

                <label htmlFor={`edit-category-${expense.id}`}>
                  Category
                </label>

                <select
                  id={`edit-category-${expense.id}`}
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                >

                  <option value="Food">
                    Food
                  </option>

                  <option value="Transport">
                    Transport
                  </option>

                  <option value="Shopping">
                    Shopping
                  </option>

                  <option value="Bills">
                    Bills
                  </option>

                  <option value="Entertainment">
                    Entertainment
                  </option>

                  <option value="Health">
                    Health
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* Description */}

              <div className="form-group">

                <label htmlFor={`edit-description-${expense.id}`}>
                  Description
                </label>

                <textarea
                  id={`edit-description-${expense.id}`}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows="3"
                />

              </div>


              {/* Date */}

              <div className="form-group">

                <label htmlFor={`edit-date-${expense.id}`}>
                  Date
                </label>

                <input
                  id={`edit-date-${expense.id}`}
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


              {/* Buttons */}

              <div className="edit-modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>
  );
}

export default ExpenseItem;