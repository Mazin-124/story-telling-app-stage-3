import React from 'react';
import { Text, View, StyleSheet, SafeAreaView ,Platform,StatusBar,Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {FlatList} from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf')
}
let stories = require('./temp.json');

import StoryCard from './StoryCard'

export default class Feed extends React.Component {
  constructor(props){
    super(props);
    this.state={
      fontsLoaded: false
    }
  }

  async _loadFontsAsync(){
    await Font.loadAsync(customFonts);
    this.setState({
      fontsLoaded:true
    })
  }

  componentDidMount(){
    this._loadFontsAsync()
  }

  renderItem=({item:story})=>{
    return <StoryCard story ={story}/>
  }
  
  keyExtractor=(item,index)=>{
    index.toString()
  }

  render() {
    if(!this.state.fontsLoaded){
      return <AppLoading/>
    }
    else{
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea}/>
        <View style ={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image source={require('../assets/logo.png')} style={{width:60,height:60,resizeMode:'contain',marginLeft:10}}/>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text style={styles.appTitleText}>StoryTelling App</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={stories}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.93
  }
});
