import { useEffect, useState } from 'react';

interface CharacterProps {
  x: number;
  y: number;
  direction: 'left' | 'right';
  isMoving: boolean;
}

const Character = ({ x, y, direction, isMoving }: CharacterProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  // Animation frames - using your uploaded sprite images
  const walkFrames = [
    '/lovable-uploads/7b7544b6-5a36-4e9e-9417-918e97f69671.png',
    '/lovable-uploads/4d63555e-7a6c-4b1b-be65-b69d71096eec.png',
    '/lovable-uploads/74cf85b2-3a9a-47cd-9279-6ef7e09c6396.png',
    '/lovable-uploads/e34a2b9b-9db4-42ff-a0e0-fb8226c9c80e.png',
    '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png'
  ];

  const idleFrame = '/lovable-uploads/7b7544b6-5a36-4e9e-9417-918e97f69671.png';

  // Animate when moving
  useEffect(() => {
    console.log('Animation effect triggered - isMoving:', isMoving);
    
    if (!isMoving) {
      console.log('Setting to idle frame');
      setCurrentFrame(0);
      return;
    }

    console.log('Starting animation interval');
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const nextFrame = (prev + 1) % walkFrames.length;
        console.log('Frame change:', prev, '->', nextFrame);
        return nextFrame;
      });
    }, 150); // 150ms per frame for smooth animation

    return () => {
      console.log('Clearing animation interval');
      clearInterval(interval);
    };
  }, [isMoving, walkFrames.length]);

  const currentSprite = isMoving ? walkFrames[currentFrame] : idleFrame;

  return (
    <div
      className="absolute transition-all duration-75 ease-linear"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        imageRendering: 'pixelated',
      }}
    >
      <img 
        src={currentSprite} 
        alt="Character" 
        className="w-16 h-20 object-contain"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Character shadow */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/30 rounded-full blur-sm"
      />
      
      {/* Health bar */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-border rounded">
        <div className="w-full h-full bg-neon-purple rounded" />
      </div>
    </div>
  );
};

export default Character;