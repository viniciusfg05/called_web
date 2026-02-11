'use client'
import { useState, useMemo, FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./page.css";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get("search") ?? "";
  const [value, setValue] = useState<string>(initialValue);

  const currentParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams(currentParams.toString());

    const trimmed = value.trim();
    if (trimmed.length === 0) {
      params.delete("search");
    } else {
      params.set("search", trimmed);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <form className="search" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Procurar chamado, filial ou descrição"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit"><MagnifyingGlass size={32} color="white" className="searchIcon" /></button>
      </form>
    </>
  );
}