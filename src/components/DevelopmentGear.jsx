import React from "react";

const Gear = ({
  size = 120,
  teeth = 14,
  reverse = false,
}) => {
  const points = [];

  const outerRadius = 46;
  const innerRadius = 36;

  for (let i = 0; i < teeth * 4; i++) {
    const angle =
      (i / (teeth * 4)) * Math.PI * 2;

    const radius =
      i % 4 === 0 || i % 4 === 3
        ? innerRadius
        : outerRadius;

    points.push(
      `${Math.cos(angle) * radius},${
        Math.sin(angle) * radius
      }`
    );
  }

  return (
    <div
      className={`landing-gear ${
        reverse
          ? "landing-gear-reverse"
          : ""
      }`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg
        viewBox="-55 -55 110 110"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`gear-metal-${size}-${reverse}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#f1f4f6"
            />

            <stop
              offset="20%"
              stopColor="#b8bec4"
            />

            <stop
              offset="50%"
              stopColor="#747c84"
            />

            <stop
              offset="78%"
              stopColor="#444b52"
            />

            <stop
              offset="100%"
              stopColor="#252a2f"
            />
          </linearGradient>
        </defs>

        {/* Gear teeth + body */}
        <polygon
          points={points.join(" ")}
          fill={`url(#gear-metal-${size}-${reverse})`}
          stroke="#22272c"
          strokeWidth="2"
        />

        {/* Inner opening */}
        <circle
          cx="0"
          cy="0"
          r="29"
          fill="#10151a"
          stroke="#596168"
          strokeWidth="2"
        />

        {/* Inner ring */}
        <circle
          cx="0"
          cy="0"
          r="18"
          fill="none"
          stroke="#858d94"
          strokeWidth="3"
        />

        {/* Center hub */}
        <circle
          cx="0"
          cy="0"
          r="9"
          fill="#4b535a"
          stroke="#aeb5bb"
          strokeWidth="2"
        />

        {/* Axle */}
        <circle
          cx="0"
          cy="0"
          r="4"
          fill="#11161b"
        />

        {/* Metal highlight */}
        <path
          d="M -27 -20 A 34 34 0 0 1 17 -29"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const DevelopmentGear = () => {
  return (
    <div className="landing-development">

      <div className="landing-gears">

        {/* Large gear */}
        <Gear
          size={128}
          teeth={14}
        />

        {/* Small gear */}
        <Gear
          size={88}
          teeth={12}
          reverse
        />

      </div>

      <div className="development-label">

        <span className="development-dot" />

        <span>
          IN DEVELOPMENT
        </span>

      </div>

    </div>
  );
};

export default DevelopmentGear;