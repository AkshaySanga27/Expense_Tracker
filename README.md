# Expense Tracker API

A simple REST API built with Python and FastAPI for managing personal expenses.

## Features

- Create expenses
- Read expenses
- Update expenses
- Delete expenses
- Search expenses
- Categorize expenses
- Calculate monthly spending
- Calculate spending by category
- Store data using SQLite
- Export expenses to CSV
- API validation using Pydantic
- Automated testing using Pytest

## Technologies

- Python
- FastAPI
- SQLite
- SQL
- Pydantic
- Pytest
- Uvicorn

## Project Structure

```text
Expense_Tracker_API/
│
├── app/
│   ├── main.py
│   ├── database.py
│   ├── schemas.py
│   ├── crud.py
│   └── routes.py
│
├── tests/
│   └── test_expenses.py
│
├── exports/
│
├── .gitignore
├── README.md
└── requirements.txt