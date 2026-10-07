import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  optimal?: boolean;
  size?: number;
  color?: string;
}

export default function Gauge({ 
  value, 
  max, 
  label, 
  unit, 
  optimal = true, 
  size = 80,
  color
}: GaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const defaultColor = optimal ? '#00f5ff' : '#ff3344';
  const strokeColor = color || defaultColor;
  const bgColor = optimal ? 'rgba(0, 245, 255, 0.08)' : 'rgba(255, 51, 68, 0.08)';

  // Format value for display
  const displayValue = value < 10 ? value.toFixed(2) : value < 100 ? value.toFixed(1) : Math.round(value);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth="5"
          />
          {/* Tick marks */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 360;
            const radian = (angle * Math.PI) / 180;
            const x1 = size / 2 + Math.cos(radian) * (radius - 3);
            const y1 = size / 2 + Math.sin(radian) * (radius - 3);
            const x2 = size / 2 + Math.cos(radian) * (radius + 3);
            const y2 = size / 2 + Math.sin(radian) * (radius + 3);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0, 245, 255, 0.15)"
                strokeWidth="0.5"
              />
            );
          })}
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 6px ${strokeColor})`,
            }}
          />
          {/* Inner glow ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 8}
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.5"
            opacity="0.2"
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-xs font-bold font-mono"
            style={{ color: strokeColor, textShadow: `0 0 8px ${strokeColor}` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {displayValue}
          </motion.span>
          <span className="text-[8px] text-cyan-300/50 font-mono">{unit}</span>
        </div>
      </div>
      <span className="text-[9px] uppercase tracking-wider text-cyan-300/70 font-medium">{label}</span>
    </div>
  );
}
