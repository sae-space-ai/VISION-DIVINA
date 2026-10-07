import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  optimal?: boolean;
  size?: number;
}

export default function Gauge({ value, max, label, unit, optimal = true, size = 80 }: GaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const color = optimal ? '#00f5ff' : '#ff3344';
  const bgColor = optimal ? 'rgba(0, 245, 255, 0.1)' : 'rgba(255, 51, 68, 0.1)';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={36}
            fill="none"
            stroke={bgColor}
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={36}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 4px ${color})`
            }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold" style={{ color }}>{value}</span>
          <span className="text-[8px] text-cyan-300/60">{unit}</span>
        </div>
      </div>
      <span className="text-[9px] uppercase tracking-wider text-cyan-300/70 font-medium">{label}</span>
    </div>
  );
}
