import { useState } from 'react';
import { Shield, FileText, Upload, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/bcc82dd5ec037b46eabec6b9db7b414080262f3e.png';

interface FinancialsProps {
  onComplete: (method: 'netbanking' | 'upload', data?: any) => void;
  onBack: () => void;
}

export function Financials({ onComplete, onBack }: FinancialsProps) {
  const [selectedMethod, setSelectedMethod] = useState<'netbanking' | 'upload' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNetbankingClick = () => {
    setSelectedMethod('netbanking');
  };

  const handleUploadClick = () => {
    setSelectedMethod('upload');
  };

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf') {
      setUploadedFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleProceed = async () => {
    setIsAnalyzing(true);
    
    // Mock API call to analyze financials
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    if (selectedMethod === 'netbanking') {
      onComplete('netbanking');
    } else if (selectedMethod === 'upload' && uploadedFile) {
      onComplete('upload', { fileName: uploadedFile.name });
    }
  };

  const banks = [
    { name: 'HDFC Bank', color: '#004C8F' },
    { name: 'ICICI Bank', color: '#F47920' },
    { name: 'SBI', color: '#1C4587' },
    { name: 'Axis Bank', color: '#97144D' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg border border-border p-12 max-w-md w-full mx-4 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Animated Loading Icon */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              {/* Loading Text */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Analyzing Financials...
                </h3>
                <p className="text-sm text-muted-foreground">
                  We're calculating your loan eligibility based on your financial data
                </p>
              </div>

              {/* Progress Steps */}
              <div className="w-full space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-foreground">Data received</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-sm text-foreground">Computing ABB score</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">Generating offers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
              New Business Loan Application
            </p>
            <h1 className="text-3xl font-semibold text-foreground">
              Financial Assessment
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to share your financial information for offer generation
            </p>
          </div>

          {/* Two Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            {/* Option 1: Connect via Netbanking */}
            <div
              onClick={handleNetbankingClick}
              className={`
                relative p-8 rounded-3xl border-2 transition-all duration-300 text-left cursor-pointer
                hover:border-primary/60 hover:shadow-lg
                ${
                  selectedMethod === 'netbanking'
                    ? 'border-primary bg-blue-50 shadow-lg'
                    : 'border-blue-200 bg-blue-50/50'
                }
              `}
            >
              {/* Recommended Badge */}
              <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Recommended for Faster Approval
              </div>

              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
                Connect via Netbanking
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground text-center mb-6">
                Securely connect to your bank using Account Aggregator for instant
                verification
              </p>

              {/* Bank Logos */}
              <div className="mb-6">
                <p className="text-xs text-muted-foreground mb-3 text-center">
                  Supported Banks
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {banks.map((bank) => (
                    <div
                      key={bank.name}
                      className="w-12 h-12 rounded-lg border border-border bg-white flex items-center justify-center shadow-sm"
                      title={bank.name}
                    >
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                  ))}
                  <div className="text-xs text-muted-foreground font-medium">
                    +50 more
                  </div>
                </div>
              </div>

              {/* Button */}
              <div
                className={`
                  w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center
                  ${
                    selectedMethod === 'netbanking'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }
                `}
              >
                Fetch Automatically
              </div>

              {/* Benefits */}
              <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Instant verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No manual uploads needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Secure & encrypted connection</span>
                </li>
              </ul>
            </div>

            {/* Option 2: Upload Bank Statements */}
            <div
              onClick={handleUploadClick}
              className={`
                relative p-8 rounded-3xl border-2 transition-all duration-300 text-left cursor-pointer
                hover:border-primary/60 hover:shadow-lg
                ${
                  selectedMethod === 'upload'
                    ? 'border-primary bg-orange-50 shadow-lg'
                    : 'border-orange-200 bg-orange-50/50'
                }
              `}
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
                Upload Bank Statements
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground text-center mb-6">
                Manually upload PDF bank statements for the last 12 months
              </p>

              {/* Upload Area */}
              {selectedMethod === 'upload' ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`
                    border-2 border-dashed rounded-lg p-8 mb-4 transition-colors
                    ${
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-muted/30'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-3">
                    {uploadedFile ? (
                      <>
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                        <div className="text-center">
                          <p className="font-medium text-foreground">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                          }}
                          className="text-sm text-primary hover:underline"
                        >
                          Remove file
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-muted-foreground" />
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">
                            Drop PDF here or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Maximum file size: 10MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileInputChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 mb-4 bg-muted/30 flex items-center justify-center">
                  <Upload className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              {/* Benefits */}
              <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Full control over data sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Works for all banks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Secure document processing</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-muted/30 border border-border rounded-lg p-6 mt-8">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Your Data is Secure
                </h4>
                <p className="text-sm text-muted-foreground">
                  We use bank-grade 256-bit encryption to analyze your Average Bank
                  Balance (ABB) for offer generation. Your credentials are never
                  stored, and data is only used for loan assessment purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          {selectedMethod && (
            <div className="flex justify-end pt-4">
              <button
                onClick={handleProceed}
                disabled={selectedMethod === 'upload' && !uploadedFile}
                className={`
                  px-8 py-3 rounded-full font-medium transition-all duration-200
                  ${
                    selectedMethod === 'netbanking' ||
                    (selectedMethod === 'upload' && uploadedFile)
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }
                `}
              >
                Continue to Verification
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}