/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import Searchbox from "./SearchBox";
import MoviesList from "./MoviesList";
import NextPageButton from "./NextPageButton";
import Loader from "./Loader";
import PrevPageButton from "./PrevPageButton";
import { movieListApi, searchList } from "../constants/apiEndpoints";
import { connect } from "react-redux";
import { apicall, searchChange, initialState } from "../actions/searchActions";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const mapStateToProps = state => {
  return {
    searchtext: state.searchingMovies.searchtext,
    movies: state.searchingMovies.movies,
    maxpage: state.searchingMovies.maxpage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(searchChange(event)),
    initialState: text => dispatch(initialState(text)),
    apicall: text => dispatch(apicall(text))
  };
};

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderapi: "",
      loader: false
    };
  }
  shouldComponentUpdate() {
    if (this.props.match.params.movies) {
      console.log('123');
      this.props.initialState(this.props.match.params.movies);
    }
    return this.props.match.params.movies !== "";
  }
  componentWillMount() {
    if (this.props.match.params.movies) {
      console.log('1234');
      this.props.initialState(this.props.match.params.movies);
    }
  }
  componentDidMount() {
    this.setState(
      {
        loader: true,
        renderapi: !this.props.match.params.movies
          ? movieListApi
          : searchList(this.props.match.params.movies)
      },
      () => {
        this.props.apicall(
          this.state.renderapi +
            queryString.parse(this.props.location.search).pageNo
        );
      }
    );
    this.setState({
      loader: false
    });
  }
  onSearchClick() {
    this.props.history.push(`/${this.props.searchtext}?pageNo=1`);
    this.setState(
      {
        loader: true,
        renderapi: this.props.searchtext
          ? searchList(this.props.searchtext)
          : movieListApi
      },
      () => {
        this.props.apicall(this.state.renderapi);
      }
    );
    this.setState({
      loader: false
    });
  }
  next() {
    let no = Number(queryString.parse(this.props.location.search).pageNo);
    let num = no + 1;
    this.props.history.push(`/${this.props.match.params.movies}?pageNo=${num}`);
    this.setState(
      {
        loader: true
      },
      () => {
        this.props.apicall(
          this.state.renderapi +
            queryString.parse(this.props.location.search).pageNo
        );
      }
    );
    this.setState({
      loader: false
    });
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
        this.props.apicall(
          this.state.renderapi +
            queryString.parse(this.props.location.search).pageNo
        );
      }
    );
    this.setState({
      loader: false
    });
  }
  render() {
    console.log('aq', this.props);
    return (
      <div>
        {this.state.loader ? (
          <Loader />
        ) : (
          <div>
            <Searchbox
              searchChange={this.props.onSearchChange}
              searchClick={this.onSearchClick.bind(this)}
            />
            {this.props.movies && (
              <div>
                <MoviesList
                  movies={this.props.movies}
                  url={this.props.match.params}
                />
                {this.props.maxpage >
                  Number(
                    queryString.parse(this.props.location.search).pageNo
                  ) && <NextPageButton next={this.next.bind(this)} />}
                {1 <
                  Number(
                    queryString.parse(this.props.location.search).pageNo
                  ) && <PrevPageButton prev={this.prev.bind(this)} />}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
