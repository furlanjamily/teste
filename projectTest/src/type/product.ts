interface FixedIncomeData {
  equity: number;
  valueApplied: number;
  equityProfit: number;
  percentageProfit: number;
  indexerValue: number;
  percentageOverIndexer: number;
}

interface DailyEquityByPortfolioChartData {
  correctedQuota: number;
  dailyReferenceDate: number;
  movementTypeId: number;
  portfolioProductId: number;
  productName: string;
  value: number;
}

interface SnapshotByProduct {
  due: {
    date: string;
    daysUntilExpiration: number;
  };
  fixedIncome: {
    bondType: string;
    name: string;
    portfolioProductId: number;
  };
  hasBalance: number;
  position: {
    equity: number;
    indexerLabel: string;
    indexerValue: number;
    percentageOverIndexer: number;
    portfolioPercentage: number;
    profitability: number;
    valueApplied: number;
  };
  productHasQuotation: number;
}

export interface ApiResponse {
  success: boolean;
  data: {
    snapshotByPortfolio: FixedIncomeData;
    dailyEquityByPortfolioChartData: DailyEquityByPortfolioChartData[];
    snapshotByProduct: SnapshotByProduct[];
  };
  error: string | null;
}
