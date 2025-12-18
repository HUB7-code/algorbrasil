import requests
import sys

try:
    print("📡 Pinging Backend at http://127.0.0.1:8000/ ...")
    response = requests.get("http://127.0.0.1:8000/")
    if response.status_code == 200:
        print(f"✅ Backend is ONLINE! Status: {response.status_code}")
        print(f"📄 Response: {response.json()}")
    else:
        print(f"⚠️ Backend returned unexpected status: {response.status_code}")
        print(response.text)
        sys.exit(1)
except Exception as e:
    print(f"❌ Backend is UNREACHABLE: {e}")
    sys.exit(1)
