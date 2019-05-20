import { StyleSheet} from 'react-native';

export default StyleSheet.create({

musicIcon:{
  color:'red',
  fontSize:30,
  width:30
  
},
buttonContainer: {
  flexDirection:'row',
   alignItems: 'center',
   justifyContent: 'flex-end',
   backgroundColor:'black'
 },
 playButton: {
   height: 65,
   width: 65,
   borderWidth: 1,
   borderColor: 'white',
   borderRadius: 72 / 2,
   alignItems: 'center',
   justifyContent: 'center',
 },
 secondaryControl: {
   height: 22,
   width: 22,
   opacity: 0.50,
 },

})

