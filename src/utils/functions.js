export function secondsToHms(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hrsStr = String(hrs).padStart(2, "0");
  const minsStr = String(mins).padStart(2, "0");
  const secsStr = String(secs).padStart(2, "0");

  return `${hrsStr}:${minsStr}:${secsStr}`;
}

export function secondsToHHMM(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  // Pad with leading zeros if needed
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
