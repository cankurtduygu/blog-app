import { FaGlobeAmericas, FaUser } from 'react-icons/fa';

export default function LatestNews({ news }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      {/* Başlık */}
      <h2 className="flex items-center justify-center gap-2 text-lg font-bold mb-2">
        <FaGlobeAmericas className="w-5 h-5 text-gray-600" />
        Latest News
      </h2>

      {/* Haber Listesi */}
      <ul className="divide-y divide-gray-200">
        {news.length > 0 ? (
          news.map((item, index) => (
            <li key={index} className="flex gap-4 py-4">
              {/* Sol: Başlık, açıklama, yazar */}
              <div className="flex flex-col flex-1 justify-between min-w-0">
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2">
                  {item.title?.slice(0, 40)}
                  {item.title?.length > 40 ? '...' : ''}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-3 mt-1">
                  {item.description?.slice(0, 120)}
                  {item.description?.length > 120 ? '...' : ''}
                </p>
                <span className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                  <FaUser className="w-3 h-3" />
                  {item.author || 'No Author'}
                </span>
              </div>
              {/* Sag: Gorsel ve tarih */}
              <div className="flex flex-col items-end shrink-0 w-28">
                {item.urlToImage && (
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className="w-28 h-20 object-cover rounded"
                  />
                )}
                <span className="text-xs text-gray-500 mt-1">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="py-4 text-center text-gray-400 text-sm">
            No news available.
          </li>
        )}
      </ul>
    </div>
  );
}
