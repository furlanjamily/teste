import { createRoot } from 'react-dom/client'
import './index.css'
import ProductTable from "./components/productTable.tsx"

createRoot(document.getElementById('root')!).render(
  <div>
    <ProductTable />
  </div>
)
