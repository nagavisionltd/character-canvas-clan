import GameCanvas from "@/components/GameCanvas";
import GameControls from "@/components/GameControls";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent mb-2">
            BEAT 'EM UP
          </h1>
          <p className="text-muted-foreground">Classic arcade-style fighting game</p>
        </div>
        
        {/* Game Area */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Game Canvas */}
          <div className="lg:col-span-3">
            <div className="aspect-[2/1] w-full max-w-4xl mx-auto">
              <GameCanvas />
            </div>
          </div>
          
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <GameControls />
          </div>
        </div>
        
        {/* Game Stats */}
        <div className="mt-6 text-center">
          <div className="inline-flex gap-8 text-sm text-muted-foreground">
            <span>Level: <span className="text-neon-purple font-bold">1</span></span>
            <span>Score: <span className="text-neon-blue font-bold">0</span></span>
            <span>Lives: <span className="text-neon-pink font-bold">3</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
