import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions  } from 'react-native';

import MapView, {Marker} from 'react-native-maps'
import MenuButton from './../../components/menuButton'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import calcDistance from '../../utils'
const { width, height } = Dimensions.get('window');


export default function App ({navigation}) {
 

  const [churches, setChurches] = useState([
    {
      id: 1, 
      title: "Minha primeira Igreja",
      description: 'Igreja 1',
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      }
    },
    {
      id: 2, 
      title: "Minha Segunda Igreja",
      description: 'Igreja 2',
      coordinate: {
        latitude: 37.77460,
        longitude: -122.447173,
      }
    },
    {
      id: 3, 
      title: "Minha terceira Igreja",
      description: 'Igreja 3',
      coordinate: {
        latitude: -22.8778817,
        longitude: -43.4694118,
      }
    }
  ]);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [focusedRegion, setFocusedRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const mapView = useRef(null)

  function onRegionChange (region){
    console.log( region)
    setRegion({region})
  }

  async function _getLocation (){
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        console.log("It's not a device")
      }
  
      let location = await Location.getCurrentPositionAsync({});

      console.log(location)
     
      return modifyRegion(location)
  }

  async function animateToNewRegion(e){
    const scrolled = await e.nativeEvent.contentOffset.x;
    const indexOfItemScrolled = await ( scrolled >= 0 ) 
      ? scrolled / Dimensions.get('window').width 
      : 0
            
    const focusedChurch = await churches[Math.round(indexOfItemScrolled)];
      await setFocusedRegion({
        latitude: focusedChurch.coordinate.latitude,
        longitude: focusedChurch.coordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    )
    await mapView.current.animateToRegion(focusedRegion)
    console.log(focusedRegion)
  } 

  async function modifyRegion(location){
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })


    console.log(region)
  }

  useEffect( async () => {  
    await _getLocation()
    churches.sort(function(a, b){

      let distanceFromA = calcDistance(region, a.coordinate, "K")
      let distanceFromB = calcDistance(region, b.coordinate, "K")

      console.log("distancia: " + distanceFromA)

      if(distanceFromA > distanceFromB) { 
        return 1;
      }else{
        return -1
      }
    });
    
    console.log(churches)
  }  , [])


  return (
    <View style={styles.container}>

          {/* map with interested points  */}
          <MapView
              initialRegion={region}
              onRegionChange={onRegionChange}
              style={styles.mapview}
              ref={map => mapView.current = map}
            >
              {churches.map( church => ( 
                <Marker
                  coordinate={church.coordinate}
                  title={church.title}
                  description={church.description}
                  key={church.id}
                />
                ))
              }
          </MapView>
          
          {/* menu button */}
          <MenuButton navigation={navigation} />
          
          
          {/* list of churches */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.churches}
            disableIntervalMomentum
            onMomentumScrollEnd={e => animateToNewRegion(e)}
          >

            {
              churches.map( church => ( 
                <View style={styles.church} key={church.id}>
                    <Text style={styles.title}> {church.title} </Text>
                    <View style={styles.addressView}>
                        <Text style={styles.subText}> {church.description} </Text>
                    </View>
                    <View>
                        <Text>Lat:{church.coordinate.latitude} Long:{church.coordinate.longitude}</Text>
                    </View>

                    <View>
                        <Text>Lat focused:{focusedRegion.latitude} Long focused:{focusedRegion.longitude}</Text>
                    </View>
                </View>
              ))
            }
            

          </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height    
  },
  churches:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 180, 
    width, 
  },
  church:{
    width: ( width - 20 ),
    height: 180,
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 30
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "#313131"
  },
  subText: {
    color:'#747d8c',
  },
  addressView: {
    width: '100%',
    paddingVertical: 10, 
    backgroundColor: "#fff"
  }

});
