# 🌀 T-HyperVM

**T-HyperVM** is a next-generation virtualization management panel built to manage and monitor VMs, nodes, storage, and networking with ease — designed for developers, hosts, and cloud providers.

---

## 🚀 Features
- 🔥 Realtime Node + VM monitoring  
- ⚙️ VM management (create, start, stop, delete)  
- 🌐 Secure API for agent communication  
- 🎨 Modern UI (React + Tailwind)  
- 🐳 Docker-ready architecture  
- 🔒 JWT authentication + role system (coming soon)

---

## 🧩 Tech Stack
| Layer | Stack |
|-------|-------|
| Frontend | React + Tailwind + Vite |
| Backend | Node.js + Express + Socket.io |
| Agent | Go (lightweight node service) |
| Database | PostgreSQL / SQLite |
| Container | Docker Compose |

---

## 🧰 Project Structure

T-HyperVM/
├── LICENSE
├── README.md
├── .gitignore
├── docker-compose.yml
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/vm.js
│   └── libvirt/vmController.js
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── index.js
│       └── components/Dashboard.jsx
│
└── agent/
    ├── main.go
    └── config.yml
