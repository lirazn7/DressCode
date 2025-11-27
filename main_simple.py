"""
DressCode MVP - Backend Simplificado
FastAPI application sem dependências AWS
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import json
import os
import uuid
from datetime import datetime

# Criar app FastAPI
app = FastAPI(
    title="DressCode API",
    description="API para rede social de moda",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos Pydantic
class UserRegister(BaseModel):
    username: str
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    user_id: str
    username: str
    email: str
    full_name: str
    created_at: str

class Post(BaseModel):
    post_id: str
    user_id: str
    caption: str
    created_at: str

class Look(BaseModel):
    look_id: str
    user_id: str
    title: str
    description: str
    created_at: str

# Simulação de banco de dados em memória
db = {
    "users": {},
    "posts": {},
    "looks": {},
    "challenges": {}
}

# Dados iniciais
initial_data = {
    "users": {
        "demo-user": {
            "user_id": "demo-user",
            "username": "demo",
            "email": "demo@dresscode.com",
            "full_name": "Usuário Demo",
            "created_at": "2024-01-01T00:00:00Z"
        }
    },
    "posts": {
        "demo-post-1": {
            "post_id": "demo-post-1",
            "user_id": "demo-user",
            "caption": "Meu primeiro look no DressCode! 👗✨",
            "likes_count": 15,
            "comments_count": 3,
            "created_at": "2024-01-01T10:00:00Z"
        }
    },
    "challenges": {
        "demo-challenge-1": {
            "challenge_id": "demo-challenge-1",
            "title": "Look Casual de Verão",
            "description": "Mostre seu estilo casual perfeito para os dias quentes de verão!",
            "status": "active",
            "participants_count": 25,
            "start_date": "2024-01-01T00:00:00Z",
            "end_date": "2024-01-31T23:59:59Z"
        }
    }
}

# Inicializar banco com dados demo
db.update(initial_data)

# Rotas principais
@app.get("/")
async def root():
    return {
        "message": "DressCode API - Funcionando! 🎉",
        "version": "1.0.0",
        "status": "online",
        "endpoints": {
            "docs": "/docs",
            "users": "/users/me",
            "posts": "/feed/posts", 
            "challenges": "/challenges"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

# Rotas de autenticação (simplificadas)
@app.post("/auth/register")
async def register(user_data: UserRegister):
    user_id = str(uuid.uuid4())
    
    # Verificar se email já existe
    for user in db["users"].values():
        if user["email"] == user_data.email:
            raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    new_user = {
        "user_id": user_id,
        "username": user_data.username,
        "email": user_data.email,
        "full_name": user_data.full_name,
        "created_at": datetime.utcnow().isoformat()
    }
    
    db["users"][user_id] = new_user
    
    return {
        "message": "Usuário criado com sucesso!",
        "user": new_user,
        "token": "demo-jwt-token"
    }

@app.post("/auth/login")
async def login(login_data: UserLogin):
    # Buscar usuário por email
    user = None
    for u in db["users"].values():
        if u["email"] == login_data.email:
            user = u
            break
    
    if not user:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")
    
    return {
        "message": "Login realizado com sucesso!",
        "user": user,
        "token": "demo-jwt-token"
    }

# Rotas de usuários
@app.get("/users/me")
async def get_current_user():
    return db["users"]["demo-user"]

@app.get("/users")
async def list_users():
    return {"users": list(db["users"].values())}

# Rotas do feed
@app.get("/feed/posts")
async def get_feed():
    posts = list(db["posts"].values())
    # Ordenar por data de criação (mais recentes primeiro)
    posts.sort(key=lambda x: x["created_at"], reverse=True)
    return {"posts": posts}

@app.post("/feed/posts")
async def create_post(caption: str = "Novo post"):
    post_id = str(uuid.uuid4())
    
    new_post = {
        "post_id": post_id,
        "user_id": "demo-user",
        "caption": caption,
        "likes_count": 0,
        "comments_count": 0,
        "created_at": datetime.utcnow().isoformat()
    }
    
    db["posts"][post_id] = new_post
    
    return {
        "message": "Post criado com sucesso!",
        "post": new_post
    }

# Rotas do guarda-roupa
@app.get("/closet/looks")
async def get_looks():
    looks = list(db.get("looks", {}).values())
    return {"looks": looks}

@app.post("/closet/looks")
async def create_look(title: str = "Novo Look", description: str = ""):
    look_id = str(uuid.uuid4())
    
    new_look = {
        "look_id": look_id,
        "user_id": "demo-user",
        "title": title,
        "description": description,
        "created_at": datetime.utcnow().isoformat()
    }
    
    if "looks" not in db:
        db["looks"] = {}
    
    db["looks"][look_id] = new_look
    
    return {
        "message": "Look criado com sucesso!",
        "look": new_look
    }

# Rotas de desafios
@app.get("/challenges")
async def get_challenges():
    challenges = list(db["challenges"].values())
    return {"challenges": challenges}

@app.get("/challenges/active")
async def get_active_challenges():
    active_challenges = [
        c for c in db["challenges"].values() 
        if c.get("status") == "active"
    ]
    return {"challenges": active_challenges}

# Rota para estatísticas
@app.get("/stats")
async def get_stats():
    return {
        "users_count": len(db["users"]),
        "posts_count": len(db["posts"]),
        "looks_count": len(db.get("looks", {})),
        "challenges_count": len(db["challenges"]),
        "database_status": "online"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)