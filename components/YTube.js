import React from 'react';
//import YouTube from 'react-native-youtube';
//var form = new FormData(document.getElementById('login-form')); 

var key = "AIzaSyD1saWNvYTd_v8sfbPB8puL7fvxKdjcfF0";
var URL = "https://www.googleapis.com/youtube/v3/search";
//var id;
//var query;

var options = {
  part: "snippet",
  q: "HooRMI:" + "40.7591,-73.9851", //pos.lat + "," + pos.lng,
  maxResults: 10,
  type: "video",
  key: key
}

function YTube() {
  fetch(URL, {
    method: "GET",
    body: options
  })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        console.log(res)
      }),
      .catch((error) => {
        console.error(error);
    });
}

export default YTube;