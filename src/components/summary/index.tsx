'use client';
import Link from "next/link";
import "./summary.css";

interface MetricGroup {
  uf: string;
  predial: number;
  ar: number;
  corretiva: number;
  resolved: {
    ar: number;
    predial: number;
    corrOrcaEnv: number;
  };
  open: {
    ar: number;
    predial: number;
    corrOrcaEnv: number;
  };
}

// const placeholderData: MetricGroup[] = [
//   {
//     uf: "DF",
//     predial: 60,
//     ar: 60,
//     corretiva: 50,
//     resolved: { ar: 50, predial: 50, corrOrcaEnv: 50 },
//     open: { ar: 50, predial: 50, corrOrcaEnv: 50 },
//   },
//   {
//     uf: "DF",
//     predial: 60,
//     ar: 60,
//     corretiva: 50,
//     resolved: { ar: 50, predial: 50, corrOrcaEnv: 50 },
//     open: { ar: 50, predial: 50, corrOrcaEnv: 50 },
//   },
//   {
//     uf: "DF",
//     predial: 60,
//     ar: 60,
//     corretiva: 50,
//     resolved: { ar: 50, predial: 50, corrOrcaEnv: 50 },
//     open: { ar: 50, predial: 50, corrOrcaEnv: 50 },
//   },
// ];

export default function Summary() {
  return (
    <div className="summaryContainer">
      <div className="summaryColumn">
        <Link href="/getCalleds/new" className="summaryCard summaryMain">
          <p>Novos Chamados</p>
        </Link>
        <Link href="/getCalleds/GO" className="summaryCard summaryMain">
          <p>Chamados GO</p>
        </Link>
        <Link href="/getCalleds/DF" className="summaryCard summaryMain">
          <p>Chamados DF</p>
        </Link>
        <Link href="/getCalleds" className="summaryCard summaryMain">
          <p>Todos chamados</p>
        </Link>
      </div>
    </div>
  );
} 