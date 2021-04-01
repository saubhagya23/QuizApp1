import React, {Component} from 'react';
import './App.css';
import { quizQuestions } from './Utils/util'
import Timer from './Component/Timer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: quizQuestions(),
      currentQuestion: 0,
      score: 0,
      showScore: false,
      resultList: []
    };
  }

  handleAnswerOptionClick = (isCorrect) => {
    const {
      score,
      currentQuestion,
      questions,
      resultList
    } = this.state;
		if (isCorrect) {
      const results = [...resultList, 'Correct'];
			this.setState({
        score: score + 1,
        resultList: results
      });
		} else {
      const results = [...resultList, 'Not Correct'];
      this.setState({
        resultList: results
      });
    }

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			this.setState({
        currentQuestion: nextQuestion
      });
		} else {
			this.setState({
        showScore: true
      });
		}
	};

  onSkipQuestionClick = (currentSkippedQuestion) => {
    const {resultList, currentQuestion, questions} = this.state;
    const nextQuestion = currentQuestion + 1;
    var skippedQuestionList = [...resultList, 'Not Answered'];
    if (nextQuestion < questions.length) {
      this.setState({
        resultList: skippedQuestionList,
        currentQuestion: currentSkippedQuestion+1
      })
    } else {
			this.setState({
        resultList: skippedQuestionList,
        currentQuestion: currentSkippedQuestion+1,
        showScore: true
      });
		}
  }

  render() {
    const {questions, currentQuestion, showScore, score, resultList} = this.state;
    return (
      <div className="App">
        {
          showScore ? (
            <div className='scoreSection'>
              You scored {score} out of {questions.length}!
              <div className='resultList'>
                {
                  resultList.map((item, index) => (
                    <span>{index+1} : {item}</span>
                  ))
                }
              </div>
            </div>
          ) : (
            <div className='parentSection'>
              <div className='subSection'>
                <div className='quesSection'>
                  <div className='quesCount'>
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className='quesText'>{questions && questions.length > 0 && currentQuestion <= 3 && questions[currentQuestion].questionText}</div>
                </div>
                <div className='ansSection'>
                  {questions && questions.length > 0 && currentQuestion <= 3 && questions[currentQuestion].answerOptions.map((answerOption) => (
                    <button onClick={() => this.handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => this.onSkipQuestionClick(currentQuestion)}>Skip Question</button>
              {(questions && currentQuestion >= 0 && currentQuestion <= 3 ) && <Timer duration={20} timeoutFn={() => this.onSkipQuestionClick(currentQuestion)} />}
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
