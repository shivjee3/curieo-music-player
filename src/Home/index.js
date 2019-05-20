import React from 'react';
import {
  Container, 
  Header, 
  Spinner, 
  Content,
  View, 
  List,
  Title, 
  ListItem,
  Input,
  Item, 
  Text,
  Body,
  Left,
  Right,
  Icon,
  Button
} from 'native-base';

import Styles from '../Style'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as musicCreators from '../Redux/Action';

export class MusicList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      music: [],
      searchTxt: '', 
    }
    this.musicArray = [];
    this.url = "http://storage.googleapis.com/automotive-media/";
  }
  
  componentDidMount (){
    this._getData();
  }

  _getData=()=> {
    fetch(this.url + 'music.json', {
      method: 'GET', 
    })
      .then((response)=>{
        //console.log(JSON.stringify(response));
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        }
          throw new Error(response.statusText)
      })
      .then((res)=> {
        console.log(res.music[0]);
        this.props.musicAction.addMusicList(res.music);
        this.setState({music:res.music})
        this.musicArray = res.music;
      })
      .catch((e) => {
        throw e;
      });
  }

  _searchFilterFunction = text => {    
    const newData = this.musicArray.filter(item => {      
      const textData = text.toUpperCase();  
      return item.title.toUpperCase().indexOf(textData) > -1;    
    });    
    this.setState({music: newData,searchTxt: text});  
  };
 
  render() {
    return (
      <Container style={{backgroundColor:'#414141'}}>
    
      <Header style={{marginTop:25, backgroundColor:'brown', height:48}}>
        <Left style={{flex:0.3}} />
        <Body>
          <Title style={{color:"white"}}>Music</Title>
        </Body>
      </Header>

      <Item rounded bordered style={{height:40,marginTop:5, backgroundColor:'#fff'}}>
        <Icon name="md-search" />
        <Input
          onChangeText={query => this._searchFilterFunction(query)}
          value={this.state.searchTxt}  
          placeholder="Search music" 
        />
        <Button transparent>
          <Icon name="music-note" type='MaterialIcons' /> 
        </Button>
      </Item>
   
      <Content >
      {
      (this.state.music.length<1)? 
      (<View><Text style={{marginLeft:25,color:'grey'}} >No record found!</Text><Spinner/></View>):
        (<List 
          dataArray={this.state.music}
          renderRow={(data,section,index)=>
          <ListItem
           onPress={()=>this.props.navigation.navigate('PlayMusic',{position:index,musicInfo:data, url: this.url} )}>
        
          <Left style={{flex:0.2}}>
          <Icon style={Styles.musicIcon} name="music" type="FontAwesome" /> 
          </Left>
          <Body style={{borderBottomColor:'white'}}>
            <Text style={{color:'white'}}>{data.title}</Text>
            <Text note numberOfLines={1}>{data.artist}</Text>
          </Body>
          <Right >
            <Icon name="md-arrow-dropright-circle" type="Ionicons" style={{color:"grey",fontSize:25}} />
          </Right>
          </ListItem>
          }
        />)}
        
      </Content>

    </Container>

    );
  }
}
const mapDispatchToProps = dispatch => ({
  musicAction : bindActionCreators(musicCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(MusicList);