import mongoose from "mongoose";
import dotenv from "dotenv";
import { IUser, User } from "./Models/User";

dotenv.config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URL!, {
      dbName: "hospitalDB",
    });

    const users = [
        // {
        //     UserId: "P003",
        //     FirstName: "Timi",
        //     LastName: "Gafar",
        //     Email: "mojolaoluwa1212@gmail.com",
        //     PhoneNumber: "07086440726",
        //     RegisteredNumber: "RN003",
        //     role: "user",
        //     isActive: false,
        // },
        {
            UserId: "P011",
            FirstName: "Margret",
            LastName: "Jacob",
            Email: "Jacobmeg970@gmail.com",
            PhoneNumber: "07031047842",
            RegisteredNumber: "RN011",
            role: "user",
            isActive: false,
        },
    ];
    await User.insertMany(users);
    console.log("Users pre‑registered successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedUsers();
