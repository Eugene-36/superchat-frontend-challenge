import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stargazersCount, setStarts] = useState('');
  // const [contributorsUrl, setContributorsUrl] = useState('');
  const [arraContributors, setArrayContributors] = useState([]);
  const [repos, setRepos] = useState('');
  // const [avatar, setAvatar] = useState('');
  const [userInputName, setUserInputName] = useState('');
  const [userRepo, setUserRepo] = useState('');
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Тут надо будет вставить дефолтный url
  //   fetch('https://api.github.com/repos/Eugene-36/shelter')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       getTenContributors(data);
  //     });
  // }, []);

  const handleSearchName = (e) => {
    setUserInputName(e.target.value.trim());
  };

  const handleSearchRepo = (e) => {
    setUserRepo(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // https://api.github.com/repos/${userInputName}/${userRepo}
    fetch(`https://api.github.com/repos/${userInputName}/${userRepo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          //console.log('data.contributors_url', data);
          setData(data);
          getTenContributors(data);
          setError(null);
        }
      });
  };

  const setData = ({
    owner,
    description,
    stargazers_count,
    contributors_url,
    html_url,
    // contributors_url
  }) => {
    setName(owner.login);
    setDescription(description);
    setStarts(stargazers_count);
    // setContributorsUrl(contributors_url);
    setRepos(html_url);
  };

  const getTenContributors = (data) => {
    const { contributors_url } = data;
    console.log('дата из getTenContributors ', contributors_url);

    if (contributors_url) {
      fetch(`${contributors_url}`)
        .then((res) => res.json())
        .then((data) => {
          const result = data.splice(0, 10).map((_data) => _data.login);
          console.log('result', result);
          setArrayContributors(result);
        })
        .catch((err) => {
          console.log('Error Reading data ' + err);
        });
    }
  };
  console.log('arraContributors', arraContributors);
  //! - the repository author  - сделано
  //! - the icon selected by the link creator ???
  //! - title and description of the repository - сделано
  //! - the number of stars - сделано
  //! - the top 10 contributors  ... "contributions": 1
  //! - a button to star the repository
  return (
    <div className='App'>
      <div className='navbar'>
        <h1>Github Search</h1>{' '}
      </div>
      <div className='search'>
        <form className='SearchForm' onSubmit={handleSubmit}>
          <button type='submit' className='SearchForm-button'>
            <span className='SearchForm-button-label'>Search</span>
          </button>

          <input
            className='SearchForm-input'
            //value={query}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search Username'
            onChange={handleSearchName}
          />
          <input
            className='SearchForm-input'
            //value={query}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search Repo'
            onChange={handleSearchRepo}
          />
        </form>
      </div>

      {/* Карточка */}
      {error ? (
        <h2>{error}</h2>
      ) : (
        <div className='card'>
          {/* <img src={avatar} className='userImg' alt='John' /> */}
          <h2>{name}</h2>

          <p className='title'>Title</p>
          <div className='innerDiv'>
            <a href='#'>{description} description</a>
            <a href='#'>{stargazersCount} stargazersCount</a>
            {arraContributors.length &&
              arraContributors.map((el) => <li>{el}</li>)}
          </div>
          <p>
            <a className='linkToRepo' href={repos} target='_blank'>
              See the repo
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
