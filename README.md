# Hackprix
 1. LLM-Powered Care Companion (Gentle Memory Path)
Purpose: Emotionally intelligent chatbot for dementia patients.

Technology: Google Gemini API via Streamlit.

Features:

Responds in a calming, caring tone.

Handles memory-related conversations.

Tracks cognitive response time to monitor mental changes.

Remembers names, people, routines (contextually) for more natural conversations.

 2. Medication Alert System
Purpose: Alerts patient and caregivers when medication is due or missed.

Technology: JS-based tracker integrated with Streamlit Python UI + MongoDB.

Features:

Pulls medication data from an existing Node.js API.

Evaluates medication due-ness using frequency and last_taken time.

Notifies the user in real time on the Streamlit dashboard.

Caregiver notification logic (planned or in-progress).

3. Medication Tracker (Streamlit UI)
Purpose: Allows patients to mark medications as taken.

Features:

“I’ve taken this” buttons for each scheduled medication.

MongoDB logs every intake with timestamp and date.

Automatically filters daily medications using schedule collection.

4. Caregiver Dashboard (In Progress or Planned)
Purpose: Help caregivers monitor patient health, medication history, and cognitive changes.

Features:

Medication logs overview.

Missed/Repeated medication behavior tracking.

Cognitive response trend (from LLM session times).

Gallery feature to help patients recognize familiar faces.

5. Gallery Feature for Memory Recall
Purpose: Show photos of people the patient knows to support facial recognition and emotional recall.

Features:

React-based UI component showing friendly faces.

Can be customized per patient.

(Future) LLM integration for recalling names and relationship context when clicked.

6. Integrated Backend
You’re using:

A JS + CJS medication system (Node.js + SQLite) as your source of truth.

A MongoDB database in the Python Streamlit app for logs and alerts.

The systems are connected via REST API (localhost:3000/patient/:id).

You may want to sync or standardize this backend if scaling up.

