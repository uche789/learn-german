from typing import List, Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select, JSON, Column


class VocabBase(SQLModel):
    word: str = Field(index=True, unique=True)
    english_translation: str
    definition: List[str] | None = Field(sa_column=Column(JSON))
    examples: List[str] | None = Field(sa_column=Column(JSON))
    language: str = Field(schema_extra={'pattern': '^(de|fr|jp)$'})
    word_type: str
    gender: str | None = Field(default=None, schema_extra={'pattern': '^(f|m|n|p)$'})
    levels: List[str] | None = Field(sa_column=Column(JSON))

class Vocab(VocabBase, table=True):
    vocab_id: int | None = Field(default=None, primary_key=True)

class Repository:
    def __init__(self):
        sqlite_file_name = "database.db"
        sqlite_url = f"sqlite:///{sqlite_file_name}"

        connect_args = {"check_same_thread": False}
        self.engine = create_engine(sqlite_url, connect_args=connect_args)

    def create_db_and_tables(self):
        SQLModel.metadata.create_all(self.engine)

    def get_session(self):
        with Session(self.engine) as session:
            yield session
        