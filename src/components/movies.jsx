import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
  };

  render() {
    const { length: movieCount } = this.state.movies;
    const { pageSize, currentPage, movies } = this.state;

    if (movieCount === 0) return <p>There are no movies in the Database</p>;

    const movie = paginate(movies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p className="mt-4">Showing {movieCount} movies in the database</p>
          <table className="table table-sm">
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
              {movie.map((movies) => (
                <tr key={movies._id}>
                  <td>{movies.title}</td>
                  <td>{movies.genre.name}</td>
                  <td>{movies.numberInStock}</td>
                  <td>{movies.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movies)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemCount={movieCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
