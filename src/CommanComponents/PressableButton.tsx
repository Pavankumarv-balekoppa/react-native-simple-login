import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const PressableButton = (props: any) => {
    return (
      <Pressable
        style={{
          ...styles.Buttons,
          backgroundColor: props.backgroundColor,
          width: props.width,
        }}
        onPress={props.onPress}
        disabled={props.disabled}
        >
        <Text style={{color: props.color, fontSize: 17}}>{props.title}</Text>
      </Pressable>
    );
};
export default PressableButton

const styles=StyleSheet.create({
    Buttons:{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        textAlign: 'center',
        borderRadius: 4,
    }
})