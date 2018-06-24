import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';

const s: {[props: string]: string} = require('./Header.css');


interface IHeaderProps {
  history: {
    push: Function
  }
  location: {
    pathname: string
  }
}

class Header extends React.Component<IHeaderProps> {

  search = (e: any) => {
    e.preventDefault();
    const input = e.target.elements.searchInput;
    const query = input.value;
    input.value = '';
    let url: string;
    if (
      this.props.location.pathname.startsWith('/films/movies') ||
      this.props.location.pathname.startsWith('/search/movies')
    ){
      url = `/search/movies/${query}`;
    } else if(
      this.props.location.pathname.startsWith('/films/tvshows') ||
      this.props.location.pathname.startsWith('/search/tvshows')
    ) {
      url = `/search/tvshows/${query}`;
    }
    else {
      url = `/search/movies/${query}`
    }
    this.props.history.push(url);
  }

  addMovieLink(): null | JSX.Element {
    const location = this.props.location.pathname;
    if (location === '/films/movies'){
      return <Link className={s.link} to='/films/movies/add'>Add Movie</Link>
    } else if(location === '/films/tvshows') {
      return <Link className={s.link} to='/films/tvshows/add'>Add Tvshow</Link>
    }
    return null;
  }

  render() {
    return (
      <div className={s.header}>
        <div className={s.row}>
          <div className={s.searchCol}>
            <form onSubmit={this.search}>
              <div className={s.search}>
                <button className={s.searchBtn}></button>
                <input name='searchInput' className={s.searchInput} placeholder='Search...' />
              </div>
            </form>
          </div>
          <div className={s.navCol}>
            <div className={s.nav}>
              {this.addMovieLink()}
              <Link className={s.link} to='/about'>About</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const HeaderWithRouter = withRouter(props => <Header {...props} />);

export {HeaderWithRouter as Header}