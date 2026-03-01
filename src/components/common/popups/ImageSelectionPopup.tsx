import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TapAppColors } from "../../../constants/TapAppColors";
import CustomText from "../CustomText";

import { borderRadius } from "@/src/constants/AppConstants";
import { activeOpacity } from "../../../utils/CommonFunctions";

interface IProps {
  isImageSelectionPopup: boolean;
  onImageSelectionPopupClose: () => void;
  onImageSelectionOptionPressed: (value: number) => void;
}

const ImageSelectionPopup = (props: IProps) => {
  return (
    <Modal
      transparent={true}
      visible={props.isImageSelectionPopup}
      onRequestClose={props.onImageSelectionPopupClose}
    >
      <TouchableWithoutFeedback onPress={props.onImageSelectionPopupClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer}>
              <View style={styles.horizontalLine}></View>
              <View style={styles.detailedView}>
                <TouchableOpacity
                  activeOpacity={activeOpacity}
                  style={[
                    styles.buttonTouchable,
                    {
                      marginBottom: 10,
                    },
                  ]}
                  onPress={() => props.onImageSelectionOptionPressed(1)}
                >
                  <Image
                    resizeMode="cover"
                    style={styles.buttonImage}
                    source={require("../../../assets/images/popups/imageSelection/galleryIcon.png")}
                  />
                  <CustomText
                    preset={{
                      text: "Upload from gallery",
                      fontSize: 14,
                      color: TapAppColors.black,
                      fontWeight: "regular",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={activeOpacity}
                  style={styles.buttonTouchable}
                  onPress={() => props.onImageSelectionOptionPressed(2)}
                >
                  <Image
                    resizeMode="cover"
                    style={styles.buttonImage}
                    source={require("../../../assets/images/popups/imageSelection/cameraIcon.png")}
                  />
                  <CustomText
                    preset={{
                      text: "Open Camera",
                      fontSize: 14,
                      color: TapAppColors.black,
                      fontWeight: "regular",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImageSelectionPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: TapAppColors.transparentBg,
  },
  innerContainer: {
    width: "100%",
    borderRadius: borderRadius.medium,
    backgroundColor: TapAppColors.appBackground,
    height: "40%",
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: borderRadius.medium,
    borderTopRightRadius: borderRadius.medium,
  },
  horizontalLine: {
    height: 5,
    width: "20%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: borderRadius.medium,
  },
  detailedView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonTouchable: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: borderRadius.medium,
    backgroundColor: TapAppColors.white,
  },
  buttonImage: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
});
