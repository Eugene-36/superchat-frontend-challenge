import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/example')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className='App'>
      <div className='navbar'>
        <h1>Github Search</h1>{' '}
      </div>
      <div className='search'>
        <form className='SearchForm'>
          <button type='submit' className='SearchForm-button'>
            <span className='SearchForm-button-label'>Search</span>
          </button>

          <input
            className='SearchForm-input'
            //value={query}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search Github User'
            // checked={completed}
            //onChange={handleChange}
          />
        </form>
      </div>

      {/* Карточка */}

      <div className='card'>
        <img src='../w3images/team2.jpg' className='userImg' alt='John' />
        <h2>Name</h2>
        <p className='title'>Title</p>
        <div className='innerDiv'>
          <a href='#'>
            <i className='fa fa-dribbble'></i>
          </a>
          <a href='#'>
            <i className='fa fa-twitter'></i>
          </a>
          <a href='#'>
            <i className='fa fa-linkedin'></i>
          </a>
          <a href='#'>
            <i className='fa fa-facebook'></i>
          </a>
        </div>
        <p>
          <button>Contacts</button>
        </p>
      </div>
    </div>
  );
}

export default App;
