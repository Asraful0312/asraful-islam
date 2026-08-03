import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "Terms of Service | Asraful Islam",
  description: "The terms that govern use of asrafulislam.uk and its marketplace.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LegalPage title="Terms of Service" lastUpdated="August 3, 2026">
        <p>
          These Terms of Service ("Terms") govern your use of asrafulislam.uk,
          including its blog and marketplace of digital source code products
          ("the Site"), operated by Asraful Islam. By using the Site or
          purchasing a product, you agree to these Terms.
        </p>

        <h2>1. About the Site</h2>
        <p>
          The Site is a personal portfolio, blog, and marketplace where I
          sell digital source code products (templates, components, and
          similar assets) for a one-time price. There are no subscriptions.
        </p>

        <h2>2. Accounts &amp; Guest Checkout</h2>
        <p>
          You can browse and purchase products without creating an account —
          checkout only requires a valid email address, which is used to
          deliver your receipt and download link. Creating an account (via
          sign-in) is only needed to comment on or like blog posts.
        </p>

        <h2>3. Products &amp; Pricing</h2>
        <p>
          Prices are listed in US Dollars (USD) and may change at any time
          without notice; the price shown at checkout is the price you pay.
          Each product is described as accurately as possible on its listing
          page, including its price, language/framework, and included files.
        </p>

        <h2>4. Payment</h2>
        <p>
          Payments are processed by{" "}
          <a href="https://creem.io" target="_blank" rel="noopener noreferrer">
            Creem
          </a>
          , a third-party payment processor. By completing a purchase, you
          also agree to Creem's own terms of service. I do not collect or
          store your card details.
        </p>

        <h2>5. Digital Delivery</h2>
        <p>
          All products are delivered digitally — there is no physical
          shipping. After a successful payment, you'll receive:
        </p>
        <ul>
          <li>A permanent download link on the order confirmation page</li>
          <li>An email containing the same download link</li>
          <li>
            Access to look up your order again anytime via the{" "}
            <a href="/orders">Track Order</a> page, using the email you
            purchased with
          </li>
        </ul>
        <p>
          Download links do not expire. If a file becomes unavailable due to
          an error on my end, contact support and I'll make it right.
        </p>

        <h2>6. Refunds</h2>
        <p>
          Because products are downloadable source code delivered instantly,
          all sales are generally final once a product has been downloaded.
          That said, I want you to be satisfied with your purchase:
        </p>
        <ul>
          <li>
            If a product is materially different from its description, does
            not work as described, or you have not yet downloaded it, you may
            request a refund within <strong>7 days</strong> of purchase by
            emailing{" "}
            <a href="mailto:rayhan@asrafulislam.uk">rayhan@asrafulislam.uk</a>{" "}
            with your order details.
          </li>
          <li>
            Refund requests are reviewed on a case-by-case basis and, if
            approved, are issued back to your original payment method via
            Creem.
          </li>
        </ul>

        <h2>7. License to Purchased Code</h2>
        <p>
          When you purchase a product, I grant you a non-exclusive,
          non-transferable license to use, modify, and incorporate the source
          code into your own personal or commercial projects. You may{" "}
          <strong>not</strong>:
        </p>
        <ul>
          <li>Resell, sublicense, or redistribute the source code itself as a standalone product or template</li>
          <li>Claim the original source code as your own original work</li>
          <li>Share your download link publicly or with people who haven't purchased it</li>
        </ul>
        <p>
          You may freely use the code in projects you build for clients or
          for yourself, including commercial use.
        </p>

        <h2>8. Prohibited Use</h2>
        <p>
          You agree not to use the Site to violate any law, upload malicious
          content, attempt to gain unauthorized access to any part of the
          Site, or interfere with its normal operation.
        </p>

        <h2>9. Intellectual Property</h2>
        <p>
          All original content on this Site — including blog posts, project
          write-ups, and site design — is owned by Asraful Islam unless
          otherwise stated. Purchased products are licensed to you under
          Section 7, not sold outright.
        </p>

        <h2>10. User-Submitted Content</h2>
        <p>
          If you post a comment or like a blog post while signed in, you
          grant me a non-exclusive right to display that content on the Site.
          You're responsible for the content you submit.
        </p>

        <h2>11. Third-Party Links</h2>
        <p>
          The Site may link to third-party websites (e.g. GitHub, live demo
          links for products, social profiles). I'm not responsible for the
          content or practices of those sites.
        </p>

        <h2>12. Disclaimer &amp; Limitation of Liability</h2>
        <p>
          Products and content on this Site are provided "as is" without
          warranties of any kind. To the fullest extent permitted by law, I
          am not liable for any indirect, incidental, or consequential
          damages arising from your use of the Site or any purchased product.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Bangladesh, without regard
          to conflict-of-law principles.
        </p>

        <h2>14. Changes to These Terms</h2>
        <p>
          I may update these Terms from time to time. Continued use of the
          Site after changes are posted means you accept the updated Terms.
        </p>

        <h2>15. Contact</h2>
        <p>
          Questions about these Terms? Email{" "}
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
