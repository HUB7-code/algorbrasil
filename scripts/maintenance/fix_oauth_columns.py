
import sqlite3
import os

# Caminho do banco de dados
DB_PATH = "backend/sql_app.db"

def fix_database():
    print(f"🔧 Iniciando reparo do banco de dados em: {DB_PATH}")
    
    if not os.path.exists(DB_PATH):
        print("❌ Erro: Arquivo do banco de dados não encontrado!")
        return

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # 1. Verificar colunas existentes
        print("🔍 Verificando estrutura da tabela 'users'...")
        cursor.execute("PRAGMA table_info(users)")
        columns = [info[1] for info in cursor.fetchall()]
        print(f"   Colunas atuais: {columns}")
        
        # 2. Adicionar oauth_provider se não existir
        if 'oauth_provider' not in columns:
            print("➕ Adicionando coluna 'oauth_provider'...")
            try:
                cursor.execute("ALTER TABLE users ADD COLUMN oauth_provider VARCHAR")
                print("   ✅ Sucesso.")
            except Exception as e:
                print(f"   ❌ Erro: {e}")
        else:
            print("   ℹ️  Coluna 'oauth_provider' já existe.")

        # 3. Adicionar oauth_id se não existir
        if 'oauth_id' not in columns:
            print("➕ Adicionando coluna 'oauth_id'...")
            try:
                cursor.execute("ALTER TABLE users ADD COLUMN oauth_id VARCHAR")
                print("   ✅ Sucesso.")
            except Exception as e:
                print(f"   ❌ Erro: {e}")
        else:
            print("   ℹ️  Coluna 'oauth_id' já existe.")
            
        conn.commit()
        conn.close()
        print("\n✅ Reparo concluído com sucesso!")
        
    except Exception as e:
        print(f"\n❌ Erro crítico ao acessar o banco: {e}")

if __name__ == "__main__":
    fix_database()
