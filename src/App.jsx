import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import {
  HomePage,
  AboutPage,
  FeaturesPage,
  TechnologyPage,
  DashboardPage,
  ContactPage,
  AnalyticsPage,
} from './pages';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
