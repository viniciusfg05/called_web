"use client"
import "./page.css"
import Search from "@/components/search";
import Summary from "@/components/summary";
import Header from "@/components/head/page";
import { Suspense } from "react";

export default function Home() {

  return (
    <div className="containerHome">
      <div className="contenteHome">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Search />
          <Summary />
        </Suspense>

      </div>
    </div>
  );
}

