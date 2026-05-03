function showTab(tab, button) {
  document.getElementById("askTab").classList.add("hidden");
  document.getElementById("jobTab").classList.add("hidden");

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  if (tab === "ask") {
    document.getElementById("askTab").classList.remove("hidden");
  } else {
    document.getElementById("jobTab").classList.remove("hidden");
  }
}

async function askAI() {
  const prompt = document.getElementById("askInput").value;

  if (!prompt.trim()) {
    setOutput("Please write a prompt first.");
    return;
  }

  await sendRequest("/ask", { prompt });
}

async function analyzeJob() {
  const jobDescription = document.getElementById("jobInput").value;

  if (!jobDescription.trim()) {
    setOutput("Please paste a job description first.");
    return;
  }

  await sendRequest("/job-agent", { job_description: jobDescription });
}

async function sendRequest(url, body) {
  const loading = document.getElementById("loading");

  setOutput("");
  loading.classList.remove("hidden");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      setOutput("Server error. Please check FastAPI and Ollama.");
      return;
    }

    setOutput(data.answer || "No answer returned.");
  } catch (error) {
    setOutput("Error connecting to server. Make sure FastAPI and Ollama are running.");
  } finally {
    loading.classList.add("hidden");
  }
}

function setOutput(text) {
  const cleanedText = text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/\t/g, "  ")
    .trim();

  document.getElementById("output").textContent = cleanedText;
}

function copyResult() {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text);
}