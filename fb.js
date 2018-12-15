const firebase = require('firebase');
const config = {
    apiKey: "AIzaSyClhdkxUCTfnLOdPa8dMFFtK4nqoUZAQ9w",
    authDomain: "golinks-e3ffb.firebaseapp.com",
    databaseURL: "https://golinks-e3ffb.firebaseio.com",
    projectId: "golinks-e3ffb",
    storageBucket: "golinks-e3ffb.appspot.com",
    messagingSenderId: "28163576499"
};
firebase.initializeApp(config);
const database = firebase.database();
const ref = database.ref("links");
// const o = {'GoLink':'aaa','MappedURL':'dsaadsdasasdasd'};
// ref.push(o);
// o.GoLink="vvv";
// o.MappedURL="sadadsdasdsa";
// ref.push(o);
// o.GoLink="bbb";
// o.MappedURL="dsaadssad";
// ref.push(o);
// o.GoLink="ccc";
// o.MappedURL="wewsddsrs";
// ref.push(o);
// o.GoLink="ddd";
// o.MappedURL="24324234";
// ref.push(o);
// o.GoLink="eee";
// o.MappedURL="bvccvbbvccvb";
// ref.push(o);
// o.GoLink="fff";
// o.MappedURL="fredsdft";
// ref.push(o);
// o.GoLink="ggg";
// o.MappedURL="3242342334423";
// ref.push(o);

ref.orderByChild("GoLink").equalTo("aaa").on("value",function(ss){
    ss.forEach(function(data){
        console.log(data.val().GoLink);
    })
})

// database.ref("/links").push({'aaa':'sadasdasdsad'});
// database.ref("/links").push({'bbb':'sa'});
// database.ref("/links").push({'ccc':'erwrwe'});
// database.ref("/links").push({'ddd':'32243'});
// database.ref("/links").push({'eee':'cxvxxcv'});
// database.ref("/links").push({'fff':'ergreer'});
// database.ref("/links").push({'ggg':'wefwef'});
// database.ref("/links").push({'hhh':'gfsdfsf'});
// database.ref("/links").push({'iii':'wefsdrsdt'});