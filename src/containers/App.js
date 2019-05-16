import React, { Component } from 'react';

import classes from './App.module.css';

import Spinner from "../components/UI/Spinner/Spinner";
import Navbar from "../components/Navbar/Navbar"
import Controls from "../components/Controls/Controls";
import ImageInfo from "../components/ImageInfo/ImageInfo"
import ToggleButton from "../components/UI/ToggleButton/ToggleButton";
import LeftDrawer from "../components/UI/LeftDrawer/LeftDrawer";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  

const APIDATA = {
  baseUrl: "https://api.nasa.gov/planetary/apod",
  queryParams: function( date ) {
    return "?start_date=2019-02-01&end_date=" + date
  },
  key: "&api_key=EOr3djWLSSP1bfFu3QKBOleBAaG2h1qDzaBfQSU2",
  url: function( todayDate ) {
    return this.baseUrl + this.queryParams( todayDate ) + this.key
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


//TODO: Lazy load images after 1 month and be able to navigate the whole time date
//TODO: Add random section
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

    // Used to fetch
    const date = new Date();
    const year = date.getFullYear();
    const month = Number(date.getMonth()) + 1 ;
    const day = date.getDate();
    const currDayAndMonth =  `${year}-${str_pad(month)}-${str_pad(day)}` ;

    fetch( APIDATA.url( currDayAndMonth ) )
      .then( res => res.json() )
      .then( data => {
        this.setState({
           data: data.reverse(),
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
      ? this.state.data[_index].hdurl
       : this.state.data[_index].url
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

  changeResolution = () => {
    const oldVal = this.state.hd;
    this.setState( {hd: !oldVal} );
  }

  drawerHandler = () => {
    const oldVal = this.state.drawer;
    this.setState( {drawer: !oldVal} )
  }

  // Converts input from API "2018-05-01" to a more human friendly one
  convertDateFormat = (date) => {
    const arr = date.split("-");
    const month = MONTHS[parseInt(arr[1], 10) - 1].val;
    return `${month} ${arr[2]}, ${arr[0]}`;
  }

  render() {

    let InfoComponent = null;
    if(this.state.currImg.date ){
       InfoComponent = (
        this.state.infoHidden ?
         <ToggleButton type="arrowUp" clicked={this.infoBarHandler} label={"Show Bar"} /> 
         : <ImageInfo 
			data={this.state.currImg}
			formatedDate={this.convertDateFormat(this.state.currImg.date)}
			hideBar={this.infoBarHandler}
          />  
      );
    }

    const currImgToDisplay = this.state.hd ? this.state.currHDimg : this.state.currImg.url;

    return (
      <MuiThemeProvider theme = { theme }>
        <div className={classes.App} style={{backgroundImage: `url(${currImgToDisplay})`}}>
          <LeftDrawer
             isOpen={this.state.drawer} 
             close={this.drawerHandler}
             changeResolution={this.changeResolution}
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



// helper function for month formating
function str_pad(n) {
  return String("00" + n).slice(-2);
}

const MONTHS = [
  {"val": "January"},
  {"val": "February"},
  {"val": "March"},
  {"val": "April"},
  {"val": "May"},
  {"val": "June"},
  {"val": "July"},
  {"val": "August"},
  {"val": "September"},
  {"val": "October"},
  {"val": "November"},
  {"val": "December"}
 ];

export default App;
