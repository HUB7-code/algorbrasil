import sys
import os
import traceback

# Add the backend directory to sys.path
# We add specifically 'backend' to path so we can import 'app' if it is inside backend
# But typically 'main.py' is run from 'backend' dir so 'app' is top level, OR run from root as 'backend.main'.
# If 'backend.main' imports 'app', then 'app' must be resolvable.
# If 'backend' processes as a package, 'from app...' inside 'backend/main.py' might refer to 'backend.app' if it's absolute import... 
# actually 'from app' implies 'app' is in sys.path.
# If I run from root, and backend is a package, 'from app' inside backend/main.py is wrong unless 'backend/app' is also in path or 'app' is a sibling of 'backend' (which is not).
# It should be 'from .app' or 'from backend.app'.

# However, let's assume the user runs it such that 'app' is importable.
# Let's try adding BOTH root and backend to path relative to this script.

cwd = os.getcwd()
backend_dir = os.path.join(cwd, 'backend')
sys.path.append(cwd)
sys.path.append(backend_dir)

modules_to_check = [
    "app.api.auth",
    "app.api.forms",
    "app.api.profiles",
    "app.api.downloads",
    "app.api.endpoints.payments",
    "app.api.endpoints.assessments",
    "app.api.endpoints.risks",
    "app.api.endpoints.lms",
    "app.api.endpoints.admin",
    "app.api.endpoints.projects",
    "app.api.endpoints.inventory.assets",
    "app.api.endpoints.organizations"
]

print("Starting import diagnosis...")

for module in modules_to_check:
    print(f"Testing import: {module}")
    try:
        __import__(module)
        print(f"✅ Success: {module}")
    except Exception as e:
        print(f"❌ Failed: {module}")
        print(traceback.format_exc())
        break # Stop at first failure to avoid cascading errors
