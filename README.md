IslamicHub

IslamicHub is a modern Islamic digital platform built with Next.js. It allows users to read the Holy Quran, listen to recitation, explore Hadith collections, check daily prayer times, view the Islamic calendar, and save important Quran Ayahs and Hadiths.

Live Website

Visit [IslamicHub](https://islamic-hub-beige.vercel.app/)

Project Overview

IslamicHub is designed as an all-in-one Islamic web application where users can access important Islamic resources in a clean, responsive, and user-friendly interface.

The platform includes Quran reading, audio recitation, translations, bookmarks, Hadith search, prayer timing tools, and Hijri calendar features.

Features
Quran Reader
Browse all 114 Surahs
Read Arabic Quran text
View English translation
View Urdu translation
Switch between English, Urdu, Both, and Arabic-only modes
Listen to Ayah-by-Ayah audio recitation
Audio fallback support for better reliability
Copy any Ayah
Bookmark/save favorite Ayahs
Separate Bookmarks page for saved Quran Ayahs
Proper Arabic and Urdu font styling
Bismillah separation for better reading experience
Hadith Library
Browse multiple Hadith collections
Search Hadith by keyword or number
View Arabic text
View English translation
View Urdu translation where available
Switch between English, Urdu, Both, and Arabic-only modes
Copy Hadith text
Save/bookmark Hadith
View saved Hadiths
Open individual Hadith detail pages with shareable URLs
Prayer Times
Search prayer times by city and country
View Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha timings
Select calculation method
View current prayer status
View next prayer
View remaining time for the next prayer
View timezone and Hijri date
Islamic Calendar
View today’s Hijri date
View monthly Islamic calendar
Display Gregorian and Hijri dates together
Navigate between previous and next months
Highlight current day
Show Islamic holidays where available
General Features
Fully responsive design
Modern dark Islamic theme
Arabic, English, and Urdu support
LocalStorage-based bookmarks
Clean and reusable component structure
Built with Next.js App Router
Deployed on Vercel
Tech Stack
Next.js
React
TypeScript
Tailwind CSS
Next Font
LocalStorage
Vercel Deployment
APIs Used
Quran

Quran data, translations, and audio recitation are fetched from Quran API sources.

Hadith

Hadith collections are fetched from public Hadith API data sources.

Prayer Times & Islamic Calendar

Prayer timings and Hijri calendar data are fetched from Islamic calendar and prayer time APIs.

Pages
/
Home page

/quran
Quran Surah list

/quran/[surah]
Surah detail page with Ayahs, translations, audio, copy, and bookmark features

/bookmarks
Saved Quran Ayahs

/hadith
Hadith library with search, filters, save, and copy features

/hadith/[book]/[number]
Hadith detail page

/prayer-times
Daily prayer timings with current and next prayer status

/islamic-calendar
Hijri calendar and monthly Islamic calendar
Folder Structure
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── quran/
│   │   ├── page.tsx
│   │   └── [surah]/
│   │       └── page.tsx
│   ├── bookmarks/
│   │   └── page.tsx
│   ├── hadith/
│   │   ├── page.tsx
│   │   └── [book]/
│   │       └── [number]/
│   │           └── page.tsx
│   ├── prayer-times/
│   │   └── page.tsx
│   └── islamic-calendar/
│       └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SurahCard.tsx
│   ├── QuranSearch.tsx
│   ├── SurahReader.tsx
│   ├── AyahAudioPlayer.tsx
│   ├── BookmarkList.tsx
│   ├── HadithClient.tsx
│   ├── HadithDetailActions.tsx
│   ├── PrayerTimesClient.tsx
│   └── IslamicCalendarClient.tsx
│
└── lib/
    ├── quran.ts
    ├── hadith.ts
    ├── prayer.ts
    └── islamicCalendar.ts
Getting Started

Clone the project:

git clone your-repository-url
cd islamic-hub

Install dependencies:

npm install

Run the development server:

npm run dev

Open the project in your browser:

http://localhost:3000
Build for Production
npm run build

Start production server:

npm start
Deployment

The project is deployed on Vercel.

Live URL:

https://islamic-hub-beige.vercel.app/
Future Improvements
User authentication
Cloud-based bookmarks
Daily Ayah section
Daily Hadith section
Duas section
Qibla direction
Tasbeeh counter
Admin dashboard
More Quran reciters
More translation options
Mobile app version
Push notifications for prayer times
Disclaimer

This project is created for Islamic learning and accessibility purposes. Prayer timings may vary depending on local mosque, region, and calculation method. Users should verify religious timings and references from trusted local Islamic authorities where needed.

Author

Developed by Omni Fusions.