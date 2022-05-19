import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Layout } from './components/layout/Layout';
import { Quiz } from './components/quiz/Quiz';

import About from './pages/About';
import Docs from './pages/Docs';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Tests from './pages/Tests/Tests';

import './App.css';

function App() {
	return (
		<div className="App">
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='tests' element={<Tests />} />
                    <Route path='docs' element={<Docs />} />
                    <Route path='about' element={<About />} />
                    <Route path='quiz/:id' element={<Quiz />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
		</div>
	)
}

export default App;
