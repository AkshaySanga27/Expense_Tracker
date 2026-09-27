import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { getExpenses } from "../api/expenseApi";

function ExpenseList({ onExpenseDeleted, onExpenseUpdated }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;

  useEffect(() => {
    loadExpenses();
  }, []);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

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

  // Search and category filtering
  const filteredExpenses = expenses.filter((expense) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      expense.title.toLowerCase().includes(search) ||
      (expense.description || "").toLowerCase().includes(search);

    const matchesCategory =
      categoryFilter === "All" ||
      expense.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Check whether filters are active
  const hasFilters =
    searchTerm.trim() !== "" ||
    categoryFilter !== "All";

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
  };

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredExpenses.length / expensesPerPage
  );

  const startIndex =
    (currentPage - 1) * expensesPerPage;

  const endIndex =
    startIndex + expensesPerPage;

  const currentExpenses =
    filteredExpenses.slice(startIndex, endIndex);

  return (
    <section className="expense-list-section">

      {/* Header */}
      <div className="expense-list-header">

        <div>
          <h2>Recent Expenses</h2>

          <p>
            {hasFilters
              ? `Showing ${filteredExpenses.length} of ${expenses.length} expenses`
              : `${expenses.length} expense${
                  expenses.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>

      </div>


      {/* Search and Filter */}
      <div className="expense-filters">

        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

        <select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(event.target.value)
          }
        >
          <option value="All">All Categories</option>
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

        {hasFilters && (
          <button
            type="button"
            className="clear-filter-button"
            onClick={clearFilters}
          >
            Clear
          </button>
        )}

      </div>


      {/* Loading */}
      {loading && (
        <p>Loading expenses...</p>
      )}


      {/* Error */}
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      {/* No expenses at all */}
      {!loading &&
        !error &&
        expenses.length === 0 && (
          <p className="no-expenses">
            No expenses found.
          </p>
        )}


      {/* Expenses */}
      {!loading &&
        !error &&
        expenses.length > 0 && (

          <>
            <div className="expense-list">

              {/* No search results */}
              {filteredExpenses.length === 0 && (
                <div className="no-expenses">

                  <p>
                    No expenses match your search.
                  </p>

                  <button
                    type="button"
                    className="clear-filter-button"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>

                </div>
              )}


              {/* Current page expenses */}
              {currentExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onExpenseDeleted={onExpenseDeleted}
                  onExpenseUpdated={onExpenseUpdated}
                />
              ))}

            </div>


            {/* Pagination */}
            {filteredExpenses.length > expensesPerPage && (
              <div className="pagination">

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      (page) => page - 1
                    )
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      (page) => page + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                >
                  Next
                </button>

              </div>
            )}

          </>
        )}

    </section>
  );
}

export default ExpenseList;