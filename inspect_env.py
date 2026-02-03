import os

env_path = os.path.join(os.getcwd(), 'backend', '.env')

try:
    with open(env_path, 'rb') as f:
        content_bytes = f.read()
    
    print(f"File size: {len(content_bytes)} bytes")
    print(f"First 50 bytes: {content_bytes[:50]}")
    
    # Heuristic: if lots of nulls, it's probably messed up utf-16 -> utf-8 conversion residue
    if b'\x00' in content_bytes:
        print("⚠️ Null bytes detected!")
        # Try to fix by removing nulls
        clean_content = content_bytes.replace(b'\x00', b'')
        
        # Write back
        with open(env_path, 'wb') as f:
            f.write(clean_content)
        print("✅ Removed null bytes and saved.")
        
    else:
        print("No null bytes found.")

except Exception as e:
    print(f"❌ Error: {e}")
