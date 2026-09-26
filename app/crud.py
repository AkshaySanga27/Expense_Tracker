import csv
from pathlib import Path
from app.database import get_connection


def create_expense(
    title,
    amount,
    category,
    description,
    expense_date
):
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO expenses
        (title, amount, category, description, expense_date)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            title,
            amount,
            category,
            description,
            str(expense_date)
        )
    )

    connection.commit()

    expense_id = cursor.lastrowid

    connection.close()

    return expense_id


def get_all_expenses():
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM expenses ORDER BY expense_date DESC"
    )

    expenses = cursor.fetchall()

    connection.close()

    return expenses

def get_expense(expense_id):
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM expenses WHERE id = ?",
        (expense_id,)
    )

    expense = cursor.fetchone()

    connection.close()

    return expense


def update_expense(
    expense_id,
    title,
    amount,
    category,
    description,
    expense_date
):
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        UPDATE expenses
        SET
            title = ?,
            amount = ?,
            category = ?,
            description = ?,
            expense_date = ?
        WHERE id = ?
        """,
        (
            title,
            amount,
            category,
            description,
            str(expense_date),
            expense_id
        )
    )

    connection.commit()

    updated_rows = cursor.rowcount

    connection.close()

    return updated_rows

def delete_expense(expense_id):
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM expenses WHERE id = ?",
        (expense_id,)
    )

    connection.commit()

    deleted_rows = cursor.rowcount

    connection.close()

    return deleted_rows


def search_expenses(keyword):
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT *
        FROM expenses
        WHERE title LIKE ?
        OR category LIKE ?
        OR description LIKE ?
        ORDER BY expense_date DESC
        """,
        (
            f"%{keyword}%",
            f"%{keyword}%",
            f"%{keyword}%"
        )
    )

    expenses = cursor.fetchall()

    connection.close()

    return expenses


def get_monthly_spending(year, month):
    connection = get_connection()

    cursor = connection.cursor()

    month_string = f"{year:04d}-{month:02d}"

    cursor.execute(
        """
        SELECT COALESCE(SUM(amount), 0)
        FROM expenses
        WHERE substr(expense_date, 1, 7) = ?
        """,
        (month_string,)
    )

    total = cursor.fetchone()[0]

    connection.close()

    return total


def get_category_spending(category):
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT COALESCE(SUM(amount), 0)
        FROM expenses
        WHERE LOWER(category) = LOWER(?)
        """,
        (category,)
    )

    total = cursor.fetchone()[0]

    connection.close()

    return total


def export_expenses_to_csv():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM expenses ORDER BY expense_date DESC"
    )

    expenses = cursor.fetchall()

    connection.close()

    export_directory = Path("exports")
    export_directory.mkdir(exist_ok=True)

    file_path = export_directory / "expenses.csv"

    with open(
        file_path,
        "w",
        newline="",
        encoding="utf-8"
    ) as csv_file:

        writer = csv.writer(csv_file)

        writer.writerow([
            "id",
            "title",
            "amount",
            "category",
            "description",
            "expense_date"
        ])

        for expense in expenses:
            writer.writerow([
                expense["id"],
                expense["title"],
                expense["amount"],
                expense["category"],
                expense["description"],
                expense["expense_date"]
            ])

    return str(file_path)