import { useState } from "react";
import { exportExpenses } from "../api/expenseApi";

function ExportButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleExport = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      await exportExpenses();

      setMessage("Expenses exported successfully.");
    } catch (error) {
      console.error("Export error:", error);
      setError("Unable to export expenses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="export-section">

      <button
        type="button"
        className="export-button"
        onClick={handleExport}
        disabled={loading}
      >
        {loading ? "Exporting..." : "Download CSV"}
      </button>

      {message && (
        <p className="success-message">
          {message}
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

    </div>
  );
}

export default ExportButton;