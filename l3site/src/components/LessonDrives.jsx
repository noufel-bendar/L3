import React, { useEffect, useMemo, useState } from 'react';
import { getJson } from '../api';

const LessonDrives = ({ specialization, semester, subject, mode }) => {
  const [driveLinks, setDriveLinks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [examResources, setExamResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      
      try {
        // Course materials (Drive links) for specialization+semester
        if (specialization && semester && !subject) {
          const links = await getJson('/drive-links/');
          // Filter by current semester and specialization
          const filtered = links.filter(link => 
            link.semester === semester.id && 
            link.specialization === specialization.id
          );
          setDriveLinks(filtered);
        }

        // Videos courses for specialization+semester
        if (!mode && specialization && semester && !subject) {
          const normalizedSpec = (typeof specialization.id === 'string' ? specialization.id : '').split('_')[0] || specialization.id;
          const cs = await getJson(`/courses/?specialization=${normalizedSpec}&semester=${semester.id}`);
          setCourses(cs.map((c) => ({ id: c.id, name: c.name, videoPlaylists: c.videoPlaylists })));
        }

        // Exam resources list by specialization (simplified flow)
        if (mode === 'exams' && specialization) {
          const specId = typeof specialization === 'string' ? specialization : (specialization.id || '');
          const normalizedSpecForExams = specId.split('_')[0] || specId;
          const semId = semester?.id || semester;
          const ex = await getJson(`/exam-resources/?specialization=${normalizedSpecForExams}${semId ? `&semester=${semId}` : ''}`);
          setExamResources(ex);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data from the server. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [specialization, semester, subject, mode]);

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4 animate-spin">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <p className="text-gray-400 text-xl">Loading data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-400 text-xl mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  // Determine if this is Course Materials flow, Videos flow, or Exams flow
  const isCourseMaterialsFlow = !mode && specialization && semester && !subject;
  const isVideosFlow = !mode && specialization && semester && !subject;
  const isExamsListFlow = mode === 'exams' && specialization;

  if (isCourseMaterialsFlow) {
    // Course Materials flow: Display Google Drive links for the selected specialization and semester
    if (!driveLinks.length) {
      return (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-400 text-xl">No course materials available for {specialization.name} - {semester.name}</p>
          <p className="text-gray-500 text-sm mt-2">Please check back later or contact the administrator.</p>
        </div>
      );
    }

    const specializations = [
      { id: 'isil_a', name: 'ISIL A', color: 'from-cyan-500 to-blue-500' },
      { id: 'isil_b', name: 'ISIL B', color: 'from-blue-500 to-indigo-500' },
      { id: 'isil_c', name: 'ISIL C', color: 'from-indigo-500 to-purple-500' },
      { id: 'acad_a', name: 'ACAD A', color: 'from-purple-500 to-pink-500' },
      { id: 'acad_b', name: 'ACAD B', color: 'from-pink-500 to-rose-500' },
      { id: 'acad_c', name: 'ACAD C', color: 'from-rose-500 to-red-500' }
    ];

    return (
      <div className="space-y-8">
        {/* Header Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 hover:from-blue-600/10 hover:to-purple-600/10 transition-all duration-300"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Course Materials - {specialization.name} - {semester.name}
                </h3>
                <p className="text-blue-200 text-lg">
                  Access course materials for {specialization.name} specialization
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Access the Google Drive folder containing all course materials for {specialization.name} specialization, {semester.name}.
            </p>
          </div>
        </div>
        
        {/* Course Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {driveLinks.map((link, index) => (
            
            <div key={index} className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="relative">
                  {/* Academic Year Header */}
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                        {link.start_year}-{link.end_year}
                      </h3>
                      <p className="text-gray-400 text-sm">{link.semester.toUpperCase()}</p>
                    </div>
                  </div>
                  
                  {/* Drive Link */}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
                  >
                    <svg className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.732 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Access Course Materials</span>
                    <svg className="w-4 h-4 ml-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
          ))}
        </div>
      </div>
    );
  }

  if (isVideosFlow) {
    // Videos flow: Display course list with video playlists
    // courses state is already populated from the backend API in useEffect

    if (!courses.length) {
      return (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-400 text-xl">No video courses available for {specialization?.name} - {semester?.name}</p>
          <p className="text-gray-500 text-sm mt-2">Please check back later or contact the administrator.</p>
        </div>
      );
    }

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
                <h3 className="text-2xl font-bold text-white">
                  {specialization?.name} - {semester?.fullName}
                </h3>
                <p className="text-red-200 text-lg">
                  Video course materials for {specialization?.fullName} specialization
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Access video playlists organized by subject for {specialization?.name} specialization, {semester?.fullName}.
            </p>
          </div>
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="relative">
                {/* Course Header */}
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {course.name}
                    </h3>
                  </div>
                </div>

                {/* Video Playlists Section */}
                {course.videoPlaylists && course.videoPlaylists.length > 0 ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {course.videoPlaylists.map((playlist, index) => (
                        <a
                          key={index}
                          href={playlist.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                        >
                          <svg className="w-5 h-5 mr-3 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{playlist.title}</span>
                          <svg className="w-4 h-4 ml-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">No video playlists available for this course yet.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isExamsListFlow) {
    if (!examResources.length) {
      return (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 text-xl">No exam materials available for this specialization.</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Header Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl p-6 border border-yellow-500/30">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 to-orange-600/0 hover:from-yellow-600/10 hover:to-orange-600/10 transition-all duration-300"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Exam Materials</h3>
                <p className="text-yellow-200 text-lg">Browse available exam resources</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Access exam materials grouped by subject for this specialization.
            </p>
          </div>
        </div>

        {/* Exam Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examResources.map((exam, index) => (
            <div key={index} className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{exam.name}</h3>
                  <p className="text-gray-300">Exam materials</p>
                </div>
              </div>

              <a
                href={exam.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center p-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Open Folder
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default LessonDrives;
