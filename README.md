<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Ben-Long50/pawprint-frontend.git">
    <img src="public/paw.svg" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Pawprint</h1>

  <p align="center">
    A fullstack Instagram-like social media website
    <br />
    <a href="https://github.com/Ben-Long50/pawprint-frontend.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://pawprint-social.com/">View Demo</a>
    ·
    <a href="https://github.com/Ben-Long50/pawprint-frontend/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Ben-Long50/pawprint-frontend/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<a href="https://pawprint-social.com">
  <img style="border-radius: 1rem" src="public/pawprint-screenshots.png" alt="Profile Screen Shot" >
</a>

<p style="margin-top: 1rem" align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<a href="https://reactjs.org">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="40" alt="React">
</a>

<a href="https://vitejs.dev">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" height="40" alt="Vite" />
</a>

<a href="https://react-query.tanstack.com">
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" height="40" alt="React Query" />
</a>

<a href="https://reactrouter.com">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" height="40" alt="React Router" />
</a>

<a href="https://tailwindcss.com">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" height="40" alt="Tailwind CSS" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->

### Features

- Multiple session based authentication methods implemented with passport.js including local login, google OAuth login, and Facebook login
- Multi-profile management under one account. Seamlessly switch between independent profiles without the need to logout and log back in
- Full profile customization including profile picture
- One click app access with guest account creation. Guest accounts allow for a fully featured app experience and are permenantly deleted on logout or after 4 hours, along with all content created on them
- Personal feed customization through profile following
- Explore page, showcasing posts from profiles which are not currently being followed
- Like, comment on and share posts with friends. A robust notification system ensures your app activity won't go unnoticed
- Fully responsive design which looks great on any screensize, mobile and desktop
- Light and dark theme support
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To access the live version of this project and explore all of it's features, use the official website link below. Otherwise, continue with the following instructions to run the project locally

<a href="https://pawprint-social.com">
  <strong>Pawprint »</strong>
</a>

### Prerequisites

1. You will first need to clone the backend API repo and run it. Please take a look at the instructions regarding the backend API in the following link:

   <a href="https://github.com/Ben-Long50/pawprint-backend.git"><strong>Pawprint API repo »</strong></a>

### Installation

1. **Clone the repository**  
   Run the following command to clone the repository:
   ```sh
   git clone https://github.com/Ben-Long50/pawprint-frontend.git
   ```
2. **Navigate to the project directory and install dependencies**  
   Move into the project directory and install the required npm packages:
   ```sh
   cd pawprint-frontend
   npm install
   ```
3. **Set up environment variables**  
   Create a .env file in the project’s base directory and add the following environment variable:
   ```js
   VITE_API_URL = 'http://localhost:3000';
   ```
4. **Avoid accidental pushes to the original repository**  
   If you plan to make changes, update the Git remote to point to your own fork to prevent accidental pushes to the base repository:

   ```sh
   git remote set-url origin https://github.com/<your_github_username>/pawprint-frontend.git
   ```

   Confirm the change:

   ```sh
   git remote -v
   ```

   You should see:

   ```sh
   origin  https://github.com/<your_github_username>/pawprint-frontend.git (fetch)
   origin  https://github.com/<your_github_username>/pawprint-frontend.git (push)
   ```

5. **Start the development server**  
   Run the following command to start the app:
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ben Long - [LinkedIn](https://www.linkedin.com/in/ben-long-4ba566129/)

Email - benjlong50@gmail.com

Project Link - [https://github.com/Ben-Long50/pawprint-frontend](https://github.com/Ben-Long50/pawprint-frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
