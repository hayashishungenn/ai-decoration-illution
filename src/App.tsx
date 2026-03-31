import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeEntryPage } from './pages/HomeEntryPage';
import { SelectAreaPage } from './pages/SelectAreaPage';
import { SelectBudgetPage } from './pages/SelectBudgetPage';
import { SelectStylePage } from './pages/SelectStylePage';
import { GeneratingPage } from './pages/GeneratingPage';
import { ResultPage } from './pages/ResultPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<HomeEntryPage />} />
          <Route path="/area" element={<SelectAreaPage />} />
          <Route path="/budget" element={<SelectBudgetPage />} />
          <Route path="/style" element={<SelectStylePage />} />
          <Route path="/generating" element={<GeneratingPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
