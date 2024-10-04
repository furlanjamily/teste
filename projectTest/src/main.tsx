import { createRoot } from 'react-dom/client'
import './index.css'
import FixedIncomeTable from './components/productTable'

createRoot(document.getElementById('root')!).render(
  <div>
    <FixedIncomeTable />
  </div>
)
