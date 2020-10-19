import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

const title = 'Indecision app';
const subtitle = 'Put your life in my hands and be confused';

class App extends React.Component {
  state = {
    options: [],
    selectedOption: null,
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = option => {
    this.setState(prevState => ({
      options: prevState.options.filter(el => option !== el),
    }));
  };

  handleRandomPick = () => {
    const randNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randNum];
    this.setState(() => ({
      selectedOption: option,
    }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({selectedOption: null}))
  };

  handleAddOption = option => {
    const optiontoLower = option.toLowerCase();
    const optionsLower = this.state.options.map(option => option.toLowerCase());
    if (!option) {
      return 'Enter a valid item';
    }
    if (optionsLower.indexOf(optiontoLower) > -1) {
      return 'Item already exists!!';
    }
    this.setState(prevState => ({
      options: prevState.options.concat([option]),
    }));
    return null;
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  render() {
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length}
            handleRandomPick={this.handleRandomPick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          clearSelected={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

export default App;
