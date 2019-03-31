import React, { Component } from 'react';

import classes from './App.module.css';

import Spinner from "../components/UI/Spinner/Spinner";
import Navbar from "../components/Navbar/Navbar"
import Controls from "../components/Controls/Controls";
import ImageInfo from "../components/ImageInfo/ImageInfo"
import ToggleButton from "../components/UI/ToggleButton/ToggleButton";
import LeftDrawer from "../components/UI/LeftDrawer/LeftDrawer";

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  

const APIDATA = {
  baseUrl: "https://api.nasa.gov/planetary/apod",
  queryParams: "?start_date=2018-05-01&end_date=2018-06-01",
  key: "&api_key=EOr3djWLSSP1bfFu3QKBOleBAaG2h1qDzaBfQSU2",
  url: function() {
    return this.baseUrl + this.queryParams + this.key
  }
}

const theme = createMuiTheme({
  palette: {
     primary: {
        main: '#fff'

     },
     secondary: {
       main: 'rgb(255, 157, 0)',
     },
     light: {
        main: 'rgba(255, 255, 255, 0.485)'
     }
  },
  typography: { 
     useNextVariants: true
  }
});


class App extends Component {

  state = {
    data: [],
    loading: true,
    currImg: {},
    currHDimg: null,
    index: 0,
    infoHidden: false,
    drawer: false,
    hd: false
  }

  componentDidMount() {
    fetch( APIDATA.url() )
      .then( res => res.json() )
      .then( data => {
        this.setState({
           data: data,
           currImg: {
             ...data[0]
            }, 
           currHDimg: data[0].hdurl,
           loading:false
           });
        console.log(data)
      } )
    .catch( err => console.error(err) );
  }


  changeImageHandler = (action) => {
    let _index = 0;
    // TODO: Add error handeling

    if(action === "next"){
      _index = this.state.index +1;

    } else {
      _index = this.state.index -1;
    }
    this.setState({ 
      index: _index,
      currImg: {
        ...this.state.data[_index]
      },
      currHDimg: this.state.data[_index].hdurl
    });
  }

  hdImagesHandler = () => {
    const oldVal = this.state.hd;
    this.setState( {hd: !oldVal} );
  }

  infoBarHandler = () => {
    const infoHidden = this.state.infoHidden;
    this.setState( {infoHidden: !infoHidden} );
  }

  drawerHandler = () => {
    const oldVal = this.state.drawer;
    this.setState( {drawer: !oldVal} )
  }

  render() {

    const InfoComponent = (
      this.state.infoHidden ? <ToggleButton type="arrowUp" clicked={this.infoBarHandler} label={"Show Bar"} />: 
        <ImageInfo data={this.state.currImg} hideBar={this.infoBarHandler} />
    );

    const currImgToDisplay = this.state.hd ? this.state.currHDimg : this.state.currImg.url;

    return (
      <MuiThemeProvider theme = { theme }>
        <div className={classes.App} style={{backgroundImage: `url(${currImgToDisplay})`}}>
          <LeftDrawer
             isOpen={this.state.drawer} 
             close={this.drawerHandler}
             hdImages={this.hdImagesHandler}
             isHD={this.state.hd} />

          { this.state.loading ? <Spinner /> : null}

          <h2 className={classes.Title}>{this.state.currImg.title}</h2>

          <Navbar 
            openDrawer={this.drawerHandler} />

          {InfoComponent}

          <Controls 
            currImg={currImgToDisplay} 
            date={this.state.currImg.url} 
            changeImage={this.changeImageHandler} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
