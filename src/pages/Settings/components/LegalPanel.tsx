export function LegalPanel() {
  return (
    <div className="set-form">
      <header className="set-head">
        <h1>Data &amp; Legal</h1>
        <p>Data exports, compliance, and legal documents.</p>
      </header>

      <section className="set-card set-legal-card" aria-label="Data and legal actions">
        <div className="set-legal-actions">
          <button type="button" className="set-btn set-btn-soft">
            Export Member Data CSV
          </button>
          <button type="button" className="set-btn set-btn-soft">
            Export Beans Ledger
          </button>
          <button type="button" className="set-btn set-btn-soft">
            Download MOU
          </button>
        </div>
        <p className="set-legal-copy">
          PARKNPERKS processes personal data in compliance with the Digital Personal Data
          Protection (DPDP) Act, 2023. Member phone numbers are used solely for loyalty
          programme operations. Data is stored on Indian servers.
        </p>
      </section>
    </div>
  )
}
