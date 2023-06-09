import React, { Component } from 'react';
import Songs from './Songs.js'

class Songlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: '',
      artistName: '',
      albumName: '',
      coverArt: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleCreate(this.state)
    this.setState({
      songName: '',
      artistName: '',
      albumName: '',
      coverArt: ''
    })
  }


  render() {
    return (
      <div className='songlist'>
        <h2>All Music</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder=' Song Title' id="songName" value={this.state.songName} onChange={this.handleChange} />
          <input type="text" placeholder=' Artist' id="artistName" value={this.state.artistName} onChange={this.handleChange} />
          <input type="text" placeholder=' Album' id="albumName" value={this.state.albumName} onChange={this.handleChange} />
          <input type="text" placeholder=' Cover Art' id="coverArt" value={this.state.coverArt} onChange={this.handleChange} />
          <input className="input1" type="submit" value="Add to Music List" />
        </form>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(this.props.music) && this.props.music.map((song, index) =>
              <Songs key={index} songs={song} addToFavorites={this.props.addToFavorites} handleDelete={this.props.handleDelete} />
            )}


          </tbody>
        </table>
      </div>
    );
  }
}

export default Songlist;
