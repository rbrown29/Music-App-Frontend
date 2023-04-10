import React, { Component } from 'react';
import Side from './Side'
import Songlist from './Songlist'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFavs: false
    }
  }

  handleDeleteFavorite = async (favoriteId) => {
    try {
      const response = await fetch(`http://localhost:3003/favorites/${favoriteId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('Favorite deleted:', data);
      this.props.fetchPosts(); // Update the favorites list after deleting
    } catch (error) {
      console.error('Error deleting favorite:', error);
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
