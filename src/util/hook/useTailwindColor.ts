import { useColorScheme, useTailwind } from "nativewind";

const useTailwindColor = (color: string) => {
  const { colorScheme } = useColorScheme();

  const bg = useTailwind({ className: color }) as {
    backgroundColor: string;
  }[];

  if (bg.length > 1 && colorScheme === "dark") {
    return bg[1].backgroundColor;
  } else {
    return bg[0].backgroundColor;
  }
};

export default useTailwindColor;
