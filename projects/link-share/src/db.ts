import { encodeBase64 } from "jsr:@std/encoding";
import { crypto } from "jsr:@std/crypto";

export async function generateShortCode(longUrl: string) {
  try {
    new URL(longUrl);
  } catch (error) {
    console.error(error);
    throw new Error("Invalid URL provided");
  }

  const encodedUrl = new TextEncoder().encode(longUrl + Date.now());
  const hash = await (crypto.subtle.digest("SHA-256", encodedUrl));

  // take the first 8 of the hash for the short URL
  return encodeBase64(hash.slice(0, 8));
}
