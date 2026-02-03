import os

def check_encoding(directory):
    print(f"Checking encoding of files in {directory} (excluding venv)...")
    for root, dirs, files in os.walk(directory):
        if 'venv' in dirs:
            dirs.remove('venv')
        if '__pycache__' in dirs:
            dirs.remove('__pycache__')
        
        for file in files:
            if file.endswith(".py"):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        f.read()
                except UnicodeDecodeError as e:
                    print(f"❌ Encoding Error in file: {filepath}")
                    print(f"   Error: {e}")
                except Exception as e:
                    print(f"⚠️ Could not read {filepath}: {e}")

cwd = os.getcwd()
backend_dir = os.path.join(cwd, 'backend')
check_encoding(backend_dir)
