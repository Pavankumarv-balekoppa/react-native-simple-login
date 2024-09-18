import {useState} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import InputText from '../CommanComponents/InputText';
import PressableButton from '../CommanComponents/PressableButton';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { getTempleData } from '../Slice/extraSlice';
import { useDispatch } from 'react-redux';

const AddTemples = () => {
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pickImage = () => {
    if (image) {
      setImage(null);
      return;
    }
    const options: any = {
      mediaType: 'photo',
      includeBase64: false, // Set to true if you want Base64 data
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri; // Get the image URI
        setImage(uri); // Set the image URI to state
      }
    });
  };

  const handleReset = () => {
    setTitle('');
    setPlace('');
    setDetails('');
    setImage(null);
    setImageUrl('');
  };

  const handleSubmit = async () => {
    let img = image ? image : imageUrl;
    if (!title || !place || !details || !img) {
      alert('Please fill all the fields');
      return;
    }
    const data = {
      title,
      place,
      details,
      img,
    };
    setLoading(true);
    try {
      const response = await fetch(
        'https://pavanallprojectdata.onrender.com/templeData',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        },
      );
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      dispatch(getTempleData());
      alert('Data submitted successfully:');
      handleReset();
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.main}>
      <View style={styles.fieldscontainer}>
        <View style={styles.fields}>
          <Text style={styles.text}>Name </Text>
          <InputText placeholder="Name" value={title} onChangeText={setTitle} />
        </View>
        <View style={styles.fields}>
          <Text style={styles.text}>Place </Text>
          <InputText
            placeholder="Place"
            value={place}
            onChangeText={setPlace}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.text}>Discription </Text>
          <InputText
            placeholder="Discription"
            value={details}
            onChangeText={setDetails}
          />
        </View>
        {!image && (
          <View style={styles.fields}>
            <Text style={styles.text}>Image </Text>
            <InputText
              placeholder="Image"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
          </View>
        )}
        {!imageUrl && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: 'white', fontWeight: 'bold', marginBottom: 10}}>
              ------- OR -------
            </Text>
            <Pressable
              style={{
                backgroundColor: '#455A64',
                height: 50,
                width: 300,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={pickImage}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {image ? 'Clear Image' : 'Pick Image'}
              </Text>
            </Pressable>
          </View>
        )}
        {image && (
          <FastImage
            source={{uri: image}}
            style={{width: 200, height: 200, marginTop: 20}}
          />
        )}
      </View>
      <View style={styles.btns}>
        <PressableButton
          title="Cancle"
          backgroundColor={'red'}
          color={'white'}
          onPress={handleReset}
          disabled={false}
          width={'35%'}
        />
        <PressableButton
          title="Upload"
          backgroundColor={'green'}
          color={'white'}
          onPress={handleSubmit}
          disabled={false}
          width={'35%'}
        />
      </View>
    </ScrollView>
  );
};

export default AddTemples;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#212121',
  },
  fieldscontainer: {
    alignItems: 'center',
  },
  fields: {
    padding: 20,
  },
  text: {
    color: 'white',
    marginBottom: 7,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});
