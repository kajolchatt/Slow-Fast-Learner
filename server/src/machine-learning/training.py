import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Load the dataset
dataset = pd.read_csv('E://DBMSPROJECT//Slow-Fast-Learner//server//src//machine-learning//STUDENT_DATA.csv')

# Extract features (X) and target variable (y)
X = dataset[['CGPA', 'IAMARKS_SUB1', 'IAMARKS_SUB2','IAMARKS_SUB3','IAMARKS_SUB4','IAMARKS_SUB5','NUMBER_PROJECT','INTERNSHIP','BACKLOGS','EXTRA_ACTIVITIES']]
y = dataset['FAST_LEARNER']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a logistic regression model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
 
# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model using accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')

# Make predictions for user input
# CGPA = float(input("Enter GPA: "))
# IAMARKS_SUB1 = int(input("Enter IAMARKS_SUB1: "))
# IAMARKS_SUB2 = int(input("Enter IAMARKS_SUB2: "))
# IAMARKS_SUB3 = int(input("Enter IAMARKS_SUB3: "))
# IAMARKS_SUB4 = int(input("Enter IAMARKS_SUB4: "))
# IAMARKS_SUB5 = int(input("Enter IAMARKS_SUB5: "))
# NUMBER_PROJECT= int(input("Enter NUMBER_PROJECT: "))
# INTERNSHIP=int(input("Enter INTERNSHIP: "))
# BACKLOGS=int(input("Enter BACKLOGS: "))
# EXTRA_ACTIVITIES=int(input("Enter EXTRA_ACTIVITIES: "))
# user_input = np.array([[CGPA,IAMARKS_SUB1, IAMARKS_SUB2, IAMARKS_SUB3,IAMARKS_SUB4,IAMARKS_SUB5,NUMBER_PROJECT,INTERNSHIP,BACKLOGS,EXTRA_ACTIVITIES]])

# # Make predictions for the user input
# user_pred = model.predict(user_input)

# print(f'Predicted class for user input: {user_pred[0]}')

# Save the trained model to a file
joblib.dump(model, 'trained_model.joblib')
