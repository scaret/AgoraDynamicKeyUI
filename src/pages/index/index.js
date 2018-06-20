import {AccessToken, priviledges} from "AgoraDynamicKey/nodejs/src/AccessToken"

function generateToken(){
  var self = this;
  var appID = self.appID;
  var appCertificate = self.appCertificate;
  var channelName = self.channelName;
  var uid = parseInt(self.uid);
  var priviledge = self.priviledge;
  var expireSecond = parseInt(self.expireSecond);
  var expireTimestamp = Math.floor(Date.now() / 1000 + expireSecond);

  if (!appID || !appCertificate || !channelName || !isFinite(uid) || !expireTimestamp){
    self.token = "";
    return;
  }

  window.localStorage["appID"] = appID;
  window.localStorage["appCertificate"] = appCertificate;
  window.localStorage["channelName"] = channelName;
  window.localStorage["uid"] = uid;
  window.localStorage["expireSecond"] = expireSecond;

  var accessToken = new AccessToken(appID, appCertificate, channelName, uid);
  for (var i = 0; i< priviledge.length; i++){
    console.log("addPriviledge", priviledge[i], expireTimestamp);
    accessToken.addPriviledge(priviledge[i], expireTimestamp);
  }
  self.token = accessToken.build();
  self.tokenInfo = JSON.stringify(accessToken, null, 4);
  console.log("self.tokenInfo", self.tokenInfo);
}

var vueOptions = {
  el: "#app",
  data: {
    appID: window.localStorage["appID"] || "",
    appCertificate: window.localStorage["appCertificate"] || "",
    channelName: window.localStorage["channelName"] || "",
    uid: window.localStorage["uid"] || "0",
    expireSecond: window.localStorage["expireSecond"] || "300",
    priviledge: [],
    token: "",
    tokenInfo: "",
    priviledges: priviledges
  },
  methods: {
    generateToken: generateToken
  }
}

new Vue(vueOptions);
