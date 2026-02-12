import { LucideIcon } from 'lucide-react';

interface EntityCardProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  isSelected: boolean;
  isPopular?: boolean;
  onClick: () => void;
  color?: string;
}

export function EntityCard({
  icon: Icon,
  label,
  description,
  isSelected,
  isPopular,
  onClick,
  color = 'bg-blue-50',
}: EntityCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative p-6 rounded-3xl transition-all duration-300 text-left group hover:shadow-lg
        ${isSelected ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : 'hover:scale-[1.02]'}
        ${color}
      `}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-md">
          Popular
        </div>
      )}

      {/* Icon Section */}
      <div className="mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Text Section */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground text-base">
          {label}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute bottom-4 right-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}