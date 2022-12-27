import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";

import { useTheme } from "../theme";

interface IconProps {
  size: number;
  color?: string;
  style?: {};
}

interface IoniconsIcon extends IconProps {
  type: 'Ionicons';
  name: React.ComponentProps<typeof Ionicons>['name'];
}

interface AntDesignIcon extends IconProps {
  type: 'AntDesign';
  name: React.ComponentProps<typeof AntDesign>['name'];
}

interface Props {
  type?: 'Ionicons' | 'AntDesign';
  name: string;
  size: number;
  color?: string;
  style?: {};
}

export function Icon({ type, size, name, color, style }: AntDesignIcon | IoniconsIcon) {
  const currentTheme:ColorSchemeName = useTheme();
  const iconColor = color || Colors[currentTheme]['text']

  if(type === 'Ionicons') {
    return <Ionicons name={name} size={size} color={iconColor} style={style} />
  }

  return (
    <AntDesign name={name} size={size} color={iconColor} style={style} />
  );
}
