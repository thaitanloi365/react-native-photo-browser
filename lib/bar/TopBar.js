import React from "react";
import PropTypes from "prop-types";
import { Image, Text, StyleSheet, TouchableOpacity, Platform, View } from "react-native";

import { BarContainer } from "./BarContainer";
import { getStatusBarHeight } from "../helper";
export default class TopBar extends React.Component {
  static propTypes = {
    displayed: PropTypes.bool,
    title: PropTypes.string,
    height: PropTypes.number,
    backTitle: PropTypes.string,
    backImage: PropTypes.any,
    onBack: PropTypes.func,
    backButtonStyle: PropTypes.object,
    backButtonImageStyle: PropTypes.object
  };

  static defaultProps = {
    displayed: false,
    title: "",
    backTitle: "Back",
    backImage: require("../../Assets/angle-left.png")
  };

  renderBackButton() {
    const { onBack, backImage, backButtonStyle, backButtonImageStyle } = this.props;

    // do not display back button if there isn't a press handler
    if (onBack) {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={[styles.backContainer, backButtonStyle]} onPress={onBack}>
            <Image style={[{ tintColor: "white" }, backButtonImageStyle]} source={backImage} />
            {Platform.OS === "ios" && <Text style={[styles.text, styles.backText]}>{this.props.backTitle}</Text>}
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }

  render() {
    const { displayed, title, height } = this.props;

    return (
      <BarContainer style={styles.container} displayed={displayed} height={height}>
        {this.renderBackButton()}
        <View style={{ flex: 4, alignItems: "center" }}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={{ flex: 1 }} />
      </BarContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(false),
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    color: "white"
  },
  backContainer: {
    // position: "absolute",
    paddingLeft: 15,
    flexDirection: "row"
    // left: 0,
    // top: 16
  },
  backText: {
    // paddingTop: 14,
    // marginLeft: -10
  }
});
