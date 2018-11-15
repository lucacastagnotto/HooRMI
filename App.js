
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';

import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';
import FindVideo from './components/FindVideo';
 
type Props = {};

export default class App extends Component<Props> {

  state = {
    myLocation: null,
    watchID: null,
    video_list: null
  }

  options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 0
  }

  printstate = () => {
    console.log(this.state);
  }

  printloc = () => {
    console.log(this.state.myLocation)
  }

  //PLUS CODES
  searchPlusCodes = () => { 
    var url = "https://plus.codes/api?address="+ encodeURIComponent(this.state.myLocation.latitude) + "," + encodeURIComponent(this.state.myLocation.longitude) +"&ekey=AIzaSyD1saWNvYTd_v8sfbPB8puL7fvxKdjcfF0";
    console.log(url);
    return fetch(url, {
      method: "GET",
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);  
          this.setState(prevState => ({
            myLocation: {
              ...prevState.myLocation,
              plusCode: result.plus_code.global_code,
              city: result.plus_code.locality.local_address,
              city_code: result.plus_code.global_code.substring(0,4)
            }
          }));
        }
      )
      .catch((error) => {
        console.error(error);
    }); 
        //Refine plusCode if it requires 11 or more digits (little poi: paintings, statues...)
  }

  //NAVIGATOR CODE
  setCurrentPosition = (position) => { //console.log("entro in setCurrentPosition");
    this.setState(prevState => ({
      myLocation: {
        ...prevState.myLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.005
      }
    }));
  }

  watchCurrentPosition = () => { //console.log("entro in WatchPosition"); 
    this.state.watchID=navigator.geolocation.watchPosition(position => {  
      this.setState(prevState => ({
        myLocation: {
          ...prevState.myLocation,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.005
        }
      })); //console.log("watchID: "+ watchID);
      navigator.geolocation.clearWatch(this.state.watchID);
    }, error => console.log(err), this.options);
  }

  initLocationProcedure = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => { 
        this.setCurrentPosition(position);
        this.watchCurrentPosition(); //Is actually to verify if it works as supposed
      }, err => console.log(err));
    } else {
      console.log("Your browser does not support the Geolocation API!");
    }
  }

  getDistance = () => {
    var url="https://maps.googleapis.com/maps/api/distancematrix/json?origins="+ encodeURIComponent(this.state.myLocation.latitude) + "," + encodeURIComponent(this.state.myLocation.longitude) +"&destinations="+  +"&key=AIzaSyD1saWNvYTd_v8sfbPB8puL7fvxKdjcfF0"
  }

  /*YTFilter = () => { 
    let ytvid = [];
    for(var i=0; i < this.state.video_list.length; i++){
      var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyD1saWNvYTd_v8sfbPB8puL7fvxKdjcfF0&id="+ encodeURIComponent(this.state.video_list[i].id);
      console.log(url);
      fetch(url, {
        method: "GET",
      })
        .then(res => res.json())
        .then(
          (data) => { console.log(data); console.log(video_list[i].id);
            ytvid.push({
              id: this.state.video_list[i].id,
              description: data.items[i].snippet.description
            });
          } 
        )
        .catch((error) => {
          console.error(error);
        });
    }
    this.state.video_list=ytvid;
  }*/

  //METADATA STRING SEARCH
  YTube = () => { 
    
    //var options = {
     // part: "snippet",
      //key: "AIzaSyD1saWNvYTd_v8sfbPB8puL7fvxKdjcfF0",
      //type: "video",
      //q: "HooRMI:",  + location coordinates
      //maxResults: ??, consider multiple 'NextPage' http request (set to 10 at the moment)
    //}
    
    var url="https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyD1saWNvYTd_v8sfbPB8puL7fvxKdjcfF0&maxResults=15&q=HooRMI:"  /*encodeURIComponent(this.state.myLocation.city_code)*/;
    console.log(url);
    return fetch(url, {
      method: "GET",
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          //inizializza this.state.video_list
          this.state.video_list = []; //verifica che pulisca dai risultati precedenti
          //popola this.state.video_list 
          for(key in result.items){
            this.state.video_list.push({
              id: result.items[key].id.videoId
            });
          }
          //this.YTFilter();
          this.printstate();
        })
      .catch((error) => {
        console.error(error);
    }); 
  } 

  find_poidata = () => {
    this.searchPlusCodes().then(() => this.YTube());
    //this.YTFilter(); .then(() => this.YTFilter())
  }

  render() {
    this.printstate();
    return (
      <View style={styles.container}>
      <Text> HooRMI </Text>
        <FetchLocation onGetLocation={this.initLocationProcedure} />
        <FindVideo findvid={this.find_poidata} />
        <UsersMap myLocation={this.state.myLocation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});


/*
Add_Query_Parameters Methods but do not work:
  var params= new URLSearchParams(url);
1)Object.keys(options).map(function (key) {url.params.append(key, options[key]); }); 
2)for(var key in options){ 
    url.params.append(key, options[key]);
  }
*/

/*
  creare variabile var 'google_key' da sostituire negli url
*/