/* eslint-disable import/no-named-as-default */
import React from "react";
import Searchbox from "./SearchBox";
import MoviesList from "./MoviesList";
import NextPageButton from "./NextPageButton";
import Loader from "./Loader";
import PrevPageButton from "./PrevPageButton";

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
    if(this.props.match.params.movies===undefined)
    {
      this.setState({
        loader:true,
        renderapi:"https://api.themoviedb.org/3/movie/top_rated?api_key=4d3775d97a83b11d700345ad71b1e238&language=en-US&page="
      },()=>{fetch(this.state.renderapi)
        .then(res => res.json())
        .then(res => {
          this.setState({
            loader:false,
            movies:res.results,
            maxpage:res.total_pages
          });
        })
        .catch(err => {err});});

    }
    else{
      this.setState(
        {
          loader: true,
          renderapi: `https://api.themoviedb.org/3/search/movie?api_key=4d3775d97a83b11d700345ad71b1e238&query=${
            this.state.searchtext
          }&language=en-US&page=1&include_adult=false&page=`
        },
        () => {
          fetch(this.state.renderapi + this.props.match.params.page)
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


  }
  onSearchChange(event) {
    this.setState({
      searchtext: event.target.value
    });
  }
  onSearchClick() {

    this.props.history.push(`/${this.state.searchtext}/1`);
    if (this.state.searchtext) {
      this.setState(
        {
          loader: true,
          renderapi: `https://api.themoviedb.org/3/search/movie?api_key=4d3775d97a83b11d700345ad71b1e238&query=${
            this.state.searchtext
          }&language=en-US&page=1&include_adult=false&page=`
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
    } else {
      this.setState(
        {
          loader: true,
          renderapi:
            "https://api.themoviedb.org/3/movie/top_rated?api_key=4d3775d97a83b11d700345ad71b1e238&language=en-US&page="
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
  }
  next() {
    let no = Number(this.props.match.params.page);
    let num=no+1;
    this.props.history.push(`/${this.props.match.params.movies}/${num}`);
    this.setState(
      {
        page:this.state.page+1,
        loader: true
      },
      () => {
        fetch(this.state.renderapi + this.props.match.params.page)
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
    let no = Number(this.props.match.params.page);
    let num= no-1;
    this.props.history.push(`/${this.props.match.params.movies}/${num}`);
    this.setState(
      {
        loader: true
      },
      () => {
        fetch(this.state.renderapi + this.props.match.params.page)
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
        {this.state.loader ? <Loader /> : <div />}
        {!this.state.loader ? (
          <Searchbox
            searchChange={this.onSearchChange.bind(this)}
            searchClick={this.onSearchClick.bind(this)}
          />
        ) : (
          <div />
        )}
        {this.state.movies && !this.state.loader ? (
          <MoviesList movies={this.state.movies} url={this.props.match.params}/>
        ) : (
          <div />
        )}
        {this.state.movies &&
        !this.state.loader &&
        this.state.maxpage > Number(this.props.match.params.page) ? (
          <NextPageButton next={this.next.bind(this)} />
        ) : (
          <div />
        )}
        {this.state.movies &&
        !this.state.loader &&
        1 < Number(this.props.match.params.page) ? (
          <PrevPageButton prev={this.prev.bind(this)} />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default SearchPage;
