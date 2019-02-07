// Api.js
import {
    Alert,Platform,NetInfo
} from 'react-native';
import {mainAppUrl,mainTextApp} from '../constant/const';
import {internetConnectionTitle,internetConnectionMessage} from '../constant/const';
import ApiUtils from './ApiUtils';

var API_ENDPOINT = mainAppUrl + 'apis/'

var fetchData = function(url, formdata, callback) {
  if(Platform.OS === 'android'){
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ---- @@@ --- ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType)
      if(connectionInfo.type === 'none'){
        var data = {error : '1'}
        callback(undefined,data);
        setTimeout(function() {
            Alert.alert(internetConnectionTitle,internetConnectionMessage);
        }, 500);
      }else{
        fetch(url, {
                method: 'POST',
                body: formdata
            })
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then((response) => {
                // console.log('Poems -- *** ' + JSON.stringify(response));
                // out = JSON.parse(response._bodyText);
                out = response;
                callback(undefined, out);
            })
            .catch(e => {
                callback(e);
            })
      }
    });
  }else{
      fetch('https://www.google.com', {
        method: "Head",
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
        },
      })
      .then(() => {
        console.log('internet true');
        fetch(url, {
                method: 'POST',
                body: formdata
            })
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then((response) => {
                // console.log('//////// -- *** ' + JSON.stringify(response));
                // out = JSON.parse(response._bodyText);
                out = response;
                callback(undefined, out);
            })
            .catch(e => {
                callback(e);
            })
      })
      .catch(() => {
        console.log('internet false');
        var data = {error : '1'}
        callback(undefined,data);
        setTimeout(function() {
            Alert.alert(internetConnectionTitle,internetConnectionMessage);
        }, 500);
      });
  }
}

var Api = {
    formdata: new FormData(),

    getAppCategoreyApi: function(parent,bundle_id, os_type,device_id, page,limit, callback) {
        url = API_ENDPOINT + "get_app_categories";
        this.formdata = new FormData();
        this.formdata.append("bundle_id", "com.orafox.hearttouchinglovepoems.android");
        this.formdata.append("os_type", "Android");
        this.formdata.append("device_id", "12346");
        this.formdata.append("limit", limit);
        this.formdata.append("page", page);

        console.log('@@@ --------------------------------------- ' + url + ' -- ' + bundle_id + ' -- ' + os_type + ' -- ' + device_id + ' - ' + page + ' - ' + limit);
        // alert(bundle_id + ' -- ' + os_type + ' -- ' + device_id);

        fetchData(url, this.formdata, function(err, data) {
            // console.log(JSON.stringify(data));
            // alert(data);
            // alert(os_type);
            if (!err) {
              // console.log('@@@ data count -- *** ' + data.categeory.length);
                callback(parent, data);
            } else {
              // console.log(' ---------------------error------------------ ' + err);
                Alert.alert(mainTextApp, "Error communicating with server at category: " + err);
            }
        });
    },

}

module.exports = Api;
