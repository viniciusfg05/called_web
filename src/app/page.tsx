"use client"  
import "./page.css"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/getCalleds");
  }, [router]);

  return null;
}

