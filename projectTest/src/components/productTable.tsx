import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FixedIncomeData {
  portfolioProductId: number;
  productName: string;
  correctedQuota: number;
  value: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    dailyEquityByPortfolioChartData: FixedIncomeData[];
    snapshotByPortfolio: any;
    snapshotByProduct: any;
  };
}

const FixedIncomeTable: React.FC = () => {
  const [data, setData] = useState<FixedIncomeData[]>([]);
  const [filteredData, setFilteredData] = useState<FixedIncomeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);


  const [filterId, setFilterId] = useState('');
  const [filterName, setFilterName] = useState('');


  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<ApiResponse>(
          'https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData'
        );

        if (response.data && response.data.success && response.data.data) {
          const fixedIncomeData = response.data.data.dailyEquityByPortfolioChartData;

          if (Array.isArray(fixedIncomeData)) {
            setData(fixedIncomeData);
            setFilteredData(fixedIncomeData);
          } else {
            setError(new Error('Data format is incorrect. Expected an array.'));
          }
        } else {
          setError(new Error('API response format is incorrect.'));
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  // Função para filtrar os dados
  const filterData = () => {
    let filtered = data;

    if (filterId) {
      filtered = filtered.filter(item => item.portfolioProductId.toString() === filterId);
    }

    if (filterName) {
      filtered = filtered.filter(item => item.productName.toLowerCase().includes(filterName.toLowerCase()));
    }

    setFilteredData(filtered);
  };

  // Função para alternar a ordenação 
  const toggleSort = () => {
    setIsAscending(!isAscending);
    const sortedData = [...filteredData].sort((a, b) => {
      return isAscending ? a.value - b.value : b.value - a.value;
    });
    setFilteredData(sortedData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isLoading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error loading data: {error.message}</p>}

      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Tabela</h2>
        <div className="flex justify-center space-x-4 mb-4">
          <div>
            <label className="block text-sm text-center font-medium ">Id</label>
            <input
              type="text"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
              placeholder="Digite o Id"
            />
          </div>
          <div>
            <label className="block text-sm text-center font-medium">Nome</label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
              placeholder="Digite o Nome"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={filterData}
              disabled={isLoading}
              className={`ml-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white px-4 py-2 rounded hover:bg-blue-600`}
            >
              Filtrar
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={toggleSort}
              className={`ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600`}
            >
              Ordenar {isAscending ? 'Ascendente' : 'Descendente'}
            </button>
          </div>
        </div>
      </div>

      {!isLoading && filteredData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Nome do Produto</th>
                <th className="py-3 px-6 text-right">Cota Corrigida</th>
                <th className="py-3 px-6 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredData.map((item, index) => (
                <tr key={`${item.portfolioProductId}-${index}`} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{item.portfolioProductId}</td>
                  <td className="py-3 px-6 text-left">{item.productName}</td>
                  <td className="py-3 px-6 text-right">{item.correctedQuota.toFixed(2)}</td>
                  <td className="py-3 px-6 text-right">{item.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && filteredData.length === 0 && !error && <p className="text-center">No data available.</p>}
    </div>
  );
};

export default FixedIncomeTable;
