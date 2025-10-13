# 🚛 itl - Turkmen Logistics Excellence

<div align="center">

![itl Logo](https://img.shields.io/badge/itl-Logistics%20Excellence-264D88?style=for-the-badge&logo=truck&logoColor=white)

**Connecting businesses worldwide with reliable, efficient, and secure logistics solutions**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Website-264D88?style=for-the-badge&logo=globe&logoColor=white)](#live-demo)
[![Get Started](https://img.shields.io/badge/Get%20Started-Setup%20Guide-264D88?style=for-the-badge&logo=rocket&logoColor=white)](#quick-start)

</div>

---

## 🌟 Overview

**itl** is a modern, responsive logistics website built with cutting-edge web technologies. It provides a comprehensive platform for logistics services including freight forwarding, warehousing, customs clearance, and multi-modal transportation solutions.

### ✨ Key Features

- 🌍 **Multi-language Support** - English, Russian, Turkmen, and Turkish
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🎨 **Modern UI/UX** - Beautiful animations and interactive elements
- 🔐 **User Authentication** - Secure login and registration system
- 📊 **Dashboard** - User management and service tracking
- 🎯 **Smart Navigation** - Dynamic navbar with background color detection
- 🚀 **Performance Optimized** - Fast loading with Vite and modern React

---

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Vite 7.1.7** - Lightning-fast build tool

### Routing & State

- **React Router DOM 7.9.3** - Client-side routing
- **React Context API** - State management for authentication

### Internationalization

- **i18next 25.5.3** - Internationalization framework
- **react-i18next 16.0.0** - React integration for i18n
- **i18next-browser-languagedetector 8.2.0** - Automatic language detection

### Icons & UI

- **Lucide React 0.544.0** - Beautiful, customizable icons

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/turkmen-logistics.git
   cd turkmen-logistics
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## 📁 Project Structure

```
turkmen-logistics/
├── 📁 public/
│   ├── 📁 images/          # Static images and assets
│   ├── 📁 videos/          # Video backgrounds and media
│   └── vite.svg           # Vite logo
├── 📁 src/
│   ├── 📁 components/      # Reusable React components
│   │   ├── Navbar.tsx     # Smart navigation with dynamic styling
│   │   └── ProtectedRoute.tsx # Authentication guard
│   ├── 📁 contexts/        # React Context providers
│   │   └── AuthContext.tsx # Authentication state management
│   ├── 📁 i18n/           # Internationalization
│   │   ├── index.ts       # i18n configuration
│   │   └── 📁 locales/    # Translation files
│   │       ├── en.json    # English translations
│   │       ├── ru.json    # Russian translations
│   │       ├── tm.json    # Turkmen translations
│   │       └── tr.json    # Turkish translations
│   ├── 📁 pages/          # Page components
│   │   ├── LandingPage.tsx    # Hero and main landing
│   │   ├── AboutPage.tsx      # Company information
│   │   ├── ServicesPage.tsx   # Service offerings
│   │   ├── ContactPage.tsx    # Contact information
│   │   ├── QuotePage.tsx      # Quote request form
│   │   ├── LoginPage.tsx      # User authentication
│   │   ├── RegisterPage.tsx   # User registration
│   │   └── DashboardPage.tsx  # User dashboard
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

---

## 🎨 Design Features

### 🧭 Smart Navigation

- **Dynamic Background Detection** - Automatically adjusts text color based on background
- **Scroll-based Transformation** - Full-width at top, floating when scrolled
- **Smooth Animations** - 500ms transitions for all interactions
- **Multi-language Support** - Language switcher with flag indicators

### 🎬 Hero Section

- **Video Background** - Engaging video with gradient fallback
- **Responsive Design** - Optimized for all screen sizes
- **Call-to-Action** - Prominent quote request buttons

### 🌐 Internationalization

- **4 Languages** - English, Russian, Turkmen, Turkish
- **Auto-detection** - Browser language detection
- **Persistent Selection** - Remembers user's language choice
- **Complete Translation** - All UI elements translated

### 🔐 Authentication System

- **Secure Login/Register** - User authentication with context
- **Protected Routes** - Dashboard access control
- **User Dashboard** - Personalized user experience

---

## 🌍 Supported Languages

| Language | Code | Flag | Status      |
| -------- | ---- | ---- | ----------- |
| English  | `en` | 🇺🇸   | ✅ Complete |
| Russian  | `ru` | 🇷🇺   | ✅ Complete |
| Turkmen  | `tm` | 🇹🇲   | ✅ Complete |
| Turkish  | `tr` | 🇹🇷   | ✅ Complete |

---

## 🎯 Services Offered

### 🚛 Freight Forwarding

- International shipping solutions
- Customs clearance assistance
- Documentation handling

### 📦 Warehousing

- Secure storage facilities
- Inventory management
- Distribution services

### 🛣️ Road Transportation

- Domestic and international trucking
- Express delivery services
- Specialized cargo handling

### 🚢 Ocean Freight

- Container shipping
- Bulk cargo transportation
- Port-to-port services

### 🏛️ Customs Clearance

- Import/export documentation
- Duty and tax calculation
- Regulatory compliance

---

## 🎨 Color Scheme

The website uses a professional color palette centered around the main brand color:

- **Primary Blue**: `#264D88` - Main brand color
- **Secondary Blue**: `#1e3a8a` - Accent color
- **White**: `#FFFFFF` - Background and text
- **Gray**: Various shades for text and borders

---

## 📱 Responsive Design

The website is fully responsive and optimized for:

- 📱 **Mobile** (320px - 768px)
- 📱 **Tablet** (768px - 1024px)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1440px+)

---

## 🚀 Performance Features

- ⚡ **Vite Build Tool** - Lightning-fast development and builds
- 🎯 **Code Splitting** - Optimized bundle sizes
- 🖼️ **Image Optimization** - Responsive images and lazy loading
- 🎨 **CSS Optimization** - Tailwind CSS purging for minimal bundle size
- 📦 **Tree Shaking** - Unused code elimination

---

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Alternative with yarn
yarn dev
yarn build
yarn preview
yarn lint
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Add translations for new text
- Test on multiple devices
- Follow ESLint rules

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- **Website**: [itl.com](https://itl.com)
- **Email**: info@itl.com
- **Phone**: +1 (555) 123-4567
- **Support**: 24/7 Available

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite Team** - For the lightning-fast build tool
- **Lucide** - For the beautiful icon set
- **i18next** - For internationalization support

---

<div align="center">

**Built with ❤️ for global logistics excellence**

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>
