"use server";
import axios from "axios";
const BANK_URL = process.env.BANK_SERVER;

export async function verifyUser(accountNum: number) {
    console.log('At Server account number is:', accountNum);
    console.log(BANK_URL);
    try {
      const response = await axios.get(`${BANK_URL}/verify-user/${accountNum}`); // if axios gets a 401 then it directly throws an error
      console.log(response.data.message);
      return response.status === 200;
    } catch (error: any) {
      // Optionally check for a 401 and handle it quietly
      if (error.response && error.response.status === 401) {
        console.warn(`Verification failed for account ${accountNum}`);
      } else {
        console.error('Error verifying user:', error);
      }
      return false;
    }
  }