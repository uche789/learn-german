from typing import Annotated, List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from sqlmodel import Session, select
import json
from models.repositiory import Repository, Vocab, VocabBase
from contextlib import asynccontextmanager

repo = Repository()

# https://fastapi.tiangolo.com/advanced/events/#lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load DB
    repo.create_db_and_tables()
    yield
    # Clean up (optional)

SessionDep = Annotated[Session, Depends(repo.get_session)]
app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:5273/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def check_valid_language(lang: str) -> bool: 
    if lang.lower() not in ['de', 'fr', 'jp']:
        raise HTTPException(status_code=400, detail='Invalid language')

@app.get('/vocabulary/')
async def get_vocab(session: SessionDep, lang: str) -> List[Vocab]:
    check_valid_language(lang)
    vocab = session.exec(select(Vocab).where(Vocab.language == lang))
    return vocab

@app.post('/vocabulary/', response_model=Vocab)
async def add_vocab(payload: VocabBase, session: SessionDep) -> Vocab:
    db_vocab =  Vocab.model_validate(payload)
    session.add(db_vocab)
    session.commit()
    session.refresh(db_vocab)
    return db_vocab

@app.put('/vocabulary/')
async def put_vocab(vocab_id: int, payload: VocabBase, session: SessionDep) -> Vocab:
    db_vocab = session.get(Vocab, vocab_id)
    if not db_vocab:
        raise HTTPException(status_code=404, detail='Invalid payload')
    data = payload.model_dump(exclude_unset=True)
    db_vocab.sqlmodel_update(data)
    session.add(db_vocab)
    session.commit()
    session.refresh(db_vocab)
    return db_vocab

@app.delete('/vocabulary/')
async def delete_vocab(vocab_id: int, session: SessionDep) -> None:
    db_vocab = session.get(Vocab, vocab_id)
    if not db_vocab:
        return Response(status_code=204)
    session.delete(db_vocab)
    session.commit()
    return

@app.get('/vocabulary/download')
async def generate_vocab(lang: str, session: SessionDep):
    check_valid_language(lang)
    fileName = lang + '.json'
    rawList = session.exec(select(Vocab).where(Vocab.language == lang))

    list = []
    for item in rawList:
        simpleV = item.model_dump(exclude={'vocab_id', 'language'})
        list.append(simpleV)

    with open(fileName, 'w', encoding='utf-8') as f:
        json.dump(list, f)
    return FileResponse(path=fileName, filename=fileName)