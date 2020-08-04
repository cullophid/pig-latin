import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function translateEnglishToPigLatin(sentence) {
  let words = sentence.toLowerCase().replace(/[^\w\s]/g, "");
  words = words.split(" ");
  console.log(words);
  let result = words.map(function(word) {
    return word
      .replace(/^[aeiou]\w*/, "$&way")
      .replace(/(^[^aeiou]+)(\w*)/, "$2$1ay");
  });
  result = result.join(" ");
  result = result[0].toUpperCase() + result.slice(1);
  if (sentence.endsWith("?")) {
    result += "?";
  } else {
    result += ".";
  }
  return result;
}

function myFunction() {
  var copyText = document.getElementById("pig-latin-text");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      submit: "",

      submitHistory: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submit: this.state.input,
      input: this.state.input,

      submitHistory: [...this.state.submitHistory, this.state.submit]
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <header className="header">
            <img
              className="header-img"
              src="littlepiggy.png"
              alt="A piglet from the front"
            />
            <h1 className="header-h1">The Pig Latin Translator!</h1>
          </header>
          <div className="instructionSection" />
          <div className="form">
            <form className="flex-1 flex-column" onSubmit={this.handleSubmit}>
              <label className="inputLabel" htmlFor="english-input-text">
                English
              </label>
              <textarea
                id="english-input-text"
                className="inputBox"
                value={this.state.input}
                onChange={this.handleChange}
                onKeyDown={event => {
                  console.log(event.key);
                  if (event.key === "Enter" && event.shiftKey === false) {
                    this.handleSubmit(event);
                  }
                }}
              />

              <button className="submitButton" type="submit">
                Translate
              </button>
            </form>
            <div className="flex-1 margin-left flex-column">
              <label className="inputLabel">Pig Latin</label>
              <textarea
                id="pig-latin-text"
                className="translationBox"
                readonly
                value={
                  this.state.submit
                    ? translateEnglishToPigLatin(this.state.submit)
                    : ""
                }
              />

              <button onClick={myFunction} className="copyButton">
                Copy to clipboard
              </button>
            </div>
          </div>

          <div className="historyHeadingBox">
            <h2 className="historyHeading">History</h2>
          </div>
          <ul className="history">
            {this.state.submitHistory.slice(1).map((submitItem, i) => (
              <li className="historyItem" key={i}>
                <span className="historyItemInput">{submitItem}</span>
                <span className="historyItemTranslation">
                  {translateEnglishToPigLatin(submitItem)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
