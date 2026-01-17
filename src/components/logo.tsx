
import { cn } from "@/lib/utils";

export function Logo({
  className,
  withText = true,
  size = 32,
}: {
  className?: string;
  withText?: boolean;
  size?: number;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-3 select-none", className)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="GreenPath Logo"
      >
        <defs>
          <linearGradient
            id="leafGradient"
            x1="30"
            y1="110"
            x2="110"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#15803D" />
            <stop offset="1" stopColor="#A3E635" />
          </linearGradient>
          <radialGradient
            id="sunGradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(64 74) rotate(90) scale(16)"
          >
            <stop stopColor="#FDBA74" />
            <stop offset="1" stopColor="#FB923C" />
          </radialGradient>
          <linearGradient
            id="buildingGradient"
            x1="64"
            y1="25"
            x2="64"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0F766E" />
            <stop offset="1" stopColor="#042f2e" />
          </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        </defs>

        {/* Sun */}
        <circle cx="64" cy="74" r="12" fill="url(#sunGradient)" />

        {/* Cityscape */}
        <g fill="url(#buildingGradient)">
          {/* Middle Building */}
          <path d="M56 32 H 72 V 75 H 56 Z" />
          <path d="M54 30 L 74 30 L 72 75 H 56 Z" />
          
          {/* Left Building */}
          <path d="M38 45 H 52 V 75 H 38 Z" />
          <path d="M36 43 L 54 43 L 52 75 H 38 Z" />

          {/* Right Building */}
          <path d="M76 40 H 90 V 75 H 76 Z" />
          <path d="M74 38 L 92 38 L 90 75 H 76 Z" />
        </g>
        
        {/* Windows */}
        <g fill="#FDE047" fillOpacity="0.8">
          {/* Middle Building Windows */}
          <rect x="59" y="38" width="3" height="4" rx="1"/>
          <rect x="65" y="38" width="3" height="4" rx="1"/>
          <rect x="59" y="46" width="3" height="4" rx="1"/>
          <rect x="65" y="46" width="3" height="4" rx="1"/>
          <rect x="59" y="54" width="3" height="4" rx="1"/>
          <rect x="65" y="54" width="3" height="4" rx="1"/>
          <rect x="59" y="62" width="3" height="4" rx="1"/>
          <rect x="65" y="62" width="3" height="4" rx="1"/>

          {/* Left Building Windows */}
          <rect x="41" y="50" width="3" height="4" rx="1"/>
          <rect x="47" y="50" width="3" height="4" rx="1"/>
          <rect x="41" y="58" width="3" height="4" rx="1"/>
          <rect x="47" y="58" width="3" height="4" rx="1"/>
          <rect x="41" y="66" width="3" height="4" rx="1"/>
          <rect x="47" y="66" width="3" height="4" rx="1"/>

           {/* Right Building Windows */}
          <rect x="79" y="45" width="3" height="4" rx="1"/>
          <rect x="85" y="45" width="3" height="4" rx="1"/>
          <rect x="79" y="53" width="3" height="4" rx="1"/>
          <rect x="85" y="53" width="3" height="4" rx="1"/>
          <rect x="79" y="61" width="3" height="4" rx="1"/>
          <rect x="85" y="61" width="3" height="4" rx="1"/>
        </g>

        {/* Leaf */}
        <path
          d="M20 108 C 30 70, 70 68, 98 65 C 105 75, 110 90, 105 100 C 90 115, 45 120, 20 108 Z"
          fill="url(#leafGradient)"
        />

        {/* Leaf Vein */}
        <path
          d="M23 106 C 40 90, 65 82, 95 70"
          stroke="#14532D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {withText && (
        <span className="text-foreground font-headline text-xl font-bold tracking-tight">
          GreenPath
        </span>
      )}
    </div>
  );
}

