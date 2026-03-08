import React from "react";
import { View } from "react-native";
import IconButton from "../../components/common/buttons/IconButton";
import MainHeader from "../../components/common/headers/MainHeader";
import Loader from "../../components/common/Loader";
import SearchInput from "../../components/common/textInputs/SearchInput";
import { editCityStyles } from "./EditCityStyles";

interface IProps {
  searchInputVal: string;
  isLoading: boolean;
  onGetLocationPressed: () => void;
  onSearchChangeText: (va: string) => void;
}

const styles = editCityStyles;

const EditCity = (props: IProps) => {
  return (
    <View style={styles.container}>
      <MainHeader
        title="Edit City"
        showBackIcon={true}
        showSettingsIcon={false}
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
