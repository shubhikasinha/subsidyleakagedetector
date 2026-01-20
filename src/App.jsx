import "./App.css";

export default function App() {
  return (
    <div className="page">

      <div className="topbar">
        Government of India · Advisory Decision Support System
      </div>

      <header className="header">
        <h1>Smart Subsidy Leakage Detector</h1>
        <p>AI-powered, privacy-first risk intelligence for subsidy governance</p>
      </header>

      <section className="hero">
        <h2>
          AI-powered intelligence to detect subsidy leakage — without blocking benefits
        </h2>
        <p>
          An explainable AI system assisting government officers in identifying
          abnormal subsidy behavior across welfare schemes.
        </p>

        <div className="buttons">
          <button className="primary">View Risk Dashboard</button>
          <button className="secondary">How It Works</button>
        </div>
      </section>

      <main className="content">
        <Card title="Why Subsidy Leakage Still Occurs">
          Aadhaar verifies identity and PFMS logs transactions, yet leakage emerges
          over time due to behavioral patterns and siloed audits.
        </Card>

        <Card title="Ground Reality">
          <ul>
            <li>Multiple overlapping welfare schemes</li>
            <li>Valid identities with abnormal behavior</li>
            <li>Seasonal and regional variations</li>
            <li>No labeled fraud data</li>
          </ul>
        </Card>

        <Card title="Solution Overview">
          <ul>
            <li>Advisory intelligence layer over DBT / PFMS</li>
            <li>No subsidy blocking or denial</li>
            <li>Human-in-the-loop governance</li>
          </ul>
        </Card>

        <Card title="Impact">
          <ul>
            <li>Reduced leakage</li>
            <li>Faster audits</li>
            <li>Improved transparency</li>
          </ul>
        </Card>
      </main>

      <footer className="footer">
        ⚠ This system is advisory-only. It does not approve, deny, or block subsidies.
      </footer>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
