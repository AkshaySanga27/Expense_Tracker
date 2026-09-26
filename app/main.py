from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import create_table
from app.routes import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_table()
    yield


app = FastAPI(
    title="Expense Tracker API",
    description="A REST API for managing personal expenses",
    version="1.0.0",
    lifespan=lifespan
)


app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Expense Tracker API is running"
    }