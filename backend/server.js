const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── STATIC FILES (admin assets: css, js, images inside public/)
app.use('/admin', express.static(path.join(__dirname, 'public')));

// ── ROUTES ────────────────────────────────────────────────────

// Admin panel — MUST be before the catch-all
app.get(['/admin', '/admin/'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Root → admin panel (since frontend is on Vercel)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ── API ───────────────────────────────────────────────────────
app.get('/api/message', (req, res) => {
  res.json({
    message:   "Backend connected — Welcome to Anna Samson Robert's Portfolio API.",
    status:    'online',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/profile', (req, res) => {
  res.json({
    name:       'Anna Samson Robert',
    title:      'Data Science Finalist',
    university: 'EASTC University',
    location:   'Dar es Salaam, Tanzania',
    email:      'annarobert.icloud.com',
    phone:      '0745631972',
    bio:        'Final-year Data Science student at EASTC University. Passionate about machine learning, statistical modeling, and data-driven solutions for East Africa.',
    skills:     ['Python', 'Machine Learning', 'SQL', 'Power BI', 'Tableau', 'Statistics', 'TensorFlow', 'R'],
    social: {
      github:   'https://github.com/annarobert',
      linkedin: 'https://linkedin.com/in/annarobert'
    }
  });
});

app.get('/api/projects', (req, res) => {
  res.json({
    count: 4,
    projects: [
      {
        id:           1,
        title:        'Crop Yield Prediction',
        category:     'Machine Learning',
        description:  'Random Forest model predicting crop yields across Tanzania using climate and soil data. 91% accuracy.',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
        year:         2024
      },
      {
        id:           2,
        title:        'COVID-19 East Africa Dashboard',
        category:     'Data Visualization',
        description:  'Interactive Power BI dashboard tracking COVID-19 trends across 6 East African countries.',
        technologies: ['Power BI', 'Python', 'REST API'],
        year:         2023
      },
      {
        id:           3,
        title:        'Swahili Sentiment Analysis',
        category:     'NLP',
        description:  'NLP model trained on Swahili social media to classify sentiment for local businesses.',
        technologies: ['NLTK', 'TensorFlow', 'Python'],
        year:         2024
      },
      {
        id:           4,
        title:        'Student Performance Analysis',
        category:     'Statistics',
        description:  'Statistical study of EASTC student performance using regression and hypothesis testing.',
        technologies: ['R', 'SPSS', 'Excel'],
        year:         2023
      }
    ]
  });
});

// ── 404 CATCH-ALL ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.url} not found` });
});

// ── START SERVER ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔧 Admin      → http://localhost:${PORT}`);
  console.log(`🔧 Admin      → http://localhost:${PORT}/admin`);
  console.log(`📡 API        → http://localhost:${PORT}/api/profile`);
  console.log(`📡 API        → http://localhost:${PORT}/api/projects`);
  console.log(`📡 API        → http://localhost:${PORT}/api/message`);
});
