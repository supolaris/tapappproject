import React, {memo} from 'react';
import CustomText from '../CustomText';
import CustomTouchable from '../touchables/CustomTouchable';
import {View, StyleSheet, Modal, Image} from 'react-native';
import {TapAppColors} from '../../../constants/TapAppColors';

interface IAlertPopupProps {
  isAlertPopupVisible: boolean;
  messageText: string;
  cancelText: string;
  confirmText: string;
  onAlertPopupCancel: () => void;
  onAlertPopupConfirm: () => void;
}

const AlertPopup = (props: IAlertPopupProps) => {
  return (
    <Modal transparent={true} visible={props.isAlertPopupVisible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/popups/alert/doneImage.webp')}
            style={styles.image}
          />
          <View style={styles.textView}>
            <CustomText
              style={{textAlign: 'center'}}
              preset={{
                text: props.messageText,
                fontSize: 16,
                color: TapAppColors.black,
                fontWeight: 'regular',
              }}
            />
          </View>
          <View style={styles.buttonView}>
            <View style={styles.singleButtonView}>
              <CustomTouchable
                preset={{
                  text: props.cancelText,
                  fontSize: 14,
                  fontWeight: 'bold',
                  height: 30,
                  variant: 'primary',
                }}
                onPress={() => {
                  props.onAlertPopupCancel();
                }}
              />
            </View>
            <View style={styles.singleButtonView}>
              <CustomTouchable
                preset={{
                  text: props.confirmText,
                  fontSize: 14,
                  fontWeight: 'bold',
                  height: 30,
                  variant: 'primary',
                }}
                onPress={() => {
                  props.onAlertPopupConfirm();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(AlertPopup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.transparentBg,
    justifyContent: 'center',
  },
  innerContainer: {
    height: 254,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: TapAppColors.white,
    borderRadius: 15,
    padding: 35,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60,
    alignSelf: 'center',
  },
  textView: {
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleButtonView: {
    minWidth: '45%',
    maxWidth: '50%',
  },
});
