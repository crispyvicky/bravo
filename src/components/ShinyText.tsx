import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ color: '#DAA520' }} // richer gold color
    >
      {/* Base text always visible */}
      {text}

      {/* Shiny overlay */}
      {!disabled && (
        <span
          className="absolute top-0 left-0 w-full h-full bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            animation: `shine ${speed}s linear infinite`,
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default ShinyText;
