import Link from "next/link";
import "./page.css"

export default function Header() {
  return (
    <>
      <div className="head">
        <Link href="/" id="logo">
          <img src="/logo.svg" alt="Logo" width={314} height={56} />
        </Link>
      </div>
    </>
  );
}