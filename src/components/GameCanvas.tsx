import { useEffect, useState, useCallback } from 'react';
import Character from './Character';

interface Position {
  x: number;
  y: number;
}

const GameCanvas = () => {
  const [characterPosition, setCharacterPosition] = useState<Position>({ x: 400, y: 300 });
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isMoving, setIsMoving] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // Game bounds
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 400;
  const CHARACTER_SPEED = 4;

  // Handle continuous movement based on pressed keys
  useEffect(() => {
    const moveCharacter = () => {
      if (pressedKeys.size === 0) {
        setIsMoving(false);
        return;
      }

      setIsMoving(true);
      
      setCharacterPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (pressedKeys.has('ArrowLeft') || pressedKeys.has('KeyA')) {
          newX = Math.max(0, prev.x - CHARACTER_SPEED);
          setDirection('left');
        }
        if (pressedKeys.has('ArrowRight') || pressedKeys.has('KeyD')) {
          newX = Math.min(CANVAS_WIDTH - 64, prev.x + CHARACTER_SPEED);
          setDirection('right');
        }
        if (pressedKeys.has('ArrowUp') || pressedKeys.has('KeyW')) {
          newY = Math.max(150, prev.y - CHARACTER_SPEED);
        }
        if (pressedKeys.has('ArrowDown') || pressedKeys.has('KeyS')) {
          newY = Math.min(CANVAS_HEIGHT - 80, prev.y + CHARACTER_SPEED);
        }

        return { x: newX, y: newY };
      });
    };

    const gameLoop = setInterval(moveCharacter, 16); // ~60fps
    return () => clearInterval(gameLoop);
  }, [pressedKeys, CHARACTER_SPEED, CANVAS_WIDTH, CANVAS_HEIGHT]);

  // Key event handlers
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.code;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyA', 'KeyW', 'KeyS', 'KeyD'].includes(key)) {
      event.preventDefault();
      setPressedKeys(prev => new Set(prev).add(key));
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.code;
    setPressedKeys(prev => {
      const newKeys = new Set(prev);
      newKeys.delete(key);
      return newKeys;
    });
  }, []);

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-game-bg border border-grid-line rounded-lg">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Street/ground level indicator */}
      <div className="absolute bottom-20 left-0 right-0 h-px bg-neon-purple/30" />
      
      {/* Character */}
      <Character 
        x={characterPosition.x}
        y={characterPosition.y}
        direction={direction}
        isMoving={isMoving}
      />
      
      {/* Game UI overlay */}
      <div className="absolute top-4 left-4 text-foreground">
        <div className="text-lg font-bold text-neon-purple mb-2">STREET FIGHTER</div>
        <div className="text-sm space-y-1">
          <div>Position: ({Math.round(characterPosition.x)}, {Math.round(characterPosition.y)})</div>
          <div>Status: {isMoving ? 'Moving' : 'Idle'}</div>
        </div>
      </div>
      
      {/* Controls help */}
      <div className="absolute bottom-4 right-4 text-foreground/60 text-xs">
        <div>Arrow Keys or WASD to move</div>
      </div>
    </div>
  );
};

export default GameCanvas;