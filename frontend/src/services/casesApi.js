const STORAGE_KEY = "recon-cases";

const seedCases = [
  {
    id: "REC-2026-081",
    name: "Northbridge Witness Statement",
    status: "ACTIVE",
    updated: "Today, 09:42",
    location: "Northbridge district",
    officer: "A. Mercer",
    summary: "Facial composite reconstruction from witness description.",
  },
  {
    id: "REC-2026-077",
    name: "Harbor CCTV Review",
    status: "REVIEW",
    updated: "Yesterday, 16:10",
    location: "West harbor",
    officer: "D. Chen",
    summary: "Reference evidence awaiting analyst review.",
  },
];

export function getCases() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || seedCases;
  } catch {
    return seedCases;
  }
}

export function saveCase(caseData) {
  const cases = getCases().filter((item) => item.id !== caseData.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([caseData, ...cases]));
  return caseData;
}

export function getCase(id) {
  return getCases().find((item) => item.id === id) || getCases()[0];
}
