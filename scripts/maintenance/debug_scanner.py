from fastapi import UploadFile
import asyncio
import io
from backend.app.api.endpoints.scanner.upload import upload_scanner_file

async def test_upload():
    # Simula conteúdo de arquivo
    content = b'[{"id": "test", "content": "meu CPF e 123.456.789-00"}]'
    
    # Mock UploadFile
    file = UploadFile(filename="test.json", file=io.BytesIO(content))
    
    try:
        result = await upload_scanner_file(file)
        print("SUCESSO:", result)
    except Exception as e:
        print("ERRO:", e)
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_upload())
