/**
 * =====================================================================
 *  blogs.js  —  Ali Naqvi's Blog Data Store
 * =====================================================================
 *  HOW TO PUBLISH A NEW POST:
 *  1. Copy one of the objects below.
 *  2. Give it a unique `id` (lowercase, hyphens only — used in the URL).
 *  3. Fill in title, subtitle, date, readTime, tags, cover, and body.
 *  4. The `body` field supports full Markdown.
 *  5. Save the file — your post is live instantly. No backend needed!
 * =====================================================================
 */

const BLOGS = [
  {
    id: "getting-started-with-machine-learning",
    title: "Getting Started with Machine Learning",
    subtitle: "A beginner's roadmap from zero to your first ML model — the right way.",
    date: "Aug 15, 2026",
    readTime: "8 min read",
    tags: ["Machine Learning", "Python", "AI"],
    cover: "assets/blog-ml.jpg",
    body: `
# Getting Started with Machine Learning

Machine Learning (ML) sounds intimidating when you first hear it — neural networks, backpropagation, gradient descent… But here's a secret: **you can build your first useful ML model in under 100 lines of Python.**

In this post I'll walk you through the exact path I took as a first-year CS student to go from "what is ML?" to deploying a real prediction app.

---

## Step 1: Get Comfortable with Python

Before anything else, you need a solid Python foundation. You don't need to be an expert — you just need to be comfortable with:

- Lists, dicts, and loops
- Functions and classes (basics)
- File reading/writing

\`\`\`python
# The kind of Python you need
import pandas as pd

data = pd.read_csv("flights.csv")
print(data.head())
\`\`\`

**Resources:** Python.org tutorial, freeCodeCamp's Python course, or *Automate the Boring Stuff*.

---

## Step 2: Learn the Math (Just Enough)

You don't need a PhD in linear algebra. Start with:

- **Statistics**: mean, median, standard deviation, correlation
- **Linear algebra**: vectors and matrix multiplication (conceptually)
- **Calculus**: what a derivative *means* (not how to calculate one by hand)

Khan Academy covers all of this for free and it's actually fun.

---

## Step 3: Pick Up scikit-learn

[scikit-learn](https://scikit-learn.org) is the best ML library for beginners. With just a few lines, you can:

\`\`\`python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)

score = model.score(X_test, y_test)
print(f"Accuracy: {score:.2%}")
\`\`\`

Seriously — that's it for a basic model.

---

## Step 4: Build a Real Project

Theory only sticks when you build something real. My first project was an **AI Flight Fare Predictor** — I scraped flight data, cleaned it with pandas, trained a Random Forest, and deployed it with Streamlit.

**Project ideas for beginners:**
1. House price predictor (classic dataset)
2. Sentiment analysis on tweets
3. Movie recommendation system
4. Handwritten digit classifier (MNIST)

---

## Step 5: Deploy It

A model sitting on your laptop impresses nobody. Use **Streamlit** to wrap your model in a web app in minutes:

\`\`\`python
import streamlit as st

st.title("Flight Fare Predictor ✈️")
airline = st.selectbox("Airline", ["IndiGo", "Air India", "Jet Airways"])
# ... your inputs
if st.button("Predict"):
    price = model.predict([[...]])[0]
    st.success(f"Estimated Price: ₹{price:,.0f}")
\`\`\`

Deploy for free on [Streamlit Cloud](https://streamlit.io/cloud) and share the link everywhere.

---

## My Recommended Learning Path

| Week | Focus |
|------|-------|
| 1–2  | Python basics |
| 3–4  | pandas + numpy + data visualisation |
| 5–6  | scikit-learn, your first model |
| 7–8  | Build and deploy a project |
| 9+   | Deep learning (TensorFlow / PyTorch) |

---

## Final Thoughts

Machine Learning is a **skill, not a subject.** You learn it by doing, not by watching. Start small, build something ugly, deploy it, and iterate.

The best time to start was yesterday. The second best time is now. 🚀
    `
  },

  {
    id: "why-every-developer-should-learn-python",
    title: "Why Every Developer Should Learn Python in 2026",
    subtitle: "Python is no longer just a 'data science language'. It powers the modern web, AI, automation, and more.",
    date: "Aug 21, 2026",
    readTime: "6 min read",
    tags: ["Python", "Web Dev", "Career"],
    cover: "assets/blog-python.jpg",
    body: `
# Why Every Developer Should Learn Python in 2026

Python has been the most popular programming language on GitHub for three years running. But popularity is a lagging indicator — the more interesting question is **why** Python keeps winning, and whether you should invest time in it even if you already know another language.

Spoiler: yes, you should.

---

## 1. It Reads Like English

The biggest barrier to learning any programming language is cognitive overhead. Python eliminates most of it:

\`\`\`python
# Python
names = ["Ali", "Zain", "Sara"]
for name in names:
    if name.startswith("A"):
        print(f"Hello, {name}!")
\`\`\`

Compare that to the equivalent Java. You spend zero mental energy on syntax and 100% on *logic*. This is why beginners pick it up in days, and why even experienced developers reach for it when they want to prototype fast.

---

## 2. The Ecosystem is Unmatched

No other language has libraries for everything like Python does:

| Domain | Library |
|--------|---------|
| Data science | pandas, numpy |
| Machine Learning | scikit-learn, PyTorch, TensorFlow |
| Web backend | Django, FastAPI, Flask |
| Automation | Selenium, BeautifulSoup |
| DevOps | Ansible, Fabric |
| Finance | zipline, backtrader |

One language. Every domain.

---

## 3. AI and ML Run on Python

If you want to work with LLMs, build AI features, or just understand what GPT-4 is doing — Python is the only real option. The entire AI/ML ecosystem is Python-first:

\`\`\`python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Explain neural networks in one paragraph"}]
)
print(response.choices[0].message.content)
\`\`\`

That's a production-ready AI call in 8 lines.

---

## 4. It's a Superpower on Top of Other Languages

You don't have to *replace* your main language with Python. Instead, use it as a tool:

- Java developer? Use Python scripts to automate your build pipeline.
- Frontend dev? Use Python to scrape data for your UI prototypes.
- Game dev? Use Python to generate content and assets.

Python makes you **more productive** in whatever you're already doing.

---

## 5. The Job Market Rewards It

Python skills open doors that other languages don't. The top-paying tech roles in 2026 — ML engineer, data engineer, AI researcher, backend engineer — all list Python as required or preferred.

And even if you're not job hunting, Python automation can save you **hours every week.** Imagine auto-generating reports, renaming 500 files, or scraping competitor prices — all with a 30-line script.

---

## Where to Start

If you're brand new to Python:
1. [Python.org official tutorial](https://docs.python.org/3/tutorial/)
2. [CS50P on edX](https://cs50.harvard.edu/python/) (free, excellent)
3. Build something stupid small — a number guessing game, a to-do list, a dad joke fetcher

If you already code in another language:
1. [Learn X in Y minutes — Python](https://learnxinyminutes.com/docs/python/)
2. Pick a project you'd normally do in your main language and redo it in Python

---

## Conclusion

Python isn't a trend — it's infrastructure. The faster you add it to your toolkit, the more options you'll have in your career. And the best part? **It's genuinely fun to write.**

Happy coding! 🐍
    `
  },

  {
    id: "docker-for-beginners",
    title: "Docker for Beginners — Containers Explained Simply",
    subtitle: "Stop saying 'it works on my machine'. Learn Docker in 20 minutes and never ship broken code again.",
    date: "Aug 21, 2026",
    readTime: "7 min read",
    tags: ["Docker", "DevOps", "Beginners"],
    cover: "assets/blog-docker.jpg",
    body: `
# Docker for Beginners — Containers Explained Simply

"It works on my machine."

Every developer has said it. Every developer has been frustrated by it. **Docker solves this.** In this post I'll explain containers from scratch, walk you through your first Dockerfile, and show you how to ship your Python/Node app in a container.

---

## What is Docker?

Docker packages your application and all its dependencies into a single unit called a **container**. That container runs identically on:

- Your laptop
- Your teammate's laptop
- A cloud server
- A CI/CD pipeline

Think of it like a shipping container 🚢 — the same box that leaves the factory arrives at the store, regardless of which ship or truck carried it.

---

## Key Concepts

| Term | Meaning |
|------|---------|
| **Image** | A blueprint (read-only snapshot of your app + dependencies) |
| **Container** | A running instance of an image |
| **Dockerfile** | A recipe that builds your image |
| **Docker Hub** | A registry of public images |

---

## Your First Dockerfile

Let's containerize a simple Python Flask app:

\`\`\`dockerfile
# Start from an official Python image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirements and install them
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy your app code
COPY . .

# Tell Docker which port your app listens on
EXPOSE 5000

# The command to run when the container starts
CMD ["python", "app.py"]
\`\`\`

---

## Build and Run

\`\`\`bash
# Build the image (tag it "my-app")
docker build -t my-app .

# Run it — map container port 5000 to your laptop's port 5000
docker run -p 5000:5000 my-app
\`\`\`

Open your browser at \`http://localhost:5000\` — your app is running inside a container. 🎉

---

## Useful Commands

\`\`\`bash
docker ps               # List running containers
docker ps -a            # List all containers (including stopped)
docker images           # List local images
docker stop <id>        # Stop a container
docker rm <id>          # Remove a stopped container
docker logs <id>        # View container logs
\`\`\`

---

## Why This Matters for Students

As a first/second year CS student, Docker gives you:

1. **Consistent dev environment** — no more "install this version of Node" headaches
2. **Portfolio credibility** — Dockerised projects show employers you think about deployment
3. **Free cloud deployment** — services like Railway, Render, and Fly.io all accept Docker images

---

## Next Steps

- Learn **docker-compose** to run multi-container apps (e.g., your Flask app + a Redis cache)
- Explore **Docker Hub** for pre-built images (postgres, redis, nginx)
- Try deploying your Dockerised app on **Render** (free tier available)

Docker has a small learning curve, but once it clicks it becomes one of those tools you can't imagine working without. Give it a weekend and you'll be containerising everything. 🐳
    `
  }
];

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Get all blog posts, sorted newest first.
 */
function getAllPosts() {
  return [...BLOGS].sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single post by its id.
 */
function getPostById(id) {
  return BLOGS.find(p => p.id === id) || null;
}

/**
 * Get the N most recent posts (used on the homepage preview).
 */
function getLatestPosts(n = 3) {
  return getAllPosts().slice(0, n);
}

/**
 * Get all unique tags across all posts.
 */
function getAllTags() {
  const tags = new Set();
  BLOGS.forEach(p => p.tags.forEach(t => tags.add(t)));
  return ['All', ...Array.from(tags).sort()];
}
