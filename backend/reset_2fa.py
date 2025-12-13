
import sqlite3

def reset_2fa():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    
    try:
        # Desativa 2FA para todos (Modo de Resgate)
        cursor.execute("UPDATE users SET is_totp_enabled = 0")
        # Opcional: Limpar o segredo também, para forçar novo setup
        cursor.execute("UPDATE users SET totp_secret = null")
        
        print("✅ 2FA Resetado com sucesso! Todos os usuários podem logar com senha.")
    except Exception as e:
        print(f"❌ Erro ao resetar: {e}")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    reset_2fa()
