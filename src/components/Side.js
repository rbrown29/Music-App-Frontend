import React, { Component } from 'react';

class Side extends Component {
  setRating = (currentRating, newRating) => {
    const updatedFavorites = this.props.favorites.map((fav) => {
      if (fav.rating === currentRating) {
        return { ...fav, rating: newRating };
      }
      return fav;
    });
  
    this.props.updateFavorites(updatedFavorites);
  };
  
  increaseRating = (song) => {
    const updatedFavorites = this.props.favorites.map((fav) => {
      if (fav._id === song._id) {
        return { ...fav, rating: Math.min(fav.rating + 1, 5) };
      }
      return fav;
    });
    this.props.updateFavorites(updatedFavorites);
  };

  decreaseRating = (song) => {
    const updatedFavorites = this.props.favorites.map((fav) => {
      if (fav._id === song._id) {
        return { ...fav, rating: Math.max(fav.rating - 1, 0) };
      }
      return fav;
    });
    this.props.updateFavorites(updatedFavorites);
  };

  renderStars = (song) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => this.handleRatingChange(song, i + 1)}
          className={i < song.rating ? "filled" : "unfilled"}
        >
          {i < song.rating ? "★" : "☆"}
        </button>
      );
    }
    return <p>{stars}</p>;
  };
  
  
  
  handleRatingChange = (song, newRating) => {
    const updatedFavorites = this.props.favorites.map((fav) => {
      if (fav._id === song._id) {
        return { ...fav, rating: newRating };
      }
      return fav;
    });
    this.props.updateFavorites(updatedFavorites);
  };
  
  componentDidUpdate(prevProps) {
    if (prevProps.favorites !== this.props.favorites) {
      console.log('Favorites updated:', this.props.favorites);
    }
  }
  
  

  render() {
    console.log('Favorites in render:', this.props.favorites);
    return (
      <div className={this.props.showFavs ? 'show-side' : 'hide-side'}>
        <h2>Your Favorites</h2>
        <ul>
          {this.props.favorites && this.props.favorites.map((favSong, index) => (
            <li key={favSong._id}>
              <img src={favSong.coverArt || this.props.coverArt} />
              {favSong.songName}
              <br />
              {this.renderStars(favSong)}
              <span className='buttons'>
                <button className='favbuttons' onClick={() => { this.props.handleDeleteFavorite(favSong._id) }}>Remove</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Side;
