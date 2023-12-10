import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SignedOutStackProps } from "../../Router";

const SignUp: FunctionComponent<
  NativeStackScreenProps<SignedOutStackProps, "SignUp">
> = ({ navigation: { navigate } }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigate("SignIn");
        }}
      >
        <Text>Go to screen 2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
