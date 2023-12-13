import {
  FunctionComponent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import useTailwindColor from "../../util/hook/useTailwindColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomInputHandle {
  focus: () => void;
  select: () => void;
}

interface CustomInputLabelProps extends TextInputProps {
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  setValue: (value: string) => void;
  isPassword?: boolean;
  error?: string;
}

const CustomInputLabel = forwardRef<CustomInputHandle, CustomInputLabelProps>(
  ({ iconName, setValue, value, isPassword, error, ...props }, ref) => {
    const [focus, setFocus] = useState(false);
    const [visible, setVisible] = useState(!isPassword);

    const textInput = useRef<TextInput>(null);

    const focusColor = useTailwindColor("bg-teal-500");
    const activeColor = "#262626";
    const passiveColor = "#b3b3b3";

    useImperativeHandle(
      ref,
      () => {
        return {
          focus: () => {
            textInput.current?.focus();
          },
          select: () => {
            textInput.current?.blur();
          },
        };
      },
      []
    );

    const toggleVisible = () => {
      setVisible((prev) => !prev);
    };

    return (
      <View
        className="flex flex-col items-start"
        style={{
          rowGap: 8,
        }}
      >
        <Text className="text-xl font-bold">{props.placeholder}</Text>
        <TouchableOpacity
          className={`
        w-full rounded-lg items-center
        flex flex-row pl-6 pr-2 py-1 border ${
          focus ? "border-teal-500 bg-teal-100" : "border-white bg-[#f4f4f4]"
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
              color={
                focus ? focusColor : value !== "" ? activeColor : passiveColor
              }
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
            onFocus={(e) => {
              if (props.onFocus) {
                props.onFocus(e);
              }
              setFocus(true);
            }}
            onBlur={(e) => {
              if (props.onBlur) props.onBlur(e);
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
        {error && <Text className="text-red-500 ml-2">{error}</Text>}
      </View>
    );
  }
);

export default CustomInputLabel;
