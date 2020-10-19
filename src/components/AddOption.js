import React, { Component } from 'react';

class AddOption extends Component {
  state = {
    error: null,
  };

  handleAddOption = e => {
    e.preventDefault();
    const optionNode = e.target.elements.option;
    const option = optionNode.value.trim();

    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }))
    optionNode.value = '';
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <p className="add-option-error">
          {this.state.error}</p>
        )}
        <form className="add-option" onSubmit={this.handleAddOption}>
          <input className="add-option__input" type="text" name="option" />
          <button className="button" type="submit">Add option</button>
        </form>
      </div>
    );
  }
}

export default AddOption;
