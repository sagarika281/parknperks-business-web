import { formatInr, type Customer } from '../constants/customers'

type CustomerDetailProps = {
  customer: Customer
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <section className="cust-detail" aria-label={customer.name}>
      <header className="cust-head">
        <div className="cust-identity">
          <span className={`cust-avatar is-${customer.tone}`}>{customer.initial}</span>
          <div>
            <h2>{customer.name}</h2>
            <div className="cust-badges">
              <span className="is-tier">{customer.tier}</span>
              {customer.vip ? <span className="is-vip">VIP</span> : null}
            </div>
          </div>
        </div>
        <div className="cust-actions">
          <button type="button">Create Offer</button>
          <button type="button">Add to Campaign</button>
          <button type="button" className="is-send">
            Send Message
          </button>
        </div>
      </header>

      <div className="cust-metrics">
        <article>
          <p>Beans balance</p>
          <strong>{customer.beans}</strong>
        </article>
        <article>
          <p>Lifetime value</p>
          <strong>{formatInr(customer.lifetimeValue)}</strong>
        </article>
        <article>
          <p>Total visits</p>
          <strong>{customer.visits}</strong>
        </article>
        <article>
          <p>Avg order</p>
          <strong>{formatInr(customer.avgOrder)}</strong>
        </article>
      </div>

      <section className="cust-contact">
        <h3>Identity &amp; contact</h3>
        <dl>
          <div>
            <dt>Phone</dt>
            <dd>{customer.phone}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{customer.email}</dd>
          </div>
          <div>
            <dt>Member ID</dt>
            <dd>{customer.memberId}</dd>
          </div>
        </dl>
      </section>

      <section className="cust-visits">
        <h3>Visit history</h3>
        <dl>
          <div>
            <dt>Last visit</dt>
            <dd>{customer.lastVisit}</dd>
          </div>
          <div>
            <dt>Frequency</dt>
            <dd>{customer.frequency}</dd>
          </div>
        </dl>
      </section>

      <section>
        <h3>Campaign engagement</h3>
        <p>{`Last 3 campaigns: opened ${customer.campaignsOpened}, redeemed ${customer.campaignsRedeemed}`}</p>
      </section>

      <section>
        <h3>Rewards &amp; redemptions</h3>
        <p>
          {customer.beans} Beans available · Redemption threshold: 100 Beans
        </p>
      </section>

      <section className="cust-feedback">
        <h3>Feedback &amp; NPS</h3>
        <div className="cust-nps">
          <span className="cust-nps-score">{customer.nps}</span>
          <p>
            NPS score · <strong>{customer.npsLabel}</strong>
          </p>
        </div>
      </section>

      <div className="cust-foot">
        <button type="button">Adjust Membership</button>
        <button type="button">Assign Follow-up</button>
        <button type="button">View Full History</button>
      </div>
    </section>
  )
}
