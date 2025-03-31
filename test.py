# import pandas as pd
# import numpy as np
# import matplotlib.pyplot as plt
# import seaborn as sns
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.svm import SVC
# from sklearn.preprocessing import StandardScaler, LabelEncoder
# from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score, precision_recall_curve, roc_curve, auc

# # ------------------- 🔹 Diabetes Dataset - Random Forest -------------------
# file_path_diabetes = "diabetes.csv"
# df_diabetes = pd.read_csv(file_path_diabetes)

# X_diabetes = df_diabetes.drop(columns=["Diagnosis", "Pregnancies"], errors='ignore')
# y_diabetes = df_diabetes["Outcome"]

# X_train_d, X_test_d, y_train_d, y_test_d = train_test_split(X_diabetes, y_diabetes, test_size=0.2, random_state=42)

# scaler_d = StandardScaler()
# X_train_d_scaled = scaler_d.fit_transform(X_train_d)
# X_test_d_scaled = scaler_d.transform(X_test_d)

# rf = RandomForestClassifier(n_estimators=100, random_state=42)
# rf.fit(X_train_d_scaled, y_train_d)
# y_pred_d = rf.predict(X_test_d_scaled)
# y_probs_d = rf.predict_proba(X_test_d_scaled)[:, 1]

# # ------------------- 🔹 Heart Disease Dataset - SVM -------------------
# file_path_heart = "heart.csv"
# df_heart = pd.read_csv(file_path_heart)

# categorical_columns = [
#     "sex", "chest_pain_type", "fasting_blood_sugar", "rest_ecg",
#     "exercise_induced_angina", "slope", "vessels_colored_by_flourosopy", "thalassemia"
# ]

# label_encoders = {}
# for col in categorical_columns:
#     if col in df_heart.columns:
#         le = LabelEncoder()
#         df_heart[col] = le.fit_transform(df_heart[col])
#         label_encoders[col] = le

# X_heart = df_heart.drop(columns=["target"], errors='ignore')
# y_heart = df_heart["target"]

# X_train_h, X_test_h, y_train_h, y_test_h = train_test_split(X_heart, y_heart, test_size=0.2, random_state=42)

# scaler_h = StandardScaler()
# X_train_h_scaled = scaler_h.fit_transform(X_train_h)
# X_test_h_scaled = scaler_h.transform(X_test_h)

# svm = SVC(kernel="rbf", probability=True, random_state=42)
# svm.fit(X_train_h_scaled, y_train_h)
# y_pred_h = svm.predict(X_test_h_scaled)
# y_probs_h = svm.predict_proba(X_test_h_scaled)[:, 1]

# # ------------------- 🏆 Helper Functions -------------------
# def display_confusion_matrix(y_test, y_pred, title):
#     conf_matrix = confusion_matrix(y_test, y_pred)
#     plt.figure(figsize=(6, 4))
#     sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Blues", xticklabels=["Negative", "Positive"], yticklabels=["Negative", "Positive"])
#     plt.xlabel("Predicted Label")
#     plt.ylabel("Actual Label")
#     plt.title(title)
#     plt.show()

# def display_accuracy_metrics(y_test, y_pred, model_name):
#     print(f"\n✅ {model_name} Accuracy: {accuracy_score(y_test, y_pred):.4f}")
#     print(f"✅ {model_name} F1-Score: {f1_score(y_test, y_pred):.4f}")
#     print("\n📊 Classification Report:")
#     print(classification_report(y_test, y_pred))

# def display_visualizations(y_test, y_probs, model_name):
#     plt.figure(figsize=(12, 5))
    
#     plt.subplot(1, 2, 1)
#     precision, recall, _ = precision_recall_curve(y_test, y_probs)
#     plt.plot(recall, precision, marker=".", color="purple")
#     plt.xlabel("Recall")
#     plt.ylabel("Precision")
#     plt.title(f"{model_name} Precision-Recall Curve")
    
#     plt.subplot(1, 2, 2)
#     fpr, tpr, _ = roc_curve(y_test, y_probs)
#     roc_auc = auc(fpr, tpr)
#     plt.plot(fpr, tpr, color="blue", label=f'AUC = {roc_auc:.2f}')
#     plt.plot([0, 1], [0, 1], linestyle="--", color="gray")
#     plt.xlabel("False Positive Rate")
#     plt.ylabel("True Positive Rate")
#     plt.title(f"{model_name} ROC Curve")
#     plt.legend()
    
#     plt.show()

# def user_prediction(model, scaler, feature_names):
#     print("\n🔮 Make a Prediction 🔮")
#     user_input = [float(input(f"Enter {col}: ")) for col in feature_names]
#     user_input_scaled = scaler.transform([user_input])
#     prediction = model.predict(user_input_scaled)[0]
#     probability = model.predict_proba(user_input_scaled)[0][1] * 100
    
#     print("\n📌 Prediction Result")
#     print(f"🛑 Positive ({probability:.2f}%)" if prediction == 1 else f"✅ Negative ({100 - probability:.2f}%)")

# def model_comparison():
#     print("\n📊 Model Comparison Table")
#     print(f"{'Metric':<15}{'Random Forest (Diabetes)':<25}{'SVM (Heart Disease)':<25}")
#     print("-" * 65)
    
#     metrics = ["Accuracy", "F1-score"]
#     values_d = [accuracy_score(y_test_d, y_pred_d), f1_score(y_test_d, y_pred_d)]
#     values_h = [accuracy_score(y_test_h, y_pred_h), f1_score(y_test_h, y_pred_h)]
    
#     for metric, val_d, val_h in zip(metrics, values_d, values_h):
#         print(f"{metric:<15}{val_d:<25.4f}{val_h:<25.4f}")

# # ------------------- 🏆 Menu Implementation -------------------
# while True:
#     print("\n🔹 Choose an Option:")
#     print("1️⃣ Diabetes Prediction")
#     print("2️⃣ Confusion Matrix (Diabetes)")
#     print("3️⃣ Accuracy Metrics (Diabetes)")
#     print("4️⃣ Heart Disease Prediction")
#     print("5️⃣ Confusion Matrix (Heart Disease)")
#     print("6️⃣ Accuracy Metrics (Heart Disease)")
#     print("7️⃣ Model Comparison")
#     print("8️⃣ Exit")
    
#     choice = input("Enter your choice: ")
#     if choice == "1": user_prediction(rf, scaler_d, X_diabetes.columns)
#     elif choice == "2": display_confusion_matrix(y_test_d, y_pred_d, "Diabetes - Confusion Matrix")
#     elif choice == "3": display_accuracy_metrics(y_test_d, y_pred_d, "Diabetes (Random Forest)")
#     elif choice == "4": user_prediction(svm, scaler_h, X_heart.columns)
#     elif choice == "5": display_confusion_matrix(y_test_h, y_pred_h, "Heart Disease - Confusion Matrix")
#     elif choice == "6": display_accuracy_metrics(y_test_h, y_pred_h, "Heart Disease (SVM)")
#     elif choice == "7": model_comparison()
#     elif choice == "8": break
#     else: print("Invalid choice. Try again.")

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score, precision_recall_curve, roc_curve, auc

# ------------------- 🔹 Diabetes Dataset - Random Forest -------------------
file_path_diabetes = "diabetes.csv"
df_diabetes = pd.read_csv(file_path_diabetes)

# Adjusted for the actual column names in your diabetes dataset
X_diabetes = df_diabetes.drop(columns=["Outcome"], errors='ignore')
y_diabetes = df_diabetes["Outcome"]

X_train_d, X_test_d, y_train_d, y_test_d = train_test_split(X_diabetes, y_diabetes, test_size=0.2, random_state=42)

scaler_d = StandardScaler()
X_train_d_scaled = scaler_d.fit_transform(X_train_d)
X_test_d_scaled = scaler_d.transform(X_test_d)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train_d_scaled, y_train_d)
y_pred_d = rf.predict(X_test_d_scaled)
y_probs_d = rf.predict_proba(X_test_d_scaled)[:, 1]

# ------------------- 🔹 Heart Disease Dataset - SVM -------------------
file_path_heart = "heart.csv"
df_heart = pd.read_csv(file_path_heart)

# Adjusted for the actual column names in your heart disease dataset
categorical_columns = [
    "sex", "cp", "fbs", "restecg",
    "exang", "slope", "ca", "thal"
]

label_encoders = {}
for col in categorical_columns:
    if col in df_heart.columns:
        le = LabelEncoder()
        df_heart[col] = le.fit_transform(df_heart[col])
        label_encoders[col] = le

X_heart = df_heart.drop(columns=["target"], errors='ignore')
y_heart = df_heart["target"]

X_train_h, X_test_h, y_train_h, y_test_h = train_test_split(X_heart, y_heart, test_size=0.2, random_state=42)

scaler_h = StandardScaler()
X_train_h_scaled = scaler_h.fit_transform(X_train_h)
X_test_h_scaled = scaler_h.transform(X_test_h)

svm = SVC(kernel="rbf", probability=True, random_state=42)
svm.fit(X_train_h_scaled, y_train_h)
y_pred_h = svm.predict(X_test_h_scaled)
y_probs_h = svm.predict_proba(X_test_h_scaled)[:, 1]

# ------------------- 🏆 Helper Functions -------------------
def display_confusion_matrix(y_test, y_pred, title):
    conf_matrix = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(6, 4))
    sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Blues", xticklabels=["Negative", "Positive"], yticklabels=["Negative", "Positive"])
    plt.xlabel("Predicted Label")
    plt.ylabel("Actual Label")
    plt.title(title)
    plt.show()

def display_accuracy_metrics(y_test, y_pred, model_name):
    print(f"\n✅ {model_name} Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print(f"✅ {model_name} F1-Score: {f1_score(y_test, y_pred):.4f}")
    print("\n📊 Classification Report:")
    print(classification_report(y_test, y_pred))

def display_visualizations(y_test, y_probs, model_name):
    plt.figure(figsize=(12, 5))
    
    plt.subplot(1, 2, 1)
    precision, recall, _ = precision_recall_curve(y_test, y_probs)
    plt.plot(recall, precision, marker=".", color="purple")
    plt.xlabel("Recall")
    plt.ylabel("Precision")
    plt.title(f"{model_name} Precision-Recall Curve")
    
    plt.subplot(1, 2, 2)
    fpr, tpr, _ = roc_curve(y_test, y_probs)
    roc_auc = auc(fpr, tpr)
    plt.plot(fpr, tpr, color="blue", label=f'AUC = {roc_auc:.2f}')
    plt.plot([0, 1], [0, 1], linestyle="--", color="gray")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title(f"{model_name} ROC Curve")
    plt.legend()
    
    plt.show()

# def user_prediction(model, scaler, feature_names):
#     print("\n🔮 Make a Prediction 🔮")
#     user_input = [float(input(f"Enter {col}: ")) for col in feature_names]
#     user_input_scaled = scaler.transform([user_input])
#     prediction = model.predict(user_input_scaled)[0]
#     probability = model.predict_proba(user_input_scaled)[0][1] * 100
    
#     print("\n📌 Prediction Result")
#     print(f"🛑 Positive ({probability:.2f}%)" if prediction == 1 else f"✅ Negative ({100 - probability:.2f}%)")

def user_prediction(model, scaler, feature_names):
    print("\n🔮 Make a Prediction 🔮")
    # Collect user inputs
    user_input = [float(input(f"Enter {col}: ")) for col in feature_names]
    
    # Create a DataFrame with the proper column names
    user_df = pd.DataFrame([user_input], columns=feature_names)
    
    # Scale the data
    user_input_scaled = scaler.transform(user_df)
    
    # Make prediction
    prediction = model.predict(user_input_scaled)[0]
    probability = model.predict_proba(user_input_scaled)[0][1] * 100
    
    print("\n📌 Prediction Result")
    print(f"🛑 Positive ({probability:.2f}%)" if prediction == 1 else f"✅ Negative ({100 - probability:.2f}%)")

def model_comparison():
    print("\n📊 Model Comparison Table")
    print(f"{'Metric':<15}{'Random Forest (Diabetes)':<25}{'SVM (Heart Disease)':<25}")
    print("-" * 65)
    
    metrics = ["Accuracy", "F1-score"]
    values_d = [accuracy_score(y_test_d, y_pred_d), f1_score(y_test_d, y_pred_d)]
    values_h = [accuracy_score(y_test_h, y_pred_h), f1_score(y_test_h, y_pred_h)]
    
    for metric, val_d, val_h in zip(metrics, values_d, values_h):
        print(f"{metric:<15}{val_d:<25.4f}{val_h:<25.4f}")

# ------------------- 🏆 Menu Implementation -------------------
def display_menu():
    print("\n🔹 Choose an Option:")
    print("1️⃣  Diabetes Prediction")
    print("2️⃣  Confusion Matrix (Diabetes)")
    print("3️⃣  Accuracy Metrics (Diabetes)")
    print("4️⃣  Heart Disease Prediction")
    print("5️⃣  Confusion Matrix (Heart Disease)")
    print("6️⃣  Accuracy Metrics (Heart Disease)")
    print("7️⃣  Model Comparison")
    print("8️⃣  Display Visualizations (Diabetes)")
    print("9️⃣  Display Visualizations (Heart Disease)") 
    print("🔟  Exit")

while True:
    display_menu()
    
    choice = input("Enter your choice: ")
    if choice == "1": user_prediction(rf, scaler_d, X_diabetes.columns)
    elif choice == "2": display_confusion_matrix(y_test_d, y_pred_d, "Diabetes - Confusion Matrix")
    elif choice == "3": display_accuracy_metrics(y_test_d, y_pred_d, "Diabetes (Random Forest)")
    elif choice == "4": user_prediction(svm, scaler_h, X_heart.columns)
    elif choice == "5": display_confusion_matrix(y_test_h, y_pred_h, "Heart Disease - Confusion Matrix")
    elif choice == "6": display_accuracy_metrics(y_test_h, y_pred_h, "Heart Disease (SVM)")
    elif choice == "7": model_comparison()
    elif choice == "8": display_visualizations(y_test_d, y_probs_d, "Diabetes (Random Forest)")
    elif choice == "9": display_visualizations(y_test_h, y_probs_h, "Heart Disease (SVM)")
    elif choice == "10": break
    else: print("Invalid choice. Try again.")