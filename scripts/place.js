
document.addEventListener('DOMContentLoaded', () => {

  // --- Static weather inputs ---
  // Units: metric (°C, km/h) — chosen because page is for Mexico
  const tempC = 5;
  const windKmh = 20;

  // place the static values into the UI (keeps DOM in sync with variables)
  document.getElementById('temp').textContent = tempC + " °C";
document.getElementById('wind').textContent = windKmh + " km/h";

  // Wind chill function
  function calculateWindChill(t, v) { return 13.12 + 0.6215*t - 11.37*Math.pow(v, 0.16) + 0.3965*t*Math.pow(v, 0.16); }

  // Only calculate if viable (metric thresholds)
  if (tempC <= 10 && windKmh > 4.8) {
    const wc = calculateWindChill(tempC, windKmh);
    document.getElementById('windchill').textContent = wc.toFixed(1) + ' °C';
  } else {
    document.getElementById('windchill').textContent = 'N/A';
  }
});
