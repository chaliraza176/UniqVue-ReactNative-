# 📸 UniqVue - AI-Powered Event Photo Sharing App

> A production-ready React Native mobile application for event photo sharing with AI face tagging, subscription-based features, and seamless photo management.

[![React Native](https://img.shields.io/badge/React%20Native-0.84-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple.svg)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

### Core Functionality
- 🎉 **Event Management** - Create, view, and manage events with QR codes
- 📸 **Photo Upload & Gallery** - Upload and browse event photos with ease
- 🤖 **AI Face Tagging** - Automatic face detection and tagging (AWS Rekognition ready)
- 👥 **RSVP System** - Accept or decline event invitations
- 🔐 **Authentication** - Secure JWT-based user authentication
- 💳 **Subscription Plans** - FREE, PREMIUM, and BUSINESS tiers

### Premium Features
- ✨ **Watermark-Free Photos** - Premium users get HD photos without watermarks
- 📊 **Business Analytics** - Advanced analytics dashboard for business users
- 🔗 **Instagram Integration** - Link your Instagram profile
- 🎨 **Theme Customization** - Light, Dark, and Modern themes

### Technical Highlights
- 📱 **React Native 0.84** with TypeScript
- 🔄 **Redux Persist** - Data persistence with AsyncStorage
- 🎨 **Dynamic Theming** - Multiple theme support
- 📦 **Modular Architecture** - Clean, scalable code structure
- 🔒 **Type-Safe** - Full TypeScript implementation

## 🏗️ Tech Stack

### Frontend
- **React Native** 0.84 - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Navigation** - Navigation library
- **React Native Image Picker** - Photo selection

### Backend (Ready for Integration)
- **Node.js + Express** - REST API
- **MongoDB** - Database
- **AWS S3** - Photo storage
- **AWS Rekognition** - AI face detection
- **Stripe** - Payment processing
- **JWT** - Authentication

## 📂 Project Structure

```
UniqVue/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CreateEventScreen.tsx
│   │   ├── EventDetailScreen.tsx
│   │   ├── PhotoGalleryScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API services
│   ├── store/           # Redux store & slices
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── eventSlice.ts
│   │       ├── photoSlice.ts
│   │       ├── subscriptionSlice.ts
│   │       └── themeSlice.ts
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── config/          # App configuration
│   └── types/           # TypeScript types
├── android/             # Android native code
├── ios/                 # iOS native code
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16.x
- **npm** or **yarn**
- **Java JDK** 17 (for Android)
- **Android Studio** (for Android development)
- **React Native CLI**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/UniqVue.git
cd UniqVue
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Install iOS dependencies** (macOS only)
```bash
cd ios && pod install && cd ..
```

4. **Set up environment variables**
Create a `.env` file in the root directory:
```env
API_BASE_URL=http://your-api-url.com
AWS_ACCESS_KEY=your-aws-key
AWS_SECRET_KEY=your-aws-secret
STRIPE_PUBLIC_KEY=your-stripe-key
```

### Running the App

#### Android
```bash
# Start Metro bundler
npm start

# Run on Android device/emulator
npm run android
```

#### iOS (macOS only)
```bash
# Run on iOS simulator
npm run ios
```

### Building for Production

#### Android APK
```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at:
`android/app/build/outputs/apk/release/app-release.apk`

#### Android AAB (for Play Store)
```bash
cd android
./gradlew bundleRelease
```

## 🎯 Key Features Implementation

### 1. Event Management
- Create events with title, description, date, and location
- Generate unique QR codes for each event
- View event details and manage RSVPs
- Auto-expire events based on storage period

### 2. Photo Gallery
- Upload photos to events
- View photos in grid layout
- Filter photos by event
- Watermark for free users
- HD download for premium users

### 3. User Authentication
- JWT-based authentication
- Secure login/register
- Profile management
- Instagram profile linking

### 4. Subscription System
- **FREE**: 1 event/month, watermarked photos
- **PREMIUM**: Unlimited events, HD photos
- **BUSINESS**: All premium features + analytics

### 5. Theme System
- Light theme (default)
- Dark theme (OLED-friendly)
- Modern theme (gradient-based)
- Persistent theme selection

## 📱 Screenshots

_Screenshots will be added soon_

## 🔧 Configuration

### Java Setup (Android)
Ensure `JAVA_HOME` is set to JDK 17:
```bash
# Windows
set JAVA_HOME=D:\jdk17

# macOS/Linux
export JAVA_HOME=/path/to/jdk17
```

### Gradle Properties
Update `android/gradle.properties`:
```properties
org.gradle.java.home=D:\\jdk17
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📦 Dependencies

### Main Dependencies
- `react-native`: ^0.84.0
- `@reduxjs/toolkit`: ^2.0.0
- `react-redux`: ^9.0.0
- `redux-persist`: ^6.0.0
- `@react-navigation/native`: ^6.0.0
- `react-native-image-picker`: ^7.0.0
- `@react-native-async-storage/async-storage`: ^2.0.0

### Dev Dependencies
- `typescript`: ^5.0.0
- `@types/react`: ^18.0.0
- `eslint`: ^8.0.0
- `prettier`: ^3.0.0

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React Native community
- Redux Toolkit team
- All contributors and supporters

## 📞 Support

For support, email support@uniqvue.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Backend API integration
- [ ] AWS S3 photo storage
- [ ] AI face tagging with AWS Rekognition
- [ ] Stripe payment integration
- [ ] Push notifications
- [ ] Social media sharing
- [ ] iOS version
- [ ] Web dashboard

---

Made with ❤️ by [Your Name]
