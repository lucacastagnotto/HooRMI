import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';

import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';
import FindVideo from './components/FindVideo';
 
type Props = {};

var GOOGLE_KEY = "AIzaSyD1saWNvYTd_v8sfbPB8puL7fvxKdjcfF0";

export default class App extends Component<Props> {

  state = {
    myLocation: null,
    watchID: null, //geolocation Watchposition()
    video_list: null,
    markers: [{latitude: 44.494048, longitude: 11.342728, id: 1}, {latitude: 44.493698, longitude:11.343098, id: 2}],//markers: [{latitude: 44.494448, longitude: 11.343005, id: 2}]
    text_to_read: "ciao sono Piero"
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
    var url = "https://plus.codes/api?address="+ encodeURIComponent(this.state.myLocation.latitude) + "," + encodeURIComponent(this.state.myLocation.longitude) +"&ekey="+ GOOGLE_KEY;
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

  //questa funzione non serve per ora (attenzione: "destination" vuoto)
  getDistance = () => {
    var url="https://maps.googleapis.com/maps/api/distancematrix/json?origins="+ encodeURIComponent(this.state.myLocation.latitude) + "," + encodeURIComponent(this.state.myLocation.longitude) +"&destinations="+  +"&key="+ GOOGLE_KEY;
  }

  get_YTdescription = (ytvid, idvid) => { 

      var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&key="+ GOOGLE_KEY +"&id="+ encodeURIComponent(idvid);
      console.log(url);
      return fetch(url, {
        method: "GET",
      })
        .then(res => res.json())
        .then(
          (data) => { 
            console.log("sono ytdesc"); 
            ytvid.push({
              id: idvid,
              description: data.items[0].snippet.description
            });
          } 
        )
        .catch((error) => {
          console.error(error);
        });
  }

  //METADATA STRING SEARCH
  YTube = () => { 
    
    //var options = {
     // part: "snippet",
      //key: "GOOGLE_KEY",
      //type: "video",
      //q: "HooRMI:",  + location coordinates
      //maxResults: ??, consider multiple 'NextPage' http request (set to 10 at the moment)
    //}
    
    var url="https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key="+ GOOGLE_KEY +"&maxResults=15&q=HooRMI:"  /*encodeURIComponent(this.state.myLocation.city_code)*/;
    console.log(url);
    return fetch(url, {
      method: "GET",
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          //inizializza this.state.video_list
          this.setState({
            video_list: []
          }); //verifica che pulisca dai risultati precedenti
          var ytvid = []; 
          var promises = [];
          for(var key in result.items){
            promises.push(this.get_YTdescription(ytvid, result.items[key].id.videoId));
          }
          Promise.all(promises).then(() => {
            this.setState({
              video_list: ytvid
            });
          });
        })
      .catch((error) => {
        console.error(error);
    }); 
  } 

  find_poidata = () => {
    this.searchPlusCodes()
      .then(() => this.YTube())
    //this.YTFilter(); .then(() => this.YTFilter())
  }

  render() {
    this.printstate();
    return (
      <View style={styles.container}>
      <Text> HooRMI </Text>
        <FetchLocation onGetLocation={this.initLocationProcedure} />
        <FindVideo findvid={this.find_poidata} />
        <UsersMap myLocation={this.state.myLocation} poi={this.state.markers} />
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

//geoloc : purpose: language:content [:A + audience][:T + tone ][:P + numero annotazione]
//8FPHF8VV+57:why:ita:his-art:Agen:Tser:P2

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