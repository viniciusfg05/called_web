"use client"
import "./page.css"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/search";
import Summary from "@/components/summary";
import Header from "@/components/head/page";

export default function Home() {

  return (
    <div className="containerHome">
      <div className="contenteHome">
        <Header />
        <Search />
        <Summary />
      </div>
    </div>
  );
}

