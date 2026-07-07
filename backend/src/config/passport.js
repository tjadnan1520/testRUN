import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma.js";

const callbackURL =
  process.env.GOOGLE_CALLBACK_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/auth/google/callback`
    : "http://localhost:5000/api/auth/google/callback");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const avatar = profile.photos?.[0]?.value || null;

        if (!email) {
          return done(
            new Error("Google profile did not include an email address.")
          );
        }

        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName || email.split("@")[0],
              email,
              avatar,
              provider: "GOOGLE",
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;