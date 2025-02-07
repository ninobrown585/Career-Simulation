const { prisma } = require("./common");

const createNewUser = async (email, password) => {
  const response = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  return response;
};

const getUser = async (email) => {
  const response = prisma.user.findFirstOrThrow({
    where: {
      email,
    },
  });
  return response;
};

const getCustomer = async (id) => {
  const response = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });
  return response;
};
module.exports = { createNewUser, getCustomer, getUser };