import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Graph from './pages/Graph';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import SideMenu from './components/sidemenue/SideMenu';
import Header from './components/sidemenue/Header';
import AppTheme from './components/theme/AppTheme';

function App() {
  return (
    <AppTheme>
      <div style={{ display: 'flex' }}>
        <SideMenu />
        <div style={{ flexGrow: 1 }}>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </AppTheme>
  );
}

export default App;
