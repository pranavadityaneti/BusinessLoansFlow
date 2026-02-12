import { useState } from 'react';
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/bcc82dd5ec037b46eabec6b9db7b414080262f3e.png';

interface VerifiedBusinessData {
  legalName: string;
  dateOfIncorporation: string;
  status: string;
}

interface GSTOption {
  gstin: string;
  businessName: string;
  location: string;
}

const mockGSTOptions: GSTOption[] = [
  {
    gstin: '29AAAAA0000A1Z5',
    businessName: 'Rahul Traders',
    location: 'Bangalore',
  },
  {
    gstin: '29BBBBB1111B2Z6',
    businessName: 'Rahul Traders',
    location: 'Mumbai',
  },
];

export function IdentityVerification({ entityType, onConfirm, onBack }: { entityType: string; onConfirm: (data: { pan: string; gstin: string }) => void; onBack: () => void }) {
  const [pan, setPan] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedData, setVerifiedData] = useState<VerifiedBusinessData | null>(null);
  const [selectedGSTIN, setSelectedGSTIN] = useState('');

  const handleVerifyPAN = async () => {
    if (pan.length !== 10) {
      return;
    }

    setIsVerifying(true);
    
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock verification success
    setVerifiedData({
      legalName: 'Rahul Traders',
      dateOfIncorporation: '12-Jan-2020',
      status: 'Active',
    });
    
    setIsVerifying(false);
  };

  const handleConfirm = () => {
    if (verifiedData && selectedGSTIN) {
      onConfirm({ pan, gstin: selectedGSTIN });
    }
  };

  const handlePanChange = (value: string) => {
    // Convert to uppercase and limit to 10 characters
    const formatted = value.toUpperCase().slice(0, 10);
    setPan(formatted);
    // Reset verification when PAN changes
    if (verifiedData) {
      setVerifiedData(null);
      setSelectedGSTIN('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <img src={logo} alt="eFunds" className="h-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-16">
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
          <div className="mb-10">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-2">
              New Business Loan Application
            </p>
            <h1 className="text-3xl font-semibold text-foreground">
              Verify Business Identity
            </h1>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Input */}
            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-100 rounded-3xl p-8 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="pan" className="block font-semibold text-foreground">
                    Enter Permanent Account Number (PAN)
                  </label>
                  <input
                    id="pan"
                    type="text"
                    value={pan}
                    onChange={(e) => handlePanChange(e.target.value)}
                    placeholder="AAAAA0000A"
                    className="w-full px-4 py-3 bg-white/80 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    maxLength={10}
                    disabled={isVerifying}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter 10-character PAN number
                  </p>
                </div>

                <button
                  onClick={handleVerifyPAN}
                  disabled={pan.length !== 10 || isVerifying}
                  className={`
                    w-full px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2
                    ${
                      pan.length === 10 && !isVerifying
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
                    'Verify Identity'
                  )}
                </button>
              </div>
            </div>

            {/* Right Panel - Validation Result */}
            <div>
              {verifiedData ? (
                <div className="space-y-6">
                  {/* Success Card */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-green-900">
                        Verified Business Profile
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-green-700 mb-1">
                          Legal Name
                        </label>
                        <div className="px-4 py-2 bg-white/80 border-2 border-green-200 rounded-2xl text-sm text-foreground">
                          {verifiedData.legalName}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-green-700 mb-1">
                          Date of Incorporation
                        </label>
                        <div className="px-4 py-2 bg-white/80 border-2 border-green-200 rounded-2xl text-sm text-foreground">
                          {verifiedData.dateOfIncorporation}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-green-700 mb-1">
                          Status
                        </label>
                        <div className="px-4 py-2 bg-white/80 border-2 border-green-200 rounded-2xl text-sm">
                          <span className="inline-flex items-center gap-1.5 text-green-700 font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {verifiedData.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GST Selection */}
                  <div className="bg-orange-50 border-2 border-orange-100 rounded-3xl p-8 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="gstin" className="block font-semibold text-foreground">
                        Select GSTIN
                      </label>
                      <select
                        id="gstin"
                        value={selectedGSTIN}
                        onChange={(e) => setSelectedGSTIN(e.target.value)}
                        className="w-full px-4 py-3 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a GSTIN</option>
                        {mockGSTOptions.map((gst) => (
                          <option key={gst.gstin} value={gst.gstin}>
                            {gst.gstin} - {gst.businessName} - {gst.location}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Select the GSTIN you want to use for this loan application
                      </p>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedGSTIN}
                    className={`
                      w-full px-8 py-3 rounded-full font-medium transition-all duration-200
                      ${
                        selectedGSTIN
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }
                    `}
                  >
                    Confirm & Proceed
                  </button>
                </div>
              ) : (
                <div className="bg-purple-50 border-2 border-purple-100 rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Enter your PAN and click Verify to continue
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}