
import React,{ Component } from 'react';
import {View,StyleSheet,TouchableOpacity,Alert,Text,Image,Linking,TouchableHighlight} from 'react-native';
import {menu,arrow} from '../constant/const';
import { Navigation } from 'react-native-navigation';
import {Header,Left,Body,Right} from 'native-base';
import SplashScreen from 'react-native-splash-screen'


  class home extends Component{

      constructor(props) {
          super(props);

        }

      componentDidMount() {
        SplashScreen.hide();
          }


    openDrawer(){
        Navigation.mergeOptions(this.props.componentId, {
              sideMenu: {
                left: {
                  visible: true,
                  enabled: true,
                  screen: "home"
                }
              }
        });
      }
      onMenuClick(){
        this.openDrawer();
      }
      onRightCick(){
        Alert.alert();
      }


      pushViewPostScreen() {
          Navigation.push(this.props.componentId, {
            component: {
              id:'SecondPageId',
              name: 'second',
              passProps: {
                text: 'Some props that we are passing'
              },statusBar: {
                    style: 'dark',
                    animate: true ,
                    BackgroundColor :'red'
                  },
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  title:{
                    text :'Second',
                    alignment: "center"
                  }
                },
              }
            }
          });
        }

       render() {

          return (
            <View style={{flexDirection: 'column',flex: 1, backgroundColor: '#7be0cd'}} >

            <Header style={{backgroundColor:'black'}} androidStatusBarColor='#000'>
                      <Left style={{flex: 0.2,backgroundColor:'transparent'}}>
                          <TouchableHighlight onPress={() => { this.onMenuClick() }}>
                              <Image style={{width: 30, height: 30,alignSelf: 'center'}} resizeMode='contain' source={menu} />
                          </TouchableHighlight>
                      </Left>

                      <Body style={{flex: 1,backgroundColor:'transparent',alignItems: 'center'}}>
                          <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: 'transparent'}}>
                              <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Home</Text>
                          </View>
                      </Body>

                      <Right style={{flex: 0.2,backgroundColor:'transparent'}}>
                          <TouchableHighlight onPress={() => { this.onRightCick() }}>
                              <Image style={{width: 30, height: 30,alignSelf: 'center'}} resizeMode='contain' source={arrow} />
                          </TouchableHighlight>
                      </Right>
            </Header>

                  <TouchableOpacity onPress={() => this.pushViewPostScreen()}>
                      <Text style = {styles.textstyl}>This is Home Screen</Text>
                  </TouchableOpacity>

            </View>
         );
       }
}



const styles = StyleSheet.create({
  container: {
     padding: 30,
     flex:1,
     justifyContent: 'center',
     backgroundColor: '#7be0cd'
  },
  textstyl: {
        alignSelf: 'center',
        color: 'red',
        margin: 10,
      fontSize : 30
    },

});
module.exports = home;
