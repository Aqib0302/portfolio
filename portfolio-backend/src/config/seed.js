require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
console.log("PATH:", require("path").resolve(__dirname, "../../.env"));
console.log("MONGO_URI:", process.env.MONGO_URI);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const Experience = require("../models/Experience.model");
const Project = require("../models/Project.model");
const Admin = require("../models/Admin.model");
const Stat = require("../models/Stat.model");

const experiences = [
  {
    order: 1,
    role: "Software Engineer (Freelance)",
    company: "Quality Care Group",
    location: "Dubai, UAE",
    period: "Nov 2025 – Present",
    type: "Freelance",
    url: "https://qualitycaregroup.ae",
    status: "current",
    stack: ["MongoDB", "Node.js", "React", "Redis", "AWS S3", "JWT"],
    summary:
      "Building a full-stack SaaS CRM system for client management and internal workflows.",
    highlights: [
      "Built SaaS CRM with multi-format data ingestion into MongoDB; OTP login with department-level RBAC; JWT-secured APIs",
      "Deployed on AWS S3 with automated backups; automated monthly email reports via scheduled jobs",
      "Integrated Redis caching — reduced read latency 60% under peak load",
      "Developed fully functional CRM for client management and internal employees — seamless record & task tracking",
      "End-to-end solution covering client onboarding, employee workflows, and data reporting — reducing manual effort",
    ],
    metrics: [
      { value: "60%", label: "Latency ↓" },
      { value: "AWS", label: "Cloud" },
      { value: "RBAC", label: "Auth" },
    ],
  },
  {
    order: 2,
    role: "Software Engineer",
    company: "Siemens India",
    location: "India",
    period: "Jun 2024 – Nov 2025",
    type: "Full-Time",
    url: "https://siemens.com",
    status: "past",
    stack: [
      "React.js",
      "Node.js",
      "Docker",
      "Kubernetes",
      "Kafka",
      "RabbitMQ",
      "Redis",
      "Jenkins",
      "ELK",
      "Prometheus",
    ],
    summary:
      "Architected B2B e-commerce platform with 99.9% uptime and 3x traffic scaling.",
    highlights: [
      "Architected B2B e-commerce platform (React.js, Node.js, 15+ APIs) — 99.9% uptime, 3x traffic scaling, 60% more order capacity",
      "40% faster API via Redis; 50% faster deployments via Docker/Kubernetes + Jenkins; 65% faster incident detection via ELK/Prometheus/Grafana",
      "Eliminated unauthorized access with JWT + OAuth2 RBAC; order status latency under 2s via Kafka/RabbitMQ",
      "Reduced peak memory 55% via Node.js stream-based Kafka pipelines; improved DB query performance 45%",
      "Designed scalable software modules for enterprise clients with complex business workflows",
    ],
    metrics: [
      { value: "40%", label: "API Speed ↑" },
      { value: "99.9%", label: "Uptime" },
      { value: "55%", label: "Memory ↓" },
      { value: "65%", label: "Incidents ↑" },
    ],
  },
  {
    order: 3,
    role: "Frontend Developer",
    company: "Bitmap Technology",
    location: "India",
    period: "Mar 2023 – Feb 2024",
    type: "Full-Time",
    url: "#",
    status: "past",
    stack: ["React.js", "Jenkins", "CSS", "JavaScript"],
    summary:
      "Built responsive dashboards and UI libraries adopted across 3 product teams.",
    highlights: [
      "Improved app performance 25% with optimized React.js dashboards",
      "UI component library adopted by 3 teams; zero failed deployments via Jenkins CI/CD",
      "Built fully responsive websites with clean, intuitive UI/UX design",
      "Developed user-friendly interfaces improving engagement and conversion rates",
    ],
    metrics: [
      { value: "25%", label: "Perf ↑" },
      { value: "0", label: "Failed Deploys" },
      { value: "3", label: "Teams" },
    ],
  },
];

const projects = [
  {
    order: 1,
    title: "Full Stack E-Commerce",
    subtitle: "BookMyShow & Zomato Clones",
    period: "Mar 2023 – Feb 2024",
    type: "Full Stack",
    colorClass: "accent",
    stack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Docker",
      "JWT",
      "RBAC",
    ],
    summary:
      "High-performance e-commerce clones handling 10,000+ concurrent requests.",
    highlights: [
      "10,000+ concurrent requests with 35% faster DB retrieval",
      "JWT/RBAC/Redis security — zero breaches",
      "40% faster releases via Docker CI/CD",
      "PostgreSQL schema (12+ tables) with composite indexes — 48% faster queries",
      "Kafka + Redis order pipeline for 10,000+ concurrent orders",
    ],
    metrics: [
      { value: "10K+", label: "Concurrent" },
      { value: "48%", label: "Faster Queries" },
      { value: "40%", label: "Faster Releases" },
    ],
  },
  {
    order: 2,
    title: "AI TCP Action Predictor",
    subtitle: "Hackathon 1st Place — National (200+ Teams)",
    period: "2024",
    type: "AI / ML",
    colorClass: "accent3",
    stack: [
      "Python",
      "Random Forest",
      "XGBoost",
      "Async Python",
      "ML Pipeline",
    ],
    summary:
      "Award-winning ML model predicting TCP congestion with 92%+ accuracy at sub-10ms latency.",
    highlights: [
      "92%+ TCP congestion prediction accuracy (Random Forest & XGBoost)",
      "Async Python backend — sub-10ms inference latency",
      "Competed against 200+ national teams — won 1st place",
      "Real-time network congestion control predictions",
    ],
    metrics: [
      { value: "92%+", label: "Accuracy" },
      { value: "<10ms", label: "Latency" },
      { value: "🏆 1st", label: "National" },
    ],
  },
  {
    order: 3,
    title: "SaaS CRM Platform",
    subtitle: "Quality Care Group — Live",
    period: "Nov 2025 – Present",
    type: "SaaS / CRM",
    colorClass: "accent2",
    liveUrl: "https://qualitycaregroup.ae",
    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Redis",
      "AWS S3",
      "JWT",
      "RBAC",
      "Cron Jobs",
    ],
    summary:
      "Full-stack CRM system for client management, employee workflows, and automated reporting.",
    highlights: [
      "Multi-format data ingestion pipeline into MongoDB",
      "OTP login with department-level RBAC and JWT-secured APIs",
      "Redis caching reduced read latency 60% under peak load",
      "Deployed on AWS S3 with automated backups",
      "Automated monthly email reports via scheduled cron jobs",
    ],
    metrics: [
      { value: "60%", label: "Latency ↓" },
      { value: "AWS", label: "Cloud" },
      { value: "Live", label: "Status" },
    ],
  },
];

async function seed() {
  await connectDB();
  console.log("\n🌱 Seeding database...\n");

  await Experience.deleteMany({});
  await Project.deleteMany({});
  await Admin.deleteMany({});
  await Stat.deleteMany({});

  await Experience.insertMany(experiences);
  console.log(`✅ Seeded ${experiences.length} experience entries`);

  await Project.insertMany(projects);
  console.log(`✅ Seeded ${projects.length} projects`);

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin@1234",
    12,
  );
  await Admin.create({
    email: process.env.ADMIN_EMAIL || "admin@mohammadaqib.com",
    password: hashedPassword,
    name: "Mohammad Aqib",
  });
  console.log(`✅ Admin account created`);

  await Stat.create({ totalContacts: 0, totalVisits: 0 });
  console.log(`✅ Stats initialized`);

  console.log("\n🎉 Database seeded successfully!\n");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
