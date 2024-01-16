import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Home from './components/Home';
import Org from './components/Org';
import Tool1 from './components/org/Tool1';
import Tool2 from './components/org/Tool2'; 
import User from './components/User';
import Tool3 from './components/user/Tool3';
import Tool4 from './components/user/Tool4';
import Khac from './components/Khac';
import Tool5 from './components/khac/Tool5';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Content>
          <Routes>
            <Route path="/components/" exact component={Home} />
            <Route path="/components/org" exact component={Org} />
            <Route path="/components/org/tool1" component={Tool1} />
            <Route path="/components/org/tool2" component={Tool2} />
            <Route path="/components/user" exact component={User} />
            <Route path="/components/user/tool3" component={Tool3} />
            <Route path="/components/user/tool4" component={Tool4} />
            <Route path="/components/khac" exact component={Khac} />
            <Route path="/components/khac/tool5" component={Tool5} />
          </Routes>
        </Content>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
