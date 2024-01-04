import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages';
import QuizPage from './pages/quiz';
import ResultPage from './pages/result';


const routes: Record<string, string> = {
    "index": "/",
    "quiz": "/quiz",
    "result": "/result"
} as const

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path={routes.index} element={<IndexPage />} />
                <Route path={routes.quiz} element={<QuizPage />} />
                <Route path={routes.result} element={<ResultPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;