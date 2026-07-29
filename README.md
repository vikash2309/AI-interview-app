#  AI Interview Platform

A full-stack AI-powered interview preparation platform that enables users to practice technical interviews through **voice and text interactions**, receive **AI-generated interview questions**, and get **detailed performance evaluations** with **live camera analytics and proctoring**.

---

##  Live Demo

> 🌐 Frontend: https://ai-interview-app-frontend-kappa.vercel.app/

> ⚡ Backend API: https://ai-interview-app-eex4.onrender.com

---



# ✨ Features

### 🔐 Authentication

- Secure authentication using Clerk
- Protected routes
- User-specific interview history

---

### 📝 AI Interview Generation

- Generate customized interview questions
- Company-specific interviews
- Role-specific interviews
- Difficulty selection
- Dynamic question count
- Adjustable interview duration

---

### 🎙️ Voice Interview

- AI reads interview questions aloud
- Browser Speech Synthesis API
- Real-time Speech-to-Text using Deepgram
- One-click answer recording
- Automatic transcript generation
- Automatic answer saving
- Interview progress tracking with timers and question navigation

---





### 📹 Camera Proctoring & Analytics

- Face detection and presence monitoring
- Head direction and camera framing analysis
- Distance-from-camera checks
- Real-time proctoring warnings during the interview
- Camera-based insights included in the final evaluation report

---

### 🧠 AI Evaluation & Insights

After completing an interview, Gemini AI generates:

- Overall Score
- Technical Knowledge
- Communication Skills
- Problem Solving
- Confidence
- Practical Thinking
- Strengths
- Areas for Improvement
- Personalized Feedback
- Camera Analytics
- Camera Feedback

---

###  Interview History

- View previous interviews
- Search interviews
- Average score statistics
- Total interview count
- Open previous interview reports

---

###  Responsive UI

Fully responsive design optimized for

- Desktop
- Tablet
- Mobile

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Clerk Authentication
- React Icons
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Clerk Express SDK

---

## AI & Voice

- Google Gemini API
- Deepgram Speech-to-Text
- Browser Speech Synthesis API

---



# 🏗 Architecture

```
                    +----------------------+
                    |      React App       |
                    +----------+-----------+
                               |
                               |
                  Clerk Authentication
                               |
                               |
                        Express Backend
                               |
         +-----------+---------+-----------+
         |           |                     |
         |           |                     |
     Gemini AI   Deepgram STT        MongoDB Atlas
         |                               |
         |                               |
 Interview Questions          Interviews & Reports
      AI Evaluation
```

---

# 📂 Project Structure

```
AI-Interview-Platform

├── client
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── services
│   ├── utils
│   └── context
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── utils
│
└── README.md
```

---



#  How It Works

### 1️⃣ Login

Authenticate securely using Clerk.

↓

### 2️⃣ Create Interview

Choose

- Company
- Role
- Difficulty
- Interview Type
- Duration
- Question Count

↓

### 3️⃣ AI Generates Questions

Gemini AI creates personalized interview questions.

↓

### 4️⃣ Start Interview

Choose

- Voice Interview


↓

### 5️⃣ Answer Questions

Voice answers are converted to text using Deepgram.

↓

### 6️⃣ Finish Interview

Responses are sent to Gemini AI.

↓

### 7️⃣ AI Evaluation

Receive

- Score
- Analytics
- Feedback
- Strengths
- Improvements

↓

### 8️⃣ History

Review previous interviews anytime.

---

#  Future Improvements

- Coding Interview Mode
- AI Follow-up Questions
- Webcam Interview Support
- PDF Report Download
- Multi-language Interviews
- More Natural AI Voices
- Emotion & Confidence Analysis

---

#  Learning Outcomes

This project helped me gain practical experience with:

- Full Stack Development
- REST APIs
- Authentication
- AI Integration
- Speech Recognition
- Browser APIs
- Responsive UI Design
- State Management
- MongoDB Data Modeling
- Real-time User Experience

---

#  Author

**Vikash Chaudhary**

- LinkedIn: https://www.linkedin.com/in/vikash-chaudhary-75b495346/
- GitHub: https://github.com/vikash2309

---

#  Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

Feedback, suggestions, and contributions are always welcome!