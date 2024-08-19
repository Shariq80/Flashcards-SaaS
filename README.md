
# Studybug Flashcards

Welcome to Studybug Flashcards, the easiest way to create flashcards from your text. This application is designed to help users efficiently create, manage, and study flashcards with a user-friendly interface and powerful features.


## Features

- **AI Flashcards**: Automatically generate flashcards from your text using the Google Gemini API.
- **Authentication**: Secure user authentication and management using Clerk.
- **Payment Integration**: Subscription-based pricing plans powered by Stripe.
- **Material UI**: Beautiful and responsive UI components.
- **Cross-device Sync**: Sync flashcards across multiple devices.
- **Offline Access**: Access your flashcards even without an internet connection (Premium Plan).

## Tech Stack

- **Next.js**: A React framework for building fast and scalable web applications.
- **Google Gemini API**: To generate flashcards from text.
- **Clerk**: Handles authentication, user profiles, and access control.
- **Stripe**: For payment processing and subscription management.
- **Material UI**: UI components and styling for a responsive design.
- **Vercel**: For deployment and hosting.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or above)
- npm or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/studybug-flashcards.git
   cd studybug-flashcards
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add the following:

   ```bash
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
   CLERK_API_KEY=<your-clerk-api-key>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   NEXT_PUBLIC_GEMINI_API_KEY=<your-google-gemini-api-key>
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Deployment

The app is ready to be deployed on Vercel. Follow these steps:

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy the project.

## Features Overview

### AI-Generated Flashcards

Leverage the Google Gemini API to transform any text into flashcards. Simply input the text, and the app will generate flashcards with questions and answers based on the content.

### Authentication

Clerk handles all authentication processes, including sign-ups, logins, and user profile management. This ensures that only authenticated users can access and create flashcards.

### Payment and Subscription

Stripe integration enables users to subscribe to different pricing plans (Basic, Standard, Premium). Users can manage their subscriptions and upgrade/downgrade as needed.

### Responsive Design

Material UI provides a clean and responsive design, making the app usable across all devices, including mobile and desktop.

## Pricing Plans

- **Basic Plan**: $10/month - Create up to 1,000 flashcards, basic templates, and progress tracking.
- **Standard Plan**: $20/month - Create up to 5,000 flashcards, advanced templates, and PDF exports.
- **Premium Plan**: $30/month - Unlimited flashcards, custom themes, and offline access.

## Contributing

We welcome contributions from the community! Please fork the repository and submit a pull request with your improvements.

### Issues

If you find any bugs or have feature requests, please open an issue on GitHub.

## Contact

For any inquiries or support, please reach out to [shariq6694@gmail.com](mailto:shariq6694@gmail.com).
