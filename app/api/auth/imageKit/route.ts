import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, urlEndpoint, privateKey },
  },
} = config;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error("Missign required ImageKit configuration values.");
}

const imagejit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  return NextResponse.json(imagejit.getAuthenticationParameters());
}
