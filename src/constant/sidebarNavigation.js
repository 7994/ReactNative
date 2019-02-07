export function onNavigation(page,parent){
  // alert(page);
  if(page == 'home'){
      parent.resetTo({
        screen: 'home',
        navigatorStyle: {
          navBarHidden: true,
        },
        passProps:{
          catlist:true,
        },
        animationType: 'fade',
      });
  }else if(page == 'second'){
    parent.resetTo({
      screen: 'second',
      navigatorStyle: {
        navBarHidden: true,
      },
      passProps:{
        catlist:false,
      },
      animationType: 'fade',
    });
  }}
