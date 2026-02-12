import { useState } from 'react';
import { CheckCircle2, Loader2, Clock, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/bcc82dd5ec037b46eabec6b9db7b414080262f3e.png';

interface Stakeholder {
  id: string;
  name: string;
  pan: string;
  shareholding: number;
  verified: boolean;
}

interface StakeholderEngineProps {
  entityType: string;
  onComplete: () => void;
  onBack: () => void;
}

export function StakeholderEngine({ entityType, onComplete, onBack }: StakeholderEngineProps) {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    {
      id: '1',
      name: 'Amit Kumar',
      pan: 'AAAAA0000A',
      shareholding: 30,
      verified: true,
    },
    {
      id: '2',
      name: 'Suresh Singh',
      pan: 'BBBBB1111B',
      shareholding: 0,
      verified: false,
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    pan: '',
    shareholding: '',
  });

  const [isVerifying, setIsVerifying] = useState(false);

  const totalShareholding = stakeholders.reduce(
    (sum, stakeholder) => sum + stakeholder.shareholding,
    0
  );

  const canProceed = totalShareholding >= 51;
  const progressPercentage = Math.min(totalShareholding, 100);

  const handleVerifyPartner = async () => {
    if (!formData.name || !formData.pan || !formData.shareholding) {
      return;
    }

    setIsVerifying(true);

    // Mock verification API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add verified stakeholder
    const newStakeholder: Stakeholder = {
      id: Date.now().toString(),
      name: formData.name,
      pan: formData.pan,
      shareholding: parseFloat(formData.shareholding),
      verified: true,
    };

    setStakeholders([...stakeholders, newStakeholder]);

    // Reset form
    setFormData({ name: '', pan: '', shareholding: '' });
    setIsVerifying(false);
  };

  const handlePanChange = (value: string) => {
    const formatted = value.toUpperCase().slice(0, 10);
    setFormData({ ...formData, pan: formatted });
  };

  const handleShareholdingChange = (value: string) => {
    // Only allow numbers and decimal point
    const formatted = value.replace(/[^\d.]/g, '');
    setFormData({ ...formData, shareholding: formatted });
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.pan.length === 10 &&
    formData.shareholding !== '' &&
    parseFloat(formData.shareholding) > 0 &&
    parseFloat(formData.shareholding) <= 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <img src={logo} alt="eFunds" className="h-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-16">
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
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
              New Business Loan Application
            </p>
            <h1 className="text-3xl font-semibold text-foreground">
              Partner & Director Details
            </h1>
          </div>

          {/* Logic Visualizer - Progress Section */}
          <div className="bg-blue-50 border-2 border-blue-100 rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Total Shareholding Verified
              </h3>
              <span className="text-2xl font-bold text-foreground">
                {totalShareholding}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-6 bg-white/80 rounded-full overflow-hidden border-2 border-blue-200">
                <div
                  className={`h-full transition-all duration-500 ${
                    canProceed ? 'bg-green-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {/* 51% marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-foreground/30"
                style={{ left: '51%' }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground whitespace-nowrap">
                  51%
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {canProceed ? (
                <span className="text-green-700 font-medium">
                  ✓ Minimum ownership requirement met. You can proceed.
                </span>
              ) : (
                <>
                  We require minimum <strong>51% ownership verification</strong> to
                  proceed.
                </>
              )}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-100 rounded-3xl p-8 space-y-6">
                <h3 className="font-semibold text-foreground">Add Partner</h3>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter full name"
                      className="w-full px-4 py-3 bg-white/80 border-2 border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      disabled={isVerifying}
                    />
                  </div>

                  {/* PAN Number */}
                  <div className="space-y-2">
                    <label
                      htmlFor="partner-pan"
                      className="block text-sm font-medium text-foreground"
                    >
                      PAN Number
                    </label>
                    <input
                      id="partner-pan"
                      type="text"
                      value={formData.pan}
                      onChange={(e) => handlePanChange(e.target.value)}
                      placeholder="AAAAA0000A"
                      className="w-full px-4 py-3 bg-white/80 border-2 border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      maxLength={10}
                      disabled={isVerifying}
                    />
                  </div>

                  {/* Shareholding % */}
                  <div className="space-y-2">
                    <label
                      htmlFor="shareholding"
                      className="block text-sm font-medium text-foreground"
                    >
                      Shareholding %
                    </label>
                    <input
                      id="shareholding"
                      type="text"
                      value={formData.shareholding}
                      onChange={(e) => handleShareholdingChange(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-white/80 border-2 border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      disabled={isVerifying}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter percentage (0-100)
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleVerifyPartner}
                  disabled={!isFormValid || isVerifying}
                  className={`
                    w-full px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2
                    ${
                      isFormValid && !isVerifying
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Partner'
                  )}
                </button>
              </div>
            </div>

            {/* Right Column - Verified Stakeholders List */}
            <div className="space-y-6">
              <div className="bg-purple-50 border-2 border-purple-100 rounded-3xl p-8 space-y-4">
                <h3 className="font-semibold text-foreground">
                  Verified Stakeholders
                </h3>

                <div className="space-y-3">
                  {stakeholders.map((stakeholder) => (
                    <div
                      key={stakeholder.id}
                      className="flex items-center justify-between p-4 bg-white/80 border-2 border-purple-200 rounded-2xl"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">
                            {stakeholder.name}
                          </p>
                          {stakeholder.verified ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                              <Clock className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          PAN: {stakeholder.pan}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-foreground">
                          {stakeholder.shareholding}%
                        </p>
                        <p className="text-xs text-muted-foreground">Share</p>
                      </div>
                    </div>
                  ))}

                  {stakeholders.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No stakeholders added yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Next Step Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onComplete}
              disabled={!canProceed}
              className={`
                px-8 py-3 rounded-full font-medium transition-all duration-200
                ${
                  canProceed
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              Save Stakeholders & Proceed
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}