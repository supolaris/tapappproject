import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../../components/common/buttons/IconButton";
import MainHeader from "../../components/common/headers/MainHeader";
import Loader from "../../components/common/Loader";
import SearchInput from "../../components/common/textInputs/SearchInput";
import { TapAppColors } from "../../constants/TapAppColors";
import { borderRadius } from "../../utils/CommonFunctions";

interface IProps {
  searchInputVal: string;
  isLoading: boolean;
  onHeaderBackPressed: () => void;
  onGetLocationPressed: () => void;
  onSearchChangeText: (va: string) => void;
}

const EditCity = (props: IProps) => {
  return (
    <View style={styles.container}>
      <MainHeader
        title="Edit City"
        showBackIcon={true}
        showSettingsIcon={false}
        onHeaderBackPressed={props.onHeaderBackPressed}
        onHeaderSettingsPressed={() => {}}
      />
      <Loader isLoading={props.isLoading} />
      <View style={styles.innerContainer}>
        <SearchInput
          placeholderText="Search your city"
          searchInputVal={props.searchInputVal}
          onSearchChangeText={props.onSearchChangeText}
        />

        <View style={styles.touchableView}>
          <IconButton
            text="Near current location"
            onGetLocationPressed={props.onGetLocationPressed}
          />
        </View>
      </View>
    </View>
  );
};

export default EditCity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TapAppColors.black,
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  touchableView: {
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: borderRadius,
    backgroundColor: TapAppColors.appBackground,
  },
});
