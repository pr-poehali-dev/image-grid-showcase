import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Cell {
  id: number;
  owned: boolean;
  selected: boolean;
  color: string;
}

const GRID_WIDTH = 160;
const GRID_HEIGHT = 100;
const TOTAL_CELLS = GRID_WIDTH * GRID_HEIGHT;

const generateRandomColor = () => {
  const colors = [
    '#F97316', '#0EA5E9', '#10b981', '#8B5CF6', '#D946EF',
    '#ea384c', '#FEC6A1', '#E5DEFF', '#FFDEE2', '#D3E4FD'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Index = () => {
  const [cells] = useState<Cell[]>(() => 
    Array.from({ length: TOTAL_CELLS }, (_, i) => ({
      id: i,
      owned: Math.random() > 0.999,
      selected: false,
      color: generateRandomColor()
    }))
  );

  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [currentLog, setCurrentLog] = useState('💡 Кликните по своей (тёмно-зелёной) ячейке — появится окно загрузки.');

  const soldCount = cells.filter(c => c.owned).length;

  const handleCellClick = (cellId: number) => {
    setSelectedCells(prev => {
      if (prev.includes(cellId)) {
        return prev.filter(id => id !== cellId);
      } else {
        return [...prev, cellId];
      }
    });
  };

  const handleMetaMaskConnect = () => {
    setIsMetaMaskConnected(!isMetaMaskConnected);
    setCurrentLog(isMetaMaskConnected 
      ? '🔌 MetaMask отключен' 
      : '✅ MetaMask подключен успешно'
    );
  };

  const handleBuySelected = () => {
    if (selectedCells.length === 0) {
      setCurrentLog('⚠️ Выберите хотя бы одну ячейку для покупки');
      return;
    }
    if (!isMetaMaskConnected) {
      setCurrentLog('⚠️ Подключите MetaMask для покупки');
      return;
    }
    setCurrentLog(`💰 Покупка ${selectedCells.length} ячеек... Ожидайте подтверждения транзакции`);
  };

  const handleResetSelection = () => {
    setSelectedCells([]);
    setCurrentLog('🔄 Выбор сброшен');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
      <div className="max-w-[1680px] mx-auto">
        <header className="mb-6 border-2 border-[#333] bg-[#222] p-4 rounded-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-[#F97316]">
                🎨 PIXEL.NFT
              </div>
              <div className="text-xs text-[#999] hidden md:block">
                Million Dollar Homepage 2.0
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={handleMetaMaskConnect}
                variant={isMetaMaskConnected ? "default" : "outline"}
                size="sm"
                className="font-mono text-xs"
              >
                <Icon name={isMetaMaskConnected ? "CheckCircle2" : "Wallet"} size={14} className="mr-1" />
                {isMetaMaskConnected ? 'MetaMask ✓' : 'Подключить MetaMask'}
              </Button>

              <Badge variant="secondary" className="font-mono text-xs px-3 py-1">
                Продано: {soldCount} / {TOTAL_CELLS}
              </Badge>

              <Badge 
                variant={selectedCells.length > 0 ? "default" : "outline"} 
                className="font-mono text-xs px-3 py-1"
              >
                Выбрано: {selectedCells.length}
              </Badge>

              <Button
                onClick={handleBuySelected}
                disabled={selectedCells.length === 0 || !isMetaMaskConnected}
                size="sm"
                className="font-mono text-xs bg-[#10b981] hover:bg-[#059669]"
              >
                <Icon name="ShoppingCart" size={14} className="mr-1" />
                Купить выбранные
              </Button>

              <Button
                onClick={handleResetSelection}
                disabled={selectedCells.length === 0}
                variant="outline"
                size="sm"
                className="font-mono text-xs"
              >
                <Icon name="X" size={14} className="mr-1" />
                Сбросить
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded-sm text-xs text-[#0EA5E9]">
              {currentLog}
            </div>
            <div className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded-sm text-xs text-[#10b981]">
              ✅ Изображения загружены. Подключите MetaMask для покупки и загрузки.
            </div>
          </div>
        </header>

        <main className="border-2 border-[#333] bg-[#111] p-2 rounded-sm">
          <div 
            className="grid gap-[1px] bg-[#000]"
            style={{
              gridTemplateColumns: `repeat(${GRID_WIDTH}, 10px)`,
              gridTemplateRows: `repeat(${GRID_HEIGHT}, 10px)`,
            }}
          >
            {cells.map((cell) => (
              <div
                key={cell.id}
                onClick={() => handleCellClick(cell.id)}
                className={`
                  w-[10px] h-[10px] cursor-pointer transition-all duration-150
                  ${cell.owned ? 'ring-1 ring-[#10b981]' : ''}
                  ${selectedCells.includes(cell.id) ? 'ring-2 ring-[#F97316] scale-110' : ''}
                  hover:scale-125 hover:z-10
                `}
                style={{
                  backgroundColor: cell.owned ? '#10b981' : cell.color,
                  opacity: selectedCells.includes(cell.id) ? 1 : 0.85,
                }}
                title={`Cell #${cell.id} ${cell.owned ? '(Продана)' : '(Доступна)'}`}
              />
            ))}
          </div>
        </main>

        <footer className="mt-6 text-center text-xs text-[#666] font-mono">
          <p>🚀 Decentralized Pixel Art Marketplace • Web3 Powered • Built on Blockchain</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
