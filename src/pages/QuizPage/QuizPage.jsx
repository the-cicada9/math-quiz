import React, { useEffect, useState } from 'react';
import './QuizPage.css'; 
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal';

function QuizPage() {

  const {level} = useParams()
  console.log(level);

  const profileName = localStorage.getItem("profileName")
  
  let title = ''
  if(level === 'easy'){
    title = 'Easy-Level'
  }else if(level === 'medium'){
    title = 'Medium-Level'
  }else if(level === 'hard'){
    title = 'Hard-Level';
  }

  const [noOfQ, setNoOfQ] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const [userClickedOptions, setUserClickedOptions] = useState({}); 
  const [result, setResult] = useState(null); 
  const [num , setNum] = useState(null)
  const [allResults , setAllResults] = useState([])
  const operators = ['+', '-', '*', '/'];
  const [isModalOpen , setIsModalOpen] = useState(false)

  function getRandomInt(num) {
    return Math.floor(Math.random() * num);
  }

  function generateOptions(answer) {
    const allOptions = [];
    for (let i = 0; i < 3; i++) {
      allOptions.push(getRandomInt(100));
    }
    allOptions.push(answer);
    return allOptions;
  }

  function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const generateQuestionsAnswersOptions = (num) => {
    const newQuestions = [];
    const allAnswers = [];
    const allOptions = [];
    for (let i = 0; i < num; i++) {

      let numb = 56
      if(level === 'easy'){
        numb = 100
      }else if(level === 'medium'){
        numb = 10000
      }else if(level === 'hard'){
        numb = 10000000;
      }

      const op1 = getRandomInt(numb);
      const op2 = getRandomInt(numb);
      const indexOfOperator = getRandomInt(operators.length);
      const operator = operators[indexOfOperator];

      let answer = 0;
      if (operator === "*") answer = op1 * op2;
      else if (operator === "+") answer = op1 + op2;
      else if (operator === "-") answer = op1 - op2;
      else if (operator === "/") answer = parseFloat((op1 / op2).toFixed(2));

      const que = `${op1} ${operator} ${op2}`;
      newQuestions.push({ question: que });
      allAnswers.push(answer);
      const op = generateOptions(answer);
      const shuffledArr = fisherYatesShuffle([...op]);
      allOptions.push(shuffledArr);
    }
    setQuestions(newQuestions);
    setAnswers(allAnswers);
    setOptions(allOptions);
    setResult(null); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const num = parseInt(noOfQ);
    if (isNaN(num) || num <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }
    generateQuestionsAnswersOptions(num);
  };

  const handleOptionChange = (questionIndex, value) => {
    setUserClickedOptions({
      ...userClickedOptions,
      [questionIndex]: value,
    });
  };

  const handleCheckAnswer = () => {
    const totalQuestions = answers.length;
    let correctCount = 0;

    answers.forEach((answer, index) => {
      if (parseFloat(userClickedOptions[index]) === answer) {
        correctCount++;
      }
    });

    const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);
    setResult(percentage);
    setAllResults([...allResults , percentage])
  };
  console.log(allResults);
  
  function handlePlayAgain(){
    // setNoOfQ("")
    setAnswers([])
    setQuestions([])
    setOptions([])
    setUserClickedOptions([])
    // setAllResults(result)
    // console.log(allResults);
    setResult(null)
    setIsModalOpen(false)
  }

  // function handleScore(){

  // }
  // useEffect(() => {
  //   if(questions.length > 0){
  //     const interval = setInterval(() => {
  //       setTimers((prevTimers) => {
  //         const newTimers = {...prevTimers};
  //         Object.keys(newTimers).forEach((key) => {
  //           if(newTimers[key] > 0){
  //             newTimers[key] -= 1
  //           }
  //         });
  //         return newTimers
  //       })
  //     },1000)
  //     return () => classInterval(interval)
  //   }
  // },[questions])

  return (
    <div className="app">
      <h1 className='text-[36px] font-semibold m-[21px]'>{title}</h1>
      <div className="flex justify-center items-center">
        <h1 className='text-[30px] flex justify-center items-center'>Welcome {profileName}
          <img className="pl-4 w-[120px] rounded-3xl" src="https://i.pinimg.com/736x/f1/64/eb/f164ebfd7d12f7b0d8704b0ee3aaa95a.jpg" alt="" />
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Enter number of questions : 
          <input
            type="text"
            value={noOfQ}
            onChange={(e) => setNoOfQ(e.target.value)}
            className="border-2 rounded-md ml-[12px] pl-[12px]"
          />
        </label>
        <button type="submit" className="form-button">Submit</button>
      </form>

      {questions.length > 0 && (
        <div className="quiz-container">
          <h2 className='text-[21px] text-gray-600 font-medium mb-[21px]'>Generated Questions</h2>
          <ul className="question-list font-semibold rounded-[12px]">
            {questions.map((q, index) => (
              <li key={index} className="question-item p-[12px] border-2 rounded-[12px]">
                <strong>Q{index + 1}:</strong> {q.question}
                {/* <span className='text-[15px] text-gray-600 ml-[120px] font-semibold'>Time left: {timers[index] || 0}s</span> */}
                <div className="options border-2 p-2 rounded-[12px] font-medium text-gray-600">
                  {options[index]?.map((option, optIndex) => (
                    <div key={optIndex} className="option-item">
                      <label>
                        <input
                          type="radio"
                          name={`questions-${index}`}
                          value={option}
                          checked={userClickedOptions[index] === option}
                          // className='p-[12px]'
                          // disabled = {timer[index] === 0}
                          onChange={() => handleOptionChange(index, option)}
                        />
                        <span className='px-[12px]'>{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {questions.length > 0 && (
        <div className=''>
          <button onClick={handleCheckAnswer} className="result-button">
            Show Result
          </button>
          <button onClick={handlePlayAgain} className="result-button ml-[21px]">
            Play Again
          </button>
          {result !== null && (
            <div className="result">
              <h3>Your Score: {result}%</h3>
            </div>
          )}
          <button onClick={() => setIsModalOpen(!isModalOpen)} className="result-button ml-[21px] mt-[21px] ">
          View Your Score
          </button>
          {isModalOpen ? 
            (
              <div className='mt-[21px] position-absolute'>
                <Modal allResults={allResults} isModalOpen = {isModalOpen} setIsModalOpen={setIsModalOpen}/>
              </div>
            )
              :
            (<></>)
          }
        </div>
      )}
    </div>
  );
}

export default QuizPage;