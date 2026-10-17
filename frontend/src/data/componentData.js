export const componentCategories = [
  { key: "head", label: "Face shape", folder: "head", count: 20 },
  { key: "hair", label: "Hair", folder: "hair", count: 20 },
  { key: "eyes", label: "Eyes", folder: "eyes", count: 12 },
  { key: "eyebrows", label: "Eyebrows", folder: "eyebrows", count: 20 },
  { key: "nose", label: "Nose", folder: "nose", count: 12 },
  { key: "lips", label: "Mouth / lips", folder: "lips", count: 20 },
  { key: "mustach", label: "Facial hair", folder: "mustach", count: 20 },
];

export function assetPath(folder, index) {
  return `/elements/${folder}/${String(index).padStart(2, "0")}.png`;
}
