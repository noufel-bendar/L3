import React, { useEffect, useState } from 'react';
import { getJson } from '../api';

const Summaries = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getJson('/summaries/');
        setItems(res);
      } catch (e) {
        setError('Failed to load summaries');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-xl">Loading summaries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-xl">No summaries available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl p-6 border border-emerald-500/30">
        <div className="relative">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Summaries</h3>
              <p className="text-emerald-200 text-lg">Curated study summaries and notes</p>
            </div>
          </div>
          <p className="text-gray-300 text-lg">Click a summary to open it in a new tab.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((s, idx) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
          >
            <div className={`p-3 bg-gradient-to-r ${['from-emerald-500 to-teal-600','from-blue-500 to-indigo-600','from-purple-500 to-pink-600','from-cyan-500 to-blue-500','from-orange-500 to-red-600'][idx % 5]} rounded-xl mb-4 w-fit`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{s.title}</h4>
            <p className="text-sm text-gray-300">Updated resource</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Summaries;


