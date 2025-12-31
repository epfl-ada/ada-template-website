
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { RQ1Spatial } from "./components/RQ1Spatial";
import { RQ2Temporal } from "./components/RQ2Temporal";
import { RQ3CellTypes } from "./components/RQ3CellTypes";
import { About } from "./components/About";
import { ScrollToTop } from "./components/ScrollToTop";
import { DatasetMethods } from "./components/dataset_methods";
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />

      <div className="min-h-screen bg-[#0a0e27]">
        <Navigation />

        <Routes>
          {/* Accueil */}
          <Route path="/" element={<HomePage />} />

          {/* Pages */}
          <Route path="/dataset-methods" element={<DatasetMethods />} />
          <Route path="/rq1-spatial" element={<RQ1Spatial />} />
          <Route path="/rq2-temporal" element={<RQ2Temporal />} />
          <Route path="/rq3-celltypes" element={<RQ3CellTypes />} />
          <Route path="/about" element={<About />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
