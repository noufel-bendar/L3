# USTHB Informatique L3 LMD

A comprehensive learning platform for third-year computer science students at USTHB (University of Science and Technology Houari Boumediene).

## 🚀 Features

- **Course Materials**: Access organized course materials by year and semester
- **Video Content**: Watch curated video content by specialization and semester
- **Summaries**: Quick access to course summaries and notes
- **Discord Community**: Join the student Discord server
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Icons**: Custom SVG icons

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd l3site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Choose "Upload" and drag your project folder
4. Vercel will automatically build and deploy

## ⚙️ Configuration

The project includes a `vercel.json` configuration file that:
- Sets the build command to `npm run build`
- Configures the output directory to `dist`
- Sets up SPA routing with fallback to `index.html`
- Optimizes caching for static assets

## 📱 PWA Features

The application includes Progressive Web App features:
- Web manifest for app-like experience
- Custom favicon and icons
- Theme color configuration
- Responsive design

## 🎨 Customization

### Colors
The application uses a computer science-themed color palette:
- Primary: Cyan to Blue gradient (`#06b6d4` to `#3b82f6`)
- Secondary: Purple to Pink gradient
- Accent: Emerald to Teal gradient

### Favicon
The custom favicon features:
- Computer monitor with code lines
- USTHB branding
- Gradient background matching the theme

## 📄 License

This project is created for educational purposes at USTHB.

## 👨‍💻 Author

**Bendar Noufel**
- Email: bendarnoufel@gmail.com
- Portfolio: [https://noufel-bendar.vercel.app/](https://noufel-bendar.vercel.app/)
- Discord: [https://discord.gg/Ef5eeQQpnk](https://discord.gg/Ef5eeQQpnk)

## 🤝 Contributing

This is a learning platform for USTHB students. For suggestions or improvements, please contact the author.

---

Made with ❤️ for the USTHB Computer Science community
