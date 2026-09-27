import "./App.css";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <h2>Dashboard</h2>
        <p>Track and manage your expenses.</p>

        <SummaryCards />

        <ExpenseForm />

        <ExpenseList />
      </main>
    </div>
  );
}

export default App;