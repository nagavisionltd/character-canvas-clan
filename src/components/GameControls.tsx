import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const GameControls = () => {
  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border-grid-line">
      <h3 className="text-lg font-bold text-neon-purple mb-3">Game Controls</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Movement</h4>
          <div className="space-y-1 text-muted-foreground">
            <div>↑ W - Move Up</div>
            <div>↓ S - Move Down</div>
            <div>← A - Move Left</div>
            <div>→ D - Move Right</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-2">Combat</h4>
          <div className="space-y-1 text-muted-foreground">
            <div>V - Punch</div>
            <div>C - Block</div>
            <div>B - Special Move</div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm" className="bg-neon-purple/10 border-neon-purple/30 hover:bg-neon-purple/20">
          Pause Game
        </Button>
        <Button variant="outline" size="sm" className="bg-neon-blue/10 border-neon-blue/30 hover:bg-neon-blue/20">
          Reset Position
        </Button>
      </div>
    </Card>
  );
};

export default GameControls;