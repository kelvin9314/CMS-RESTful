/* eslint-disable no-console */
import React, { Component } from 'react';
import '../../style/customer.css';
import axios from 'axios';

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Books',
      books: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/api/categories')
      .then(res => this.setState({ books: res.data }, () => console.log('Books fetched...', res)))
      .catch(e => console.error(e));
  }

  render() {
    const { title, books } = this.state;
    return (
      <div>
        <h2> {title} </h2>
        <ul className="ul">
          {books.map(book => (
            <li key={book.id} className="li">
              {book.category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Customers;

/* 



*/
