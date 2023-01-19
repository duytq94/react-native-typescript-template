import React, {FC} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  onPress: () => any;
  styleBtn?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  title: String;
}

const CommonBtn: FC<Props> = ({onPress, styleBtn, styleText, title}: Props) => {
  return (
    <TouchableOpacity style={styleBtn} onPress={onPress}>
      <Text style={styleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonBtn;
