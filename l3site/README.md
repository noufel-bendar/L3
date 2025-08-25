# USTHB L3 Learning Platform Frontend

A modern React-based frontend for the USTHB L3 Learning Platform, fully integrated with the Django backend API.

## 🚀 Features

- **Full Backend Integration**: All data is fetched from the Django backend API
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Real-time Data**: Dynamic content loading from the backend
- **Error Handling**: Comprehensive error handling and loading states
- **Mobile Responsive**: Optimized for all device sizes

## 🔗 Backend Integration

The frontend is fully dependent on the backend API hosted at `https://l3-dkrz.onrender.com`. All data including:

- Course materials and drive links
- Video playlists and courses
- Exam resources
- Summaries
- Site settings

is fetched from the backend API endpoints.

### API Endpoints Used

- `/api/drive-links/` - Course drive links by year/semester/specialization
- `/api/courses/` - Course information with video playlists
- `/api/exam-resources/` - Exam materials by specialization
- `/api/summaries/` - Study summaries and notes
- `/api/site-settings/` - Site configuration

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API**: Fetch API with error handling
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   ```bash
   # Create .env file
   VITE_API_BASE=https://l3-dkrz.onrender.com/api
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── LessonDrives.jsx      # Main content component
│   ├── Summaries.jsx         # Summaries display
│   ├── YouTubeRecommendations.jsx # Video recommendations
│   └── CharityPopup.jsx      # Charity reminder popup
├── api.js                    # API configuration and utilities
├── App.jsx                   # Main application component
└── main.jsx                  # Application entry point
```

## 🔧 Configuration

### API Base URL

The frontend automatically connects to the backend at `https://l3-dkrz.onrender.com/api`. You can override this by setting the `VITE_API_BASE` environment variable.

### Error Handling

The application includes comprehensive error handling:
- Network connectivity issues
- API endpoint failures
- Data loading errors
- User-friendly error messages with retry options

## 🚀 Deployment

The frontend is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push to main branch

## 📱 Features

### Home Page
- Resource selection (Drives, Videos, Exams, Summaries)
- Specialization and semester selection
- Dynamic content based on backend data

### Course Materials
- Google Drive links organized by year/semester/specialization
- Real-time data from backend
- Responsive grid layout

### Video Content
- Course-based video playlists
- YouTube integration
- Specialization-specific content

### Exam Resources
- Exam materials by subject and specialization
- Backend-driven content
- Easy access to study resources

### Summaries
- Study summaries and notes
- Dynamic loading from backend
- Clean, organized display

## 🔄 Data Flow

1. **Initial Load**: App fetches academic years and exam resources
2. **User Selection**: Based on user choices, specific API calls are made
3. **Content Display**: Data is rendered with loading and error states
4. **Real-time Updates**: Content updates automatically when backend data changes

## 🛡️ Error Handling

- **Loading States**: Spinner animations during data fetching
- **Error States**: User-friendly error messages with retry buttons
- **Fallback Content**: Graceful degradation when data is unavailable
- **Network Issues**: Automatic retry mechanisms

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds and glassmorphism effects
- **Smooth Animations**: CSS transitions and hover effects
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Dark Theme**: Optimized for dark mode viewing

## 🔗 Backend Dependencies

The frontend requires the following backend models and endpoints:

- `CourseDriveLink` - Drive links for course materials
- `Course` - Course information with video playlists
- `VideoPlaylist` - YouTube playlists for courses
- `ExamResource` - Exam materials by specialization
- `SummaryResource` - Study summaries
- `SiteSettings` - Site configuration

## 📄 License

This project is part of the USTHB L3 Learning Platform.

## 👨‍💻 Developer

Built by **Bendar Noufel** - Computer Science L3 LMD Student at USTHB.

---

*This frontend is fully integrated with the Django backend and provides a seamless learning experience for USTHB L3 students.*
