import { useEffect, useState } from "react";
import { ApiResponse } from "../type/product";
import { getProduct } from "../api/getProduct";

function ProductTable() {

  const [allProducts, setAllProducts] = useState<ApiResponse | undefined>();

  useEffect(() => {
    async function fetchProducts() {
      const result = await getProduct();
      setAllProducts(result);
    }
    fetchProducts()
    console.log(allProducts)
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* {isLoading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error loading data: {error.message}</p>} */}

      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Tabela</h2>

        {allProducts && allProducts.data.dailyEquityByPortfolioChartData.length > 0 && (
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
                {allProducts.data.dailyEquityByPortfolioChartData.map((item, index) => (
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
        {/* {!isLoading && filteredData.length === 0 && !error && <p className="text-center">No data available.</p>} */}
      </div>
    </div>
  );
}

export default ProductTable;
