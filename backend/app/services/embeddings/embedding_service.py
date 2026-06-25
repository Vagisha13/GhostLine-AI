import os
import numpy as np
from openai import OpenAI
from functools import lru_cache

# Initialize the OpenAI client (it automatically looks for os.environ.get("OPENAI_API_KEY"))
client = OpenAI()

@lru_cache(maxsize=10000)
def embed_single(text):
    response = client.embeddings.create(
        input=[text],
        model="text-embedding-3-small"  # Highly efficient, lightweight 1536-dim model
    )
    # Extract the embedding vector
    embedding = response.data[0].embedding
    
    # Normalize the embedding manually (since OpenAI gives them highly regularized, 
    # but doing it explicitly mirrors your original code's intent)
    norm = np.linalg.norm(embedding)
    if norm > 0:
        embedding = embedding / norm
        
    return np.array(embedding, dtype=np.float32)

def generate_embeddings(texts):
    if not texts:
        return np.empty((0, 1536), dtype=np.float32)
        
    response = client.embeddings.create(
        input=texts,
        model="text-embedding-3-small"
    )
    
    # Map responses out to a numpy matrix
    embeddings = np.array([item.embedding for item in response.data], dtype=np.float32)
    
    # Manual L2 Normalization check to mirror normalize_embeddings=True
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    norms[norms == 0] = 1.0  # Prevent divide by zero
    embeddings = embeddings / norms

    # 🚫 HARD GUARD: prevent NaN / Inf
    if np.isnan(embeddings).any() or np.isinf(embeddings).any():
        raise ValueError("Embedding contains NaN or Inf values")

    return embeddings