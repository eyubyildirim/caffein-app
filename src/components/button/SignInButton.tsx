import { VariantProps, cva } from "class-variance-authority";
import { FunctionComponent } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SignInButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof ButtonStyle>,
    VariantProps<typeof TextStyle> {
  option: "google" | "facebook" | "twitter";
}

const SignInButton: FunctionComponent<SignInButtonProps> = ({
  option,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={ButtonStyle({ type: option })}
      style={{
        columnGap: 10,
      }}
      {...props}
    >
      <MaterialCommunityIcons
        name={option}
        size={36}
        color="white"
        backgroundColor="#fff0"
      />
      <Text className={TextStyle({ type: option })}>
        Sign in with {option.charAt(0).toUpperCase() + option.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

const TextStyle = cva("font-semibold", {
  variants: {
    type: {
      google: "text-black",
      facebook: "text-white",
      twitter: "text-white",
    },
  },
});

const ButtonStyle = cva(
  "text-gray-400 font-regular text-xl w-full flex flex-row items-center justify-center py-2 rounded-full",
  {
    variants: {
      type: {
        google: "bg-black",
        facebook: "bg-[#027dd1]",
        twitter: "bg-[#65b4ff]",
      },
    },
    defaultVariants: {},
  }
);

export default SignInButton;
