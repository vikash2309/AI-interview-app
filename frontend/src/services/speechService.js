let currentUtterance = null;
let selectedVoice = null;

// Load only once
function loadVoice() {
  if (selectedVoice) return selectedVoice;

  const voices = window.speechSynthesis.getVoices();

  selectedVoice =
    voices.find(
      (voice) => voice.name === "Google US English"
    ) ||
    voices.find(
      (voice) => voice.name === "Google UK English Female"
    ) ||
    voices.find(
      (voice) => voice.name === "Microsoft Heera - English (India)"
    ) ||
    voices.find(
      (voice) => voice.name === "Microsoft Ravi - English (India)"
    ) ||
    voices.find(
      (voice) => voice.lang === "en-IN"
    ) ||
    voices.find(
      (voice) => voice.lang.startsWith("en")
    ) ||
    null;

  console.log("Selected Voice:", selectedVoice?.name);

  return selectedVoice;
}

// Chrome loads voices asynchronously
window.speechSynthesis.onvoiceschanged = () => {
  loadVoice();
};

export function speak(text, onEnd) {
  window.speechSynthesis.cancel();

  currentUtterance = new SpeechSynthesisUtterance(text);

  const voice = loadVoice();

  if (voice) {
    currentUtterance.voice = voice;
  }

  currentUtterance.rate = 0.88;
  currentUtterance.pitch = 1.02;
  currentUtterance.volume = 1;

  currentUtterance.onstart = () => {
    console.log("🔊 AI Started Speaking");
  };

  currentUtterance.onend = () => {
    console.log("✅ AI Finished Speaking");
    onEnd?.();
  };

  currentUtterance.onerror = (e) => {
    console.error(e);
    onEnd?.();
  };

  window.speechSynthesis.speak(currentUtterance);
}

export function stopSpeaking() {
  window.speechSynthesis.cancel();
}