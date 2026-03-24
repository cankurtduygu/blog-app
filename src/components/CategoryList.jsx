export default function CategoryList({ categories, onSelect }) {
  return (
    <aside className="bg-white rounded-xl shadow p-4 flex flex-col gap-4">
      <h2 className="text-sm font-bold mb-2">
        Discover more of what are important to you.
      </h2>
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-200 transition"
          onClick={() => onSelect(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-200 transition"
            onClick={() => onSelect(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
