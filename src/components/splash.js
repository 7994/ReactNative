
import React,{ Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {StyleSheet,View} from 'react-native';

  class splash extends Component{

      constructor(props) {
          super(props);

        }

      componentDidMount() {

      //something we can check to show splash screen)
            {
            setTimeout(function () {
              Navigation.push(this.props.componentId, {
                component: {
                
                  name: 'home',
                  passProps: {
                    text: 'Some props that we are passing'
                  },statusBar: {
                        style: 'dark',
                        animate: true ,
                        BackgroundColor :'red'
                      },

                }
              });

          }, 5000);
            }
          }





       render() {
          return (
            <View style={{flexDirection: 'column',flex: 1, backgroundColor: '#7542af'}} >

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
});
module.exports = splash;
