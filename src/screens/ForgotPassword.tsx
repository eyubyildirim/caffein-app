import React, { type FunctionComponent } from "react";
import { View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SignedOutStackProps } from "../../Router";

const ForgotPassword: FunctionComponent<
  StackScreenProps<SignedOutStackProps, "ForgotPassword">
> = ({}) => {
  return (
    <View className="h-full w-full flex flex-col items-center justify-center">
      <Text>Hello</Text>
    </View>
  );
};

export default ForgotPassword;
