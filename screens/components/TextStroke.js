import React from "react";
import { StyleSheet, View } from "react-native";
import { Children, cloneElement, isValidElement } from "react";

type Props = {
  children: any,
  color: string,
  stroke: number
}
const styles = StyleSheet.create({
  outline: {
    position: 'absolute'
  },
});

const TextStroke = props =>  {
  const createClones = (w: number, h: number, color?: string) => {
    const { children } = props;
    return Children.map(children, child => {
      if (isValidElement(child)) {
        const currentProps = child.props;
        const currentStyle = currentProps ? (currentProps.style || {}) : {};

        const newProps = {
          ...currentProps,
          style: {
            ...currentStyle,
            textShadowOffset: {
              width: w,
              height: h
            },
            textShadowColor: color,
            textShadowRadius: 1
          }
        }
        return cloneElement(child, newProps)
      }
      return child;
    });
  }

    const {color, stroke, children} = props;
    const strokeW = stroke;
    const topLeft = createClones(-strokeW, -strokeW, color);
    const topRight = createClones(strokeW, -strokeW, color);
    const bottomLeft = createClones(-strokeW, strokeW, color);
    const bottomRight = createClones(strokeW, strokeW, color);

    return (
      <View>
        <View style={ styles.outline }>{ topLeft }</View>
        <View style={ styles.outline }>{ topRight }</View>
        <View style={ styles.outline }>{ bottomLeft }</View>
        { bottomRight }
      </View>
    );

}

export default TextStroke;