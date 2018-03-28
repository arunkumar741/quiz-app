import React, { Component } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quizQuestions:[],
      counter: 0,
      questionId: 1,
      questionTitle: '',
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: 0,
      result: false
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.skipAnswer = this.skipAnswer.bind(this);
  }

  componentWillMount() {
    this.fetchData('https://s3-ap-southeast-1.amazonaws.com/grow-fit-stage/uploads/quizapp/quiz.json');
  }

  fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then(json => this.handleResponse(json))
      .catch(() => console.log('Error'));
  }

  handleResponse = (response) => {
      const quizQuestions = [];
      Object.keys(response).forEach(function(key) {
          const obj = response[key];
          quizQuestions.push({
                questionTitle: obj.title,
                question:obj.text,
                answers:obj.options,
                answer_id:obj.answer_id
              });
      });
      const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
      this.setState({
        quizQuestions: quizQuestions,
        question: quizQuestions[0].question,
        questionTitle: quizQuestions[0].questionTitle,
        answerOptions: shuffledAnswerOptions[0]
      });
  };

  shuffleArray(array) {
    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    this.changeValues();
  }

  skipAnswer(event) {
    this.changeValues();
  }

  changeValues(){
  if (this.state.questionId < this.state.quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(), 300);
    }
  }

  setUserAnswer(answer) {
    if(answer===this.state.quizQuestions[this.state.counter].answer_id){
        this.setState({
        answersCount: this.state.answersCount + 1});
    }
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: this.state.quizQuestions[counter].question,
        questionTitle: this.state.quizQuestions[counter].questionTitle,
        answerOptions: this.state.quizQuestions[counter].answers,
        answer: ''
    });
  }

  setResults() {
      this.setState({ result: true });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTitle={this.state.questionTitle}
        questionTotal={this.state.quizQuestions.length}
        onSkipped={this.skipAnswer}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.answersCount}  quizResult2={this.state.quizQuestions.length - this.state.answersCount}/>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Quiz App</h1>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default App;
