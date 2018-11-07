import React from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
import Layout from './layout/Layout'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class App extends React.Component {
  
  
constructor(){
  super();
  this.state={
    status: false
  }
}

async componentDidMount() {
  NetInfo.isConnected.addEventListener('connectionChange', await this.handleConnectionChange);
}

componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}



handleConnectionChange = (isConnected) => {
        if(isConnected){
          this.setState({status: true}, ()=> {
            return(
              <View>
                <Text>You are online</Text>
              </View>
            )
          })
         
        } else if(isConnected == false ){
          this.setState({
            status: false
          }, ()=> {
            return (
              <View><Text>You are offline</Text></View>
            )
          })
          
        } else {
          this.setState({status: false}, ()=> {
            return(
              <View>
                <Text>Opps!</Text>
              </View>
            )
          })
         
        }
      
    
  
}  



render() {
 if(this.state.status == false ){
   return(
    <View style={{alignItems:'center', justifyContent:'center',flex:1}}>
       <Icon name='frown' size={44}/>
      <Text style={{textAlign:'center',marginTop:6, fontSize:22, fontFamily:'Quicksand-Medium'}}>No Internet</Text>
    </View>
   )
  
 }
  
return(
  <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
         
             <Layout/> 
          </Provider>
          
        </PersistGate>
)
}
}


//'http://192.168.43.76:3001/'
