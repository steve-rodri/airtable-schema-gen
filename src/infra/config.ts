import * as dotenv from "dotenv"

dotenv.config()

export const API_KEY = process.env.AIRTABLE_API_KEY!
export const BASE_ID = process.env.AIRTABLE_BASE_ID!
export const BASE_NAME = process.env.AIRTABLE_BASE_NAME
