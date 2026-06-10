export const site = {
  name: "Samanyu Badam",
  url: "https://sbadam.vercel.app",
  title: "Samanyu Badam — ML, graphs, systems",
  thesis:
    "Everything I work on is secretly a graph — SLAM backends, deceptive circuits, Ramsey bounds — and the job is finding the ordering that makes it tractable.",
  description:
    "CS + Math at Georgia Tech. ML systems, SLAM factor graphs, LLM interpretability, and combinatorics — with measured results.",
  email: "sbadam7@gatech.edu",
  github: "https://github.com/SamanyuB910",
  linkedin: "https://www.linkedin.com/in/samanyu-badam-6323282b0/",
  resume: "/resume.pdf",
  location: "Atlanta, GA",
  education: "B.S. Computer Science + Mathematics, Georgia Tech, May 2028",
  // The "results" line — anchors About and the hero metrics strip.
  heroMetrics: [
    { value: "90% of 404", label: "held-out factor graphs ordered past METIS" },
    { value: "AUC 0.851", label: "deceptive LLM circuits classified by treewidth" },
    { value: "12,005,168 / 11 s", label: "ten-vertex graphs exhaustively checked" },
  ],
  honors: [
    "USACO Platinum",
    "4× AIME qualifier",
    "AI Safety Initiative Technical Fellow",
    "2nd place, Citadel Engineering Challenge",
    "78th globally (25th in US), IMC Trading Prosperity 4",
    "1st place, CalHacks",
    "1st place, HackGT",
  ],
  skills:
    "Python, C/C++, Java, TypeScript, SQL · PyTorch, NumPy, Numba, Databricks, PySpark, MLflow, Delta Lake, Airflow, XGBoost, ROS2, OpenCV, Docker, AWS, Linux",
} as const;
