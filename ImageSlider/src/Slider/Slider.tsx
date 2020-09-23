/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {SliderBox} from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import {apiGet} from '../networks/ApiManager';
import urls from '../utils/config';
import {fetched, fetching} from '../actions/allPhotos';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
const Slider = ({Allphotos, dispatch}) => {
  // Refresh with new data
  const [refreshing, setRefreshing] = React.useState(false);

  const [images, setImages] = useState([]);

  const [author, setAuthorNames] = useState([]);

  const [name, setAuthor] = useState('');

  const [savedIndex, setIndex] = useState(0);

  //Generate Random Values
  const getRandomValues = () => {
    if (Allphotos.data.length > 0) {
      let localImagesArr = [];
      let authorArr = [];
      for (var i = 0; i < 5; i++) {
        const random = Math.floor(Math.random() * Allphotos.data.length);
        localImagesArr.push(urls.ImageUrl + random);
        authorArr.push(Allphotos.data[random].author);
      }
      console.log('saved index :', savedIndex);
      console.log(localImagesArr, authorArr);
      setImages(localImagesArr);
      setAuthorNames(authorArr);
      setAuthor(authorArr[savedIndex]);
    }
  };

  //OnRefresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getRandomValues();
    wait(2000).then(() => setRefreshing(false));
  }, [savedIndex]);

  //Check for the change in reducer Data
  useEffect(() => {
    getRandomValues();
  }, [Allphotos.data]);

  //Get all Photos
  const getAllPhotos = async () => {
    dispatch(fetching());
    const response = await apiGet(urls.BaseUrl + 'list');
    console.log('response :', response);
    if (response.status == 200) {
      let value = [...response.data].map(val => {
        return {author: val.author, id: val.id};
      });
      dispatch(fetched(value));
    } else {
      Alert.alert('API error');
    }
  };

  useEffect(() => {
    //If Data found in Persist Ignore calling the api
    if (Allphotos.data && Allphotos.data.length > 0) {
      getRandomValues();
    } else {
      getAllPhotos();
    }
  }, []);

  const updateAuthorName = index => {
    setAuthor(author[index]);
    setIndex(index);
  };
  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View>
          <Text>{name ? name : author[0]}</Text>
        </View>
        <SliderBox
          images={images}
          sliderBoxHeight={SCREEN_HEIGHT / 2}
          currentImageEmitter={index => {
            updateAuthorName(index);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: SCREEN_HEIGHT,
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

function mapStateToProps(state) {
  return {
    Allphotos: state.Allphotos,
  };
}
export default connect(mapStateToProps)(Slider);
