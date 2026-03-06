interface DonutChartProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}
export const DonutChart = ({ percentage = 0, size = 150, strokeWidth = 15, color = '#3b82f6' }: DonutChartProps) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle (The "Track") */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle (The "Data") */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.5s ease-in-out"
          }}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Text */}
      <div className="absolute text-xl font-bold">
        {percentage}%
      </div>
    </div>
  );
}