from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200

    assert response.json()["message"] == "Expense Tracker API is running"

# def test_create_expense():

#     expense = {
#         "title": "Test Lunch",
#         "amount": 20.50,
#         "category": "Food",
#         "description": "Test expense",
#         "expense_date": "2026-09-26"
#     }

#     response = client.post(
#         "/expenses/",
#         json=expense
#     )

#     assert response.status_code == 200

#     data = response.json()

#     assert data["message"] == "Expense created successfully"

#     assert "expense_id" in data


def test_invalid_expense():

    expense = {
        "title": "Invalid",
        "amount": -100,
        "category": "Food",
        "description": "Invalid amount",
        "expense_date": "2026-09-26"
    }

    response = client.post(
        "/expenses/",
        json=expense
    )

    assert response.status_code == 422