export async function searchCandidates() {
  throw new Error("Candidate search backend is not connected yet.");
}

export const demoCandidates = [
  { id: "C-1048", name: "Candidate 1048", score: 87, source: "Pending source", status: "UNVERIFIED" },
  { id: "C-0921", name: "Candidate 0921", score: 74, source: "Pending source", status: "UNVERIFIED" },
  { id: "C-1173", name: "Candidate 1173", score: 61, source: "Pending source", status: "UNVERIFIED" },
];
