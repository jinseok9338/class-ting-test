// IndexPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl mb-8">Welcome to the Quiz App</h1>
            <Link to="/quiz">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md text-lg hover:bg-green-600 transition duration-300">
                    Start Quiz
                </button>
            </Link>
        </div>
    );
};

export default IndexPage;
