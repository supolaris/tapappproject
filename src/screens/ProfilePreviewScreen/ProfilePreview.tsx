import { IAllowedValues } from "@/src/@types/apiInterfaces/commonInterface";
import { IUserByIdData } from "@/src/@types/apiInterfaces/ProfilePreviewInterface";
import CustomText from "@/src/components/common/CustomText";
import Loader from "@/src/components/common/Loader";
import RenderImagesPreview from "@/src/components/common/renderComponents/RenderImagesPreview";
import RenderPreferences from "@/src/components/common/renderComponents/RenderPreferences";
import { TapAppColors } from "@/src/constants/TapAppColors";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface IProps {
  isLoading: boolean;
  allowedValues: IAllowedValues[];
  userByIdData: IUserByIdData;
}

const ProfilePreview = (props: IProps) => {
  return (
    <View style={styles.container}>
      {props.userByIdData?.profile?.images && (
        <RenderImagesPreview userImages={props.userByIdData?.profile?.images} />
      )}

      <Loader isLoading={props.isLoading} />
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            styles.rowView,
            {
              marginTop: 30,
            },
          ]}
        >
          <CustomText
            preset={{
              fontSize: 20,
              fontWeight: "semiBold",
              color: TapAppColors.black,
              text: `${props.userByIdData?.first_name},`,
            }}
            style={{
              width: "80%",
              marginRight: 10,
            }}
          />

          {/* {props.userPreferences?.TapPrivacyShowAge && (
            <CustomText
              preset={{
                text: getAgeFromDOB(props.userPreferences?.DOB),
                color: TapAppColors.black,
                fontSize: 19,
                fontWeight: "medium",
              }}
            />
          )} */}
        </View>

        {props.userByIdData?.profile?.TapPrivacyShowGender && (
          <CustomText
            preset={{
              text: `Gender: ${props.userByIdData?.gender}`,
              color: TapAppColors.black,
              fontSize: 19,
              fontWeight: "medium",
            }}
          />
        )}

        {props.userByIdData?.profile?.TapPrivacyShowCurrentLocation && (
          <View style={styles.rowView}>
            {/* <FontAwesome5 name="home" size={25} color={TapAppColors.black} /> */}
            <CustomText
              preset={{
                text: props.userByIdData?.profile?.CurLocation
                  ?.TapProfileCountryName,
                color: TapAppColors.black,
                fontSize: 20,
                fontWeight: "semiBold",
              }}
              style={{
                marginLeft: 10,
              }}
            />
          </View>
        )}
        {props.userByIdData?.profile?.TapPrivacyShowDistance && (
          <View style={styles.rowView}>
            {/* <FontAwesome5 name="home" size={25} color={TapAppColors.black} /> */}
            {/* <CustomText
              preset={{
                text: "30 kilometers away",
                color: TapAppColors.black,
                fontSize: 20,
                fontWeight: "semiBold",
              }}
              style={{
                marginLeft: 10,
              }}
            /> */}
          </View>
        )}

        {/* <View>
          <CustomText
            preset={{
              text: "There is about,",
              color: TapAppColors.black,
              fontSize: 20,
              fontWeight: "regular",
            }}
            style={{
              marginBottom: 10,
            }}
          />
          <CustomText
            preset={{
              text: props.myProfilePreferences?.TapPersonalDetailsAboutMe,
              color: TapAppColors.black,
              fontSize: 20,
              fontWeight: "regular",
            }}
            style={
              {
                // marginBottom: 10,
              }
            }
          />
        </View> */}
        <View
          style={{
            flex: 1,
          }}
        >
          <RenderPreferences
            isDisplayMode={true}
            allowedValues={props.allowedValues}
            preferences={props.userByIdData?.profile}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfilePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImageView: {
    height: 250,
    backgroundColor: TapAppColors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  coverImage: {
    width: 150,
    height: 150,
    borderRadius: 200,
  },
  rowView: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
