"use server";

import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function connectToDB() {
  const uri = process.env["MONGODB_URI"];
  if (!uri) throw new Error("MONGODB_URI not defined");

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  const db = client.db("WhoWasIt");
  return db;
}
