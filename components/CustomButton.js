import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import colorsGuide from "../config/colorsGuide";

const CustomButton = ({
  title,
  color,
  icon,
  backgroundColor,
  iconSize,
  style,
  width,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, { backgroundColor, width }, style]}
      {...otherProps}
    >
      <FontAwesome5
        style={styles.icon}
        name={icon}
        size={iconSize}
        color={color}
      />
      <Text style={[styles.btnText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 7,
    paddingVertical: 16,
    flexDirection: "row",
    borderRadius: 10,
  },

  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorsGuide.white,
  },
  icon: {
    marginRight: 10,
  },
});
