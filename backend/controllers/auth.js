const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json();
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide an e-mail and a password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("User with provided e-mail does not exist");
  }

  const isPasswordCorrect = await user.comparePasswords(password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("The password you entered is incorrect");
  }

  const token = "Bearer ".concat(user.generateJWT());

  const cookieLifetime = 15 * 60 * 1000;

  res
    .cookie("access_token", token, {
      SameSite: "strict",
      Secure: true,
    })
    .status(StatusCodes.OK)
    .json();
};

const logout = async (req, res) => {
  const token = req.cookies?.access_token;
  if (!token) {
    throw new BadRequestError("No credentials provided");
  }

  res.clearCookie("access_token").status(StatusCodes.OK).json();
};

const verifyAccess = async (req, res) => {
  const token = req.cookies?.access_token;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ status: false });
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ status: false });
    }
    return res.status(StatusCodes.OK).json({ status: true });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ status: false });
  }
};

module.exports = { register, login, logout, verifyAccess };
