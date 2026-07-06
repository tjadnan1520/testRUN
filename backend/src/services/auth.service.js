import prisma from "../config/prisma.js";

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createGoogleUser = async (profile) => {
  return await prisma.user.create({
    data: {
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      provider: "GOOGLE",
    },
  });
};

export const findOrCreateGoogleUser = async (profile) => {
  let user = await findUserByEmail(profile.emails[0].value);

  if (!user) {
    user = await createGoogleUser(profile);
  }

  return user;
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};