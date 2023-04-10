import React, { Component } from 'react';

class Songs extends Component {

    render() {
        const coverArt = this.props.songs.coverArt || "";
        return (
            <tr className='songrows'>
                <td>{this.props.songs.title}</td>
                <td>{this.props.songs.artist}</td>
                <td>{this.props.songs.album}</td>
                <td className='coverart'>
                    <img
                        className='covers'
                        onClick={() => {
                            this.props.addToFavorites(this.props.songs);
                        }}
                        src={coverArt}
                    />
                    <p
                        className='add'
                        onClick={() => {
                            this.props.addToFavorites(this.props.songs);
                        }}
                    >
                        Add to Favorites
                    </p>
                    <br />
                    <button
                        className='button1'
                        onClick={() => {
                            this.props.handleDelete(this.props.songs._id);
                        }}
                    >
                        Remove Song
                    </button>
                </td>
            </tr>
        );
    }
}

export default Songs;
