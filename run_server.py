#!/usr/bin/env python3
"""
Script para executar o servidor DressCode
"""
import uvicorn

if __name__ == "__main__":
    uvicorn.run("main_simple:app", host="0.0.0.0", port=8000, reload=True)