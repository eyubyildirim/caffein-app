import { FunctionComponent, useRef, useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";
import useTailwindColor from "../../util/hook/useTailwindColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomInputProps extends TextInputProps {
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  setValue: (value: string) => void;
  isPassword?: boolean;
}

const CustomInput: FunctionComponent<CustomInputProps> = ({
  iconName,
  setValue,
  value,
  isPassword,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(!isPassword);

  const textInput = useRef<TextInput>(null);

  const focusColor = useTailwindColor("bg-teal-500");
  const activeColor = "#262626";
  const passiveColor = useTailwindColor("bg-neutral-400");

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <TouchableOpacity
      className={`
        w-full rounded-lg items-center
        flex flex-row px-4 dark:bg-neutral-800 border ${
          focus ? "border-teal-500 bg-teal-100" : "border-white bg-gray-50"
        }
      `}
      style={{
        columnGap: 8,
      }}
      activeOpacity={1}
      onPress={(e) => {
        e.stopPropagation();
        textInput.current?.focus();
      }}
    >
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          color={focus ? focusColor : value !== "" ? activeColor : passiveColor}
          size={18}
        />
      )}
      <TextInput
        className={`flex-1`}
        style={{
          color: activeColor,
        }}
        {...props}
        secureTextEntry={isPassword && !visible}
        ref={textInput}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          // if (value !== "") return;
          setFocus(false);
        }}
        onChangeText={(t) => setValue(t)}
        placeholderTextColor={focus ? focusColor : passiveColor}
      />
      <TouchableOpacity
        className="h-12 w-8 items-center justify-center"
        onPress={(e) => {
          e.stopPropagation();
          toggleVisible();
        }}
        disabled={!isPassword}
      >
        {isPassword && (
          <MaterialCommunityIcons
            name={visible ? "eye" : "eye-off"}
            size={18}
            color={focus ? focusColor : passiveColor}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CustomInput;
