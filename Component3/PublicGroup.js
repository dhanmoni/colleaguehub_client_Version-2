import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Madoka } from 'react-native-textinput-effects';


export default class PublicGroup extends Component {
    
    constructor(props){
        super(props);
        this.state={
            institution_name:'',
            
        }
    }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#fff', }}>
      <View style={{paddingHorizontal:10}}>
          <Text style={{marginBottom:6, fontFamily:'Quicksand-Medium', fontSize:18,color:'#333'}}>Group Name :</Text>
          <Madoka
            label={'Group/Institution name'}
            // this is used as active and passive border color
            borderColor={'#0073ff'}
            labelStyle={{ color: '#333', fontFamily:'Quicksand-Bold' }}
            inputStyle={{ color: '#333',fontFamily:'Quicksand-Bold' }}
        />
      </View>
      <View>
          <Text>Short description :</Text>
          <TextInput
            style={{color: '#333',fontSize:17,backgroundColor:'#fff', borderRadius:10,borderWidth:0.5, fontFamily:'Quicksand-Medium',padding:4, flex:1, textAlignVertical:'top'}}
            multiline={true}
            numberOfLines={4}
            value={this.state.description}
            onChangeText={(text) => this.setState({bio: text})}
            editable = {true}
      />
      </View>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({})
