# 💰 Expense Tracker

A full-stack Expense Tracker application built with **React, FastAPI, Python, and SQLite**.

The application allows users to add, view, search, filter, edit, delete, analyze, paginate, and export personal expenses through a responsive dashboard.

---

## 🚀 Project Overview

The Expense Tracker is a full-stack web application designed to make personal expense management simple and organized.

The project consists of:

- A **React + Vite frontend**
- A **FastAPI backend**
- A **SQLite database**
- RESTful API endpoints
- Dashboard analytics
- Search and filtering
- Pagination
- CSV export
- Form validation
- Responsive UI

The frontend communicates with the backend through REST APIs.

---

## ✨ Features

### Expense Management

- ➕ Add new expenses
- 📋 View all expenses
- ✏️ Edit existing expenses
- 🗑️ Delete expenses
- 🔍 Search expenses
- 🏷️ Filter expenses by category
- 📄 Pagination
- 📊 View spending statistics
- 📅 View monthly spending
- 📂 View spending by category
- 📥 Export expenses to CSV

---

## 📊 Dashboard

The dashboard provides an overview of the user's expenses.

### Summary Cards

The dashboard displays:

- **Total Spending**
- **Current Month Spending**
- **Total Number of Expenses**
- **Average Expense**

Example:

```text
┌────────────────┐ ┌────────────────┐
│ Total Spending │ │ This Month     │
│ AED 1,250.00   │ │ AED 450.00     │
└────────────────┘ └────────────────┘

┌────────────────┐ ┌────────────────┐
│ Total Expenses │ │ Average        │
│ 25             │ │ AED 50.00      │
└────────────────┘ └────────────────┘
```

---

## 🏷️ Category Spending

Expenses can be grouped by category.

Supported categories:

- Food
- Transport
- Shopping
- Bills
- Entertainment
- Health
- Other

The dashboard calculates the total amount spent in each category.

---

## 📅 Monthly Spending

The application calculates total spending for each month based on the expense date.

Example:

```text
September 2026     AED 850.00
August 2026        AED 620.00
July 2026          AED 450.00
```

---

## 🔎 Search and Filtering

The expense list supports searching by:

- Expense title
- Description

It also supports filtering by category.

Example:

```text
Search: lunch

Category:
Food
```

The application displays the number of matching expenses.

There is also a **Clear Filters** option.

---

## 📄 Pagination

The expense list displays **5 expenses per page**.

Pagination includes:

- Previous button
- Next button
- Current page
- Total pages

Example:

```text
Previous    Page 2 of 4    Next
```

Pagination automatically resets to page 1 when the search term or category filter changes.

---

## ✏️ Edit Expenses

Existing expenses can be edited.

The edit functionality supports:

- Title
- Amount
- Category
- Description
- Expense date

The application validates the data before sending the update request to the backend.

---

## 🗑️ Delete Expenses

Expenses can be deleted from the expense list.

Before deletion, the application asks the user for confirmation.

During deletion:

```text
Deleting...
```

is displayed to prevent duplicate delete requests.

---

## ✅ Form Validation

The application performs frontend validation when creating and editing expenses.

### Title

- Cannot be empty
- Maximum 100 characters

### Amount

- Must be a valid number
- Must be greater than 0

### Description

- Optional
- Maximum 500 characters

### Expense Date

- Required
- Future dates are not allowed

---

## 📥 CSV Export

The application provides an option to export expenses as a CSV file.

The exported file contains:

```text
id
title
amount
category
description
expense_date
```

Example:

```csv
id,title,amount,category,description,expense_date
1,Lunch,25.00,Food,Lunch at restaurant,2026-09-26
2,Taxi,30.00,Transport,Taxi to office,2026-09-25
```

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

## Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

## Database

- SQLite

## Development Tools

- npm
- Git
- GitHub
- VS Code

---

# 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │     React Frontend  │
                    │       Vite          │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌─────────────────────┐
                    │    FastAPI Backend  │
                    │       Python        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       SQLite        │
                    │      Database       │
                    └─────────────────────┘
```

---

# 📁 Project Structure

```text
expense-tracker-api/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── routes.py
│   ├── crud.py
│   ├── database.py
│   └── schemas.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── expenseApi.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseItem.jsx
│   │   │   ├── CategorySpending.jsx
│   │   │   ├── MonthlySpending.jsx
│   │   │   └── ExportButton.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── exports/
│   └── expenses.csv
│
├── requirements.txt
├── .gitignore
└── README.md
```



---

# 🔌 REST API

The backend is built using FastAPI.

Base URL during local development:

```text
http://127.0.0.1:8000
```

---

## Create Expense

### POST

```text
POST /expenses/
```

Example request:

```json
{
  "title": "Lunch",
  "amount": 25,
  "category": "Food",
  "description": "Lunch at restaurant",
  "expense_date": "2026-09-26"
}
```

---

## Get All Expenses

### GET

```text
GET /expenses/
```

Example response:

```json
[
  {
    "id": 1,
    "title": "Lunch",
    "amount": 25,
    "category": "Food",
    "description": "Lunch at restaurant",
    "expense_date": "2026-09-26"
  }
]
```

---

## Get Single Expense

### GET

```text
GET /expenses/{expense_id}
```

Example:

```text
GET /expenses/1
```

---

## Update Expense

### PUT

```text
PUT /expenses/{expense_id}
```

Example:

```text
PUT /expenses/1
```

Request:

```json
{
  "title": "Dinner",
  "amount": 40,
  "category": "Food",
  "description": "Updated expense",
  "expense_date": "2026-09-26"
}
```

---

## Delete Expense

### DELETE

```text
DELETE /expenses/{expense_id}
```

Example:

```text
DELETE /expenses/1
```

---

## Search Expenses

### GET

```text
GET /expenses/search/?keyword=lunch
```

Example:

```text
GET /expenses/search/?keyword=food
```

---

## Monthly Spending

### GET

```text
GET /expenses/monthly/?year=2026&month=9
```

Example response:

```json
{
  "year": 2026,
  "month": 9,
  "total_spending": 850
}
```

---

## Category Spending

### GET

```text
GET /expenses/category/{category}
```

Example:

```text
GET /expenses/category/Food
```

Example response:

```json
{
  "category": "Food",
  "total_spending": 350
}
```

---

## Export CSV

### GET

```text
GET /expenses/export/csv
```

The endpoint returns the generated CSV file.

---

# 📚 API Documentation

FastAPI automatically provides interactive API documentation.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

You can use Swagger UI to test all API endpoints.

Alternative documentation:

```text
http://127.0.0.1:8000/redoc
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker-api.git
```

Move into the project:

```bash
cd expense-tracker-api
```

---

# 🐍 Backend Setup

## 2. Create a virtual environment

Windows:

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

You should see:

```text
(venv)
```

in the terminal.

---

## 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Start the FastAPI backend

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

Open another terminal.

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔄 Running the Complete Application

You need **two terminals** during local development.

### Terminal 1 — Backend

```bash
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 🔐 CORS

The FastAPI backend is configured to allow the local React development server.

Current development origins include:

```text
http://localhost:5173
http://127.0.0.1:5173
```

This allows the React frontend to communicate with the FastAPI backend during development.

---

# 🧪 Testing the Application

The following functionality has been implemented and tested during development:

- [x] Create expense
- [x] Get expenses
- [x] Get individual expense
- [x] Update expense
- [x] Delete expense
- [x] Search expenses
- [x] Category filtering
- [x] Monthly spending
- [x] Category spending
- [x] CSV export
- [x] Dashboard summary
- [x] Pagination
- [x] Form validation
- [x] Edit validation
- [x] Delete confirmation
- [x] Loading states
- [x] Error states
- [x] Responsive layout

---

# 📱 Responsive Design

The application is designed to work across different screen sizes.

Supported layouts include:

- Desktop
- Tablet
- Mobile

The dashboard adapts its layout for smaller screens.

---

# 🎯 Learning Objectives

This project was built to practice full-stack development concepts including:

### Python

- Functions
- Modules
- Database operations
- File handling
- CSV generation

### FastAPI

- REST APIs
- Routing
- HTTP methods
- Request validation
- Response handling
- CORS
- API documentation

### SQL / SQLite

- Database creation
- Tables
- CRUD operations
- SELECT queries
- Filtering
- Aggregation
- Monthly calculations
- Category calculations

### React

- Components
- Props
- State
- `useState`
- `useEffect`
- Event handling
- Forms
- API integration
- Conditional rendering
- Filtering
- Pagination

### Git

- Repository management
- Version control
- Project documentation

---

# 🔮 Future Improvements

Possible future improvements include:

- User authentication
- Multiple user accounts
- PostgreSQL database
- Advanced charts
- Date-range filtering
- Budget tracking
- Spending limits
- Recurring expenses
- Dark mode
- Cloud deployment
- Automated testing
- Production environment configuration

---

# 📌 Current Project Status

**Status: Development Complete — Local Version**

The current version contains the core expense management functionality and dashboard features.

The project is currently configured for local development.

Production deployment can be added separately.

---

# 👨‍💻 Author

**Akshay Sanga**

B.Tech in Computer Science

LinkedIn:  
https://www.linkedin.com/in/akshaysanga27

---

# 📄 License

This project is available for educational and portfolio purposes.
