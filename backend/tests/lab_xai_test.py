import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
import pandas as pd
import io

client = TestClient(app)

class TestXAIAudit:
    
    def create_csv_content(self, data):
        df = pd.DataFrame(data)
        csv_buffer = io.BytesIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        return csv_buffer.getvalue()

    def test_audit_compliant_file(self):
        # GOLD DATASET (Compliant)
        data = {
            "patient_id": [1, 2, 3],
            "prediction": [0.9, 0.1, 0.5],
            "shap_age": [0.1, -0.2, 0.0],
            "lime_bmi": [0.05, 0.01, -0.05],
            "confidence_interval_low": [0.8, 0.0, 0.4]
        }
        csv_content = self.create_csv_content(data)
        
        response = client.post(
            "/api/v1/lab/xai/audit",
            files={"file": ("good_model.csv", csv_content, "text/csv")}
        )
        
        assert response.status_code == 200
        result = response.json()
        print(f"\n[GOLD TEST] Score: {result['score']} | Verdict: {result['verdict']}")
        
        assert result["score"] >= 80
        assert "SHAP Values" in result["detected_explainability_methods"]
        assert result["risk_level"] == "LOW"

    def test_audit_blackbox_file(self):
        # TRASH DATASET (High Risk)
        data = {
            "id": [1, 2, 3],
            "f1": [0.5, 0.2, 0.1],
            "var_22": [10, 20, 30],
            "pred": [1, 0, 1]
        }
        csv_content = self.create_csv_content(data)
        
        response = client.post(
            "/api/v1/lab/xai/audit",
            files={"file": ("bad_model.csv", csv_content, "text/csv")}
        )
        
        assert response.status_code == 200
        result = response.json()
        print(f"\n[TRASH TEST] Score: {result['score']} | Verdict: {result['verdict']}")
        
        assert result["score"] < 50
        assert len(result["detected_explainability_methods"]) == 0
        assert result["risk_level"] in ["HIGH", "CRITICAL"]

if __name__ == "__main__":
    # Manual run for quick debug
    tester = TestXAIAudit()
    try:
        tester.test_audit_compliant_file()
        tester.test_audit_blackbox_file()
        print("\n✅ XAI LAB TESTS PASSED!")
    except Exception as e:
        print(f"\n❌ FAILED: {e}")
