import { CheckCircle2, Lock, Info, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/bcc82dd5ec037b46eabec6b9db7b414080262f3e.png';

interface OffersProps {
  abbAmount: number;
  onApplyNow: () => void;
  onUnlockGST: () => void;
  onUnlockITR: () => void;
  onBack: () => void;
}

export function Offers({ abbAmount, onApplyNow, onUnlockGST, onUnlockITR, onBack }: OffersProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <img src={logo} alt="eFunds" className="h-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="space-y-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Title Section */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
              New Business Loan Application
            </p>
            <h1 className="text-3xl font-semibold text-foreground">
              Your Loan Offers
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your financial profile, here are the loan options available to you
            </p>
          </div>

          {/* Three Column Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {/* Column 1: Active ABB Offer */}
            <div className="relative bg-white rounded-lg border-2 border-green-500 shadow-lg overflow-hidden">
              {/* Success Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Unlocked
              </div>

              {/* Card Content */}
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    Pre-Approved Offer
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Based on Average Bank Balance
                  </p>
                </div>

                {/* Amount */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground">
                    ₹{abbAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="text-sm font-semibold text-foreground">14% p.a.</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Tenure</span>
                    <span className="text-sm font-semibold text-foreground">24 Months</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Processing Fee</span>
                    <span className="text-sm font-semibold text-foreground">2%</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Monthly EMI</span>
                    <span className="text-sm font-semibold text-foreground">
                      ₹{Math.round((abbAmount * 0.048) / 12).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={onApplyNow}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                >
                  Apply Now
                </button>

                {/* Features */}
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Instant approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Minimal documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Disbursal in 24 hours</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Locked GST Offer */}
            <div className="relative bg-white rounded-lg border-2 border-border shadow-sm overflow-hidden">
              {/* Locked Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted text-foreground px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Locked
              </div>

              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center space-y-4 px-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Unlock Higher Limits
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Link your GST returns to access up to ₹20,00,000
                    </p>
                  </div>
                  <button
                    onClick={onUnlockGST}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                  >
                    Link GST to Unlock
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Info className="w-4 h-4" />
                    <span>Based on your turnover</span>
                  </div>
                </div>
              </div>

              {/* Card Content (Blurred Background) */}
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    Higher Limit Offer
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Based on GST Turnover
                  </p>
                </div>

                {/* Amount */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground">
                    Up to ₹20,00,000
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="text-sm font-semibold text-foreground">12% p.a.</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Tenure</span>
                    <span className="text-sm font-semibold text-foreground">36 Months</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Processing Fee</span>
                    <span className="text-sm font-semibold text-foreground">1.5%</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Monthly EMI</span>
                    <span className="text-sm font-semibold text-foreground">₹66,420</span>
                  </div>
                </div>

                {/* Placeholder Button */}
                <div className="w-full px-6 py-3 bg-muted text-muted-foreground rounded-lg font-medium text-center">
                  Apply Now
                </div>

                {/* Features */}
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Lower interest rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Higher loan amount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Longer tenure options</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 3: Locked Income/ITR Offer */}
            <div className="relative bg-white rounded-lg border-2 border-border shadow-sm overflow-hidden">
              {/* Locked Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted text-foreground px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Locked
              </div>

              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center space-y-4 px-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Unlock Maximum Limits
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload your ITR to access up to ₹50,00,000
                    </p>
                  </div>
                  <button
                    onClick={onUnlockITR}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                  >
                    Upload ITR to Unlock
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Info className="w-4 h-4" />
                    <span>Based on your net profit</span>
                  </div>
                </div>
              </div>

              {/* Card Content (Blurred Background) */}
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    Maximum Limit
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Based on Income Tax Returns
                  </p>
                </div>

                {/* Amount */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground">
                    Up to ₹50,00,000
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="text-sm font-semibold text-foreground">10% p.a.</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Tenure</span>
                    <span className="text-sm font-semibold text-foreground">60 Months</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Processing Fee</span>
                    <span className="text-sm font-semibold text-foreground">1%</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Monthly EMI</span>
                    <span className="text-sm font-semibold text-foreground">₹1,06,230</span>
                  </div>
                </div>

                {/* Placeholder Button */}
                <div className="w-full px-6 py-3 bg-muted text-muted-foreground rounded-lg font-medium text-center">
                  Apply Now
                </div>

                {/* Features */}
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Lowest interest rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Maximum loan amount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Flexible repayment terms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="bg-muted/30 border border-border rounded-lg p-6 mt-8">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Why unlock additional offers?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Linking your GST and uploading ITR helps us assess your complete financial
                  profile, enabling us to offer higher loan amounts with better terms and
                  lower interest rates. All data is encrypted and used only for loan
                  assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}