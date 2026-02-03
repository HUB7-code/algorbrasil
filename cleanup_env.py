import os

env_path = os.path.join(os.getcwd(), 'backend', '.env')

try:
    with open(env_path, 'rb') as f:
        content = f.read()
    
    # Check for UTF-8 encoded BOM artifacts (FF FE read as latin1 then encoded to utf8)
    # FF -> \xc3\xbf
    # FE -> \xc3\xbe
    bom_artifact = b'\xc3\xbf\xc3\xbe'
    
    if content.startswith(bom_artifact):
        print("⚠️ BOM artifact detected, removing...")
        content = content[len(bom_artifact):]
        
    # Also check if there are any other weird chars at the start
    # Sometimes just strip whitespace
    
    # Write back
    with open(env_path, 'wb') as f:
        f.write(content)
        
    print("✅ Cleaned up .env file.")
    
    # Print first line to verify
    with open(env_path, 'r', encoding='utf-8') as f:
        print(f"First line: {f.readline()}")

except Exception as e:
    print(f"❌ Error: {e}")
