import os

env_path = os.path.join(os.getcwd(), 'backend', '.env')

try:
    # Try reading as latin-1 (common culprit for windows users)
    with open(env_path, 'r', encoding='latin-1') as f:
        content = f.read()
    
    # Write back as utf-8
    with open(env_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"✅ Converted {env_path} to UTF-8")
    
    # Verify
    with open(env_path, 'r', encoding='utf-8') as f:
        f.read()
    print("✅ Verification successful")

except Exception as e:
    print(f"❌ Failed to fix .env: {e}")
