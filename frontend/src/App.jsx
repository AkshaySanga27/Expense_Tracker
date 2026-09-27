import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategorySpending from "./components/CategorySpending";
import MonthlySpending from "./components/MonthlySpending";
import ExportButton from "./components/ExportButton";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const handleExpenseAdded = () => {
    setRefresh((value) => value + 1);
  };

  const handleExpenseDeleted = () => {
    setRefresh((value) => value + 1);
  };

  const handleExpenseUpdated = () => {
    setRefresh((value) => value + 1);
  };

  return (
    <div className="app">

      <Navbar />

      <main className="dashboard">

        {/* Dashboard Header */}
        <div className="dashboard-header">

          <div>
            <h2>Dashboard</h2>
            <p>Track and manage your expenses.</p>
          </div>

          <div className="dashboard-actions">

            <button
              className="add-expense-button"
              onClick={() => setShowExpenseForm(true)}
            >
              + Add Expense
            </button>

            <ExportButton />

          </div>

        </div>


        {/* Summary Cards */}
        <SummaryCards refresh={refresh} />


        {/* Spending Sections */}
        <div className="charts-grid">

          <CategorySpending refresh={refresh} />

          <MonthlySpending refresh={refresh} />

        </div>


        {/* Add Expense Modal */}
        {showExpenseForm && (
          <div className="modal-overlay">

            <div className="edit-modal">

              <div className="edit-modal-header">

                <div>
                  <h2>Add New Expense</h2>
                  <p>Enter the details of your expense.</p>
                </div>

                <button
                  className="modal-close-button"
                  onClick={() => setShowExpenseForm(false)}
                >
                  ×
                </button>

              </div>


              <ExpenseForm
                onExpenseAdded={() => {
                  handleExpenseAdded();
                  setShowExpenseForm(false);
                }}
              />

            </div>

          </div>
        )}


        {/* Expense List */}
        <ExpenseList
          key={refresh}
          onExpenseDeleted={handleExpenseDeleted}
          onExpenseUpdated={handleExpenseUpdated}
        />

      </main>

    </div>
  );
}

export default App;