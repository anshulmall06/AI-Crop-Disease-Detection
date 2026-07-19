/**
 * Input Component
 * @param {string} placeholder - Placeholder text
 * @param {string} type - Input type
 * @param {function} onChange - Change handler
 */

export default function Input({
  placeholder,
  type = "text",
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
}