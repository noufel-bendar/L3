import React from 'react';

const LessonDrives = ({ specialization, year, semester, subject }) => {
  // Google Drive links for Drives flow (Year → Semester → Courses)
  const driveLinks = {
    '2021/2022': {
      s5: {
        'isil_b': 'https://drive.google.com/drive/folders/19E3UTHa5JKc76IrjcCdMUR99MPEDFduq',
        'isil_a': 'https://drive.google.com/drive/folders/1jdOPlwaQ5jxUZ4NXJv8OLAuajb12NnNy',
        'acad_a': 'https://drive.google.com/drive/folders/1DRxbFQExfKqHGxXeIqsnJ-kMjqXZlJJD',
        'acad_c': 'https://drive.google.com/drive/folders/1g9PZMLbk_F-PYiYfNyAMJhyOhoRcotC4'
      },
      s6: {
        'isil_b': 'https://drive.google.com/drive/folders/19h6DYl-Q_TprrWEBOx0j9XWmhOodmwmi',
        'isil_a': 'https://drive.google.com/drive/folders/1PtUPmXNOH0TbrZlY-GL6n61vswwXDL7-',
        'acad_c': 'https://drive.google.com/drive/folders/1ELvsGQPzZPXBbezUW86uug0HQ5hSPGNB'
      }
    },
    '2022/2023': {
      s5: {
        'isil_b': 'https://drive.google.com/drive/folders/1fH5ZBlv96QyJeRw0czTIB5gswQ5oFexd',
        'isil_a': 'https://drive.google.com/drive/folders/1VBHs69Mf2Hm9RwiUhPCr0cKoAf8KF_bq',
        'acad_c': 'https://drive.google.com/drive/folders/1jRLsYlc-m8P3JjmFqxfS7X5UCstytLth',
        'acad_b': 'https://drive.google.com/drive/folders/1BGDxUidWkErbyb6jhCGrs73AgbNpvWIQ',
        'acad_a': 'https://drive.google.com/drive/folders/1RgQEEb2FlweRhmAOfyH5eiZ_yK7-c2VI'
      },
      s6: {
        'isil_b': 'https://drive.google.com/drive/folders/1aMizeKw54M2SXW_djQBI_sa7laE4Wm7V',
        'isil_a': 'https://drive.google.com/drive/folders/1JcoibMvex-5Y4WXltl0zxIrQNcmLcNUz',
        'acad_c': 'https://drive.google.com/drive/folders/13cSKvyvZLB2E7anqXimyRJxA8oNDA6_v',
        'acad_b': 'https://drive.google.com/drive/folders/1Bm9nk7-GzK_aFpk4fbzp-q3bWJWVPzUH',
        'acad_a': 'https://drive.google.com/drive/folders/12J6HPnqySKj8bW45uIdANPKKfnyJ0hnE'
      }
    },
    '2023/2024': {
      s5: {
        'isil_b': 'https://drive.google.com/drive/folders/1N69-KxGG1xhvK5bRGEyO12EWh-E1RXTd',
        'isil_a': 'https://drive.google.com/drive/folders/1TWbmp_wjwx6PIy2DTgI5uLUu755BJ0dj',
        'acad_c': 'https://drive.google.com/drive/folders/1RL2jJcStgQ_pFrYJG90elGVU7S7Ow1gX',
        'acad_b': 'https://drive.google.com/drive/folders/1-9sNRynfcUO31LJU_nGNg-V7C0rV9Tdd',
        'acad_a': 'https://drive.google.com/drive/folders/1ITieJY22_M-OL-bEGPVVbGXaiMkBJKo2'
      },
      s6: {
        'isil_b': 'https://drive.google.com/drive/folders/1N6LsIUqDGtyrYFKphr-NsJVdAip0g0oX',
        'isil_a': 'https://drive.google.com/drive/folders/1nXWjTRWoM8bBQ3I-K1TuNm2fuoK2ccIR',
        'acad_c': 'https://drive.google.com/drive/folders/1fpT9LIn5RK5V-85iM49YFAZ9uHJUL8mN',
        'acad_b': 'https://drive.google.com/drive/folders/1s8ZhVPD8nBbmhqFIHQSWRW7hP-jdlmhY',
        'acad_a': 'https://drive.google.com/drive/folders/1HyK6DQY9nGxqNty0FK8-WZDhW39S5jpF'
      }
    },
    '2024/2025': {
      s5: {
        'isil_a': 'https://drive.google.com/drive/u/1/folders/1KsHn0KO2j1sbUJRSWs72UQJcB5STuzfh',
        'isil_b': 'https://drive.google.com/drive/u/1/folders/1UUHbui1E3qWvfME6UunRw80gS8WhGO2z',
        'acad_a': 'https://drive.google.com/drive/u/1/folders/1RoMzavo7NTkU8SIVVpwRAjhcHvbLiDSw',
        'acad_b': 'https://drive.google.com/drive/u/1/folders/1m7ygZ3f91IAPDun3CLkQq55sJbopIlhl',
        'acad_c': 'https://drive.google.com/drive/u/1/folders/1FJ4ix7P9ujr2IajcCtid9PGiBtHhl6l1'
      },
      s6: {
        'isil_a': 'https://drive.google.com/drive/u/1/folders/1K5JK3W6HQjBNEQTx4Hwd5fTPsVbaBPN7',
        'isil_b': 'https://drive.google.com/drive/u/1/folders/1MB_VIIMEGx43a38uqrPNj8x__issuhuS'
      }
    }
  };

  // Exam links for both specializations
  const examLinks = {
    isil: [
      { 
        name: 'Génie Logiciel 2', 
        url: 'https://drive.google.com/drive/folders/1jIsqQ0BkFxTPmuwkMdz4jHWKFmv-4CGP',
        color: 'from-blue-500 to-indigo-500'
      },
      { 
        name: 'Système d\'Exploitation 2', 
        url: 'https://drive.google.com/drive/folders/1Meq9p2v08Vc-vljtDHbp8XzpoIq7CEL1',
        color: 'from-green-500 to-emerald-500'
      },
      { 
        name: 'Base de Données 2', 
        url: 'https://drive.google.com/drive/folders/1okK0QiXtTTHmdGeFDTcfUxI4AZ5qNq6_',
        color: 'from-purple-500 to-pink-500'
      },
      { 
        name: 'Système d\'Informatique 2', 
        url: 'https://drive.google.com/drive/folders/1qxTYiMMlvOcVrUOl2zWVuMHxHulS-0qQ',
        color: 'from-orange-500 to-red-500'
      },
      { 
        name: 'Réseaux 1', 
        url: 'https://drive.google.com/drive/folders/1yoq6V6W0FvktJ4RgjO_3uhRdJEwJwvg0',
        color: 'from-cyan-500 to-blue-500'
      },
      { 
        name: 'Compilation', 
        url: 'https://drive.google.com/drive/folders/1Lx-yQvpCv7T9b-8XJflRGxG7tS3cKLd2',
        color: 'from-indigo-500 to-purple-500'
      }
    ],
    acad: [
      { 
        name: 'Théorie de Graphe', 
        url: 'https://drive.google.com/drive/folders/1bk1WqjIljIUKrYqpIo7kctetD6ixNjXq',
        color: 'from-emerald-500 to-teal-500'
      },
      { 
        name: 'Système d\'Exploitation 2', 
        url: 'https://drive.google.com/drive/folders/1Meq9p2v08Vc-vljtDHbp8XzpoIq7CEL1',
        color: 'from-green-500 to-emerald-500'
      },
      { 
        name: 'Réseaux', 
        url: 'https://drive.google.com/drive/folders/1yoq6V6W0FvktJ4RgjO_3uhRdJEwJwvg0',
        color: 'from-cyan-500 to-blue-500'
      },
      { 
        name: 'Génie Logiciel', 
        url: 'https://drive.google.com/drive/folders/1F69Eif1Hyp5ubziUBCWm_O_TzVIkGWV_',
        color: 'from-blue-500 to-indigo-500'
      },
      { 
        name: 'Compilation', 
        url: 'https://drive.google.com/drive/folders/1Lx-yQvpCv7T9b-8XJflRGxG7tS3cKLd2',
        color: 'from-indigo-500 to-purple-500'
      }
    ]
  };

  // Course lists for Videos flow (Specialization → Semester → Courses)
  const courseData = {
    isil: {
      s5: [
        { 
          id: 1, 
          name: 'Compilation', 
          videoPlaylists: [
            { title: 'Compilation Playlist 1', url: 'https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn' },
            { title: 'Compilation Playlist 2', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5' }
          ]
        },
        { 
          id: 2, 
          name: 'Réseaux', 
          videoPlaylists: [
            { title: 'Réseaux Playlist 1', url: 'https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi' },
            { title: 'Réseaux Playlist 2', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn' },
            { title: 'Réseaux Playlist 3', url: 'https://youtube.com/playlist?list=PLSENmhglzJjR10lPQk8HOXYADlHqivX9e&si=KrMiCX2otNd19nJl' }
          ]
        },
        { 
          id: 3, 
          name: 'Génie Logiciel 2', 
          videoPlaylists: [
            { title: 'Génie Logiciel 2 Playlist', url: 'https://youtube.com/playlist?list=PLbpBG2OLEPIt6kFEr8fOEbY0uJZoIU8MH&si=gt_EpBvg97CAsUhj' }
          ]
        },
        { 
          id: 4, 
          name: 'Système d\'Exploitation 2', 
          videoPlaylists: [
            { title: 'Système d\'Exploitation 2 Playlist 1', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw' },
            { title: 'Système d\'Exploitation 2 Playlist 2', url: 'https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc' }
          ]
        },
        { 
          id: 5, 
          name: 'Base de Données 2', 
          videoPlaylists: [
            { title: 'Base de Données 2 Playlist', url: 'https://youtube.com/playlist?list=PLbpBG2OLEPIskDw1qPO-G8ZUyyAOiYYTm&si=2CerZpqmnP4plJh9' }
          ]
        },
        { 
          id: 6, 
          name: 'Système d\'Informatique 2', 
          videoPlaylists: [
            { title: 'Système d\'Informatique 2 Playlist 1', url: 'https://youtube.com/playlist?list=PLbpBG2OLEPIvK46CtzzjmmreYAHFeas99&si=hOilJfNf6s5nrD4u' },
            { title: 'Système d\'Informatique 2 Playlist 2', url: 'https://youtube.com/playlist?list=PLx9305BZWH0QuEQcG-5qzpBGFfC0r_QmR&si=hL1a4t3l7LJKBbBS' }
          ]
        }
      ],
      s6: [
        { id: 1, name: 'ORAD' },
        { 
          id: 2, 
          name: 'Réseaux 2', 
          videoPlaylists: [
            { title: 'Réseaux 2 Playlist', url: 'https://youtube.com/playlist?list=PLbpBG2OLEPIteBeqC80ZVch3TJVdiOrev&si=HwUrsAoYNrkZXrG7' }
          ]
        },
        { id: 3, name: 'PFE' },
        { 
          id: 4, 
          name: 'Génie Logiciel 3', 
          videoPlaylists: [
            { title: 'Génie Logiciel 3 Playlist', url: 'https://youtube.com/playlist?list=PLbpBG2OLEPIt4WzPPVYGbGe8zRaxXnUao&si=eaafZGDc5z0FhY34' }
          ]
        }
      ]
    },
    acad: {
      s5: [
        { 
          id: 1, 
          name: 'Théorie des Graphes', 
          videoPlaylists: [
            { title: 'Théorie des Graphes Playlist 1', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzFWmq9d0ETF4IDkJWm_1umE&si=kWedENK4Q33M6uzs' },
            { title: 'Théorie des Graphes Playlist 2', url: 'https://youtube.com/playlist?list=PLbpBG2OLEPIsiJFlOYOsNGbeNuP8IS8-o&si=IdqithvB0Q2qulB9' },
            { title: 'Théorie des Graphes Playlist 3', url: 'https://youtube.com/playlist?list=PLx9305BZWH0Qws8o7z9vkK9EtLUJM_OHJ&si=k2LZViSAyyyQ1qyI' }
          ]
        },
        { 
          id: 2, 
          name: 'Système d\'Exploitation 2', 
          videoPlaylists: [
            { title: 'Système d\'Exploitation 2 Playlist 1', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw' },
            { title: 'Système d\'Exploitation 2 Playlist 2', url: 'https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc' }
          ]
        },
        { 
          id: 3, 
          name: 'Réseaux', 
          videoPlaylists: [
            { title: 'Réseaux Playlist 1', url: 'https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi' },
            { title: 'Réseaux Playlist 2', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn' },
            { title: 'Réseaux Playlist 3', url: 'https://youtube.com/playlist?list=PLSENmhglzJjR10lPQk8HOXYADlHqivX9e&si=KrMiCX2otNd19nJl' }
          ]
        },
        { 
          id: 4, 
          name: 'Génie Logiciel', 
          videoPlaylists: [
            { title: 'Génie Logiciel Playlist 1', url: 'https://youtube.com/playlist?list=PLSENmhglzJjRo7ziNTHkAq9YTezFxtYob&si=Kn41fref4nmf-1y1' },
            { title: 'Génie Logiciel Playlist 2', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzFgIsYqB7wXQxrqcWyylFxc&si=vKcgnkSm6-3kGp2o' },
            { title: 'Génie Logiciel Playlist 3', url: 'https://youtube.com/playlist?list=PLbpBG2OLEPItQz1M8XymauMPF7q2zf2AZ&si=aCHTNU4gqTmU1_E3' }
          ]
        },
        { 
          id: 5, 
          name: 'Compilation', 
          videoPlaylists: [
            { title: 'Compilation Playlist 1', url: 'https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn' },
            { title: 'Compilation Playlist 2', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5' }
          ]
        },
        { 
          id: 6, 
          name: 'Anglais 3', 
          videoPlaylists: [
            { title: 'Anglais 3 Playlist', url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzHf9_j0j5Y9oUiyYcScd8VC&si=sER3yR3XHzB6zc2z' }
          ]
        }
      ],
      s6: [
        { 
          id: 1, 
          name: 'Programmation Web', 
          videoPlaylists: [
            { title: 'Programmation Web Playlist 1', url: 'https://youtube.com/playlist?list=PLbpBG2OLEPIu59JDvKzkJGtBAdZNdZ5mu&si=noi48A9WWXDTKNdF' },
            { title: 'Programmation Web Playlist 2', url: 'https://youtube.com/playlist?list=PLSENmhglzJjTk1cfzvCsWrxKng1GTkOxn&si=IcaL2OJgXDfkHfFb' }
          ]
        },
        { id: 2, name: 'Doc STR' },
        { id: 3, name: 'PFP' },
        { id: 4, name: 'Admin' }
      ]
    }
  };

  // Determine if this is Drives flow, Videos flow, or Exams flow
  const isDrivesFlow = year && semester && !specialization;
  const isVideosFlow = specialization && semester && !subject;
  const isExamsFlow = specialization && subject;

  if (isDrivesFlow) {
    // Drives flow: Display Google Drive links for each specialization
    const yearData = driveLinks[year];
    const semesterData = yearData?.[semester.id];
    
    if (!semesterData) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400 text-xl">No drive links available for {year} - {semester.name}</p>
        </div>
      );
    }

    const specializations = [
      { id: 'isil_a', name: 'ISIL A', color: 'from-cyan-500 to-blue-500' },
      { id: 'isil_b', name: 'ISIL B', color: 'from-blue-500 to-indigo-500' },
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
                  Course Materials - {year} - {semester.fullName}
                </h3>
                <p className="text-blue-200 text-lg">
                  Access course materials for all specializations
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Select your specialization to access the corresponding Google Drive folder containing all course materials for {year} - {semester.fullName}.
            </p>
          </div>
        </div>
        
        {/* Specializations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializations.map((spec) => {
            const driveLink = semesterData[spec.id];
            if (!driveLink) return null;
            
            return (
              <div key={spec.id} className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="relative">
                  {/* Specialization Header */}
                  <div className="flex items-center mb-4">
                    <div className={`p-3 bg-gradient-to-r ${spec.color} rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                        {spec.name}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Drive Link */}
                  <a
                    href={driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
                  >
                    <svg className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Access Google Drive</span>
                    <svg className="w-4 h-4 ml-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (isVideosFlow) {
    // Videos flow: Display course list with video playlists
    const courses = courseData[specialization?.id]?.[semester?.id] || [];

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
                {course.videoPlaylists && course.videoPlaylists.length > 0 && (
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
                )}
              </div>
            </div>
          ))}
        </div>


      </div>
    );
  }

  if (isExamsFlow) {
    // Exams flow: Display exam materials for the selected subject
    const examSubject = examLinks[specialization?.id]?.find(exam => 
      exam.name.toLowerCase().includes(subject.name.toLowerCase()) ||
      subject.name.toLowerCase().includes(exam.name.toLowerCase())
    );

    if (!examSubject) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400 text-xl">No exam materials available for {subject.name}</p>
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
                <h3 className="text-2xl font-bold text-white">
                  Exam Materials - {subject.name}
                </h3>
                <p className="text-yellow-200 text-lg">
                  Access exam materials and past papers for {subject.name}
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Find exam materials, past papers, and study resources for {subject.name} in {specialization?.name} specialization.
            </p>
          </div>
        </div>
        
        {/* Exam Materials Card */}
        <div className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center mb-6">
            <div className={`p-3 bg-gradient-to-r ${examSubject.color} rounded-xl mr-4`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">{examSubject.name}</h3>
              <p className="text-gray-300">Exam materials and study resources</p>
            </div>
          </div>
          
          {/* Exam Link */}
          <a
            href={examSubject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center p-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Access Exam Materials
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return null;
};

export default LessonDrives;
