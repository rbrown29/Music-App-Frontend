import React from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Side from './components/Side';

// import music from './data.js'

let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003/proxy/https://music-8w2a.onrender.com';
} else {
  baseUrl = 'https://music-8w2a.onrender.com';
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      music: [],
      favorites: [],
      id: 0,
      // stars: 0,
    }
  }

  fetchPosts = () => {
    fetch(`${baseUrl}/songs`,)
      .then(data => data.json())
      .then(jData => {
        this.setState({ music: jData })
      }).catch(err => console.log(err))
  }

  handleCreate = (createdSong) => {
    fetch(
      `${baseUrl}/songs`,
      {
        body: JSON.stringify({
          title: createdSong.songName,
          artist: createdSong.artistName,
          album: createdSong.albumName,
          coverArt: createdSong.coverArt,
        }),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(createdSong => {
        return createdSong.json()
      }
      )
      .then(jsonedSong => {
        this.setState({
          music: jsonedSong
        })
      }).catch(error => console.log(error))
  }


  handleDelete = (id) => {
    fetch(`${baseUrl}/songs/${id}`, { 
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(json => {
        this.setState(prevState => {
          const music = prevState.music.filter(music => music.id !== id)
          return { music }
        })
      })
      .catch(err => console.log(err))
  }



  componentDidMount() {
    this.fetchPosts()
    this.fetchFavorites()
  }

  // Get all favorite songs
fetchFavorites = () => {
  fetch(`${baseUrl}/favorites`, )
    .then((data) => data.json())
    .then((jData) => {
      this.setState({ favorites: jData });
    })
    .catch((err) => console.log(err));
};

// Remove a song from favorites
removeFavorite = (id) => {
  fetch(`${baseUrl}/favorites/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((json) => {
      this.setState((prevState) => {
        const favorites = prevState.favorites.filter(
          (favorite) => favorite.id !== id
        );
        return { favorites };
      });
    })
    .catch((err) => console.log(err));
};


addToFavorites = (song) => {
  console.log('Song to add:', song.id);
  console.log('Current favorites:', this.state.favorites.map(fav => fav.id));
  console.log('Song to add:', song._id);
  console.log('Current favorites:', this.state.favorites.map(fav => fav._id));
  for (var i = 0; i < this.state.favorites.length; i++) {
    if (song._id === this.state.favorites[i]._id) {
      alert('Cannot add duplicates!')
      return
    }
  }
  song['rating'] = 0
  const newFavorite = {
    ...song,
    coverArt: song.coverArt || '' // Set the coverArt property to an empty string if it is undefined
  }
  fetch(`${baseUrl}/favorites`,  {
    body: JSON.stringify(newFavorite),
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(jsonedFavorite => {
    this.setState({
      favorites: [jsonedFavorite, ...this.state.favorites],
      id: song.id
    });
  })
  .catch(error => {
    console.log(error);
  });
}  

updateFavorites = (updatedFavorites) => {
  this.setState({ favorites: updatedFavorites });
};




  render() {
    // console.log(this.state.favorites);
    // console.log(this.state.stars);
    return (
      <>
        <Header />
        <Main
          music={this.state.music}
          addToFavorites={this.addToFavorites}
          favorites={this.state.favorites}
          setRating={this.setRating}
          stars={this.state.stars}
          fetchPosts={this.fetchPosts}
          handleCreate={this.handleCreate}
          toggleFavs={this.toggleFavs}
          handleDelete={this.handleDelete}
          handleDeleteFavorite={this.handleDeleteFavorite}
          updateFavorites={this.updateFavorites} // Updated prop
        />
        <Side
          favorites={this.state.favorites}
          setRating={this.setRating}
          stars={this.state.stars}
          fetchPosts={this.fetchPosts}
          showFavs={this.state.showFavs}
          coverArt={this.props.coverArt}
          handleDeleteFavorite={this.handleDeleteFavorite}
          updateFavorites={this.updateFavorites}
        />


      </>
    )
  }
}
export default App;
