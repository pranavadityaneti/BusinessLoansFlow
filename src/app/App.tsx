import { useState } from 'react';
import { User, Handshake, Building2, Building, Users } from 'lucide-react';
import { EntityCard } from './components/EntityCard';
import { IdentityVerification } from './components/IdentityVerification';
import { StakeholderEngine } from './components/StakeholderEngine';
import { Financials } from './components/Financials';
import { Offers } from './components/Offers';
import logo from 'figma:asset/bcc82dd5ec037b46eabec6b9db7b414080262f3e.png';

type EntityType = 'proprietorship' | 'partnership' | 'llp' | 'pvt-ltd' | 'others';
type Screen = 'entity' | 'identity' | 'stakeholder' | 'financials' | 'offers' | 'loading';

interface EntityOption {
  id: EntityType;
  icon: typeof User;
  label: string;
  description?: string;
  isPopular?: boolean;
}

const entityOptions: EntityOption[] = [
  {
    id: 'proprietorship',
    icon: User,
    label: 'Proprietorship / Self-Employed',
    description: 'For individual business owners',
    isPopular: true,
  },
  {
    id: 'partnership',
    icon: Handshake,
    label: 'Partnership Firm',
    description: 'Two or more partners sharing ownership',
  },
  {
    id: 'llp',
    icon: Building2,
    label: 'Limited Liability Partnership',
    description: 'Hybrid of partnership and company',
  },
  {
    id: 'pvt-ltd',
    icon: Building,
    label: 'Private Limited Company',
    description: 'Separate legal entity with limited liability',
    isPopular: true,
  },
  {
    id: 'others',
    icon: Users,
    label: 'Society / Trust',
    description: 'Non-profit or charitable organizations',
  },
];

const entityColors = ['bg-blue-50', 'bg-green-50', 'bg-orange-50', 'bg-purple-50', 'bg-pink-50'];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'entity' | 'identity' | 'stakeholder' | 'financials' | 'offers' | 'loading'
  >('entity');
  const [selectedEntity, setSelectedEntity] = useState<EntityType | null>(null);
  const [identityData, setIdentityData] = useState<{ pan: string; gstin: string } | null>(null);

  const handleBack = () => {
    if (currentScreen === 'identity') {
      setCurrentScreen('entity');
    } else if (currentScreen === 'stakeholder') {
      setCurrentScreen('identity');
    } else if (currentScreen === 'financials') {
      // Go back to stakeholder if corporate entity, otherwise to identity
      if (selectedEntity === 'partnership' || selectedEntity === 'llp' || selectedEntity === 'pvt-ltd') {
        setCurrentScreen('stakeholder');
      } else {
        setCurrentScreen('identity');
      }
    } else if (currentScreen === 'offers') {
      setCurrentScreen('financials');
    }
  };

  const handleEntitySelect = (entity: EntityType) => {
    setSelectedEntity(entity);
  };

  const handleNext = () => {
    if (selectedEntity) {
      setCurrentScreen('identity');
    }
  };

  const handleIdentityConfirm = (data: { pan: string; gstin: string }) => {
    setIdentityData(data);
    console.log('Identity verification complete:', { entity: selectedEntity, ...data });
    
    // Conditional navigation based on entity type
    if (selectedEntity === 'proprietorship') {
      // Proprietorship: Skip stakeholder screen, go directly to financials
      console.log('Proprietorship detected: Skipping stakeholder verification');
      setCurrentScreen('financials');
    } else {
      // Corporate entities: Go to stakeholder engine
      console.log('Corporate entity detected: Proceeding to stakeholder verification');
      setCurrentScreen('stakeholder');
    }
  };

  const handleStakeholderComplete = () => {
    console.log('Stakeholder verification complete');
    setCurrentScreen('financials');
  };

  const handleFinancialsComplete = (method: 'netbanking' | 'upload', data?: any) => {
    console.log('Financials complete:', method, data);
    // Auto-redirect to offers screen
    setCurrentScreen('offers');
  };

  const handleApplyNow = () => {
    console.log('Applying for ABB offer');
    // Navigate to application form or show success
  };

  const handleUnlockGST = () => {
    console.log('Unlocking GST offer');
    // Navigate to GST linking flow
  };

  const handleUnlockITR = () => {
    console.log('Unlocking ITR offer');
    // Navigate to ITR upload flow
  };

  // Screen: Offers
  if (currentScreen === 'offers') {
    return (
      <Offers
        abbAmount={500000}
        onApplyNow={handleApplyNow}
        onUnlockGST={handleUnlockGST}
        onUnlockITR={handleUnlockITR}
        onBack={handleBack}
      />
    );
  }

  // Screen: Financials
  if (currentScreen === 'financials') {
    return <Financials onComplete={handleFinancialsComplete} onBack={handleBack} />;
  }

  // Screen: Stakeholder Engine (Corporate only)
  if (currentScreen === 'stakeholder') {
    return (
      <StakeholderEngine
        entityType={selectedEntity || ''}
        onComplete={handleStakeholderComplete}
        onBack={handleBack}
      />
    );
  }

  // Screen: Identity Verification
  if (currentScreen === 'identity') {
    return (
      <IdentityVerification
        entityType={selectedEntity || ''}
        onConfirm={handleIdentityConfirm}
        onBack={handleBack}
      />
    );
  }

  // Screen: Entity Selection
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
        <div className="space-y-10">
          {/* Title Section */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
              New Business Loan Application
            </p>
            <h1 className="text-3xl font-semibold text-foreground">
              Select your Business Entity Type
            </h1>
          </div>

          {/* Entity Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entityOptions.map((entity, index) => (
              <EntityCard
                key={entity.id}
                icon={entity.icon}
                label={entity.label}
                description={entity.description}
                isSelected={selectedEntity === entity.id}
                isPopular={entity.isPopular}
                onClick={() => handleEntitySelect(entity.id)}
                color={entityColors[index]}
              />
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex justify-end pt-8">
            <button
              onClick={handleNext}
              disabled={!selectedEntity}
              className={`
                px-8 py-3 rounded-full font-medium transition-all duration-200
                ${
                  selectedEntity
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}