# 🎬 WhoWasIt

_[🌐 Leer en Español](README.es.md)_

**WhoWasIt** is a public-facing web application that helps you answer one of the most common questions when watching TV shows or movies:

> **“Where else have I seen that actor?”**

By comparing two different titles — movies or series — the app displays **actors who appear in both**, along with the **roles they played**. It’s designed to be fast, simple, and accessible without requiring any sign-in.

This is especially useful for curious viewers who want instant answers without digging through cast lists manually.

---

## 🧠 Project Purpose

The primary goal of _WhoWasIt_ is to provide an intuitive interface to:

- Search for two different titles
- Compare their cast lists
- Display any shared actors, side by side
- Show the characters they portrayed in each title

This app fetches data from a third-party movie/TV API (TMDB) and processes it through a custom Express backend to ensure reliability and formatting.

No user data is collected, and there is no need to create an account. It’s a tool made for everyone.

---

## 🛠️ Technology Stack

| Layer           | Technology               |
| --------------- | ------------------------ |
| **Frontend**    | Next.js (React.js)       |
| **Backend/API** | Next.js (React.js)       |
| **Hosting**     | Self-hosted via CapRover |
| **Movie Data**  | External API (TMDB)      |

---

## 🚀 Development Server

To start a local development server, run:

```bash
  npm run dev
```
