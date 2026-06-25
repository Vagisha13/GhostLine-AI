import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# Define a fixed feature dimension size (e.g., 384 to match your original MiniLM model)
# This keeps it perfectly compatible if you are feeding these vectors into FAISS!
VECTOR_DIM = 384

# Initialize a lightweight vectorizer
# We cap max_features so the resulting matrix has a fixed, reliable dimension size
vectorizer = TfidfVectorizer(max_features=VECTOR_DIM)

def _ensure_vector_dims(matrix, target_dim=VECTOR_DIM):
    """Helper to guarantee the output numpy array always matches our exact target dimension"""
    current_dim = matrix.shape[1]
    if current_dim < target_dim:
        # Pad with zeros if vocabulary is small
        padding = np.zeros((matrix.shape[0], target_dim - current_dim), dtype=np.float32)
        return np.hstack((matrix, padding))
    return matrix[:, :target_dim]

def embed_single(text):
    if not text.strip():
        return np.zeros(VECTOR_DIM, dtype=np.float32)
    
    # TF-IDF fits on a list
    try:
        raw_matrix = vectorizer.fit_transform([text]).toarray().astype(np.float32)
        embedding = _ensure_vector_dims(raw_matrix)[0]
    except ValueError:
        # Fallback if text contains only stop words or symbols
        return np.zeros(VECTOR_DIM, dtype=np.float32)

    # L2 Normalization (Unit Length Guard)
    norm = np.linalg.norm(embedding)
    if norm > 0:
        embedding = embedding / norm

    return embedding

def generate_embeddings(texts):
    if not texts:
        return np.empty((0, VECTOR_DIM), dtype=np.float32)

    try:
        # Fit and transform the batch of text items
        raw_matrix = vectorizer.fit_transform(texts).toarray().astype(np.float32)
        embeddings = _ensure_vector_dims(raw_matrix)
    except ValueError:
        return np.zeros((len(texts), VECTOR_DIM), dtype=np.float32)

    # Manual L2 Normalization check to mirror your original guard rails
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    norms[norms == 0] = 1.0  # Prevent divide by zero
    embeddings = embeddings / norms

    # 🚫 HARD GUARD: prevent NaN / Inf
    if np.isnan(embeddings).any() or np.isinf(embeddings).any():
        raise ValueError("Embedding contains NaN or Inf values")

    return embeddings