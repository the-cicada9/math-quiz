import React from 'react';
import QuizPage from './pages/QuizPage/QuizPage';
import { Routes , Route } from 'react-router-dom';
import Homepage from './pages/HomePage/Homepage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/quiz-page/:level" element={<QuizPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App