# **App Name**: GreenPath

## Core Features:

- User Authentication: Secure user signup and sign-in using Firebase Authentication with email and password, handling multiple users.
- Location Setup: Enable users to select their city and living type (Flat/House/Ground) after signup, storing this data in Firestore linked to their user ID.
- Dashboard: Display key urban heat metrics (temperature, risk, green cover) and personalized recommendations based on living type, using mock data. Includes an animated chart with a linear gradient.
- Heat Analysis Visualization: Show a zone-wise heat risk map using mock data, categorized into high, medium, and low-risk zones.
- AI Sustainability Reports: Generate a personalized sustainability report based on user location and living type using a generative AI tool to tailor specific and useful advice for their location, incorporating expert insight to promote climate activism through an Urban Heat analysis of their location.
- Feedback Collection: Collect user feedback (name, email, message) and save it in Firestore, associating each submission with the user who submitted it.
- Dynamic Recommendation Engine: Tailor the recommendations presented on the Dashboard and AI Reports page depending on information in the Firestore database

## Style Guidelines:

- Light Theme: Linear gradient background using light green shades: #E8F5E9 (lightest) to #A5D6A7 (slightly darker). Dark Theme: Linear gradient from navy blue #1A237E to light blue #B3E5FC.
- Primary color: Medium green (#4CAF50) for a fresh, sustainable feel. This color will work on both the dark and light backgrounds.
- Accent color: A slightly lighter shade of green, (#81C784), to act as a contrasting highlight. This complements the primary green and helps with creating visually distinct interactive elements such as buttons.
- Body and headline font: 'PT Sans', a humanist sans-serif combining a modern look and some warmth.
- Note: currently only Google Fonts are supported.
- Use a tree + leaf logo, with variations in green for light and dark themes; ensure it is simple, attractive, and professional.
- Employ a clean, modern layout with smooth page transitions and subtle animations to enhance user experience. Use consistent spacing and alignment to ensure a professional look.
- Add subtle animations to interactive elements, like button hovers or data loading, to improve user engagement without being distracting.
- The temperature trends chart on the dashboard should include animations for data updates and a linear gradient for visual appeal.