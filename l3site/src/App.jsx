import React, { useEffect, useState } from 'react';
import LessonDrives from './components/LessonDrives';
import YouTubeRecommendations from './components/YouTubeRecommendations';
import Summaries from './components/Summaries';
import CharityPopup from './components/CharityPopup';
import { getJson } from './api';

function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  // Reset all selections when going back to home
  const resetSelections = () => {
    setSelectedMode(null);
    setSelectedSemester(null);
    setSelectedMajor(null);
    setSelectedSection(null);
    setSelectedSubject(null);
    setActiveTab('home');
  };

  const majors = [
    { 
      id: 'acad', 
      name: 'ACAD', 
      fullName: 'Informatique Général', 
      description: 'General Computer Science', 
      color: 'from-purple-500 to-pink-500', 
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      sections: [
        { id: 'a', name: 'Section A', color: 'from-purple-500 to-pink-500' },
        { id: 'b', name: 'Section B', color: 'from-pink-500 to-rose-500' },
        { id: 'c', name: 'Section C', color: 'from-rose-500 to-red-500' }
      ]
    },
    { 
      id: 'isil', 
      name: 'ISIL', 
      fullName: 'Ingénierie Système d\'Information et Logiciels', 
      description: 'Information Systems and Software Engineering', 
      color: 'from-cyan-500 to-blue-500', 
      hoverColor: 'hover:from-cyan-600 hover:to-blue-600',
      sections: [
        { id: 'a', name: 'Section A', color: 'from-cyan-500 to-blue-500' },
        { id: 'b', name: 'Section B', color: 'from-blue-500 to-indigo-500' },
        { id: 'c', name: 'Section C', color: 'from-indigo-500 to-purple-500' }
      ]
    }
  ];

  const [academicYears, setAcademicYears] = useState([]);

  const semesters = [
    { id: 's5', name: 'S5', fullName: 'Semester 5', description: 'Fifth Semester Courses' },
    { id: 's6', name: 'S6', fullName: 'Semester 6', description: 'Sixth Semester Courses' }
  ];

  const [subjects, setSubjects] = useState({ isil: [], acad: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function bootstrap() {
      setLoading(true);
      setError(null);
      
      try {
        const driveLinks = await getJson('/drive-links/');
        const years = [...new Set(driveLinks.map(link => `${link.start_year}-${link.end_year}`))];
        if (years.length) setAcademicYears(years);
        
        // Fetch exam resources for each major
        const majors = ['isil', 'acad'];
        const allExamResources = {};
        
        for (const major of majors) {
          try {
            // Fetch exam resources for the major (will include all sections)
            const resources = await getJson(`/exam-resources/?specialization=${major}`);
            allExamResources[major] = resources.map(e => ({ 
              id: e.name.toLowerCase().replace(/\s+/g,'-'), 
              name: e.name, 
              url: e.url, 
              color: e.color || 'from-blue-500 to-indigo-600' 
            }));
          } catch (err) {
            console.warn(`Failed to fetch exam resources for ${major}:`, err);
            allExamResources[major] = [];
          }
        }
        
        // Set subjects by major
        setSubjects(allExamResources);
      } catch (e) {
        console.error('Error loading initial data:', e);
        setError('Failed to load data from the server. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    }
    bootstrap();
  }, []);

  const navigationTabs = [
    { id: 'home', name: 'Home' },
    { id: 'playlist', name: 'Playlist' },
    { id: 'drives', name: 'Drives' },
    { id: 'exams', name: 'Exams' },
    { id: 'summaries', name: 'Summaries' },
    { id: 'contact', name: 'Contact Me' }
  ];

  // Show loading state for initial data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6 animate-spin">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Loading USTHB L3 Platform</h2>
          <p className="text-gray-400 text-lg">Connecting to the server...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="inline-block p-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Connection Error</h2>
          <p className="text-red-400 text-lg mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="text-center animate-fade-in-up">
              <div className="inline-block p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4 lg:mb-6 animate-float">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up delay-200">
                USTHB Informatique L3 LMD
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in-up delay-400">
                Your ultimate learning hub for third-year computer science at USTHB. 
                Dive into course materials, discover amazing video content, and level up your skills! 🚀
              </p>
            </div>
            

            
            {/* Mode Selection */}
            {!selectedMode && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-700/50">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2 animate-fade-in-up">Choose Your Learning Resource</h2>
                  <p className="text-gray-400 text-center mb-6 lg:mb-8 animate-fade-in-up delay-100">Select the type of learning resource you want to access.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <button 
                      onClick={() => {
                        setSelectedMode('drives');
                        setActiveTab('drives');
                      }}
                      className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-4 sm:p-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25 border border-blue-500/30 animate-fade-in-up delay-100 hover:animate-pulse"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/20 group-hover:to-indigo-600/20 transition-all duration-300 group-hover:animate-ping"></div>
                      <div className="relative text-center">
                        <div className="inline-block p-2 sm:p-3 bg-white/10 rounded-2xl mb-3 sm:mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                          <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Course Materials</h3>
                        <p className="text-blue-100 mb-2 sm:mb-3 text-xs sm:text-sm">Comprehensive study resources</p>
                        <p className="text-blue-200/80 text-xs">Access organized course materials by semester and specialization</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedMode('videos');
                        setActiveTab('playlist');
                      }}
                      className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-700 p-4 sm:p-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25 border border-purple-500/30 animate-fade-in-up delay-200 hover:animate-pulse"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition-all duration-300 group-hover:animate-ping"></div>
                      <div className="relative text-center">
                        <div className="inline-block p-2 sm:p-3 bg-white/10 rounded-2xl mb-3 sm:mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                          <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Video Content</h3>
                        <p className="text-purple-100 mb-2 sm:mb-3 text-xs sm:text-sm">Learn through videos</p>
                        <p className="text-purple-200/80 text-xs">Watch curated video content by semester and specialization</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedMode('exams');
                        setActiveTab('exams');
                      }}
                      className="group relative overflow-hidden bg-gradient-to-br from-red-600 to-orange-700 p-4 sm:p-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/25 border border-red-500/30 animate-fade-in-up delay-300 hover:animate-pulse"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-orange-600/0 group-hover:from-red-600/20 group-hover:to-orange-600/20 transition-all duration-300 group-hover:animate-ping"></div>
                      <div className="relative text-center">
                        <div className="inline-block p-2 sm:p-3 bg-white/10 rounded-2xl mb-3 sm:mb-4 group-hover:bg-white/20 transition-all duration-300">
                          <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Exams</h3>
                        <p className="text-red-100 mb-2 sm:mb-3 text-xs sm:text-sm">Exam materials</p>
                        <p className="text-red-200/80 text-xs">Access exam materials by semester and specialization</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('summaries')}
                      className="group relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 p-4 sm:p-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-emerald-500/25 border border-emerald-500/30 animate-fade-in-up delay-400 hover:animate-pulse"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/20 group-hover:to-teal-600/20 transition-all duration-300 group-hover:animate-ping"></div>
                      <div className="relative text-center">
                        <div className="inline-block p-2 sm:p-3 bg-white/10 rounded-2xl mb-3 sm:mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                          <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M4 6h16M4 6v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Summaries</h3>
                        <p className="text-emerald-100 mb-2 sm:mb-3 text-xs sm:text-sm">Quick study summaries</p>
                        <p className="text-emerald-200/80 text-xs">Access course summaries and notes</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Discord Section */}
            {!selectedMode && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 border border-indigo-500/30">
                  <div className="text-center animate-fade-in-up delay-500">
                    <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 lg:mb-6 animate-float">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 lg:mb-4 animate-fade-in-up delay-600">Join Our Community!</h3>
                    <p className="text-gray-300 text-base sm:text-lg mb-4 lg:mb-6 animate-fade-in-up delay-700">
                      Join this year's Discord server here:
                    </p>
                    <a
                      href="https://discord.gg/Ef5eeQQpnk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25 text-sm sm:text-base animate-fade-in-up delay-800 hover:animate-pulse"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      Join Discord Server
                    </a>
                  </div>
                </div>
              </div>
            )}


          </div>
        );

      case 'playlist':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              <h2 className="text-4xl font-bold text-white mb-6">🎬 Video Playlists</h2>
              <p className="text-gray-300 mb-8 text-lg">Discover amazing video content to boost your learning!</p>
              
              {/* Semester Selection for Video Content */}
              {!selectedSemester ? (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Choose Your Semester</h3>
                    <p className="text-gray-400 text-lg">Select your semester to view available video content</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {semesters.map((semester) => (
                      <button 
                        key={semester.id} 
                        onClick={() => setSelectedSemester(semester)} 
                        className="group bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-purple-500/30"
                      >
                        <div className="text-center">
                          <h3 className="text-4xl font-bold mb-3">{semester.name}</h3>
                          <p className="text-white/90 mb-2 text-lg">{semester.fullName}</p>
                          <p className="text-white/80 text-sm">{semester.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <button onClick={() => {
                      setSelectedMode(null);
                      setActiveTab('home');
                    }} className="text-purple-400 hover:text-purple-300 underline text-lg transition-colors">
                      ← Back to Home
                    </button>
                  </div>
                </div>
              ) : !selectedMajor ? (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Choose Your Major</h3>
                    <p className="text-gray-400 text-lg">Select your major for {selectedSemester.name}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {majors.map((major) => (
                      <button 
                        key={major.id} 
                        onClick={() => setSelectedMajor(major)} 
                        className={`group relative overflow-hidden bg-gradient-to-br ${major.color} p-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20`}
                      >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl"></div>
                        <div className="relative text-center">
                          <h3 className="text-4xl font-bold text-white mb-4">{major.name}</h3>
                          <p className="text-white/90 mb-3 text-lg">{major.fullName}</p>
                          <p className="text-white/80 text-sm">{major.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <button onClick={() => setSelectedSemester(null)} className="text-purple-400 hover:text-purple-300 underline text-lg transition-colors">
                      ← Back to Semester Selection
                    </button>
                  </div>
                </div>
                             ) : (
                 <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="text-2xl font-bold text-white">{selectedSemester.name} - {selectedMajor.name}</h3>
                       <p className="text-gray-400">Video content for your selected semester and major</p>
                     </div>
                     <button 
                       onClick={() => setSelectedMajor(null)} 
                       className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
                     >
                       ← Back
                     </button>
                   </div>
                   <YouTubeRecommendations 
                     specialization={selectedMajor.id}
                     semester={selectedSemester.id} 
                   />
                 </div>
               )}
            </div>
          </div>
        );

      case 'drives':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              <h2 className="text-4xl font-bold text-white mb-6">📚 Course Materials</h2>
              <p className="text-gray-300 mb-8 text-lg">Access all your course materials and study resources!</p>
              
              {/* Semester Selection for Course Materials */}
              {!selectedSemester ? (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Choose Your Semester</h3>
                    <p className="text-gray-400 text-lg">Select your semester to view available course materials</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {semesters.map((semester) => (
                      <button 
                        key={semester.id} 
                        onClick={() => setSelectedSemester(semester)} 
                        className="group bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-blue-500/30"
                      >
                        <div className="text-center">
                          <h3 className="text-4xl font-bold mb-3">{semester.name}</h3>
                          <p className="text-white/90 mb-2 text-lg">{semester.fullName}</p>
                          <p className="text-white/80 text-sm">{semester.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <button onClick={() => {
                      setSelectedMode(null);
                      setActiveTab('home');
                    }} className="text-blue-400 hover:text-blue-300 underline text-lg transition-colors">
                      ← Back to Home
                    </button>
                  </div>
                </div>
              ) : !selectedMajor ? (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Choose Your Major</h3>
                    <p className="text-gray-400 text-lg">Select your major for {selectedSemester.name}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {majors.map((major) => (
                      <button 
                        key={major.id} 
                        onClick={() => setSelectedMajor(major)} 
                        className={`group relative overflow-hidden bg-gradient-to-br ${major.color} p-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20`}
                      >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl"></div>
                        <div className="relative text-center">
                          <h3 className="text-4xl font-bold text-white mb-4">{major.name}</h3>
                          <p className="text-white/90 mb-3 text-lg">{major.fullName}</p>
                          <p className="text-white/80 text-sm">{major.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <button onClick={() => setSelectedSemester(null)} className="text-blue-400 hover:text-blue-300 underline text-lg transition-colors">
                      ← Back to Semester Selection
                    </button>
                  </div>
                </div>
              ) : !selectedSection ? (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Choose Your Section</h3>
                    <p className="text-gray-400 text-lg">Select your section for {selectedMajor.name}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedMajor.sections.map((section) => (
                      <button 
                        key={section.id} 
                        onClick={() => setSelectedSection(section)} 
                        className={`group relative overflow-hidden bg-gradient-to-br ${section.color} p-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20`}
                      >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl"></div>
                        <div className="relative text-center">
                          <h3 className="text-2xl font-bold text-white mb-2">{section.name}</h3>
                          <p className="text-white/80 text-sm">{selectedMajor.name} {section.id.toUpperCase()}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <button onClick={() => setSelectedMajor(null)} className="text-blue-400 hover:text-blue-300 underline text-lg transition-colors">
                      ← Back to Major Selection
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedSemester.name} - {selectedMajor.name} {selectedSection.id.toUpperCase()}</h3>
                      <p className="text-gray-400">Course materials for your selected semester, major, and section</p>
                    </div>
                    <button 
                      onClick={() => setSelectedSection(null)} 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105"
                    >
                      ← Back
                    </button>
                  </div>
                                     <LessonDrives 
                     semester={selectedSemester}
                     specialization={{ id: `${selectedMajor.id}_${selectedSection.id}`, name: `${selectedMajor.name} ${selectedSection.id.toUpperCase()}` }}
                   />
                </div>
              )}
            </div>
          </div>
        );

      case 'exams':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">📝 Exams</h2>
              <p className="text-gray-300 mb-8 text-lg animate-fade-in-up delay-100">Access all your exam materials and study resources!</p>
              
              {/* Semester Selection for Exams */}
              {!selectedSemester ? (
                <div className="space-y-8">
                  <div className="text-center mb-8 animate-fade-in-up delay-200">
                    <h3 className="text-2xl font-bold text-white mb-4">Choose Your Semester</h3>
                    <p className="text-gray-400 text-lg">Select your semester to view available exam materials</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {semesters.map((semester, index) => (
                      <button 
                        key={semester.id} 
                        onClick={() => setSelectedSemester(semester)} 
                        className="group bg-gradient-to-br from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-red-500/30 animate-fade-in-up hover:animate-pulse"
                        style={{ animationDelay: `${300 + index * 100}ms` }}
                      >
                        <div className="text-center">
                          <h3 className="text-4xl font-bold mb-3">{semester.name}</h3>
                          <p className="text-white/90 mb-2 text-lg">{semester.fullName}</p>
                          <p className="text-white/80 text-sm">{semester.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <button onClick={() => {
                      setSelectedMode(null);
                      setActiveTab('home');
                    }} className="text-red-400 hover:text-red-300 underline text-lg transition-colors">
                      ← Back to Home
                    </button>
                  </div>
                </div>
              ) : !selectedMajor ? (
                <div className="space-y-8">
                  <div className="text-center mb-8 animate-fade-in-up delay-200">
                    <h3 className="text-2xl font-bold text-white mb-4">Choose Your Major</h3>
                    <p className="text-gray-400 text-lg">Select your major for {selectedSemester.name}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {majors.map((major, index) => (
                      <button 
                        key={major.id} 
                        onClick={() => setSelectedMajor(major)} 
                        className={`group relative overflow-hidden bg-gradient-to-br ${major.color} p-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20 animate-fade-in-up hover:animate-pulse`}
                        style={{ animationDelay: `${300 + index * 100}ms` }}
                      >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl group-hover:animate-ping"></div>
                        <div className="relative text-center">
                          <h3 className="text-4xl font-bold text-white mb-4">{major.name}</h3>
                          <p className="text-white/90 mb-3 text-lg">{major.fullName}</p>
                          <p className="text-white/80 text-sm">{major.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <button onClick={() => setSelectedSemester(null)} className="text-red-400 hover:text-red-300 underline text-lg transition-colors">
                      ← Back to Semester Selection
                    </button>
                  </div>
                </div>
                             ) : !selectedSubject ? (
                 <div className="space-y-8">
                   <div className="text-center mb-8 animate-fade-in-up delay-200">
                     <h3 className="text-2xl font-bold text-white mb-4">Choose Your Subject</h3>
                     <p className="text-gray-400 text-lg">Select your subject for {selectedSemester.name} - {selectedMajor.name}</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {(() => {
                       // Filter subjects based on major type (isil vs acad)
                       const availableSubjects = subjects[selectedMajor.id] || [];
                       
                       return availableSubjects.map((subject, index) => (
                         <button 
                           key={subject.id} 
                           onClick={() => setSelectedSubject(subject)} 
                           className={`group relative overflow-hidden bg-gradient-to-br ${subject.color} p-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20 animate-fade-in-up hover:animate-pulse`}
                           style={{ animationDelay: `${300 + index * 100}ms` }}
                         >
                           <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl group-hover:animate-ping"></div>
                           <div className="relative text-center">
                             <h3 className="text-4xl font-bold text-white mb-4">{subject.name}</h3>
                             <p className="text-white/90 mb-3 text-lg">Exam materials</p>
                             <p className="text-white/80 text-sm">Access exam materials for {subject.name}</p>
                           </div>
                         </button>
                       ));
                     })()}
                   </div>
                   <div className="text-center">
                     <button onClick={() => setSelectedMajor(null)} className="text-red-400 hover:text-red-300 underline text-lg transition-colors">
                       ← Back to Major Selection
                     </button>
                   </div>
                 </div>
               ) : (
                 <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="text-2xl font-bold text-white">{selectedSemester.name} - {selectedMajor.name} - {selectedSubject.name}</h3>
                       <p className="text-gray-400">Exam materials for your selected semester, major, and subject</p>
                     </div>
                     <button 
                       onClick={() => setSelectedSubject(null)} 
                       className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
                     >
                       ← Back
                     </button>
                   </div>
                   <LessonDrives 
                     specialization={selectedMajor.id}
                     subject={selectedSubject} 
                   />
                 </div>
               )}
            </div>
          </div>
        );

      case 'summaries':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-emerald-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">🗂️ Summaries</h2>
              <p className="text-gray-300 mb-8 text-lg">Browse summaries and notes. New ones will appear automatically as you add them in the admin.</p>
              <Summaries />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">💬 Contact Me</h2>
              <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-8 mb-8 border border-green-500/30 animate-fade-in-up delay-200">
                  <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                  <p className="text-gray-300 mb-6 text-lg">Have questions about the course materials or need assistance? Feel free to reach out!</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center animate-fade-in-up delay-300">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mr-4 animate-float">
                          <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-semibold">Email</p>
                          <p className="text-gray-300">bendarnoufel@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-center animate-fade-in-up delay-400">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mr-4 animate-float">
                          <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-semibold">University</p>
                          <p className="text-gray-300">USTHB - University of Science and Technology Houari Boumediene</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center animate-fade-in-up delay-500">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mr-4 animate-float">
                          <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-semibold">Department</p>
                          <p className="text-gray-300">Computer Science L3 LMD</p>
                        </div>
                      </div>
                      <div className="flex items-center animate-fade-in-up delay-600">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mr-4 animate-float">
                          <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-semibold">Portfolio</p>
                          <a 
                            href="https://noufel-bendar.vercel.app/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline transition-colors hover:animate-pulse"
                          >
                            noufel-bendar.vercel.app
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30 animate-fade-in-up delay-700">
                  <h4 className="text-xl font-bold text-white mb-4">About the Platform</h4>
                  <p className="text-gray-300 text-lg">This learning platform is designed specifically for third-year computer science students at USTHB, providing easy access to course materials, video resources, and academic support. Built with love for the CS community! 💻✨</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <CharityPopup />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-green-400/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rotate-12 animate-pulse delay-300"></div>
      </div>
      
      {/* Header Navigation */}
      <header className="relative bg-gray-900/80 backdrop-blur-md shadow-2xl sticky top-0 z-40 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-20 py-4 lg:py-0">
            <div className="flex items-center mb-4 lg:mb-0">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl mr-4 animate-float">
                  <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fade-in-up">
                  USTHB Informatique L3 LMD
                </h1>
              </div>
              {selectedMode && (
                <div className="ml-4 lg:ml-8 flex flex-wrap items-center space-x-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-cyan-400 font-medium">
                    {selectedMode === 'drives' ? '📚 Drives' : 
                     selectedMode === 'videos' ? '🎬 Videos' : 
                     selectedMode === 'exams' ? '📝 Exams' : ''}
                  </span>
                  {selectedSemester && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-pink-400">{selectedSemester.name}</span>
                    </>
                  )}
                  {selectedMajor && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className={`${selectedMode === 'videos' ? 'text-purple-400' : selectedMode === 'exams' ? 'text-red-400' : 'text-blue-400'}`}>
                        {selectedMajor.name}
                      </span>
                    </>
                  )}

                  {selectedSubject && selectedMode === 'exams' && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-orange-400">{selectedSubject.name}</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <nav className="flex flex-wrap justify-center lg:justify-end space-x-2">
              {navigationTabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Reset state when switching to home
                    if (tab.id === 'home') {
                      resetSelections();
                    }
                  }}
                  className={`px-3 lg:px-6 py-2 lg:py-3 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:animate-pulse ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg animate-pulse'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900/80 backdrop-blur-md text-white py-8 lg:py-12 mt-16 border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block p-3 lg:p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4 lg:mb-6 animate-float">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fade-in-up delay-200">
              USTHB Informatique L3 LMD
            </h3>
            <p className="text-gray-400 mb-4 lg:mb-6 text-base lg:text-lg animate-fade-in-up delay-400">University of Science and Technology Houari Boumediene</p>
            <div className="border-t border-gray-700/50 pt-4 lg:pt-6">
              <p className="text-base lg:text-lg text-gray-300 animate-fade-in-up delay-600">Made by <strong className="text-cyan-400">Bendar Noufel</strong></p>
              <p className="text-xs lg:text-sm text-gray-500 mt-2 animate-fade-in-up delay-800">Computer Science L3 LMD Student | Building the future of education</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
