import React, { Component } from 'react';
import {View ,StyleSheet,FlatList,Text,Alert,ActivityIndicator,Image,Dimensions,Linking,TouchableHighlight,BackHandler} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {Header,Left,Body,Right} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
var JSON;
import Api from '../api/Api';

import {back} from '../constant/const';
import myBoolean from '../components/sidemenu.js'
 var data= '',height,width;
 var page=1;
 var callEndReached = true;


class second extends Component {

    constructor(props)
    {
      super(props);
      height = Dimensions.get('window').height;
     width = Dimensions.get('window').width;
     Navigation.events().bindComponent(this);

      this.getListCall= this.getListCall.bind(this);
      this.state = {
      refreshing:false,
      spinnerVisible:false,
      data: [],
      }
    page = 1;
    }

    componentDidMount(){

       this.getListCall();
       this.unVisibleDrawer();

    }
    componentDidAppear() {
      BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
    }

   componentDidDisappear() {
     BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
   }
   onBackClick(){
     //** use this for stack maintain(sidemenu stackmaintain issues) **//
        // Navigation.popTo('HomePageID');
                 //** or **//
        Navigation.pop(this.props.componentId);
        return true;
  }

    //drawer cant open from side slide
    unVisibleDrawer(){
        Navigation.mergeOptions(this.props.componentId, {
              sideMenu: {
                left: {
                  visible: false,
                  enabled: false,
                  screen: "second"
                }
              },statusBar: {
                    style: 'dark',
                    animate: true ,
                    backgroundColor :'red'
                  }
        });
      }

    getListCall(){
      this.setState({spinnerVisible:true});

      Api.getAppCategoreyApi(this, 'com.orafox.hearttouchinglovepoems.android','Android','12346',page,'20', function(parent, data){

                if(data.error == '1'){
                parent.setState({spinnerVisible:false});
                }else{
                  parent.setState({spinnerVisible: false,data : data.categeory});
              }

      });

       // var that = this;
       // var url = "http://appsjunction.orafox.com/apis/get_app_categories";
       //
       //  this.formdata = new FormData();
       //  this.formdata.append("bundle_id", "com.orafox.hearttouchinglovepoems.android");
       //  this.formdata.append("os_type", "Android");
       //  this.formdata.append("device_id", "12346");
       //  console.log('@@ getMostPopularApi->>>>>>> ' +url + ' - >>>>>>>>>>>' +JSON.stringify(this.formdata));
       //
       //
       // fetch(url,{
       //   method: 'POST',
       //  //  headers: {
       //  // 'Content-Type': 'application/x-www-form-urlencoded',
       //  //  },
       //   body: this.formdata,
       //
       // }).then((response) => response.json())
       //  .then((responseText) => {
       //
       //  this.setState({isLoading: false, data : responseText.categeory});
       //
       // console.log("inside responsejson>>>>>>>>>>"+ responseText.categeory);
       // console.log(">>>>>>>>>>"+ this.state.data);
       //
       //   }).done();
    }
    _onRefresh(){
        page = 1;
        callEndReached = true;
        this.componentDidMount();
      }
      onEndReached(){
        if(callEndReached){
          page = page + 1;

          this.setState({spinnerVisible:true});
          Api.getAppCategoreyApi(this, 'com.orafox.hearttouchinglovepoems.android','Android','12346',page,'21', function(parent, data){
                if(data.error == '1'){
                  parent.setState({spinnerVisible:false});
                }else{
                  // alert(data.categeory.length)
                  var tempArr = parent.state.data;
                  tempArr = tempArr.concat(data.categeory);
                  parent.setState({data : tempArr});
                  parent.setState({spinnerVisible:false});
                  if(data.categeory.length == 0){
                    callEndReached = false;
                  }
                }
            });

        }
      }
    FlatListItemSeparator = () => {
       return (
         <View
           style={{
             height: .5,
             width: "100%",
             backgroundColor: "#000",
           }}
         />
       );
     }

     //for Pass Data to another Activity
     onCategoryClick(index,rowData){
       Navigation.push(this.props.componentId, {
         component: {
           id:'ThirdPageId',
           name: 'third',
           passProps: {
             id:rowData.id,
             name:rowData.name,
             photo_path:rowData.photo_path
           },
           options: {
             topBar: {
               visible: false,
               drawBehind: true,
               title:{
                 text :'Third',
                 alignment: "center",
                 color:'red'
               }
             },
           }
         }
       });
       }

    //for ItemRowlayout and its data set
    renderItem = ({ item: rowData, index }) => {

      var imageSrc = require('../img/logo.png');
          if(rowData.photo_path != ''){
            imageSrc = {uri : rowData.photo_path};
          }

       return (
         <TouchableHighlight style={{backgroundColor:'#e0e0e0'}} underlayColor='transparent' onPress={() => { this.onCategoryClick(index,rowData); }}>
          <View style={{flex:1,flexDirection:'row', padding: 5 }}>
                    <Image borderRadius={10} style={{width:width/2 - 15,height:width/3}} resizeMode='cover' source={imageSrc} />

              <View style={{flex:1,flexDirection:'column',backgroundColor: 'transparent', justifyContent: 'center'}}>
                  <Text style={styles.item}>{rowData.name}</Text>
                  <Text style={styles.item}>{rowData.created_on}</Text>

              </View>
          </View>

           </TouchableHighlight>
            );
           }


  render() {

      return (


        <View style={{flexDirection: 'column',flex: 1, backgroundColor: '#7be0cd'}} >
            <Spinner visible={this.state.spinnerVisible} textStyle={{color: '#FFF'}} />
        <Header style={{backgroundColor:'black'}} androidStatusBarColor='#000'>
                  <Left style={{flex: 0.2,backgroundColor:'transparent'}}>
                      <TouchableHighlight onPress={() => { this.onBackClick()}}>
                          <Image style={{width: 30, height: 30,alignSelf: 'center'}} resizeMode='contain' source={back} />
                      </TouchableHighlight>
                  </Left>

                  <Body style={{flex: 1,backgroundColor:'transparent',alignItems: 'center'}}>
                      <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: 'transparent'}}>
                          <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Second</Text>
                      </View>
                  </Body>
            <Right style={{flex: 0.2,backgroundColor:'transparent'}}/>
              </Header>

        <FlatList
           data={this.state.data}
           ItemSeparatorComponent = {this.FlatListItemSeparator}
           renderItem={this.renderItem}
           refreshing={this.state.refreshing}
           onRefresh={this._onRefresh.bind(this)}
           keyExtractor={(item, index) => index.toString()}
           removeClippedSubviews={true}  // for prevent memory leak
           onEndReached={this.onEndReached.bind(this)}
           onEndReachedThreshold={0.5}
          />

        </View>
      );

    }
}
export default second


const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 15

  },
  imageView: {

    width:  '50%',
    height: 50 ,
    margin: 7,
    borderRadius : 7

},

  item: {
    padding: 4,
    color:'#4074c9',
    fontSize: 15

  },
})
