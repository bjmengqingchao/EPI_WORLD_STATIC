import React, { useMemo } from 'react';

// A simplified representation of world coordinates for an abstract dot map
// In a real app, use D3 + TopoJSON. This is a visual approximation for the "Tech/Data" feel.
const DOT_GRID_WIDTH = 60;
const DOT_GRID_HEIGHT = 30;

const WorldMap: React.FC = () => {
  const dots = useMemo(() => {
    const generatedDots: { x: number; y: number; active: boolean }[] = [];
    
    // Very rough approximation of continents using math for the "Dot Matrix" look
    for (let y = 0; y < DOT_GRID_HEIGHT; y++) {
      for (let x = 0; x < DOT_GRID_WIDTH; x++) {
        let active = false;
        
        // Normals
        const nx = x / DOT_GRID_WIDTH;
        const ny = y / DOT_GRID_HEIGHT;

        // Rough shape of Americas
        if (nx > 0.15 && nx < 0.35 && ny > 0.1 && ny < 0.8) active = true;
        // Gulf gap
        if (nx > 0.25 && nx < 0.35 && ny > 0.4 && ny < 0.45) active = false;
        
        // Europe/Africa
        if (nx > 0.45 && nx < 0.65 && ny > 0.15 && ny < 0.75) active = true;
        // Med gap
        if (nx > 0.48 && nx < 0.6 && ny > 0.25 && ny < 0.3) active = false;

        // Asia
        if (nx > 0.65 && nx < 0.9 && ny > 0.1 && ny < 0.55) active = true;

        // Australia
        if (nx > 0.8 && nx < 0.92 && ny > 0.65 && ny < 0.8) active = true;

        // Randomly remove some dots to make it look "data-like" and organic
        if (active && Math.random() > 0.85) active = false;

        if (active) {
            generatedDots.push({ x, y, active });
        }
      }
    }
    return generatedDots;
  }, []);

  // Outbreak markers (static for demo)
  const markers = [
    { x: '25%', y: '30%', color: 'bg-red-500' }, // North America
    { x: '55%', y: '50%', color: 'bg-orange-500' }, // Africa
    { x: '75%', y: '40%', color: 'bg-red-500' }, // India
    { x: '85%', y: '35%', color: 'bg-yellow-500' }, // China
    { x: '30%', y: '65%', color: 'bg-orange-500' }, // South America
  ];

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* Map Dots */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-5xl aspect-[2/1]">
                {dots.map((dot, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-slate-600 transition-all duration-1000 hover:bg-sky-400 hover:scale-150"
                        style={{
                            left: `${(dot.x / DOT_GRID_WIDTH) * 100}%`,
                            top: `${(dot.y / DOT_GRID_HEIGHT) * 100}%`,
                            width: '4px',
                            height: '4px',
                            opacity: 0.6
                        }}
                    />
                ))}
            </div>
        </div>

        {/* Interactive Ping Markers */}
        {markers.map((marker, idx) => (
            <div key={idx} className="absolute w-4 h-4" style={{ left: marker.x, top: marker.y }}>
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${marker.color} opacity-75`}></span>
                <span className={`relative inline-flex h-4 w-4 rounded-full ${marker.color} border-2 border-slate-900`}></span>
            </div>
        ))}
        
        <div className="absolute bottom-4 left-4 flex gap-4 text-xs text-slate-400 bg-slate-800/80 p-2 rounded backdrop-blur">
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> 1-7</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> 7-25</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-600"></span> 25-60</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-700"></span> 60-325</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300/20"></span> 无数据</div>
        </div>
    </div>
  );
};

export default WorldMap;