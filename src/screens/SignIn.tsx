import { StackScreenProps } from "@react-navigation/stack";
import { FunctionComponent, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SignedOutStackProps } from "../../Router";
import SignInButton from "../components/button/SignInButton";
import CustomInput from "../components/input/CustomInput";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTailwindColor from "../util/hook/useTailwindColor";

const SignIn: FunctionComponent<
  StackScreenProps<SignedOutStackProps, "SignIn">
> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  return (
    <ScrollView
      className="bg-white h-full w-full p-4"
      style={{
        rowGap: 24,
      }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        rowGap: 24,
      }}
      scrollEnabled={false}
    >
      <SignInButton option="facebook" />
      <SignInButton option="twitter" />
      {/* <SignInButton option="google" /> */}
      <View
        className="flex flex-row items-center"
        style={{
          columnGap: 10,
        }}
      >
        <View className="border-b border-gray-300 bg-transparent flex-1" />
        <Text className="text-gray-300">or</Text>
        <View className="border-b border-gray-300 bg-transparent flex-1" />
      </View>
      <CustomInput
        value={email}
        iconName="email"
        setValue={setEmail}
        placeholder="Kullanıcı adı"
      />
      <CustomInput
        value={password}
        iconName="lock"
        setValue={setPassword}
        isPassword
        placeholder="Şifre"
      />
      <TouchableOpacity
        className="bg-teal-500 rounded-full w-full py-3 flex flex-row items-center justify-center"
        onPress={() => {
          setOpen(true);
        }}
      >
        <Text className="text-white font-semibold text-xl">Login</Text>
      </TouchableOpacity>
      <Text className="text-gray-900">
        Don't have an account{" "}
        <Text
          className="text-teal-500"
          onPress={() => {
            navigate("SignUp");
          }}
        >
          Sign up Now
        </Text>
      </Text>
      <Text
        className="text-teal-500"
        onPress={() => {
          navigate("ForgotPassword");
        }}
      >
        Forgot password?
      </Text>
      <Modal
        visible={open}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          console.log("request close");
          setOpen(false);
        }}
      >
        <BlurView
          className="flex flex-1 justify-center items-center bg-black/70"
          intensity={12}
          onTouchEnd={() => setOpen(false)}
        >
          <View
            className="bg-white items-center w-4/5 py-4 px-6 rounded-xl border-none shadow-md"
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
          >
            <View
              className="w-full flex flex-col items-center justify-center"
              style={{
                rowGap: 16,
              }}
            >
              <MaterialCommunityIcons
                name="check-circle"
                size={64}
                color={useTailwindColor("bg-teal-500")}
              />
              <Text className="text-xl font-semibold text-gray-900">
                Login Successful
              </Text>
              <Text className="text-gray-900 text-center">
                Thank you, you have successfully logged in to Caffein app. Click
                again to go to Caffein main page.
              </Text>
              <TouchableOpacity
                className="bg-teal-500 rounded-full w-full py-3 flex flex-row items-center justify-center"
                onPress={() => {
                  setOpen(false);
                }}
              >
                <Text className="text-white font-semibold">Go to Caffein</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </ScrollView>
  );
};

export default SignIn;
