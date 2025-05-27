import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ApiResponse } from '../type/product';
import { getProduct } from '../api/getProduct';

function ProductTable() {
  const [allProducts, setAllProducts] = useState<ApiResponse | undefined>();
  const [searchParams] = useSearchParams();

  const filterId = searchParams.get('id');
  const filterName = searchParams.get('name')?.toLowerCase();
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    async function fetchProducts() {
      const result = await getProduct();
      setAllProducts(result);
    }
    fetchProducts();
  }, []);

  const filteredAndSortedData = allProducts?.data.dailyEquityByPortfolioChartData
    ?.filter((item) => {
      const matchesId = filterId ? item.portfolioProductId.toString().includes(filterId) : true;
      const matchesName = filterName ? item.productName.toLowerCase().includes(filterName) : true;
      return matchesId && matchesName;
    })
    .sort((a, b) => {
      return order === 'asc' ? a.value - b.value : b.value - a.value;
    }) || [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Tabela</h2>

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
            {filteredAndSortedData.map((item, index) => (
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
    </div>
  );
}

export default ProductTable;
