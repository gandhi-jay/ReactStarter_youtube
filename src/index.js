import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyC-8h-kydUsKdiImG4pomrlzUVpFUxo60E'
// Create a new component. This componet should produce some HTML

// // Fat Arrow
// const App = () => {
//   return (<div>
//     <SearchBar />
//   </div>);
// };

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos : [],
      selectedVideo : null
    };
  this.videoSearch('Bahuballi 2 Trailer')
  }

  videoSearch(term) {
    YTSearch({key:API_KEY, term: term}, videos => {
      this.setState({
        videos,
        selectedVideo:videos[0]
      });
    })
  }

  render () {
    const videoSearch = _.debounce(term => {this.videoSearch(term)},300)
    return (
      <div>
        <SearchBar onSearchTerm={videoSearch}  />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos = {this.state.videos}/>
      </div>
      )
    }
}


// Take this componet's generated HTML and put it
// on the page (in the DOM)

ReactDOM.render(
  <App />,
  document.querySelector('.container')
);
