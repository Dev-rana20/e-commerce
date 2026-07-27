import React from 'react';

const Policy = () => {
  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="border-b border-brand-gold/15 pb-8 mb-16">
          <span className="text-brand-gold font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-3">
            LEGAL MATTERS
          </span>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal font-light tracking-wide">
            Policies & Terms of Service
          </h1>
        </div>

        {/* Narrative layout */}
        <div className="space-y-12 font-sans-inter text-brand-charcoal/80 text-xs sm:text-sm font-light leading-relaxed">
          
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="font-serif-cormorant text-2xl text-brand-gold tracking-wide font-light">
              1. Shipping & Delivery
            </h2>
            <p>
              Maison KÉLYS offers complimentary standard delivery on all domestic orders within India above ₹2000. For international orders, shipping rates and carrier fees are automatically compiled during checkout based on delivery dimensions and destination weight. All high-extrait bottles require signed shipping validation to guarantee secure hand-finished chain of custody.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="font-serif-cormorant text-2xl text-brand-gold tracking-wide font-light">
              2. Return & Refund Policy
            </h2>
            <p>
              We formulate only rare batches. To maintain chemical purity and shelf integrity, we accept returns on unopened, cellophane-wrapped products in their original packaging within 14 calendar days of shipping receipt.
            </p>
            <p>
              Please note: Every full-sized Extrait order includes a matching 2ml sampler vial in the shipping box. We strongly advise that you apply the sample vial to test the fragrance on your skin before unsealing the plastic wrap of the 50ml or 100ml display box. Unwrapped boxes are ineligible for returns.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="font-serif-cormorant text-2xl text-brand-gold tracking-wide font-light">
              3. Privacy & Data Collection
            </h2>
            <p>
              We care about your privacy. When you browse the KÉLYS digital shop or join our newsletter list, we gather minimal technical telemetry (cookies, session data) and personal variables (emails, addresses, phone logs) purely to process orders and customize fragrance alerts. We never license, distribute, or exchange customer database metrics with external syndicates.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="font-serif-cormorant text-2xl text-brand-gold tracking-wide font-light">
              4. Bespoke Commitments
            </h2>
            <p>
              Bespoke commissions represent collaborative creations between perfumer and client. Once accords are signed and raw material cycles commence, bespoke deposits are completely non-refundable and formulations cannot be altered.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Policy;
