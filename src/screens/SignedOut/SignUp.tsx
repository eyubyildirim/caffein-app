import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Dimensions,
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SignedOutStackProps } from "../../../Router";
import CustomInputLabel from "../../components/input/CustomInputLabel";
import useTailwindColor from "../../util/hook/useTailwindColor";

type SignUpForm = {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

const SignUp: FunctionComponent<
  NativeStackScreenProps<SignedOutStackProps, "SignUp">
> = ({ navigation: { navigate } }) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<SignUpForm>();

  const headerHeight = useHeaderHeight();

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    setOpen(true);
  };

  const form = useRef<View>(null);
  const scroll = useRef<ScrollView>(null);
  const focused = useRef(false);

  useEffect(() => {
    Keyboard.addListener("keyboardWillChangeFrame", (e) => {
      if (!focused.current) {
        scroll.current?.scrollTo({
          y: 0,
          animated: true,
        });
        return;
      }
      form.current?.measure((x, y, width, height, pageX, pageY) => {
        const remainder =
          Dimensions.get("window").height - headerHeight - height;
        const keyboardHeight =
          Dimensions.get("window").height - e.endCoordinates.screenY;

        if (keyboardHeight > remainder) {
          scroll.current?.scrollTo({
            y: keyboardHeight - remainder + 24,
            animated: true,
          });
        }
      });
    });

    return () => {
      Keyboard.removeAllListeners("keyboardWillChangeFrame");
    };
  }, []);

  return (
    <ScrollView
      // scrollEnabled={false}
      scrollToOverflowEnabled={true}
      ref={scroll}
      className={`bg-white w-full p-4`}
      style={{
        marginBottom: useSafeAreaInsets().bottom,
      }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        rowGap: 24,
      }}
    >
      <View
        className="w-full flex flex-col"
        style={{
          rowGap: 24,
        }}
        ref={form}
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="fullName"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: {},
          }) => (
            <CustomInputLabel
              setValue={onChange}
              value={value}
              placeholder="Full Name"
              returnKeyType="next"
              ref={ref}
              onSubmitEditing={() => {
                setFocus("phoneNumber");
              }}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <CustomInputLabel
              setValue={onChange}
              value={value}
              placeholder="Phone Number"
              returnKeyType="next"
              onBlur={onBlur}
              keyboardType="phone-pad"
              ref={ref}
              onSubmitEditing={() => {
                setFocus("email");
              }}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            validate: (v) => {
              if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v)) return true;
              else return "Invalid email address";
            },
          }}
          name="email"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <CustomInputLabel
              setValue={onChange}
              value={value}
              placeholder="Email"
              returnKeyType="next"
              onBlur={onBlur}
              autoCapitalize="none"
              keyboardType="email-address"
              error={errors.email?.message}
              ref={ref}
              onSubmitEditing={() => {
                setFocus("password");
              }}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="password"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <CustomInputLabel
              setValue={onChange}
              value={value}
              placeholder="Password"
              returnKeyType="done"
              onBlur={() => {
                focused.current = false;
                onBlur();
              }}
              onFocus={() => {
                focused.current = true;
              }}
              isPassword
              ref={ref}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
      </View>
      <View
        className="w-full flex-grow justify-end items-center"
        style={{
          rowGap: 16,
        }}
      >
        <TouchableOpacity
          className={`
        py-4 w-full bg-teal-500 rounded-full
        items-center justify-center transition-all
        ${!isValid && "bg-[#f4f4f4]"}
        `}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <Text
            className={`text-white text-xl font-semibold ${
              !isValid && "text-[#9f9f9f]"
            }`}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <Text className="text-black text-xs">
          Already have a Dokterku account?{" "}
          <Text
            className="text-teal-500"
            onPress={() => {
              navigate("SignIn");
            }}
          >
            Enter here
          </Text>
        </Text>
        <Text className="text-gray-400 text-xs">
          by registering, I agree to the{" "}
          <Text
            className="text-black underline"
            onPress={() => {
              navigate("SignIn");
            }}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
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
                Sign-up Successful
              </Text>
              <Text className="text-gray-900 text-center">
                You have successfully signed up for Caffein. Please check your
                email for verification.
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

export default SignUp;
