import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,ScrollView,TouchableHighlight,Image,Alert
} from 'react-native';
import {arrow,email,search} from '../constant/const';
import { Navigation } from 'react-native-navigation';


class sidemenu extends Component {

  constructor(props){
    super(props);


    }

  closeDrawer(){
    Navigation.mergeOptions(this.props.componentId, {
          sideMenu: {
            left: {
              visible: false,
            }
          }
    });
  }
  onHomeClick(){
    // this.props.navigator.handleDeepLink({link : 'home'});
    //if put Navigation.push('AppRoot', then backstack ( AppRoot is stackid )not maintain>>
        //
        // Navigation.push('homeID', {
        //   component: {
        //     name: 'home',
        //     passProps: {
        //       text:'',
        //     }
        //   }});
    this.closeDrawer();
  }

  onSecondClick(){
      //homeID is stack id
    Navigation.push('homeID', {
      component: {
        name: 'second',
        passProps: {
          text:'',
        }
      }});
    this.closeDrawer();
  }

  onThirdClick(){
      //homeID is stack id
    Navigation.push('homeID', {
      component: {
        name: 'third',
        passProps: {
          text:'toThird',
        }
      }});
    this.closeDrawer();
  }
  render(){

      return (
        <View style={{flex: 1,backgroundColor: 'white',flexDirection:'column'}}>

          <ScrollView contentContainerStyle={{flex:1}}>
              <View style={{flexDirection: 'column',flex: 1}}>
                  <TouchableHighlight underlayColor='#e0e0e0' onPress={() => this.onHomeClick()}>
                      <View style={{flexDirection: 'row',padding:20}}>
                        <View>
                           <Image source={email} style={{width: 30,height: 30}}/>
                        </View>
                        <View>
                           <Text style={styles.commanText}> Home </Text>
                        </View>
                      </View>
                  </TouchableHighlight>

                  <TouchableHighlight underlayColor='#e0e0e0'  onPress={() => this.onSecondClick()}>
                    <View style={{flexDirection: 'row',padding:20}}>
                      <View>
                         <Image source={search} style={{width: 30,height: 30}}/>
                      </View>
                      <View>
                         <Text style={styles.commanText}> Second </Text>
                      </View>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight underlayColor='#e0e0e0'  onPress={() => this.onThirdClick()}>
                   <View style={{flexDirection: 'row',padding:20}}>
                      <View>
                         <Image source={arrow} style={{width: 30,height: 30}}/>
                      </View>
                      <View>
                         <Text style={styles.commanText}> Third </Text>
                      </View>
                   </View>
                  </TouchableHighlight>
              </View>
          </ScrollView>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  commanText: {color: 'black',fontSize:20,marginLeft:10},
  commanImage: {width: 25, height: 25,alignSelf:'center',margin:15},
  commanView: {flex: 1, flexDirection: 'row',alignItems: 'center',backgroundColor:'transparent',height: 70},
  commanTouchable: {backgroundColor:'transparent',borderRadius: 5,height: 70},
});

module.exports = sidemenu;
