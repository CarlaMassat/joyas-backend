import { Request, Response } from "express";
import User from "../models/User";
import Token from "../models/Token";

import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { password, email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("Email ya registrado");
      return res.status(409).json({ error: error.message });
    }

    const user = new User(req.body);

    user.password = await hashPassword(password);

    const token = new Token();
    token.token = generateToken();
    token.user = user.id;

    AuthEmail.sendConfirmationEmail({
      email: user.email,
      name: user.name_lastname,
      token: token.token,
    });

    await Promise.allSettled([user.save(), token.save()]);

    res.send("Cuenta creada, verifica tu e-mail");
  } catch (error) {
    res.status(500).json({ error: "La cuenta no pudo ser creada" });
  }
};

export const confirmAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = req.body;

    const tokenExists = await Token.findOne({ token });

    if (!tokenExists) {
      const error = new Error("Token no válido");
      res.status(404).json({ error: error.message });
    }

    const user = await User.findById(tokenExists.user);
    user.confirmed = true;

    await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
    res.send("La cuenta está lista");
  } catch (error) {
    res.status(500).json({ error: "La cuenta no pudo ser creada" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error(
        "No pudimos encontrar una cuenta con esa dirección de correo electrónico"
      );
      return res.status(404).json({ error: error.message });
    }

    if (!user.confirmed) {
      const token = new Token();
      token.user = user.id;
      token.token = generateToken();

      await token.save();

      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name_lastname,
        token: token.token,
      });

      const error = new Error(
        "La cuenta no ha sido confirmada, verifica tu dirección de correo electrónico "
      );
      return res.status(401).json({ error: error.message });
    }

    const isPasswordCorrect = await checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Password incorrecto ");
      return res.status(401).json({ error: error.message });
    }

    const token = generateJWT({ id: user._id });
    return res.send(token);
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error" });
  }
};

export const requestConfirmationCode = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ error: error.message });
    }

    if (user.confirmed) {
      const error = new Error("El usuario ya esta confirmado");
      return res.status(403).json({ error: error.message });
    }

    const token = new Token();
    token.token = generateToken();
    token.user = user.id;

    AuthEmail.sendConfirmationEmail({
      email: user.email,
      name: user.name_lastname,
      token: token.token,
    });

    await Promise.allSettled([user.save(), token.save()]);

    res.send("Se envió un nuevo token");
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ error: error.message });
    }

    const token = new Token();
    token.token = generateToken();
    token.user = user.id;
    await token.save();

    AuthEmail.sendPasswordResetToken({
      email: user.email,
      name: user.name_lastname,
      token: token.token,
    });

    res.send("Revisa tu email para instrucciones");
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = req.body;

    const tokenExists = await Token.findOne({ token });

    if (!tokenExists) {
      const error = new Error("Token no válido");
      res.status(404).json({ error: error.message });
    }

    res.send("Token válido, define nueva password");
  } catch (error) {
    res.status(500).json({ error: "La cuenta no pudo ser creada" });
  }
};

export const updatePasswordWithToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const tokenExists = await Token.findOne({ token });
    if (!tokenExists) {
      const error = new Error("Token no válido");
      res.status(404).json({ error: error.message });
    }

    const user = await User.findById(tokenExists.user);
    user.password = await hashPassword(password);

    await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

    res.send("El password se modificó correctamente");
  } catch (error) {
    res.status(500).json({ error: "La cuenta no pudo ser creada" });
  }
};

export const user = async (req: Request, res: Response): Promise<any> => {
  return res.json(req.user);
};
