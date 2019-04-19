import React, { Component } from 'react';

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: '',
      bookNumber: 0,
      dropdownOpen: false
    };
  }

  /**
   * @
   *
   * @memberof App
   */
  onBookReset = () => {
    this.setState({ bookName: '', bookNumber: 0 });
  };

  /**
   * @param  {} name
   * @param  {} rentValue
   */
  onBookChange = (name, rentValue) => {
    this.setState({ bookName: name, bookNumber: rentValue });
  };

  toggle = () => {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  };

  render() {
    const { dropdownOpen } = this.state;
    return (
    
    );
  }
}

export default App;
