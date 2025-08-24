import { useEffect, useState } from 'react';
import { AttackType } from '@/hooks/useAttacks';

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
  const [attackFrame, setAttackFrame] = useState(0);

  // Animation frames - using your uploaded sprite images
  const walkFrames = [
    '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png',
    '/lovable-uploads/4d63555e-7a6c-4b1b-be65-b69d71096eec.png',
    '/lovable-uploads/74cf85b2-3a9a-47cd-9279-6ef7e09c6396.png',
    '/lovable-uploads/e34a2b9b-9db4-42ff-a0e0-fb8226c9c80e.png'
  ];

  const idleFrame = '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png';

  // Attack frames
  const attackFrames = {
    punch: [
      '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png', // idle
      '/lovable-uploads/2e559b61-ed53-4594-aa1e-82335f605dbb.png', // punch extend
      '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png'  // return to idle
    ],
    combo: [
      '/lovable-uploads/2e559b61-ed53-4594-aa1e-82335f605dbb.png', // quick punch
      '/lovable-uploads/7b7544b6-5a36-4e9e-9417-918e97f69671.png', // second punch
      '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png'  // return
    ],
    kick: [
      '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png',
      '/lovable-uploads/137b4840-b8c4-4775-bb50-3ad020551e83.png',
      '/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png'
    ],
    block: ['/lovable-uploads/05da500a-35d0-4918-ab92-f3741edeb9e2.png'],
  };

  // Attack animation logic
  useEffect(() => {
    if (!isAttacking || !currentAttack) {
      setAttackFrame(0);
      return;
    }

    const frames = attackFrames[currentAttack];
    if (frames.length <= 1) return;

    let frameIndex = 0;
    const frameInterval = currentAttack === 'combo' ? 80 : 100; // Faster combo animation

    const animateAttack = () => {
      setAttackFrame(frameIndex);
      frameIndex++;
      
      if (frameIndex < frames.length) {
        setTimeout(animateAttack, frameInterval);
      }
    };

    animateAttack();
  }, [isAttacking, currentAttack]);
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
      return frames[Math.min(attackFrame, frames.length - 1)];
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
        className={`w-16 h-20 object-contain transition-transform duration-75 ${
          isAttacking && currentAttack === 'punch' ? 'scale-110' : ''
        }`}
        style={{ imageRendering: 'pixelated' }}
        key={currentSprite}
      />
      
      {/* Attack effect */}
      {isAttacking && (currentAttack === 'punch' || currentAttack === 'combo') && (
        <div 
          className={`absolute top-1/2 ${direction === 'right' ? 'left-12' : 'right-12'} 
                     w-8 h-8 bg-neon-purple/50 rounded-full animate-ping`}
          style={{ transform: 'translateY(-50%)' }}
        />
      )}
      
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