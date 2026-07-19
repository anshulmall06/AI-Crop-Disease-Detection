/**
 * Loader Component
 * @param {string} text - Loading text
 */

export default function Loader({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>

      <p className="text-lg font-semibold">
        {text}
      </p>
    </div>
  );
}