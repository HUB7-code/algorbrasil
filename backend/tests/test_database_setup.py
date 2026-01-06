import pytest
from backend.app.models.user import User


def test_database_tables_created(db_session):
    """
    Test that all database tables are created correctly,
    including the users table that was previously missing.
    """
    # This test will fail with "no such table: users" if conftest.py isn't working
    users = db_session.query(User).all()
    assert isinstance(users, list)
    print("\n✅ SUCCESS: 'users' table exists and can be queried!")


def test_user_table_operations(db_session):
    """
    Test that we can perform basic operations on the users table.
    """
    from backend.app.core.security import get_password_hash
    
    # Create a user
    user = User(
        email="test@example.com",
        hashed_password=get_password_hash("testpass"),
        full_name="Test User"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    # Query the user
    found_user = db_session.query(User).filter(User.email == "test@example.com").first()
    assert found_user is not None
    assert found_user.email == "test@example.com"
    assert found_user.full_name == "Test User"
    
    print(f"\n✅ SUCCESS: User created with ID: {found_user.id}")
