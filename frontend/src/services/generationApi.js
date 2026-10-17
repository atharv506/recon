
const API_BASE = "http://127.0.0.1:8000";

export async function generateComposite(description) {
  const response = await fetch(`${API_BASE}/api/generate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Django API returned ${response.status}`);
  }

  return data;
}

export async function refineComposite(
  caseId,
  currentAttributes,
  modification
) {
  const response = await fetch(`${API_BASE}/api/refine/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      case_id: caseId,
      current_attributes: currentAttributes,
      modification,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Django API returned ${response.status}`);
  }

  return data;
}

export { API_BASE };
