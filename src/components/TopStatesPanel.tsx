import { useContext, useMemo } from 'react';
import { solarPowerGenerationContext } from '../context/SPGenerationContext';
import type { YearDataProps } from '../context/SPGenerationContext';
import { YearContext } from '../context/YearContext';
import { Trophy, TrendingUp } from 'lucide-react';

interface StateRankingData {
  state: string;
  generation: number;
  percentageOfTotal: number;
  yoyGrowth: number | null;
  rank: number;
}

const TopStatesPanel = () => {
  const { generationData } = useContext(solarPowerGenerationContext);
  const { year } = useContext(YearContext);

  const topStates = useMemo(() => {
    if (!generationData || generationData.length === 0) return [];

    const currentYear = year as keyof YearDataProps;
    
    // Calculate total generation for the selected year
    const totalGeneration = generationData.reduce((sum, state) => {
      const value = state[currentYear];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);

    // Get previous year for YoY calculation
    const yearNum = year === '2017-2023' ? 2022 : parseInt(year);
    const previousYear = (yearNum - 1).toString() as keyof YearDataProps;
    const hasPreviousYear = year !== '2017-2023' && yearNum > 2017;

    // Map and calculate metrics for each state
    const statesWithMetrics: StateRankingData[] = generationData
      .filter((stateData) => stateData.State !== 'Total')
      .map((stateData) => {
        const currentGeneration = stateData[currentYear] as number;
        const previousGeneration = hasPreviousYear ? (stateData[previousYear] as number) : null;
        
        let yoyGrowth: number | null = null;
        if (hasPreviousYear && previousGeneration !== null && previousGeneration > 0) {
          yoyGrowth = ((currentGeneration - previousGeneration) / previousGeneration) * 100;
        }

        return {
          state: stateData.State,
          generation: currentGeneration,
          percentageOfTotal: (currentGeneration / totalGeneration) * 100,
          yoyGrowth,
          rank: 0,
        };
      })
      .sort((a, b) => b.generation - a.generation)
      .slice(0, 5)
      .map((state, index) => ({
        ...state,
        rank: index + 1,
      }));

    return statesWithMetrics;
  }, [generationData, year]);

  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toFixed(decimals);
  };

  const getRankColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'text-yellow-300';
      case 2:
        return 'text-gray-300';
      case 3:
        return 'text-orange-300';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="w-68 bg-[#039dbf] h-auto rounded-sm mt-20 p-4 overflow-y-auto">
      <div className="flex items-center justify-center gap-2 mb-4 pb-2 border-b border-white/20">
        <Trophy className="text-yellow-300" size={24} />
        <h2 className="text-white text-lg font-semibold">Top 5 States</h2>
      </div>

      <div className="space-y-3">
        {topStates.map((state) => (
          <div
            key={state.state}
            className="bg-white/10 rounded-md p-3 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${getRankColor(state.rank)}`}>
                  #{state.rank}
                </span>
                <span className="text-white font-medium text-sm">{state.state}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-white/90">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Generation:</span>
                <span className="font-semibold">{formatNumber(state.generation)} GW</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white/70">% of Total:</span>
                <span className="font-semibold">{formatNumber(state.percentageOfTotal)}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white/70 flex items-center gap-1">
                  <TrendingUp size={12} />
                  YoY Growth:
                </span>
                <span
                  className={`font-semibold ${
                    state.yoyGrowth === null
                      ? 'text-white/50'
                      : state.yoyGrowth >= 0
                      ? 'text-green-300'
                      : 'text-red-300'
                  }`}
                >
                  {state.yoyGrowth === null
                    ? 'N/A'
                    : `${state.yoyGrowth >= 0 ? '+' : ''}${formatNumber(state.yoyGrowth)}%`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {topStates.length === 0 && (
        <div className="text-white/70 text-center mt-8">
          Loading data...
        </div>
      )}
    </div>
  );
};

export default TopStatesPanel;
