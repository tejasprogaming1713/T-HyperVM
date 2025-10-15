
// backend/server.js
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Libvirt integration (mock for now)
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// In-memory VM list (for demo / starter)
let vms = [];

// Socket.IO: emit VM status changes
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.emit("vm-list", vms);
});

// -------------------- Routes --------------------

// List all VMs
app.get("/vm", (req, res) => {
  res.json(vms);
});

// Create a VM (mock)
app.post("/vm/create", (req, res) => {
  const { name, memory, cpu } = req.body;
  const id = Date.now();
  vms.push({ id, name, memory, cpu, status: "stopped" });
  io.emit("vm-list", vms);
  res.json({ success: true, vm: { id, name, memory, cpu, status: "stopped" } });
});

// Start VM
app.post("/vm/start", (req, res) => {
  const { id } = req.body;
  const vm = vms.find(v => v.id === id);
  if (vm) vm.status = "running";
  io.emit("vm-list", vms);
  res.json({ success: !!vm, vm });
});

// Stop VM
app.post("/vm/stop", (req, res) => {
  const { id } = req.body;
  const vm = vms.find(v => v.id === id);
  if (vm) vm.status = "stopped";
  io.emit("vm-list", vms);
  res.json({ success: !!vm, vm });
});

// Delete VM
app.delete("/vm/:id", (req, res) => {
  const id = parseInt(req.params.id);
  vms = vms.filter(v => v.id !== id);
  io.emit("vm-list", vms);
  res.json({ success: true });
});

// Root
app.get("/", (req, res) => {
  res.send("T-HyperVM Backend Running ✅");
});

// Listen
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Backend running on :${PORT}`));
