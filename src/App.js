import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumePage from './page/ResumePage';
import ProjectsPage from './page/ProjectsPage';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './component/Theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router basename="/zephyr-front-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
