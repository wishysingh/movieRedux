/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import queryString from 'query-string';
import Searchbox from "./SearchBox";
import MoviesList from "./MoviesList";
import NextPageButton from "./NextPageButton";
import Loader from "./Loader";
import PrevPageButton from "./PrevPageButton";
import { movieListApi, searchList } from "../constants/apiEndpoints";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchtext: this.props.match.params.movies,
      movies: [],
      maxpage: 1,
      renderapi: "",
      loader: false
    };
  }
  componentDidMount() {
    this.setState(
      {
        loader: true,
        renderapi: !this.props.match.params.movies ? movieListApi : searchList(this.state.searchtext)
      },
      () => {
        fetch(this.state.renderapi + queryString.parse(this.props.location.search).pageNo)
          .then(res => res.json())
          .then(res => {
            this.setState({
              loader: false,
              movies: res.results,
              maxpage: res.total_pages
            });
          })
          .catch(err => {
            err;
          });
      }
    );
  }
  onSearchChange(event) {
    this.setState({
      searchtext: event.target.value
    });
  }
  onSearchClick() {
    this.props.history.push(`/${this.state.searchtext}?pageNo=1`);
    this.setState(
      {
        loader: true,
        renderapi: this.state.searchtext ? searchList(this.state.searchtext) : movieListApi
      },
      () => {
        fetch(this.state.renderapi + this.state.page)
          .then(res => res.json())
          .then(res => {
            this.setState({
              loader: false,
              movies: res.results,
              maxpage: res.total_pages
            });
          })
          .catch(err => {
            err;
          });
      }
    );
  }
  next() {
    let no = Number(queryString.parse(this.props.location.search).pageNo);
    let num = no + 1;
    this.props.history.push(`/${this.props.match.params.movies}?pageNo=${num}`);
    this.setState(
      {
        page: this.state.page + 1,
        loader: true
      },
      () => {
        fetch(this.state.renderapi + queryString.parse(this.props.location.search).pageNo)
          .then(res => res.json())
          .then(res => {
            this.setState({
              loader: false,
              movies: res.results
            });
          })
          .catch(err => {
            err;
          });
      }
    );
  }
  prev() {
    let no = Number(queryString.parse(this.props.location.search).pageNo);
    let num = no - 1;
    this.props.history.push(`/${this.props.match.params.movies}?pageNo=${num}`);
    this.setState(
      {
        loader: true
      },
      () => {
        fetch(this.state.renderapi + queryString.parse(this.props.location.search).pageNo)
          .then(res => res.json())
          .then(res => {
            this.setState({
              loader: false,
              movies: res.results
            });
          })
          .catch(err => {
            err;
          });
      }
    );
  }
  render() {
    return (
      <div>
        {this.state.loader ? (
          <Loader />
        ) : (
          <div>
            <Searchbox
              searchChange={this.onSearchChange.bind(this)}
              searchClick={this.onSearchClick.bind(this)}
            />
            {this.state.movies && (
              <div>
                <MoviesList
                  movies={this.state.movies}
                  url={this.props.match.params}
                />
                {this.state.maxpage > Number(queryString.parse(this.props.location.search).pageNo) && (
                  <NextPageButton next={this.next.bind(this)} />
                )}
                {1 < Number(queryString.parse(this.props.location.search).pageNo) && (
                  <PrevPageButton prev={this.prev.bind(this)} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

SearchPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.string
};

export default SearchPage;
