/**
 * Button Component
 * @param {string} text - Button text
 * @param {Function} onClick - Click handler
 */

export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      {text}
    </button>
  );
}