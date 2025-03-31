import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler, LabelEncoder

# ---------------- Diabetes Model ----------------
file_path_diabetes = "diabetes.csv"
df_diabetes = pd.read_csv(file_path_diabetes)

X_diabetes = df_diabetes.drop(columns=["Outcome"], errors='ignore')
y_diabetes = df_diabetes["Outcome"]

X_train_d, X_test_d, y_train_d, y_test_d = train_test_split(X_diabetes, y_diabetes, test_size=0.2, random_state=42)

diabetes_scaler = StandardScaler()
X_train_d_scaled = diabetes_scaler.fit_transform(X_train_d)
X_test_d_scaled = diabetes_scaler.transform(X_test_d)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train_d_scaled, y_train_d)

# Save model and scaler
joblib.dump(rf, "diabetes_model.pkl")
joblib.dump(diabetes_scaler, "diabetes_scaler.pkl")

print("✅ Diabetes model and scaler saved!")

# ---------------- Heart Disease Model ----------------
file_path_heart = "heart.csv"
df_heart = pd.read_csv(file_path_heart)

categorical_columns = ["sex", "cp", "fbs", "restecg", "exang", "slope", "ca", "thal"]

for col in categorical_columns:
    if col in df_heart.columns:
        le = LabelEncoder()
        df_heart[col] = le.fit_transform(df_heart[col])

X_heart = df_heart.drop(columns=["target"], errors='ignore')
y_heart = df_heart["target"]

X_train_h, X_test_h, y_train_h, y_test_h = train_test_split(X_heart, y_heart, test_size=0.2, random_state=42)

heart_scaler = StandardScaler()
X_train_h_scaled = heart_scaler.fit_transform(X_train_h)
X_test_h_scaled = heart_scaler.transform(X_test_h)

svm = SVC(kernel="rbf", probability=True, random_state=42)
svm.fit(X_train_h_scaled, y_train_h)

# Save model and scaler
joblib.dump(svm, "heart_model.pkl")
joblib.dump(heart_scaler, "heart_scaler.pkl")

print("✅ Heart disease model and scaler saved!")