# Y22ACS415
# URL Shortener Web Application
📝 Overview
A React-based URL shortener application that allows users to:

** Create shortened URLs with optional custom codes**

** Set expiration times (default: 30 minutes)

** Track click statistics

** Activate/deactivate shortened URLs

** View detailed analytics

✨ Features
URL Shortening:

Convert long URLs to short, memorable links

Custom short code option

Configurable expiration time

Link Management:

Toggle links between active/inactive states

Automatic expiration handling

Local storage persistence

Analytics:

Click tracking with timestamps

Visual status indicators

Detailed statistics view

User Experience:

Clean, responsive Material UI design

Client-side routing

Helpful error messages

🛠️ Technology Stack
Frontend:

React (Vite)

Material UI

React Router

State Management:

React Hooks (useState, useEffect)

LocalStorage for persistence

Build Tools:

Vite

npm

📂 Project Structure
text
src/
├── components/
│   ├── UrlForm.jsx        # URL input form
│   ├── UrlList.jsx        # List of shortened URLs
│   ├── UrlStats.jsx       # Statistics display
│   └── Navbar.jsx         # Navigation header
├── pages/
│   ├── ShortenerPage.jsx  # Main shortening page
│   └── StatsPage.jsx      # Statistics page
├── utils/
│   ├── logger.js          # Custom logging
│   └── validation.js      # Validation helpers
├── App.jsx                # Main app component
└── main.jsx               # Entry point
🔄 Workflow
1. URL Shortening Flow
User enters:

Long URL (required)

Optional custom short code

Optional validity period (default: 30 mins)

System:

Validates inputs

Generates short code (if none provided)

Creates new URL record with:

Original URL

Short code

Expiration timestamp

Active status (default: true)

UI displays:

New shortened URL

Expiration time

Status indicator

2. Redirection Flow
User visits shortened URL (e.g., http://localhost:3000/abc123)

System checks:

If URL exists

If URL is active

If URL is not expired

If valid:

Records click with timestamp

Redirects to original URL

If invalid:

Shows appropriate error message

Does not redirect

3. Management Flow
User can:

View all shortened URLs

See status (active/inactive/expired)

Toggle active status

View click statistics

System:

Persists all changes to localStorage

Updates UI in real-time

🚀 Getting Started
Prerequisites
Node.js (v16+ recommended)

npm (v8+ recommended)

Installation
Clone the repository:

bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Open in browser:

text
http://localhost:3000
Building for Production
bash
npm run build
npm run preview
📊 Data Structure
javascript
{
  originalUrl: "https://example.com/very/long/url",
  shortCode: "abc123",
  createdAt: "2023-07-20T12:00:00Z",
  expiresAt: "2023-07-20T12:30:00Z",
  active: true,
  clicks: [
    {
      timestamp: "2023-07-20T12:05:00Z",
      // Additional analytics data could be added here
    }
  ]
}
🌟 Key Components
UrlForm.jsx
Handles URL input and validation

Manages form state

Generates random short codes

UrlList.jsx
Displays all shortened URLs

Shows status indicators

Provides activation/deactivation controls

ShortenerPage.jsx
Main page component

Handles URL redirection logic

Manages localStorage operations

StatsPage.jsx
Displays detailed statistics

Shows click history

Visualizes URL performance

🛡️ Error Handling
The application handles various error cases:

Invalid URL formats

Short code conflicts

Expired URLs

Inactive URLs

Missing URLs

Users receive clear, friendly error messages in each case.

📱 Responsive Design
The UI adapts to different screen sizes:

Desktop: Multi-column layouts

Tablet: Optimized spacing

Mobile: Stacked elements for small screens

📜 License
MIT License
