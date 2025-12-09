export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 wrap-break-word">{title}</h3>
      <p className="text-gray-600 text-sm  wrap-break-word ">{description}</p>
    </div>
  );
}
