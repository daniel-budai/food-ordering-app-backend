import express, { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { Auth0Id } = req.body; //check if the user exist
    const existingUser = await User.findOne({ Auth0Id });

    if (existingUser) {
      return res.status(400).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ messege: "Internal server error" });
  }
};

export default {
  createCurrentUser,
};
