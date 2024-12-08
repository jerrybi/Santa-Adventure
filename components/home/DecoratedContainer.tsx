import React from 'react';

// 自定义 SVG 图标组件
const ChristmasIcons = {
  Tree: function TreeIcon() {
    return (
      // <svg
      //   viewBox='0 0 24 24'
      //   fill='none'
      //   stroke='currentColor'
      //   strokeWidth='2'
      //   strokeLinecap='round'
      //   strokeLinejoin='round'
      //   className='w-full h-full'
      // >
      //   <path d='M12 2L3 19h18L12 2z' />
      //   <path d='M12 6l-4.5 9h9L12 6z' />
      //   <path d='M12 10l-3 6h6l-3-6z' />
      //   <line x1='12' y1='19' x2='12' y2='22' />
      // </svg>
      <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <rect x='11' y='20' width='2' height='3' fill='#925F3C' />

        <path d='M12 4 L6 10 L18 10 Z' fill='#2D5A27' />
        <path d='M12 8 L5 15 L19 15 Z' fill='#2D5A27' />
        <path d='M12 13 L4 20 L20 20 Z' fill='#2D5A27' />

        <circle cx='10' cy='9' r='1' fill='#FF4444' />
        <circle cx='14' cy='14' r='1' fill='#FFD700' />
        <circle cx='9' cy='17' r='1' fill='#FF4444' />

        <path d='M12 2 L13 4 L15 4 L13.5 5.5 L14 7.5 L12 6.5 L10 7.5 L10.5 5.5 L9 4 L11 4 Z' fill='#FFD700' />
      </svg>
    );
  },
  Snowflake: function SnowflakeIcon() {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-full h-full'
      >
        <line x1='12' y1='2' x2='12' y2='22' />
        <line x1='2' y1='12' x2='22' y2='12' />
        <path d='M12 2l3 3m-3-3l-3 3' />
        <path d='M12 22l3-3m-3 3l-3-3' />
        <path d='M2 12l3 3m-3-3l3-3' />
        <path d='M22 12l-3 3m3-3l-3-3' />
      </svg>
    );
  },
  Bell: function BellIcon() {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-full h-full'
      >
        <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
        <path d='M13.73 21a2 2 0 0 1-3.46 0' />
        <circle cx='12' cy='3' r='1' />
      </svg>
    );
  },
  Gift: function GiftIcon() {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-full h-full'
      >
        <rect x='3' y='8' width='18' height='14' rx='2' />
        <path d='M12 8V22' />
        <path d='M19 12H5' />
        <path d='M12 8c3.5-3.5 6-4 6-4s-2.5 6-6 4' />
        <path d='M12 8c-3.5-3.5-6-4-6-4s2.5 6 6 4' />
      </svg>
    );
  },
};

interface DecorationProps {
  className?: string;
}

function generateSnowflakes(count: number) {
  return Array.from({ length: count }, () => ({
    id: Math.random().toString(36).substr(2, 9),
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${5 + Math.random() * 5}s`,
    rotation: Math.random() * 360,
  }));
}

function ChristmasDecorations({ className = '' }: DecorationProps) {
  const snowflakes = React.useMemo(() => generateSnowflakes(20), []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* 雪花装饰 */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        {snowflakes.map((snowflake) => (
          <div
            key={snowflake.id}
            className='absolute animate-christmas-float'
            style={{
              left: snowflake.left,
              top: snowflake.top,
              animationDelay: snowflake.delay,
              animationDuration: snowflake.duration,
            }}
          >
            <div
              className='w-4 h-4 text-white/20'
              style={{ transform: `rotate(${snowflake.rotation}deg)` }}
            >
              <ChristmasIcons.Snowflake />
            </div>
          </div>
        ))}
      </div>

      {/* 圣诞树装饰 */}
      <div className='absolute bottom-2 left-4 transform -translate-y-8'>
        <div className='w-16 h-16 text-green-600/30 animate-pulse'>
          <ChristmasIcons.Tree />
        </div>
      </div>

      {/* 礼物装饰 */}
      <div className='absolute bottom-10 right-4 animate-bounce'>
        <div className='w-12 h-12 text-red-500/30'>
          <ChristmasIcons.Gift />
        </div>
      </div>

      {/* 铃铛装饰 */}
      <div className='absolute top-40 right-8 animate-christmas-swing origin-top'>
        <div className='w-8 h-8 text-yellow-400/30'>
          <ChristmasIcons.Bell />
        </div>
      </div>
    </div>
  );
}

interface DecoratedContainerProps {
  children: React.ReactNode;
}

function DecoratedContainer({ children }: DecoratedContainerProps) {
  return (
    <div className='relative'>
      <ChristmasDecorations />
      <div className='relative z-10'>
        {children}
      </div>
    </div>
  );
}

export default DecoratedContainer;
