import Image from "next/image";
import Logo from "../../public/logo.svg";
import "./page.css"

import Header from "./head/page";
import Search from "./search/page";
import Called from "./called/page";
import { fetchCalleds } from "./router/fetchCalleds";
import { useEffect, useState } from "react";

interface CalledProps {
  id: string;
  uid: string;
  called: string
  description: string
  branch: string
  dataOpen: string
  created_at: Date
  priority: string
  emergency: string
  scope: string
  status: string
  descriptionSummary: string
  uf: string
}

export default function Home() {


  return (
    <div className="containerHome">
      <Header />

      <Search />

      <Called />
    </div>
  );
}
