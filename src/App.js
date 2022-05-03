import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ModList from './component/modlist'
import ModPage from './component/modpage';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ModList />} />
            <Route path="/mod/:id" element={<ModPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
