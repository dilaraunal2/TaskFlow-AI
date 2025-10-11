function predictPriority(title, description) {
  const highWords = ["acil", "hemen", "kritik", "önemli", "urgent","!","unutma","randevu","critical"];
  const mediumWords = ["yakında", "hafta", "plan", "görev", "bitir", "kontrol", "toplantı","soon","today","important"];
  const lowWords = ["ilerleyen", "sonra", "istirahat", "gün", "opsiyonel","later","someday","optional"];

  // Başlık ve açıklamayı küçük harfe çevir ve kelimelere ayır
  const allWords = (
    (title || "") + " " + (description || "")
  )
    .toLowerCase()
    .split(/\s+|[\.,!?\-]/)
    .filter(Boolean);

  // Öncelik belirle
  for (const w of allWords) {
    if (highWords.includes(w)) return "high";    // Başlık veya açıklamada high varsa
  }
  for (const w of allWords) {
    if (mediumWords.includes(w)) return "medium";
  }
  for (const w of allWords) {
    if (lowWords.includes(w)) return "low";
  }

  return "low"; // hiçbir kelime yoksa default low
}

module.exports = { predictPriority };
