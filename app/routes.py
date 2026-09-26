from fastapi import APIRouter, HTTPException

from app import crud
from app.schemas import ExpenseCreate

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("/")
def create_expense(expense: ExpenseCreate):

    expense_id = crud.create_expense(
        expense.title,
        expense.amount,
        expense.category,
        expense.description,
        expense.expense_date
    )

    return {
        "message": "Expense created successfully",
        "expense_id": expense_id
    }

@router.get("/")
def get_expenses():

    expenses = crud.get_all_expenses()

    return [dict(expense) for expense in expenses]


@router.get("/{expense_id}")
def get_expense(expense_id: int):

    expense = crud.get_expense(expense_id)

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return dict(expense)

@router.put("/{expense_id}")
def update_expense(
    expense_id: int,
    expense: ExpenseCreate
):

    existing = crud.get_expense(expense_id)

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    crud.update_expense(
        expense_id,
        expense.title,
        expense.amount,
        expense.category,
        expense.description,
        expense.expense_date
    )

    return {
        "message": "Expense updated successfully"
    }



@router.delete("/{expense_id}")
def delete_expense(expense_id: int):

    existing = crud.get_expense(expense_id)

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    crud.delete_expense(expense_id)

    return {
        "message": "Expense deleted successfully"
    }

@router.get("/search/")
def search_expenses(keyword: str):

    expenses = crud.search_expenses(keyword)

    return [dict(expense) for expense in expenses]

@router.get("/monthly/")
def monthly_spending(year: int, month: int):

    if month < 1 or month > 12:
        raise HTTPException(
            status_code=400,
            detail="Month must be between 1 and 12"
        )

    total = crud.get_monthly_spending(year, month)

    return {
        "year": year,
        "month": month,
        "total_spending": total
    }


@router.get("/category/{category}")
def category_spending(category: str):

    total = crud.get_category_spending(category)

    return {
        "category": category,
        "total_spending": total
    }

@router.get("/export/csv")
def export_csv():

    file_path = crud.export_expenses_to_csv()

    return {
        "message": "Expenses exported successfully",
        "file": file_path
    }