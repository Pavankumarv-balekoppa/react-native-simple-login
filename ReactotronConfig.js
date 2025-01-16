import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

Reactotron.configure({name: 'React Native App'})
  .useReactNative( {networking : true })
  .use(reactotronRedux())
  .connect();

if (__DEV__) {
    Reactotron.clear(); // Clears Reactotron on every reload
    console.tron = Reactotron; // Attach Reactotron to console.tron
    console.tron.log('Hello, Reactotron!');
}

console.tron = Reactotron; // Attach Reactotron to console
