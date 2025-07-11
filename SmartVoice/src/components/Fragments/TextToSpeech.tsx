import { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  const speakText = () => {
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Text to Speech</h2>
      <input
        className="w-full border rounded p-2 mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <button
        onClick={speakText}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
