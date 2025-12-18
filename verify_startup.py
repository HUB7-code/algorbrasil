import sys
import os

# Ensure root is in path
sys.path.append(os.getcwd())

print("Attempting to import backend.main...")
try:
    from backend import main
    print("✅ Successfully imported backend.main")
except Exception as e:
    print(f"❌ Failed to import: {e}")
