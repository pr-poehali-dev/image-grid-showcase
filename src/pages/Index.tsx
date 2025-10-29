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
  const [headerVariant, setHeaderVariant] = useState<number>(1);
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

  const renderHeader1 = () => (
    <header className="bg-[#0a0a0a] border-b-2 border-[#10b981] shadow-lg shadow-[#10b981]/20">
      <div className="max-w-[1680px] mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#10b981] to-[#0EA5E9] bg-clip-text text-transparent">
              PIXEL.NFT
            </div>
            <Badge variant="outline" className="text-xs border-[#10b981] text-[#10b981]">
              Million Dollar Homepage 2.0
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleMetaMaskConnect}
              variant={isMetaMaskConnected ? "default" : "outline"}
              className={`gap-2 ${isMetaMaskConnected ? 'bg-[#10b981] hover:bg-[#059669]' : 'border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10'}`}
            >
              <Icon name={isMetaMaskConnected ? "CheckCircle2" : "Wallet"} size={18} />
              {isMetaMaskConnected ? 'MetaMask ✓' : 'Подключить MetaMask'}
            </Button>

            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Продано: <span className="font-bold ml-1">{soldCount} / {TOTAL_CELLS}</span>
            </Badge>

            <Badge variant="outline" className="px-4 py-2 text-sm border-[#0EA5E9] text-[#0EA5E9]">
              Выбрано: <span className="font-bold ml-1">{selectedCells.length}</span>
            </Badge>

            <Button
              onClick={handleBuySelected}
              disabled={selectedCells.length === 0 || !isMetaMaskConnected}
              className="gap-2 bg-[#10b981] hover:bg-[#059669]"
            >
              <Icon name="ShoppingCart" size={18} />
              Купить выбранные
            </Button>

            <Button
              onClick={handleResetSelection}
              disabled={selectedCells.length === 0}
              variant="outline"
              className="gap-2"
            >
              <Icon name="RotateCcw" size={18} />
              Сбросить
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 px-4 py-3 rounded-lg text-sm text-[#0EA5E9] flex items-center gap-2">
            <Icon name="Info" size={16} className="flex-shrink-0" />
            {currentLog}
          </div>
          <div className="bg-[#10b981]/10 border border-[#10b981]/30 px-4 py-3 rounded-lg text-sm text-[#10b981] flex items-center gap-2">
            <Icon name="CheckCircle2" size={16} className="flex-shrink-0" />
            ✅ Изображения загружены. Подключите MetaMask для покупки и загрузки.
          </div>
        </div>
      </div>
    </header>
  );

  const renderHeader2 = () => (
    <header className="bg-gradient-to-r from-[#0a0a0a] via-[#10b981]/5 to-[#0a0a0a] border-b border-[#333]">
      <div className="max-w-[1680px] mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button
            onClick={handleMetaMaskConnect}
            variant={isMetaMaskConnected ? "default" : "outline"}
            size="lg"
            className={`gap-2 ${isMetaMaskConnected ? 'bg-[#10b981] hover:bg-[#059669]' : ''}`}
          >
            <Icon name={isMetaMaskConnected ? "CheckCircle2" : "Wallet"} size={18} />
            {isMetaMaskConnected ? 'MetaMask ✓' : 'Подключить MetaMask'}
          </Button>

          <div className="h-8 w-px bg-[#333]" />

          <div className="flex items-center gap-2 px-3">
            <Icon name="TrendingUp" size={18} className="text-[#10b981]" />
            <span className="text-sm text-muted-foreground">Продано:</span>
            <span className="text-lg font-bold text-[#10b981]">{soldCount}</span>
            <span className="text-sm text-muted-foreground">/ {TOTAL_CELLS}</span>
          </div>

          <div className="h-8 w-px bg-[#333]" />

          <div className="flex items-center gap-2 px-3">
            <Icon name="MousePointerClick" size={18} className="text-[#0EA5E9]" />
            <span className="text-sm text-muted-foreground">Выбрано:</span>
            <span className="text-lg font-bold text-[#0EA5E9]">{selectedCells.length}</span>
          </div>

          <div className="flex-1" />

          <Button
            onClick={handleBuySelected}
            disabled={selectedCells.length === 0 || !isMetaMaskConnected}
            size="lg"
            className="gap-2 bg-[#10b981] hover:bg-[#059669] text-base font-semibold"
          >
            <Icon name="ShoppingCart" size={18} />
            Купить выбранные
          </Button>

          <Button
            onClick={handleResetSelection}
            disabled={selectedCells.length === 0}
            variant="ghost"
            size="lg"
            className="gap-2"
          >
            <Icon name="RotateCcw" size={18} />
            Сбросить
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 px-4 py-2.5 rounded-lg text-sm text-[#0EA5E9]">
            {currentLog}
          </div>
          <div className="bg-[#10b981]/10 border border-[#10b981]/30 px-4 py-2.5 rounded-lg text-sm text-[#10b981]">
            ✅ Изображения загружены. Подключите MetaMask для покупки и загрузки.
          </div>
        </div>
      </div>
    </header>
  );

  const renderHeader3 = () => (
    <header className="bg-[#0a0a0a]">
      <div className="max-w-[1680px] mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Продано</div>
              <div className="text-2xl font-bold text-[#10b981]">{soldCount}</div>
              <div className="text-xs text-muted-foreground">из {TOTAL_CELLS}</div>
            </div>

            <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Выбрано</div>
              <div className="text-2xl font-bold text-[#0EA5E9]">{selectedCells.length}</div>
              <div className="text-xs text-muted-foreground">ячеек</div>
            </div>

            <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Цена</div>
              <div className="text-lg font-bold text-[#8B5CF6]">0.001 ETH</div>
              <div className="text-xs text-muted-foreground">за ячейку</div>
            </div>

            <div className="bg-[#F97316]/10 border border-[#F97316]/30 rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Статус</div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isMetaMaskConnected ? 'bg-[#10b981]' : 'bg-[#666]'} animate-pulse`} />
                <span className="text-xs font-semibold">{isMetaMaskConnected ? 'Online' : 'Offline'}</span>
              </div>
              <div className="text-xs text-muted-foreground">MetaMask</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleMetaMaskConnect}
              variant={isMetaMaskConnected ? "default" : "outline"}
              className={`gap-2 ${isMetaMaskConnected ? 'bg-[#10b981] hover:bg-[#059669]' : ''}`}
            >
              <Icon name="Wallet" size={18} />
              {isMetaMaskConnected ? 'Connected' : 'Connect'}
            </Button>

            <Button
              onClick={handleBuySelected}
              disabled={selectedCells.length === 0 || !isMetaMaskConnected}
              className="gap-2 bg-[#10b981] hover:bg-[#059669]"
            >
              <Icon name="ShoppingCart" size={18} />
              Купить
            </Button>

            <Button
              onClick={handleResetSelection}
              disabled={selectedCells.length === 0}
              variant="outline"
              size="icon"
            >
              <Icon name="RotateCcw" size={18} />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-[#0EA5E9]/5 border-l-4 border-[#0EA5E9] px-4 py-2 text-sm text-[#0EA5E9]">
            {currentLog}
          </div>
          <div className="bg-[#10b981]/5 border-l-4 border-[#10b981] px-4 py-2 text-sm text-[#10b981]">
            ✅ Изображения загружены. Подключите MetaMask для покупки и загрузки.
          </div>
        </div>
      </div>
    </header>
  );

  const renderHeader4 = () => (
    <header className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-b border-[#10b981]/20 shadow-xl">
      <div className="max-w-[1680px] mx-auto px-6 py-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#10b981] to-[#0EA5E9] flex items-center justify-center">
                <Icon name="Grid3x3" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">PIXEL.NFT</h1>
                <p className="text-xs text-muted-foreground">16,000 Pixels Marketplace</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleMetaMaskConnect}
                variant={isMetaMaskConnected ? "default" : "outline"}
                className={`gap-2 ${isMetaMaskConnected ? 'bg-[#10b981] hover:bg-[#059669]' : ''}`}
              >
                <Icon name={isMetaMaskConnected ? "CheckCircle2" : "Wallet"} size={18} />
                {isMetaMaskConnected ? 'MetaMask Connected' : 'Подключить MetaMask'}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs px-3 py-1.5">
              <Icon name="Package" size={12} className="mr-1" />
              Продано: {soldCount} / {TOTAL_CELLS}
            </Badge>

            <Badge variant="outline" className="text-xs px-3 py-1.5 border-[#0EA5E9] text-[#0EA5E9]">
              <Icon name="MousePointerClick" size={12} className="mr-1" />
              Выбрано: {selectedCells.length}
            </Badge>

            <div className="flex-1" />

            <Button
              onClick={handleBuySelected}
              disabled={selectedCells.length === 0 || !isMetaMaskConnected}
              className="gap-2 bg-[#10b981] hover:bg-[#059669]"
            >
              <Icon name="ShoppingCart" size={16} />
              Купить выбранные
            </Button>

            <Button
              onClick={handleResetSelection}
              disabled={selectedCells.length === 0}
              variant="outline"
              className="gap-2"
            >
              <Icon name="RotateCcw" size={16} />
              Сбросить
            </Button>
          </div>

          <div className="bg-[#0a0a0a] border border-[#10b981]/20 rounded-lg p-3 space-y-2">
            <div className="text-xs text-[#0EA5E9] flex items-start gap-2">
              <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
              <span>{currentLog}</span>
            </div>
            <div className="text-xs text-[#10b981] flex items-start gap-2">
              <Icon name="CheckCircle2" size={14} className="mt-0.5 flex-shrink-0" />
              <span>✅ Изображения загружены. Подключите MetaMask для покупки и загрузки.</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderHeader5 = () => (
    <header className="bg-[#000] border-b-4 border-[#10b981]">
      <div className="max-w-[1680px] mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="text-2xl font-black tracking-tighter">
            <span className="text-[#10b981]">PIXEL</span>
            <span className="text-[#0EA5E9]">.NFT</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleMetaMaskConnect}
              variant={isMetaMaskConnected ? "default" : "outline"}
              size="sm"
              className={`gap-1.5 font-semibold ${isMetaMaskConnected ? 'bg-[#10b981] hover:bg-[#059669]' : 'border-2'}`}
            >
              <Icon name={isMetaMaskConnected ? "Zap" : "Wallet"} size={16} />
              {isMetaMaskConnected ? 'Connected' : 'Connect'}
            </Button>

            <div className="px-3 py-1.5 bg-[#10b981]/10 border border-[#10b981] rounded text-sm font-mono">
              <span className="text-muted-foreground">Sold:</span> <span className="text-[#10b981] font-bold">{soldCount}</span>/<span className="text-muted-foreground">{TOTAL_CELLS}</span>
            </div>

            <div className="px-3 py-1.5 bg-[#0EA5E9]/10 border border-[#0EA5E9] rounded text-sm font-mono">
              <span className="text-muted-foreground">Selected:</span> <span className="text-[#0EA5E9] font-bold">{selectedCells.length}</span>
            </div>

            <Button
              onClick={handleBuySelected}
              disabled={selectedCells.length === 0 || !isMetaMaskConnected}
              size="sm"
              className="gap-1.5 bg-[#10b981] hover:bg-[#059669] font-semibold border-2 border-[#10b981]"
            >
              <Icon name="Zap" size={16} />
              BUY NOW
            </Button>

            <Button
              onClick={handleResetSelection}
              disabled={selectedCells.length === 0}
              variant="outline"
              size="sm"
              className="gap-1.5 border-2"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-[#0EA5E9]/10 border-l-2 border-[#0EA5E9] px-3 py-2 text-xs text-[#0EA5E9] font-medium">
            {currentLog}
          </div>
          <div className="bg-[#10b981]/10 border-l-2 border-[#10b981] px-3 py-2 text-xs text-[#10b981] font-medium">
            ✅ Изображения загружены. Подключите MetaMask для покупки и загрузки.
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-[#000] text-white">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {[1, 2, 3, 4, 5].map((variant) => (
          <Button
            key={variant}
            onClick={() => setHeaderVariant(variant)}
            variant={headerVariant === variant ? "default" : "outline"}
            size="sm"
            className="w-8 h-8 p-0"
          >
            {variant}
          </Button>
        ))}
      </div>

      {headerVariant === 1 && renderHeader1()}
      {headerVariant === 2 && renderHeader2()}
      {headerVariant === 3 && renderHeader3()}
      {headerVariant === 4 && renderHeader4()}
      {headerVariant === 5 && renderHeader5()}

      <main className="p-6">
        <div className="max-w-[1680px] mx-auto bg-[#0a0a0a] border border-[#333] rounded-lg p-2">
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
                  ${selectedCells.includes(cell.id) ? 'ring-2 ring-[#0EA5E9] scale-110 z-10' : ''}
                  hover:scale-125 hover:z-20
                `}
                style={{
                  backgroundColor: cell.owned ? '#10b981' : cell.color,
                  opacity: selectedCells.includes(cell.id) ? 1 : 0.85,
                }}
                title={`Cell #${cell.id} ${cell.owned ? '(Продана)' : '(Доступна)'}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
