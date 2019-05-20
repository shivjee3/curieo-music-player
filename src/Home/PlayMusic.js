import React from 'react';
import { Audio } from 'expo';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {Footer, Container,Header, Content,Left,Right,Body,Title,Button,Icon} from 'native-base';
import Styles from '../Style';


export  class PlayMusic extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      musicInfo:this.props.navigation.getParam('musicInfo'),
      url: this.props.navigation.getParam('url'),
      playing:false,
      position: parseInt(this.props.navigation.getParam('position'))
    }
    this.audioPlayer = new Audio.Sound();
}

backButton=()=>{
  let musicAll= this.props.musics;
  let total = Object.keys(musicAll).length;
  let newPosition = (this.state.position == 0) ? total-1 : this.state.position-1;
  this.setState({musicInfo: musicAll[newPosition]});
  this.setState({position: newPosition});
}

nextButton=()=>{
  let musicAll= this.props.musics;
  let total = Object.keys(musicAll).length;
  let newPosition = (this.state.position == total-1) ? 0 : this.state.position+1;
  this.setState({musicInfo: musicAll[newPosition]});
  this.setState({position: newPosition});
}

playMusic = async () => {
  try {
    await this.audioPlayer.unloadAsync();
    await this.audioPlayer.loadAsync({uri: this.state.url+this.state.musicInfo.source});
    if (this.state.playing) { 
      this.audioPlayer.pauseAsync();
      this.setState({playing:false});
    } else {
      this.audioPlayer.playAsync();
      this.setState({playing:true});
    }
  } catch (err) {
    console.warn("Couldn't Play audio", err)
  }  
}

  render(){
    return(

  <Container>
  <ImageBackground style={{width:'100%',height:'100%'}}
  source={{uri: this.state.url+this.state.musicInfo.image}}
> 

 <Header style={{marginTop:25, backgroundColor:'brown', height:48}}>
        <Left style={{flex:0.3}} >
          <Button transparent onPress={()=>this.props.navigation.navigate('Home')}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title style={{color:"white"}}>Music</Title>
        </Body>
        <Right style={{flex:0.3}} >
          <Button transparent onPress={()=>this.props.navigation.navigate('newFile')}>
            <Icon name='arrow-forward' />
          </Button>
        </Right>
      </Header>
      <Text>{this.state.musicInfo.title}</Text>
  <Content/>
  
  <Footer style={{backgroundColor:'black',height:75,borderTopColor:'blue',borderTopWidth:2}}>
  
  <View style={Styles.buttonContainer}>
     <TouchableOpacity >
      <Image style={Styles.secondaryControl}
        source={require('../../assets/img/ic_shuffle_white.png')}/>
    </TouchableOpacity>

    <View style={{width: 30}} />

    <TouchableOpacity onPress={()=>this.backButton()}>
      <Image source={require('../../assets/img/ic_skip_previous_white_36pt.png')}/>
    </TouchableOpacity>
    
    <View style={{width: 20}} />
    
       <TouchableOpacity onPress={()=>this.playMusic()}>
        {this.state.playing ? (
          <View style={Styles.playButton}>
          <Image source={require('../../assets/img/ic_pause_white_48pt.png')}/>
          </View>
        ) :
        <View style={Styles.playButton}>
          <Image source={require('../../assets/img/ic_play_arrow_white_48pt.png')}/>
        </View>}
      </TouchableOpacity>
    
    <View style={{width: 20}} />

    <TouchableOpacity onPress={()=>this.nextButton()}>
      <Image source={require('../../assets/img/ic_skip_next_white_36pt.png')}/>
    </TouchableOpacity>

    <View style={{width: 30}} /> 

    <TouchableOpacity >
      <Image style={Styles.secondaryControl}
        source={require('../../assets/img/ic_repeat_white.png')}/>
    </TouchableOpacity>
  </View>
 
  </Footer>
  </ImageBackground>
  </Container>
);
    
}
}

const mapStateToProps = state => ({
  musics: state.music
})

export default connect(mapStateToProps,null)(PlayMusic);