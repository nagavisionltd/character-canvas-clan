import { useEffect, useState } from 'react';
import { AttackType } from '@/hooks/useAttacks';
import punchFrame1 from '@/assets/character-punch1.png';
import punchFrame2 from '@/assets/character-punch2.png';
import kickFrame from '@/assets/character-kick.png';
import blockFrame from '@/assets/character-block.png';

interface CharacterProps {
  x: number;
  y: number;
  direction: 'left' | 'right';
  isMoving: boolean;
  currentAttack: AttackType;
  isAttacking: boolean;
}

const Character = ({ x, y, direction, isMoving, currentAttack, isAttacking }: CharacterProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  // Animation frames - using your uploaded sprite images
  const walkFrames = [
    '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png',
    '/lovable-uploads/4d63555e-7a6c-4b1b-be65-b69d71096eec.png',
    '/lovable-uploads/74cf85b2-3a9a-47cd-9279-6ef7e09c6396.png',
    '/lovable-uploads/e34a2b9b-9db4-42ff-a0e0-fb8226c9c80e.png',
    '/lovable-uploads/137b4840-b8c4-4775-bb50-3ad020551e83.png'
  ];

  const idleFrame = '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png';

  // Attack frames
  const attackFrames = {
    punch: [punchFrame1],
    combo: [punchFrame1, punchFrame2],
    kick: [kickFrame],
    block: [blockFrame],
  };

  // Animate when moving
  useEffect(() => {
    if (isAttacking || !isMoving) {
      setCurrentFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % walkFrames.length);
    }, 150);

    return () => clearInterval(interval);
  }, [isMoving, isAttacking, walkFrames.length]);

  // Get current sprite based on state
  const getCurrentSprite = () => {
    if (isAttacking && currentAttack) {
      const frames = attackFrames[currentAttack];
      return frames[currentFrame % frames.length];
    }
    
    if (isMoving) {
      return walkFrames[currentFrame];
    }
    
    return idleFrame;
  };

  const currentSprite = getCurrentSprite();

  return (
    <div
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        imageRendering: 'pixelated',
      }}
    >
      <img 
        src={`${currentSprite}?v=${Date.now()}`}
        alt="Character" 
        className="w-16 h-20 object-contain"
        style={{ imageRendering: 'pixelated' }}
        key={currentSprite}
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