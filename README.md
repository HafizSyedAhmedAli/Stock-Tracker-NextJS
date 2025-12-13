# ![Signalist Logo](public/assets/icons/logo.svg) Stock-Tracker-NextJS

A modern, full-stack stock market tracking application built with Next.js 16, TypeScript, and Tailwind CSS. This project provides real-time stock data visualization, user authentication, personalized watchlists, and comprehensive market insights.

Live Demo: [https://stock-tracker-next-js.vercel.app/](https://stock-tracker-next-js.vercel.app/)

---

## 🚀 Features

- **Real-time Stock Data**: Integrated with Finnhub API for live market data and TradingView widgets
- **User Authentication**: Secure sign-in/sign-up with Better Auth
- **Watchlist Management**: Add, remove, and track favorite stocks with MongoDB storage
- **Responsive UI**: Modern interface with shadcn/ui components
- **Background Processing**: Inngest for handling asynchronous tasks and email notifications
- **Type-Safe Development**: Full TypeScript implementation with ESLint configuration

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions, MongoDB with Mongoose
- **Authentication**: Better Auth
- **APIs**: Finnhub API
- **Tools**: Inngest, Nodemailer, CodeRabbit

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- MongoDB (local or cloud instance)
- Finnhub API key

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/HafizSyedAhmedAli/Stock-Tracker-NextJS.git
cd Stock-Tracker-NextJS
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/stocktracker
# or your MongoDB Atlas connection string

# Finnhub API
FINNHUB_API_KEY=your_finnhub_api_key_here

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Email (optional, for notifications)
EMAIL_FROM=your_email@example.com
EMAIL_PASSWORD=your_email_password

# Inngest (optional)
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
stockmarket/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── forms/            # Form components
├── database/             # Database configuration
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   ├── actions/          # Server actions
│   ├── better-auth/      # Authentication config
│   └── inngest/          # Background job functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🔑 API Keys Setup

### Finnhub API
1. Sign up at [Finnhub](https://finnhub.io/)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file

### Better Auth
Generate a secure secret for Better Auth:
```bash
openssl rand -base64 32
```

### Other Platforms
This app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- Self-hosted with Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Finnhub](https://finnhub.io/) - Stock market data API
- [TradingView](https://www.tradingview.com/) - Chart widgets
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Better Auth](https://better-auth.com/) - Authentication library

---

Built with ❤️ by [HafizSyedAhmedAli](https://github.com/HafizSyedAhmedAli)
