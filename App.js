import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Font} from 'expo';
import {Root,Spinner} from 'native-base';
import MusicList from './src/Home';
import PlayMusic from './src/Home/PlayMusic';
import newFile from './src/Home/newFile';
import { Provider } from 'react-redux';
import {store} from './src/Redux/Store';

const AppNavigator = createStackNavigator(
  {
    Home: {screen:MusicList},
    PlayMusic: {screen: PlayMusic},
    newFile: {screen: newFile}
  },
  {
    headerMode: 'none',
    initialRouteName:'Home'
});

const AppContainer = createAppContainer(AppNavigator);



export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {loading:true };
}
  
  async componentWillMount() {
       
    await Font.loadAsync({
       Roboto: require("native-base/Fonts/Roboto.ttf"),
       Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
     });  
     this.setState({ loading: false });
}
 

render() {  
 if (this.state.loading) {
     return (
       <Root>
         <Spinner style={{marginTop:30}} color='orange' />
       </Root>
     );
   }       
    return (
      <Root>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
      </Root>
    );
  }
}
