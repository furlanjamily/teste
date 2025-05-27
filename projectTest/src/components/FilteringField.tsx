import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/getProduct';

function FilteringField() {
  const { id } = useParams();

  const [filterId, setFilterId] = useState('');
  const [filterName, setFilterName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  const [products, setProducts] = useState<SnapshotByProduct[]>([]);
  const [filtered, setFiltered] = useState<SnapshotByProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await getProduct();
        const data = response.data.snapshotByProduct;

        setProducts(data);

        if (id) {
          setFilterId(id);
          const result = data.filter(
            (item) => item.fixedIncome.portfolioProductId.toString() === id
          );
          setFiltered(result);
        } else {
          setFiltered(data);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const filterData = () => {
    setIsLoading(true);
    let result = [...products];

    if (filterId) {
      result = result.filter((item) =>
        item.fixedIncome.portfolioProductId.toString().includes(filterId)
      );
    }

    if (filterName) {
      result = result.filter((item) =>
        item.fixedIncome.name
          ?.toLowerCase()
          .includes(filterName.toLowerCase())
      );
    }

    if (!isAscending) {
      result.reverse();
    }

    setFiltered(result);
    setIsLoading(false);
  };

  const toggleSort = () => {
    setIsAscending((prev) => !prev);
    setFiltered((prev) => [...prev].reverse());
  };

  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-sm text-center font-medium">Id</label>
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
            className={`ml-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'
              } text-white px-4 py-2 rounded hover:bg-blue-600`}
          >
            Filtrar
          </button>
        </div>
        <div className="flex items-end">
          <button
            onClick={toggleSort}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Ordenar {isAscending ? 'Ascendente' : 'Descendente'}
          </button>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-lg font-bold mb-2">Produtos Filtrados</h2>
        {isLoading ? (
          <p>Carregando...</p>
        ) : filtered.length === 0 ? (
          <p>Nenhum produto encontrado</p>
        ) : (
          <ul className="space-y-2">
            {filtered.map((item) => (
              <li key={item.fixedIncome.portfolioProductId}>
                <strong>ID:</strong> {item.fixedIncome.portfolioProductId} -{' '}
                <strong>Nome:</strong> {item.fixedIncome.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default FilteringField;
