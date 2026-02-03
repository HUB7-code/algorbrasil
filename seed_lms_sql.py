import sqlite3
import datetime

DB_PATH = "sql_app.db"

def seed_sql():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print("Semeando (SQL Raw)...")
    
    # 1. Course
    try:
        cursor.execute("""
            INSERT INTO lms_courses (id, title, description, type, thumbnail_url, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            "iso42001-lead", 
            "Formação Auditor Líder ISO/IEC 42001", 
            "Domine a implementação e auditoria.", 
            "certification", 
            "/images/course_iso42001.jpg", 
            datetime.datetime.now()
        ))
    except sqlite3.IntegrityError:
        print("Curso já existe (ignorando).")

    # 2. Modules
    try:
        cursor.execute("INSERT INTO lms_modules (course_id, title, \"order\") VALUES (?, ?, ?)", 
                       ("iso42001-lead", "Módulo 1: Fundamentos da Governança", 1))
        mod1_id = cursor.lastrowid
        
        cursor.execute("INSERT INTO lms_modules (course_id, title, \"order\") VALUES (?, ?, ?)", 
                       ("iso42001-lead", "Módulo 2: Gestão de Riscos de IA", 2))
        mod2_id = cursor.lastrowid
    except sqlite3.IntegrityError:
        print("Módulos já devem existir.")
        # Fetch IDs just in case
        cursor.execute("SELECT id FROM lms_modules WHERE course_id=? ORDER BY \"order\" ASC", ("iso42001-lead",))
        rows = cursor.fetchall()
        if len(rows) >= 2:
            mod1_id, mod2_id = rows[0][0], rows[1][0]
        else:
            return

    # 3. Lessons
    # Mod 1
    lessons_m1 = [
        ("iso-m1-l1", mod1_id, "Introdução à ISO 42001", "video", "https://www.youtube.com/watch?v=Get7rqXYrbQ", None, 10, 1),
        ("iso-m1-l2", mod1_id, "Escopo e Contexto", "video", "https://www.youtube.com/watch?v=ysz5S6P_z-U", None, 15, 2),
        ("iso-m1-l3", mod1_id, "Material de Apoio (PDF)", "document", None, "/docs/iso42001_intro.pdf", 5, 3)
    ]
    for l in lessons_m1:
        try:
            cursor.execute("""
                INSERT INTO lms_lessons (id, module_id, title, type, video_id, document_url, duration_min, "order")
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, l)
        except sqlite3.IntegrityError:
            pass

    # Mod 2
    try:
        cursor.execute("""
            INSERT INTO lms_lessons (id, module_id, title, type, video_id, duration_min, "order")
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, ("iso-m2-l1", mod2_id, "Matriz de Risco Algorítmico", "video", "https://www.youtube.com/watch?v=LXb3EKWsInQ", 20, 1))
    except sqlite3.IntegrityError:
        pass

    conn.commit()
    conn.close()
    print("✅ Seed SQL Concluído!")

if __name__ == "__main__":
    seed_sql()
