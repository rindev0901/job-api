import { db } from '@/drizzle/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import 'dotenv/config';

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [openAPI()],
  basePath: `/api/v${process.env.API_VERSIONING}/auth`,
});

export { auth };
