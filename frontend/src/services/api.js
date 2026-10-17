const API_BASE = "http://127.0.0.1:8000";

/**
 * Sends a witness description to the RECON backend and returns
 * the generated composite data.
 *
 * @param {string} description - Natural-language suspect description
 * @returns {Promise<{attributes: object, prompt: string, image_url: string}>}
 */
export async function generateComposite(description) {
  const response = await fetch(`${API_BASE}/api/generate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      text || `Backend returned status ${response.status}`
    );
  }

  return await response.json();
}
