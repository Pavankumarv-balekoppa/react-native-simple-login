import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
// import Battery from 'react-native-device-battery';

const BatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState(0);

//   useEffect(() => {
//     const unsubscribe = Battery.addLevelListener((level) => {
//       setBatteryLevel(level);
//     });
//     return () => unsubscribe();
//   }, []);

  return (
    <View>
      <Text>Battery Level: {batteryLevel}%</Text>
    </View>
  );
};
export default BatteryStatus;