from typing import Annotated, List
from array import array, ArrayType
from fastapi import Depends, FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from sqlmodel import Session, select, col
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
    "http://localhost:5273",
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
async def get_vocab(session: SessionDep, lang: str, query = '') -> List[Vocab]:
    check_valid_language(lang)
    if query:
        vocab = session.exec(select(Vocab).where(Vocab.language == lang).where(col(Vocab.word).contains(query)).order_by(Vocab.word))
    else:
        vocab = session.exec(select(Vocab).where(Vocab.language == lang).order_by(Vocab.word))
    return vocab

@app.post('/vocabulary/file')
async def add_vocab(file: UploadFile = File(...)):
    if file.content_type != 'application/json':
        raise HTTPException(status_code=400, detail='Invalid file type ' + file.content_type + '. Please add a JSON file')
    dataString = await file.read()
    data = json.loads(dataString)
    if not isinstance(data, List):
        raise HTTPException(status_code=400, detail='Invalid file content')
    
    session = Session(repo.engine)

    try:
        print(data.__len__())
        for item in data:
            db_vocab = Vocab.model_validate(item)
            session.add(db_vocab)
        session.commit()
        session.close()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail='Invalid file content')
    return

@app.post('/vocabulary/', response_model=Vocab)
async def add_vocab(payload: VocabBase, session: SessionDep) -> Vocab:
    db_vocab =  Vocab.model_validate(payload)
    session.add(db_vocab)
    session.commit()
    session.refresh(db_vocab)
    return db_vocab

@app.put('/vocabulary/{vocab_id}')
async def put_vocab(vocab_id, payload: VocabBase, session: SessionDep) -> Vocab:
    db_vocab = session.get(Vocab, vocab_id)
    if not db_vocab:
        raise HTTPException(status_code=404, detail='Invalid payload')
    data = payload.model_dump(exclude_unset=True)
    db_vocab.sqlmodel_update(data)
    session.add(db_vocab)
    session.commit()
    session.refresh(db_vocab)
    return db_vocab

@app.delete('/vocabulary/{vocab_id}')
async def delete_vocab(vocab_id, session: SessionDep) -> None:
    db_vocab = session.get(Vocab, vocab_id)
    if not db_vocab:
        return Response(status_code=204)
    session.delete(db_vocab)
    session.commit()
    return

@app.get('/vocabulary/download')
async def generate_vocab(lang: str, session: SessionDep):
    check_valid_language(lang)
    fileName = 'output/' + lang + '.json'
    rawList = session.exec(select(Vocab).where(Vocab.language == lang))

    list = []
    for item in rawList:
        simpleV = item.model_dump(exclude={'language'})
        list.append(simpleV)

    with open(fileName, 'w', encoding='utf-8') as f:
        json.dump(list, f)
    return FileResponse(path=fileName, filename=fileName, media_type='application/json')

@app.get('/vocabulary/{vocab_id}', response_model=Vocab)
async def get_vocab_by_id(vocab_id, session: SessionDep):
    db_vocab = session.get(Vocab, vocab_id)
    if not db_vocab:
        raise HTTPException(status_code=404, detail='Not found')
    return db_vocab