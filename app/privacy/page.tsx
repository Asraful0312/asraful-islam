import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "Privacy Policy | Asraful Islam",
  description: "How Asraful Islam collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LegalPage title="Privacy Policy" lastUpdated="August 3, 2026">
        <p>
          This Privacy Policy explains how Asraful Islam ("I", "me", "my")
          collects, uses, and protects information when you visit
          asrafulislam.uk, read the blog, or purchase a digital product from
          the marketplace ("the Site").
        </p>

        <h2>1. Who I Am</h2>
        <p>
          I'm Asraful Islam, a full stack developer based in Noakhali,
          Bangladesh. I operate this Site as an individual, not a registered
          company. You can reach me at{" "}
          <a href="mailto:rayhan@asrafulislam.uk">rayhan@asrafulislam.uk</a>{" "}
          for anything related to this policy.
        </p>

        <h2>2. Information I Collect</h2>
        <ul>
          <li>
            <strong>Account information:</strong> if you sign in to comment on
            or like a blog post, I collect the name and email address you
            provide through the authentication system.
          </li>
          <li>
            <strong>Checkout information:</strong> when you buy a product from
            the marketplace, I collect the email address you enter at
            checkout so I can deliver your download link and send a receipt.
            You do not need to create an account to make a purchase.
          </li>
          <li>
            <strong>Payment information:</strong> I never see or store your
            card or bank details. Payments are processed entirely by Creem
            (our payment processor); see Section 5.
          </li>
          <li>
            <strong>Content you submit:</strong> comments, likes, and contact
            form messages you choose to submit.
          </li>
          <li>
            <strong>Technical data:</strong> standard server logs collected by
            my hosting and infrastructure providers (e.g. IP address, browser
            type, pages visited, timestamps) for security and reliability
            purposes.
          </li>
          <li>
            <strong>Local browser storage:</strong> your shopping cart and
            theme preference (light/dark) are stored in your browser's local
            storage, not on my servers.
          </li>
        </ul>

        <h2>3. How I Use Your Information</h2>
        <ul>
          <li>To process your order and deliver the digital product you purchased</li>
          <li>To send transactional emails (receipts, download links, order status)</li>
          <li>To respond to support or contact requests</li>
          <li>To display your name/comments on blog posts, if you choose to comment</li>
          <li>To maintain the security and proper functioning of the Site</li>
        </ul>
        <p>
          I do not sell your personal information to third parties, and I do
          not use your data for advertising or profiling.
        </p>

        <h2>4. Third-Party Service Providers</h2>
        <p>
          I use the following third-party services to run this Site. Each
          provider processes data on my behalf under their own security and
          privacy practices:
        </p>
        <ul>
          <li>
            <strong>Convex</strong> — application database, authentication,
            and backend hosting
          </li>
          <li>
            <strong>Cloudflare R2</strong> — storage and delivery of purchased
            source code files and site images
          </li>
          <li>
            <strong>Creem</strong> — payment processing for marketplace
            purchases
          </li>
          <li>
            <strong>Zoho Mail</strong> — delivery of transactional emails
            (receipts, download links, order lookups)
          </li>
        </ul>

        <h2>5. Payment Processing</h2>
        <p>
          All payments on this Site are processed by{" "}
          <a href="https://creem.io" target="_blank" rel="noopener noreferrer">
            Creem
          </a>
          , a third-party payment processor. Your card details are entered
          directly on Creem's secure checkout page and are never transmitted
          to or stored by me. Creem's own privacy policy governs how they
          handle your payment data.
        </p>

        <h2>6. Cookies &amp; Local Storage</h2>
        <p>
          This Site uses your browser's local storage (not third-party
          tracking cookies) to remember your shopping cart contents and your
          light/dark theme preference. Authentication uses standard session
          cookies to keep you signed in. I do not use advertising or
          cross-site tracking cookies.
        </p>

        <h2>7. Data Retention</h2>
        <p>
          I keep order records (email, product purchased, amount, status)
          for as long as needed for accounting, support, and fraud-prevention
          purposes. You can request deletion of your account data at any
          time (see Section 8) — order records tied to a completed purchase
          may be retained where required for financial record-keeping.
        </p>

        <h2>8. Your Rights</h2>
        <p>
          You can request to access, correct, or delete the personal
          information I hold about you by emailing{" "}
          <a href="mailto:rayhan@asrafulislam.uk">rayhan@asrafulislam.uk</a>.
          I'll respond within a reasonable time.
        </p>

        <h2>9. Children's Privacy</h2>
        <p>
          This Site is not directed at children under 13, and I do not
          knowingly collect personal information from children.
        </p>

        <h2>10. International Data Transfers</h2>
        <p>
          The third-party providers listed in Section 4 operate global
          infrastructure, so your data may be processed on servers located
          outside your country of residence.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          I may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated "Last updated" date.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:rayhan@asrafulislam.uk">rayhan@asrafulislam.uk</a>{" "}
          or{" "}
          <a href="mailto:asrafulislam0312@gmail.com">
            asrafulislam0312@gmail.com
          </a>
          .
        </p>
      </LegalPage>
      <Footer />
    </main>
  );
}
