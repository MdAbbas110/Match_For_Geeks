# Match For Geeks

Welcome to **Match For Geeks**, a modern and responsive social networking platform tailored for tech enthusiasts and professionals. This project serves as a comprehensive demonstration of a robust authentication flow, protected routes, and a sleek, dynamic user interface—all built with modern web technologies.

## Features

- **Dynamic Landing & Marketing Page:**  
  A captivating landing page to engage new users and provide a quick overview of the platform's benefits.

- **Secure Authentication:**  
  Clean login and signup flows with added guest access for recruiters, ensuring an effortless onboarding process.

- **Protected Routes:**  
  Seamless navigation using protected routes that restrict access to authenticated users only.

- **User-Centric Dashboard:**  
  Includes dedicated pages for Feed, Profile, Connections, Requests, and Messaging where authenticated users can interact and manage their network.

- **Responsive Design:**  
  Designed with Tailwind CSS and DaisyUI, the site is fully responsive and optimized for both desktop and mobile viewing.

- **Modern UI/UX:**  
  Intuitive navigation with a centralized NavBar that adapts based on authentication status, providing clear access to key sections of the application.

## Tech Stack

- **React**  
  For building dynamic and responsive UI components.

- **React Router DOM**  
  Managing client-side routing with clear separation between public and protected routes.

- **Redux & Context API**  
  State management across the application to handle user authentication and global state.

- **Tailwind CSS & DaisyUI**  
  For rapid and scalable styling, ensuring consistency and modern design aesthetics.

- **Axios & React Query**  
  For efficient API communication and built-in caching, respectively.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/match-for-geeks.git
   cd match-for-geeks
   ```

yarn install

# or

npm install

match-for-geeks/
├── public/
├── src/
│ ├── components/
│ │ ├── auth/
│ │ │ ├── LandingPage.tsx
│ │ │ ├── AuthPage.tsx
│ │ │ ├── Login.tsx
│ │ │ └── Signup.tsx
│ │ ├── Body.tsx
│ │ ├── Feed.tsx
│ │ ├── Profile.tsx
│ │ ├── Connections.tsx
│ │ ├── RequestReceived.tsx
│ │ ├── Messages.tsx
│ │ └── NavBar.tsx
│ ├── context/
│ │ └── AuthContext.tsx
│ ├── redux/
│ │ ├── store.ts
│ │ └── userSlice.ts
│ ├── lib/
│ │ └── axios.ts
│ └── App.tsx
├── .env
├── package.json
└── README.md
