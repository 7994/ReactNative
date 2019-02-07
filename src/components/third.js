
import React,{ Component} from 'react';
import {View,Text,StyleSheet,Image,TouchableHighlight,Alert,BackHandler} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {Header,Left,Body,Right} from 'native-base';
import {back} from '../constant/const';

var mName='',mImage='';
var imageSrc;

class third extends Component{

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);

      }
      //drawer cant open from side slide
      unVisibleDrawer(){
          Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                  left: {
                    visible: false,
                    enabled: false,
                    screen: "third"
                  }
                },statusBar: {
                      style: 'dark',
                      animate: true ,
                      backgroundColor :'red'
                    }
          });
        }
      componentDidMount(){
        this.unVisibleDrawer();
      }
      componentDidAppear() {
         BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
       }

       componentDidDisappear() {
         BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
       }
      onBackClick(){
        Navigation.pop(this.props.componentId);
         return true;
        // Alert.alert("sdasdj");
        //     Navigation.popTo('SecondPageId');
      }
       render() {

         mName = this.props.name;
         mImage = this.props.photo_path;

         if(mImage != ''){
           imageSrc = {uri : mImage};
         }

          return (
            <View style={{flexDirection: 'column',flex: 1, backgroundColor: '#7be0cd'}} >

                        <Header style={{backgroundColor:'black'}} androidStatusBarColor='#000'>
                                  <Left style={{flex: 0.2,backgroundColor:'transparent'}}>
                                      <TouchableHighlight onPress={() => { this.onBackClick() }}>
                                          <Image style={{width: 30, height: 30,alignSelf: 'center'}} resizeMode='contain' source={back} />
                                      </TouchableHighlight>
                                  </Left>

                                  <Body style={{flex: 1,backgroundColor:'transparent',alignItems: 'center'}}>
                                      <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: 'transparent'}}>
                                          <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Third</Text>
                                      </View>
                                  </Body>
                                  <Right style={{flex: 0.2,backgroundColor:'transparent'}}/>

                        </Header>
                    <View>
                        <Image source={imageSrc} style={{width: 160,height: 160, alignSelf: 'center',}}/>
                        <Text style = {styles.textstyl}>{mName}</Text>
                    </View>
           </View>
         );
       }
    }
module.exports = third;

const styles = StyleSheet.create({
  container: {
     padding: 30,
     flex:1,
     flexDirection:'column',
     backgroundColor: 'white'
  },
  textstyl: {
        alignSelf: 'center',
        color: 'green',
        fontSize : 16
     }
});
