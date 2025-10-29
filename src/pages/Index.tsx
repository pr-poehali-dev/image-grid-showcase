import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCells, setSelectedCells] = useState<number>(0);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [currentLog, setCurrentLog] = useState('💡 Кликните по своей (тёмно-зелёной) ячейке — появится окно загрузки.');

  const soldCount = 18;
  const totalCells = 16000;

  const handleMetaMaskConnect = () => {
    setIsMetaMaskConnected(!isMetaMaskConnected);
    setCurrentLog(isMetaMaskConnected 
      ? '🔌 MetaMask отключен' 
      : '✅ MetaMask подключен успешно'
    );
  };

  const handleBuySelected = () => {
    if (selectedCells === 0) {
      setCurrentLog('⚠️ Выберите хотя бы одну ячейку для покупки');
      return;
    }
    if (!isMetaMaskConnected) {
      setCurrentLog('⚠️ Подключите MetaMask для покупки');
      return;
    }
    setCurrentLog(`💰 Покупка ${selectedCells} ячеек... Ожидайте подтверждения транзакции`);
  };

  const handleResetSelection = () => {
    setSelectedCells(0);
    setCurrentLog('🔄 Выбор сброшен');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="backdrop-blur-xl bg-secondary/60 border border-border rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">PIXEL.NFT</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Decentralized Pixel Marketplace</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={handleMetaMaskConnect}
                variant={isMetaMaskConnected ? "default" : "outline"}
                size="lg"
                className="font-medium gap-2 transition-all hover:scale-105"
              >
                <Icon name={isMetaMaskConnected ? "CheckCircle2" : "Wallet"} size={18} />
                {isMetaMaskConnected ? 'Connected' : 'Connect MetaMask'}
              </Button>

              <Button
                onClick={handleBuySelected}
                disabled={selectedCells === 0 || !isMetaMaskConnected}
                size="lg"
                className="font-medium gap-2 bg-accent hover:bg-accent/90 transition-all hover:scale-105 disabled:opacity-40"
              >
                <Icon name="ShoppingCart" size={18} />
                Buy Selected
              </Button>

              <Button
                onClick={handleResetSelection}
                disabled={selectedCells === 0}
                variant="ghost"
                size="lg"
                className="font-medium gap-2 transition-all hover:scale-105"
              >
                <Icon name="RotateCcw" size={18} />
                Reset
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-background/40 backdrop-blur-sm rounded-xl p-5 border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Sold</p>
                  <p className="text-2xl font-semibold">{soldCount.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-accent" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-background rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-accent to-accent/70 h-full transition-all duration-500"
                    style={{ width: `${(soldCount / totalCells) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{totalCells.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-background/40 backdrop-blur-sm rounded-xl p-5 border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Selected</p>
                  <p className="text-2xl font-semibold">{selectedCells.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="MousePointerClick" size={20} className="text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Click cells to select</p>
            </div>

            <div className="bg-background/40 backdrop-blur-sm rounded-xl p-5 border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price per Cell</p>
                  <p className="text-2xl font-semibold">0.001 ETH</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="Coins" size={20} className="text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">≈ $2.50 USD</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-accent/5 border border-accent/20 rounded-xl px-4 py-3.5 flex items-start gap-3">
              <Icon name="Info" size={18} className="text-accent mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground/90 leading-relaxed">{currentLog}</p>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-xl px-4 py-3.5 flex items-start gap-3">
              <Icon name="CheckCircle2" size={18} className="text-accent mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground/90 leading-relaxed">✅ Изображения загружены. Подключите MetaMask для покупки и загрузки.</p>
            </div>
          </div>
        </header>

        <main className="mt-8 backdrop-blur-xl bg-secondary/30 border border-border rounded-2xl p-12 shadow-2xl">
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-6">
              <Icon name="Grid3x3" size={40} className="text-accent" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Pixel Grid Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              16,000 unique pixel cells ready for your NFT artwork. Click to select, connect wallet, and claim your space.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
