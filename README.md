# AutoFin

## Description
AutoFin is a personal finance management application designed to help users track their income, expenses, and investments. It provides a comprehensive overview of financial health through an intuitive interface and powerful features.

## Features
- Securely connect bank accounts using Plaid.
- Track transactions and categorize them automatically.
- Set budgets and monitor spending.
- Manage investments and track portfolio performance.
- User authentication and authorization using Clerk.
- Background task processing with Inngest.

## Technologies Used
- Next.js
- React
- Prisma
- PostgreSQL
- Plaid API
- Clerk
- Inngest
- Tailwind CSS
- Shadcn UI

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm (This project uses npm, as indicated by `package-lock.json`)

### Cloning the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git # IMPORTANT: Replace with the actual repository URL
cd YOUR_REPOSITORY # IMPORTANT: Update to your repository name
```

### Installing Dependencies
```bash
npm install
```

### Setting up Environment Variables
Create a `.env.local` file in the root of the project and add the following environment variables. Obtain the values from the respective service dashboards.

```env
# PostgreSQL Database (Adjust if using a different Prisma-supported database)
DATABASE_URL="postgresql://user:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Plaid API
PLAID_CLIENT_ID="your_plaid_client_id"
PLAID_SECRET="your_plaid_secret"
# PLAID_ENV="sandbox" # Ensure this matches your Plaid project settings (e.g., "sandbox", "development")

# Inngest
INNGEST_EVENT_KEY="your_inngest_event_key" # Or INNGEST_SIGNING_KEY, check Inngest documentation/setup
# INNGEST_SIGNING_KEY="your_inngest_signing_key"

# Email (Resend)
RESEND_API_KEY="your_resend_api_key"

# AI (Google Gemini)
GEMINI_API_KEY="your_gemini_api_key"

# Arcjet (Security)
ARCJET_KEY="your_arcjet_key"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000" # Update if your local dev port is different or for deployed environments
```
*Note: The exact names for Plaid environment variables (`PLAID_SECRET`, `PLAID_CLIENT_ID`) and Inngest (`INNGEST_EVENT_KEY` or `INNGEST_SIGNING_KEY`) should be confirmed from their respective SDK integrations or project configurations if issues arise.*

### Running Database Migrations
This project uses Prisma. To set up your database schema, run:
```bash
npx prisma migrate dev
```
*This command will apply existing migrations and create the database if it doesn't exist. If you are making schema changes, you will use `npx prisma migrate dev --name your-migration-name` to create new migrations.*
*The `postinstall` script in `package.json` runs `prisma generate` to generate the Prisma Client, which is also crucial.*

You can also use Prisma Studio to view and manage your data during development:
```bash
npx prisma studio
```

### Starting the Development Server
```bash
npm run dev
```
The application should now be running on [http://localhost:3000](http://localhost:3000) (or the port specified by `--turbopack` if configured differently).

## Usage
*[Optional: Add a brief guide on how to use the application after it's running.]*

## Contributing
*[Optional: Add guidelines for contributing to the project, e.g., coding standards, pull request process.]*

## License
*[Optional: Specify the license for the project, e.g., MIT License.]*
