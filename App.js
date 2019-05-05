/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text,
  Button,
  TouchableOpacity,
   View} from 'react-native';
import { opaqueType } from '@babel/types';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      resultText: "",
      resultAnswer:"",
    }
  }
  
  
  calculateResult(text){
    if(this.state.resultText =="" || this.state.resultText.charAt(this.state.resultText.length-1) == "+"
    ||  this.state.resultText.charAt(this.state.resultText.length  -1) == "-"
    ||  this.state.resultText.charAt(this.state.resultText.length -1) == "/"
    ||  this.state.resultText.charAt(this.state.resultText.length -1) == "*"){ 
    
      return
    }
    
 this.setState({
   resultAnswer: eval(text),
 })
}


  buttonPressed(text){

    if(text =="="){
      return this.calculateResult(this.state.resultText);
    }

    else{
      this.setState({
        resultText: this.state.resultText + text,
      })
    }
    
  }

  operate(op){
    switch(op){
      case 'DEL' : 
      if(this.state.resultText ==""){
        return
      }
        this.setState({
          resultText:  this.state.resultText.substring(0, this.state.resultText.length -1)
        });
        break;

      default:
      if(this.state.resultText =="" || this.state.resultText.charAt(this.state.resultText.length-1) == "+"
      ||  this.state.resultText.charAt(this.state.resultText.length  -1) == "-"
      ||  this.state.resultText.charAt(this.state.resultText.length -1) == "/"
      ||  this.state.resultText.charAt(this.state.resultText.length -1) == "*"){ 
        console.log("returning")
        return
      }

      
      this.setState({
        resultText: this.state.resultText + op,
      });
      break;


    }
  }

 
  

  render() {
    let elems = [];
    for(let i = 0; i<4; i++){
      let row = [];
      let nums = [[1,2,3], [4,5,6], [7,8,9], ['.',0,'=']];
      for(let j = 0; j <3; j++){
        row.push( <TouchableOpacity 
          key={i + "key" + j}
         
          onPress = {()=> this.buttonPressed(nums[i][j])}
        style = {styles.btn}>
          <Text style={styles.text}>{nums[i][j]}</Text>
        </TouchableOpacity>)

      }
      elems.push( <View style={styles.row}>{row}</View>)
    }

    let operations = ['DEL','+', '-', '/', '*']
    let op = []
    for(let i = 0; i<5; i++){
          op.push(<TouchableOpacity 
            key={i}
            onPress = {()=> this.operate(operations[i])}
              style = {styles.btn}>
            <Text style={styles.text}>{operations[i]}</Text>
          </TouchableOpacity>)
    }
    return (
      <View style={styles.container}>


      

      <View style = {styles.calculation}>
      <Text style= {styles.calculationText}>{this.state.resultText}</Text>
      </View>

      <View style = {styles.result}>
      <Text style= {styles.resultText}>{this.state.resultAnswer}</Text>
      </View>

      

      <View style = {styles.lowerLayout}>
      <View style = {styles.buttons}>
           {elems}
      </View>

      <View style = {styles.operations}>
      {op}
     </View>
     <View style= {styles.greenStyle}></View>
      </View>

      

        
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
 result: {
   alignItems: 'center',
   justifyContent: 'center',
   flex: 2,
   backgroundColor: 'white'
 },
 calculation: {
  alignItems: 'center',
  justifyContent: 'center',
   flex:1,
   backgroundColor : 'white'
 },
 buttons: {
   flex: 15,
   backgroundColor: '#191919'
 },

 operations: {
   justifyContent: 'space-around',
   alignItems: 'center',
   flex: 5,
backgroundColor: 'grey'
 },

 lowerLayout:{

   flex:5,
   flexDirection: 'row'
 },
 row:{
   alignItems: 'center',
   justifyContent: 'space-around',
   flexDirection: 'row',
   flex: 1,

 },
 resultText: {
   fontSize: 20,
   color: 'grey',
    backgroundColor: 'white',
 },

 calculationText: {
   backgroundColor: 'white',
   fontSize: 30,
   color: 'black'
 },
 text:{
 
   fontSize:25,
   color: 'white'
 },
 btn:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   alignSelf: 'stretch'

 },
 greenStyle:{
   flex:1,
   backgroundColor: '#55e2bd',
 }



});
