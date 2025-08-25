import React, { useEffect, useState } from 'react';
import { getJson } from '../api';

const YouTubeRecommendations = ({ specialization, semester }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    async function load() {
      if (specialization && semester) {
        const cs = await getJson(`/courses/?specialization=${specialization}&semester=${semester}`);
        // Sort courses by display_order to ensure proper ordering
        const sortedCourses = cs.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
        // Adapt backend Course model to channel-like cards
        const mapped = sortedCourses.map((c) => ({
          id: c.id,
          name: c.name,
          description: 'Curated playlists',
          subscribers: '',
          category: c.name,
          topics: c.videoPlaylists?.map(v => v.title) || [],
          playlists: c.videoPlaylists || [],
          color: 'from-red-500 to-pink-600',
        }));
        setChannels(mapped);
      } else {
        setChannels([]);
      }
    }
    load();
  }, [specialization, semester]);

  const getContextInfo = () => {
    if (specialization && semester) {
      return {
        title: `${specialization} - ${semester} Videos`,
        subtitle: `Video playlists for ${specialization} ${semester}`,
        description: `Discover the best YouTube channels for ${specialization} ${semester} courses. These channels offer high-quality content to supplement your learning with visual explanations and real-world examples.`
      };
    } else {
      return {
        title: 'Video Playlists',
        subtitle: 'Educational video content',
        description: 'Discover the best YouTube channels for computer science education. These channels offer high-quality content to supplement your learning.'
      };
    }
  };

  const contextInfo = getContextInfo();

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-2xl p-6 border border-red-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-pink-600/0 hover:from-red-600/10 hover:to-pink-600/10 transition-all duration-300"></div>
        <div className="relative">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{contextInfo.title}</h3>
              <p className="text-red-200 text-lg">{contextInfo.subtitle}</p>
            </div>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{contextInfo.description}</p>
        </div>
      </div>
      
      {/* Channels List */}
      <div className="space-y-6">
        {channels.map((channel) => (
          <div key={channel.id} className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${channel.color.replace('from-', 'from-').replace('to-', 'to-')}/10 opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
            <div className="relative">
              {/* Channel Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {channel.name}
                  </h3>
                  <p className="text-gray-300 mt-2 text-lg">{channel.description}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                    {channel.playlists.length} playlist{channel.playlists.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              {/* Channel Stats */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1 rounded-lg font-medium">
                  {channel.category}
                </span>
              </div>
              
              {/* Playlists */}
              {channel.playlists.length > 0 ? (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-200 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Available Playlists:
                  </h4>
                  <div className="space-y-3">
                    {channel.playlists.map((playlist, index) => (
                      <a
                        key={playlist.id}
                        href={playlist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:border-red-500/50 transition-all duration-300 group-hover:bg-gray-700/70"
                      >
                        <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">
                            {playlist.title}
                          </span>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="text-center py-4">
                    <div className="inline-block p-3 bg-gray-700/50 rounded-full mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">No playlists available yet</p>
                  </div>
                </div>
              )}
              
              {/* Topics Covered */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-200 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Course Topics:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {channel.topics.map((topic, index) => (
                    <span key={index} className="text-sm bg-gray-700/50 text-gray-200 px-3 py-1 rounded-lg border border-gray-600/50 group-hover:border-gray-500/50 transition-all duration-300">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Learning Tips */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl p-6 border border-yellow-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 to-orange-600/0 hover:from-yellow-600/10 hover:to-orange-600/10 transition-all duration-300"></div>
        <div className="relative">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white">Learning Tips</h4>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Click on any playlist to start learning! These curated playlists are organized by topic, 
            making it easy to follow along with your coursework for {specialization?.name} {semester?.name}. 
            Don't forget to like and comment to support the creators! 🎯✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeRecommendations;
