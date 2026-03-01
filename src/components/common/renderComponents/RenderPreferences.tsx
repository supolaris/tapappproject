import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  IAllowedValues,
  IAllowedValuesSubSection,
} from "../../../@types/apiInterfaces/commonInterface";
import { IMatchPreferences } from "../../../@types/apiInterfaces/MatchPreferencesInterface";
import { IMyProfilePreferences } from "../../../@types/apiInterfaces/MyProfilePreferencesInterface";
import { TapAppColors } from "../../../constants/TapAppColors";
import {
  getLanguageName,
  getMatchSelectedValuesForSection,
  getMyProfileSelectedValuesForSection,
  isMatchItemSelected,
  isMyProfileItemSelected,
} from "../../../utils/CommonFunctions";

interface IProps {
  isDisplayMode?: boolean;
  isMatchPreferences?: boolean;
  newSelectedCategory?: string;
  allowedValues: IAllowedValues[];
  preferences?: IMyProfilePreferences | IMatchPreferences;
  onCategoryPressed?: (title: string) => void;
  onSubCategoryPressed?: (
    title: string,
    subItem: string,
    categoryTitle: string,
  ) => void;
}

const RenderPreferences = (props: IProps) => {
  // Return empty view while loading
  if (!props.allowedValues || props.allowedValues.length === 0) {
    return <View style={styles.container} />;
  }

  // Filter entire sections ONLY when display mode is true
  const filteredSections =
    props.allowedValues
      ?.filter((item) => item.title !== "Discovery" && item.title !== "Privacy")
      ?.filter((section) => {
        if (!props.isDisplayMode) return true; // show everything in normal mode

        // Check if any sub-section inside this section has selected values
        const hasAnySelected = section?.data?.some((sub) => {
          const selectedValues = props.isMatchPreferences
            ? getMatchSelectedValuesForSection(
                section.title,
                sub.subTitle,
                props.preferences as IMatchPreferences,
              )
            : getMyProfileSelectedValuesForSection(
                section.title,
                sub.subTitle,
                props.preferences as IMyProfilePreferences,
              );

          return selectedValues && selectedValues.length > 0;
        });

        return hasAnySelected; // Only show this entire section if something selected
      }) ?? [];

  const RenderAllowedValues = ({
    item,
    title,
  }: {
    item: IAllowedValuesSubSection;
    title: string;
  }) => {
    const selectedValues = props.isMatchPreferences
      ? getMatchSelectedValuesForSection(
          title,
          item.subTitle,
          props.preferences as IMatchPreferences,
        )
      : getMyProfileSelectedValuesForSection(
          title,
          item.subTitle,
          props.preferences as IMyProfilePreferences,
        );

    // Hide subsections in display mode if empty
    if (
      props.isDisplayMode &&
      (!selectedValues || selectedValues.length === 0)
    ) {
      return null;
    }

    return (
      <View style={{ marginBottom: 15 }}>
        <TouchableOpacity
          disabled={props.isDisplayMode}
          onPress={() => props.onCategoryPressed?.(item.subTitle)}
          style={{
            flexDirection: "row",
            paddingVertical: 5,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>{item.subTitle}</Text>

          {!props.isDisplayMode && (
            <MaterialIcons
              name={
                props.newSelectedCategory === item.subTitle
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              }
              color={TapAppColors.white}
              size={22}
            />
          )}
        </TouchableOpacity>

        {/* Display selected values */}
        {selectedValues?.length > 0 &&
          props.newSelectedCategory !== item.subTitle && (
            <FlatList
              data={selectedValues}
              style={{ flexDirection: "row", flexWrap: "wrap" }}
              renderItem={({ item }) => (
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    marginRight: 10,
                    marginVertical: 5,
                    borderColor: "red",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {getLanguageName(item)}
                  </Text>
                </View>
              )}
            />
          )}

        {/* Allow editing only in non-display mode */}
        {!props.isDisplayMode &&
          props.newSelectedCategory === item.subTitle && (
            <FlatList
              data={item.data}
              style={{ flexDirection: "row", flexWrap: "wrap" }}
              renderItem={({ item: subItem }) =>
                renderInnerValues({ item: subItem }, item.subTitle, title)
              }
            />
          )}
      </View>
    );
  };

  const renderInnerValues = (
    { item }: { item: string },
    title: string,
    categoryTitle: string,
  ) => {
    const isSelected = props.isMatchPreferences
      ? isMatchItemSelected(
          title,
          categoryTitle,
          item,
          props.preferences as IMatchPreferences,
        )
      : isMyProfileItemSelected(
          title,
          categoryTitle,
          item,
          props.preferences as IMyProfilePreferences,
        );

    return (
      <TouchableOpacity
        onPress={() => props.onSubCategoryPressed?.(title, item, categoryTitle)}
        style={{
          borderWidth: 2,
          borderRadius: 10,
          paddingHorizontal: 5,
          paddingVertical: 3,
          marginRight: 10,
          marginVertical: 5,
          borderColor: isSelected ? "red" : "white",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {title === "Language" ? getLanguageName(item) : item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={filteredSections}
        renderItem={({ item, section }) => (
          <RenderAllowedValues item={item} title={section.title} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ color: "red", fontSize: 25, marginTop: 10 }}>
            {title}
          </Text>
        )}
      />
    </View>
  );
};

export default RenderPreferences;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: TapAppColors.appBackground,
  },
});
