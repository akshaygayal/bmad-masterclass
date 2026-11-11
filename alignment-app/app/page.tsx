import { connection } from "next/server";
import styles from "./page.module.css";

// S1 Start. Rendered per request so the CSP nonce from proxy.ts is applied
// (a static page cannot carry a per-request nonce).
export default async function StartPage() {
  await connection();

  return (
    <main className={styles.main}>
      <section className={styles.card} aria-labelledby="start-title">
        <h1 id="start-title" className={styles.title}>
          Requirements Interpretation Alignment
        </h1>
        <p className={styles.lead}>
          Product, Development and QA each answer questions about a user story
          independently. Answers stay private until the facilitator reveals each
          question.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} disabled aria-describedby="start-unavailable">
            Create alignment session
          </button>
          <button type="button" className={styles.secondary} disabled aria-describedby="start-unavailable">
            Open demo
          </button>
        </div>
        <p id="start-unavailable" className={styles.note}>
          Not available yet: creating sessions and the demo are still being built.
        </p>
      </section>
    </main>
  );
}
