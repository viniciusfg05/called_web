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

const placeholderData: MetricGroup[] = [
  {
    uf: "DF",
    predial: 60,
    ar: 60,
    corretiva: 50,
    resolved: { ar: 50, predial: 50, corrOrcaEnv: 50 },
    open: { ar: 50, predial: 50, corrOrcaEnv: 50 },
  },
  {
    uf: "DF",
    predial: 60,
    ar: 60,
    corretiva: 50,
    resolved: { ar: 50, predial: 50, corrOrcaEnv: 50 },
    open: { ar: 50, predial: 50, corrOrcaEnv: 50 },
  },
  {
    uf: "DF",
    predial: 60,
    ar: 60,
    corretiva: 50,
    resolved: { ar: 50, predial: 50, corrOrcaEnv: 50 },
    open: { ar: 50, predial: 50, corrOrcaEnv: 50 },
  },
];

export default function Summary() {
  return (
    <div className="summaryContainer">
      {placeholderData.map((group, idx) => (
        <div key={idx} className="summaryColumn">
          <div className="summaryCard summaryMain">
            <h2>{group.uf}</h2>
            <p>PREDIAL: {group.predial}</p>
            <p>AR: {group.ar}</p>
            <p>CORRETIVA: {group.corretiva}</p>
          </div>

          <div className="summaryCard summaryResolved">
            <h3>Resolvidos</h3>
            <p>AR {group.resolved.ar}</p>
            <p>PREDIAL {group.resolved.predial}</p>
            <p>CORR. ORÇA. ENV. {group.resolved.corrOrcaEnv}</p>
          </div>

          <div className="summaryCard summaryOpen">
            <h3>Aberto</h3>
            <p>AR {group.open.ar}</p>
            <p>PREDIAL {group.open.predial}</p>
            <p>CORR. ORÇA. ENV. {group.open.corrOrcaEnv}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 