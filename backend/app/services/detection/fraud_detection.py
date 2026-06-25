import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Define a fixed dimension size (keeps things uniform)
VECTOR_DIM = 384

# Initialize the lightweight vectorizer
vectorizer = TfidfVectorizer(max_features=VECTOR_DIM)

KNOWN_FRAUD_PATTERNS = [
    "click this link now",
    "claim your reward now",
    "urgent bank verification needed",
    "your account is suspended",
    "crypto giveaway claim now",
    "win money instantly"
]

# Fit and transform the known fraud patterns locally
# .toarray() converts the sparse matrix to standard numpy float arrays
fraud_embeddings = vectorizer.fit_transform(KNOWN_FRAUD_PATTERNS).toarray().astype(np.float32)

VERY_CRITICAL_THRESHOLD = 0.85

def _ensure_vector_dims(vector, target_dim=VECTOR_DIM):
    """Helper to guarantee input text vector matches the matrix size"""
    current_dim = vector.shape[0] if len(vector.shape) == 1 else vector.shape[1]
    
    if len(vector.shape) == 1:
        if current_dim < target_dim:
            return np.pad(vector, (0, target_dim - current_dim), 'constant')
        return vector[:target_dim]
    else:
        if current_dim < target_dim:
            padding = np.zeros((vector.shape[0], target_dim - current_dim), dtype=np.float32)
            return np.hstack((vector, padding))
        return vector[:, :target_dim]

def detect_fraud_similarity(text_embedding):
    """
    Accepts an incoming text vector and compares it against known fraud patterns.
    Ensures correct dimensions before running cosine_similarity.
    """
    # Force alignment on the incoming vector dimension
    aligned_text_embedding = _ensure_vector_dims(np.array(text_embedding, dtype=np.float32))
    
    max_score = 0.0

    # Loop through and compare using scikit-learn's built-in similarity metrics
    for fraud_embedding in fraud_embeddings:
        score = cosine_similarity(
            [aligned_text_embedding],
            [fraud_embedding]
        )[0][0]

        if score > max_score:
            max_score = score

    return float(max_score)