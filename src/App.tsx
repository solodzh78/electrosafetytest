import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Layout } from './components/layout/Layout';
import { Quiz } from './components/quiz/Quiz';
import About from './pages/About';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';

function App() {
	return (
		<div className="App">
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Quiz />} />
                    <Route path='home' element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
		</div>
	)
}

export default App;
