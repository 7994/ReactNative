import {
    Navigation,
  } from 'react-native-navigation';
  // import SplashScreen from 'react-native-splash-screen';


  //import bcz error of wrapped Components
import home from './src/components/home.js'
import second from './src/components/second.js'
import third from './src/components/third.js'
import sidemenu from './src/components/sidemenu.js'
import splash from './src/components/splash.js'

// var home = require('./src/components/home.js');
// var second = require('./src/components/second.js');
// var third = require('./src/components/third.js');
// var sidemenu = require('./src/components/sidemenu.js');

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('home', () => home);
   Navigation.registerComponent('second', () => second);
   Navigation.registerComponent('third', () => third);
   Navigation.registerComponent('sidemenu', () => sidemenu);
   Navigation.registerComponent('splash', () => splash);



}
registerScreens();


Navigation.events().registerAppLaunchedListener(() => {
Navigation.setRoot({
  root: {
     sideMenu  :{
       left: {
         component: {
             id: 'sideMenu',
             name: 'sidemenu',
         }
       },
  center: {
    stack: {
      id: "homeID",
      children: [
        {
          component: {
            id:'HomePageID',//MainScreenID
            name: 'home',
            passProps: {
              text: 'This is tab 1',
            },
          }
        },
      ],
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
        },
      }
    }
  },
}
  }
});
});
