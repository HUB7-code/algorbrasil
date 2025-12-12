from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, JSON, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.db.session import Base

class Course(Base):
    __tablename__ = "lms_courses"
    
    # Usando String como ID para facilitar slugs amigáveis (ex: "iso42001-lead")
    id = Column(String, primary_key=True) 
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    type = Column(String, default="certification") # 'certification' | 'workshop'
    thumbnail_url = Column(String, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relacionamentos
    modules = relationship("CourseModule", back_populates="course", cascade="all, delete-orphan")
    enrollments = relationship("Enrollment", back_populates="course")

class CourseModule(Base):
    __tablename__ = "lms_modules"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(String, ForeignKey("lms_courses.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    
    course = relationship("Course", back_populates="modules")
    lessons = relationship("CourseLesson", back_populates="module", cascade="all, delete-orphan")

class CourseLesson(Base):
    __tablename__ = "lms_lessons"
    
    # ID composto pode ser complexo no SQLite, vamos usar ID sequencial string para flexibilidade
    id = Column(String, primary_key=True) # ex: "iso42001-mod1-lesson1"
    module_id = Column(Integer, ForeignKey("lms_modules.id"), nullable=False)
    
    title = Column(String, nullable=False)
    type = Column(String, nullable=False) # 'video', 'document', 'quiz'
    
    # Conteúdo
    video_id = Column(String, nullable=True) # Youtube ID
    document_url = Column(String, nullable=True) # PDF Path
    duration_min = Column(Integer, default=0)
    
    order = Column(Integer, default=0)
    
    module = relationship("CourseModule", back_populates="lessons")

class Enrollment(Base):
    __tablename__ = "lms_enrollments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(String, ForeignKey("lms_courses.id"), nullable=False)
    
    role = Column(String, default="student") # 'advisor', 'auditor', 'student'
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # JSON field para flexibilidade de progresso: { "lesson_id": { "status": "completed", "seek": 120 } }
    progress_data = Column(JSON, default={}) 
    
    certification_status = Column(String, default='pending') # 'pending', 'issued'
    
    course = relationship("Course", back_populates="enrollments")
    user = relationship("User", back_populates="enrollments")
