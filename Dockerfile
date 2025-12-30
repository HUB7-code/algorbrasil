# ==========================================================
# STAGE 1: BUILDER
# Compiling and installing dependencies to keep the final image clean
# ==========================================================
FROM python:3.10-slim as builder

# Prevent writing .pyc files and buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /build

# Create virtual environment
RUN python -m venv /opt/venv
# Enable venv for the build stages
ENV PATH="/opt/venv/bin:$PATH"

# Copy requirements file (Cache Layering)
COPY backend/requirements.txt .

# Install dependencies
# --no-cache-dir produces smaller images
# upgrading pip ensures we handle modern wheels correctly
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ==========================================================
# STAGE 2: RUNNER
# Secure, immutable and minimal final image
# ==========================================================
FROM python:3.10-slim

# Create a non-root user for security (OWASP Best Practice)
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --gid 1001 appuser

WORKDIR /app

# Copy virtual environment from builder stage
COPY --from=builder /opt/venv /opt/venv

# Set environment variables
# Ensure venv is used by default
ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy only the necessary backend code
# This avoids copying frontend/, docs/, .git/, etc. into the container
COPY backend /app/backend

# Change ownership of the application code to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose API port
EXPOSE 8000

# Start command
# --proxy-headers and forwarded-allow-ips are crucial for running behind Nginx/Traefik
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips", "*"]
