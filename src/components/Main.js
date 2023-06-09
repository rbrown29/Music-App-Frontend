import React, { Component } from 'react';
import Side from './Side'
import Songlist from './Songlist'


class Main extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteFavorite = this.handleDeleteFavorite.bind(this);
    this.state = {
      showFavs: false
    }
  }

  handleDeleteFavorite = async (favoriteId) => {
    console.log("Deleting favorite with ID:", favoriteId);
    try {
      const response = await fetch(
        `https://music-8w2a.onrender.com/favorites/${favoriteId}`,
        {
          method: "DELETE",
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Favorite deleted:", data);
      const updatedFavorites = this.props.favorites.filter(
        (fav) => fav._id !== favoriteId
      );
      this.props.updateFavorites(updatedFavorites); // Pass the updated favorites list
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };
  
  

  toggleFavs = () => {
    this.setState({
      showFavs: !this.state.showFavs
    })
    // console.log(this.state.showFavs);
  }
  render() {
    // console.log(this.props.music);
    return (
      <div className='main'>
        <button className='toggle' onClick={this.toggleFavs}>{(this.state.showFavs) ? 'Hide Favs' : 'Show Favs'}</button>
        <Side
          favorites={this.props.favorites}
          setRating={this.props.setRating}
          stars={this.props.stars}
          fetchPosts={this.props.fetchPosts}
          showFavs={this.state.showFavs}
          coverArt={this.props.coverArt}
          handleDeleteFavorite={this.handleDeleteFavorite} // Updated prop
          updateFavorites={this.props.updateFavorites} // Updated prop
        />

        <Songlist music={this.props.music} addToFavorites={this.props.addToFavorites} handleCreate={this.props.handleCreate}
          handleDelete={this.props.handleDelete} />

      </div>
    );
  }
}

export default Main;
