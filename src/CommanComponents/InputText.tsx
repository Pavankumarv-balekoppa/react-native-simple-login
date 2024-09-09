import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const InputText = (props: any) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      autoCapitalize="none"
      placeholderTextColor={'#455A64'}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
  },
});
