import { useSearchParams } from 'react-router-dom';

function FilteringField() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterId = searchParams.get('id') || '';
  const filterName = searchParams.get('name') || '';
  const isAscending = searchParams.get('order') !== 'desc';

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const toggleSort = () => {
    const newParams = new URLSearchParams(searchParams);
    const currentOrder = newParams.get('order');
    newParams.set('order', currentOrder === 'desc' ? 'asc' : 'desc');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="flex justify-center space-x-4 mb-4 pt-6 flex-wrap gap-y-2">
      <div>
        <label className="block text-sm text-center font-medium">Id</label>
        <input
          type="text"
          value={filterId}
          onChange={(e) => handleFilterChange('id', e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded"
          placeholder="Digite o Id"
        />
      </div>
      <div>
        <label className="block text-sm text-center font-medium">Nome</label>
        <input
          type="text"
          value={filterName}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded"
          placeholder="Digite o Nome"
        />
      </div>
      <div className="flex items-end">
        <button
          onClick={toggleSort}
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ordenar {isAscending ? 'Ascendente' : 'Descendente'}
        </button>
      </div>
      <div className="flex items-end">
        <button
          onClick={clearFilters}
          className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}

export default FilteringField;
