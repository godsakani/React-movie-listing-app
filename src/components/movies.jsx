import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
    state = { 
        movies: getMovies()
     };
     
     handleDelete = movie => {
       const movies = this.state.movies.filter(m => m._id !== movie._id);
       this.setState({movies})
     }

    render() { 
        const { length: movieCount } = this.state.movies;

        if (movieCount === 0)
        return <p>There are no movies in the Database</p>;
        return (
            <>
            <p className='mt-4'>Showing {movieCount} movies in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movies => (
                <tr key={movies._id}>
                <td >{movies.title}</td>
                <td >{movies.genre.name}</td>
                <td >{movies.numberInStock}</td>
                <td >{movies.dailyRentalRate}</td>
                <td>
                <button  
                onClick = {() => this.handleDelete(movies)} 
                className='btn btn-danger btn-sm'>
                Delete
                </button>
                </td>
               </tr>
                  )
                )}
            </tbody>
          </table>
          </>
        );
    }
}
 
export default Movies;