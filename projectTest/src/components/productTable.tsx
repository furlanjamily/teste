import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../index.css";

interface InvestmentData {
  portfolioProductId: number;
  productName: string;
  correctedQuota: number;
  value: number;
}

const ProductTable: React.FC = () => {
  const [data, setData] = useState<InvestmentData[]>([]);
  const [filteredData, setFilteredData] = useState<InvestmentData[]>([]);
  const [productIdFilter, setProductIdFilter] = useState<string>('');
  const [productNameFilter, setProductNameFilter] = useState<string>('');
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  useEffect(() => {
    axios.get('https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData')
      .then(response => {
        const { dailyEquityByPortfolioChartData } = response.data.data;
        // Filtrar valores undefined antes de definir o estado
        const validData: InvestmentData[] = dailyEquityByPortfolioChartData.filter(
          (item: InvestmentData | undefined): item is InvestmentData => item !== undefined
        );
        setData(validData);
        setFilteredData(validData);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  const handleFilter = () => {
    let filtered = data;

    if (productIdFilter) {
      filtered = filtered.filter(item => 
        item.portfolioProductId.toString().includes(productIdFilter)
      );
    }

    if (productNameFilter) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(productNameFilter.toLowerCase())
      );
    }

    // Filtra para garantir que portfolioProductId seja único
    const uniqueFilteredData = Array.from(new Set(filtered.map(item => item.portfolioProductId)))
      .map(id => filtered.find(item => item.portfolioProductId === id))
      .filter((item): item is InvestmentData => item !== undefined); // Filtra undefined

    setFilteredData(uniqueFilteredData);
  };

  const handleSortToggle = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return sortAscending ? a.value - b.value : b.value - a.value;
    });
    setFilteredData(sortedData);
    setSortAscending(!sortAscending);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-red-950 mb-4">Tabela de Produtos de Investimento</h1>

      <div className="flex mb-4 gap-4">
        <input 
          type="text" 
          placeholder="Id do Produto" 
          value={productIdFilter}
          onChange={e => setProductIdFilter(e.target.value)}
          className="border p-2"
        />
        <input 
          type="text" 
          placeholder="Nome do Produto" 
          value={productNameFilter}
          onChange={e => setProductNameFilter(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleFilter} className="bg-blue-500 text-white p-2">
          Filtrar
        </button>
        <button onClick={handleSortToggle} className="bg-gray-500 text-white p-2">
          Ordenar por Valor ({sortAscending ? 'Ascendente' : 'Descendente'})
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Nome do Produto</th>
            <th className="border px-4 py-2">Cota Corrigida</th>
            <th className="border px-4 py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.portfolioProductId}>
              <td className="border px-4 py-2">{item.portfolioProductId}</td>
              <td className="border px-4 py-2">{item.productName}</td>
              <td className="border px-4 py-2">{item.correctedQuota}</td>
              <td className="border px-4 py-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
