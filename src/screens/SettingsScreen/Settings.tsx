import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

import { SafeAreaView } from "react-native-safe-area-context";
import PreferencesHeader from "../../components/common/headers/PreferencesHeader";
import Loader from "../../components/common/Loader";
import SimpleSwitch from "../../components/common/switches/SimpleSwitch";
import CustomTouchable from "../../components/common/touchables/CustomTouchable";
import PreferencesTouchable from "../../components/common/touchables/PreferencesTouchable";
import { TapAppColors } from "../../constants/TapAppColors";

const screenWidth = Dimensions.get("window").width;
const sliderWidth = screenWidth * 0.82;

interface IProps {
  isLoading: boolean;
  onToggleSwitch: () => void;
  onWhoCanSeePressed: () => void;
  onMyVisibilityPressed: () => void;
  onSavePressed: () => void;
  onLogOutPressed: () => void;
  onHeaderBackPressed: () => void;
  onBillingInfoPressed: () => void;
}

const Settings = (props: IProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.mainContainer}>
        <PreferencesHeader
          title="Settings"
          onBackPressed={props.onHeaderBackPressed}
          onDonePressed={props.onSavePressed}
        />

        <Loader isLoading={props.isLoading} />

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            {/* <Loader isLoading={props.isLoading} /> */}
            <View style={styles.innerContainer}>
              {/*  */}

              <View style={styles.valuesContainer}>
                <View style={styles.touchableStyles}>
                  <View style={styles.titleToogleView}>
                    <Text numberOfLines={2} style={styles.titleText}>
                      Show people further away if i run out of profiles to see
                    </Text>
                    <View style={styles.toogleView}>
                      <SimpleSwitch
                        isSwitchValue={props.switchesValue?.isShowAwayPeople}
                        onToggleSwitch={() =>
                          props.onToggleSwitch("isShowAwayPeople")
                        }
                      />
                    </View>
                  </View>
                </View>

                {/* update */}
                <View style={styles.touchableStyles}>
                  <View style={styles.titleToogleView}>
                    <Text numberOfLines={2} style={styles.titleText}>
                      Show people slightely out of my preferred range if i run
                      out of profile to see
                    </Text>
                    <View style={styles.toogleView}>
                      <SimpleSwitch
                        isSwitchValue={
                          props.switchesValue?.isShowOutOfRangePeople
                        }
                        onToggleSwitch={() =>
                          props.onToggleSwitch("isShowOutOfRangePeople")
                        }
                      />
                    </View>
                  </View>
                </View>

                {/* update */}
                <View style={styles.touchableStyles}>
                  <View style={styles.titleToogleView}>
                    <Text numberOfLines={2} style={styles.titleText}>
                      Global
                    </Text>
                    <View style={styles.toogleView}>
                      <SimpleSwitch
                        isSwitchValue={props.switchesValue?.isGlobal}
                        onToggleSwitch={() => props.onToggleSwitch("isGlobal")}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.headingTextView}>
                <Text numberOfLines={2} style={styles.headingText}>
                  Going global will allow you to see people nearby and from
                  around the world
                </Text>

                <Text
                  numberOfLines={2}
                  style={[
                    styles.headingText,
                    {
                      marginTop: 20,
                    },
                  ]}
                >
                  Control who can see
                </Text>
              </View>
              <View style={styles.valuesContainer}>
                <TouchableOpacity
                  onPress={() =>
                    props.onWhoCanSeePressed("Balanced Recommendation")
                  }
                  style={styles.touchableStyles}
                >
                  <View
                    style={{
                      width: "75%",
                    }}
                  >
                    <Text
                      style={[
                        styles.titleText,
                        {
                          width: "100%",
                          fontSize: 18,
                        },
                      ]}
                    >
                      Balanced Recommendation
                    </Text>
                    <Text numberOfLines={1} style={styles.titleText}>
                      See the most relevant people to you
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "25%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    {props.whoCanSee === "Balanced Recommendation" && (
                      <MaterialIcons name="done" size={25} color="red" />
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.onWhoCanSeePressed("Recently Active")}
                  style={styles.touchableStyles}
                >
                  <View
                    style={{
                      width: "75%",
                    }}
                  >
                    <Text
                      style={[
                        styles.titleText,
                        {
                          width: "100%",
                          fontSize: 18,
                        },
                      ]}
                    >
                      Recently Active
                    </Text>
                    <Text numberOfLines={1} style={styles.titleText}>
                      See the most recent active people first
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      alignItems: "flex-end",
                    }}
                  >
                    {props.whoCanSee === "Recently Active" && (
                      <MaterialIcons name="done" size={25} color="red" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.headingTextView}>
                <Text numberOfLines={2} style={styles.headingText}>
                  Control My Visibility
                </Text>
              </View>

              <View style={styles.valuesContainer}>
                <TouchableOpacity
                  onPress={() => props.onMyVisibilityPressed("Standard")}
                  style={styles.touchableStyles}
                >
                  <View
                    style={{
                      width: "75%",
                    }}
                  >
                    <Text
                      style={[
                        styles.titleText,
                        {
                          width: "100%",
                          fontSize: 18,
                        },
                      ]}
                    >
                      Standard
                    </Text>
                    <Text numberOfLines={1} style={styles.titleText}>
                      You will be discoverable in the card stack
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "25%",
                      alignItems: "flex-end",
                    }}
                  >
                    {props.myVisibility === "Standard" && (
                      <MaterialIcons name="done" size={20} color="red" />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.onMyVisibilityPressed("Incognito")}
                  style={styles.touchableStyles}
                >
                  <View
                    style={{
                      width: "75%",
                    }}
                  >
                    <Text
                      style={[
                        styles.titleText,
                        {
                          width: "100%",
                          fontSize: 18,
                        },
                      ]}
                    >
                      Incognito
                    </Text>
                    <Text numberOfLines={1} style={styles.titleText}>
                      You will be disoverable only by the person you like
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      alignItems: "flex-end",
                    }}
                  >
                    {props.myVisibility === "Incognito" && (
                      <MaterialIcons name="done" size={20} color="red" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.headingTextView}>
                <Text numberOfLines={2} style={styles.headingText}>
                  Enable Discovery
                </Text>
              </View>
              <View style={styles.valuesContainer}>
                <View style={styles.touchableStyles}>
                  <View style={styles.titleToogleView}>
                    <Text numberOfLines={1} style={styles.titleText}>
                      Enable Discovery
                    </Text>

                    <View style={styles.toogleView}>
                      <SimpleSwitch
                        isSwitchValue={props.switchesValue?.isEnableDiscovery}
                        onToggleSwitch={() =>
                          props.onToggleSwitch("isEnableDiscovery")
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>
                  When turned off your profile will be hidden from the card
                  stack and Dicovery will be disabled. People you have already
                  Liked may still see and match with you
                </Text>
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>
                  Control who can message you
                </Text>
              </View>
              <View style={styles.valuesContainer}>
                <View style={styles.touchableStyles}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    Photo Verified Chat
                  </Text>

                  <View style={styles.toogleView}>
                    <SimpleSwitch
                      isSwitchValue={props.switchesValue?.isPhotoVerifiedChat}
                      onToggleSwitch={() =>
                        props.onToggleSwitch("isPhotoVerifiedChat")
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Read Receipts</Text>
              </View>
              <View style={styles.valuesContainer}>
                <View style={styles.touchableStyles}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    Send Read Receipts
                  </Text>

                  <View style={styles.toogleView}>
                    <SimpleSwitch
                      isSwitchValue={props.switchesValue?.isReadReceiptsOn}
                      onToggleSwitch={() =>
                        props.onToggleSwitch("isReadReceiptsOn")
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>
                  Turning this off will prevent any matches from activating read
                  receipts in your conversation from this moment forward
                </Text>
              </View>
              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={Octicons}
                  iconName="blocked"
                  title="Block Contacts"
                  onPreferencePressed={() => {}}
                />
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>
                  Select people from your contact list that you don't want to
                  see or be seen
                </Text>
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Matchmaker</Text>
              </View>
              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={AntDesign}
                  iconName="select1"
                  title="Manage Matchmaker"
                  onPreferencePressed={() => {}}
                />
              </View>

              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Coins</Text>
              </View>
              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={FontAwesome5}
                  iconName="coins"
                  title="Manage Coins & Benefits"
                  onPreferencePressed={() => {}}
                />
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Q&A Events</Text>
              </View>
              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={AntDesign}
                  iconName="questioncircleo"
                  title="Manage Q&A Events"
                  onPreferencePressed={() => {}}
                />
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Top Picks</Text>
              </View>
              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={MaterialCommunityIcons}
                  iconName="trophy-award"
                  title="Manage TOp Picks"
                  onPreferencePressed={() => {}}
                />
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Direct Messages</Text>
              </View>
              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={AntDesign}
                  iconName="message1"
                  title="Manage Direct Messages"
                  onPreferencePressed={() => {}}
                />
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Swipe Surge</Text>
              </View>
              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={MaterialCommunityIcons}
                  iconName="gesture-swipe"
                  title="Manage Swipe Surge"
                  onPreferencePressed={() => {}}
                />
              </View>

              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Select Membership</Text>
              </View>

              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={AntDesign}
                  iconName="unlock"
                  title="Enter unloack code"
                  onPreferencePressed={() => {}}
                />

                <PreferencesTouchable
                  iconFamily={AntDesign}
                  iconName="form"
                  title="Apply now"
                  onPreferencePressed={() => {}}
                />
              </View>

              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Data Usage</Text>
              </View>

              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={Feather}
                  iconName="video"
                  title="Autoplay Videos"
                  onPreferencePressed={() => {}}
                />
              </View>

              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Active Status</Text>
              </View>

              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={Fontisto}
                  iconName="radio-btn-active"
                  title="Active Status"
                  onPreferencePressed={() => {}}
                />
              </View>

              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Web Profile</Text>
              </View>

              <View style={styles.valuesContainer}>
                <PreferencesTouchable
                  iconFamily={AntDesign}
                  iconName="user"
                  title="Username"
                  onPreferencePressed={() => {}}
                />
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>
                  Create a public username. Share your username. Have people all
                  over the world swipe you
                </Text>
              </View>

              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Notification</Text>
              </View>

              <View style={styles.valuesContainer}>
                {/* <PreferencesTouchable
                iconFamily={Feather}
                iconName="mail"
                title="Email"
                onPreferencePressed={() => {}}
              /> */}

                <View style={styles.touchableStyles}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    Email
                  </Text>

                  <View style={styles.toogleView}>
                    <SimpleSwitch
                      isSwitchValue={
                        props.switchesValue?.isSendEmailNotification
                      }
                      onToggleSwitch={() =>
                        props.onToggleSwitch("isSendEmailNotification")
                      }
                    />
                  </View>
                </View>

                <View style={styles.touchableStyles}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    Push Notification
                  </Text>

                  <View style={styles.toogleView}>
                    <SimpleSwitch
                      isSwitchValue={props.switchesValue?.isPushNotificationOn}
                      onToggleSwitch={() =>
                        props.onToggleSwitch("isPushNotificationOn")
                      }
                    />
                  </View>
                </View>

                {/* <PreferencesTouchable
                iconFamily={Feather}
                iconName="bell"
                title="Push Notification"
                onPreferencePressed={() => {}}
              /> */}

                <PreferencesTouchable
                  iconFamily={AntDesign}
                  iconName="team"
                  title="Team Tap App"
                  onPreferencePressed={() => {}}
                />
              </View>
              <View style={styles.headingTextView}>
                <Text style={styles.headingText}>
                  Pick which notification to see while in app
                </Text>
              </View>
              <CustomTouchable
                preset={{
                  text: "Save",
                  variant: "primary",
                  textColor: TapAppColors.white,
                  fontSize: 15,
                  fontWeight: "medium",
                }}
                onPress={props.onSavePressed}
              />

              <CustomTouchable
                preset={{
                  text: "Billing Info",
                  variant: "primary",
                  textColor: TapAppColors.white,
                  fontSize: 15,
                  fontWeight: "medium",
                }}
                onPress={props.onBillingInfoPressed}
                style={{
                  marginTop: 10,
                }}
              />
              <CustomTouchable
                preset={{
                  text: "Log out",
                  variant: "primary",
                  textColor: TapAppColors.white,
                  fontSize: 15,
                  fontWeight: "medium",
                }}
                onPress={props.onLogOutPressed}
                style={{
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: TapAppColors.black,
  },
  container: {
    paddingBottom: 30,
  },

  innerContainer: {
    width: "90%",
    alignSelf: "center",
  },
  valuesContainer: {
    backgroundColor: TapAppColors.appBackground,
    borderRadius: 10,
  },
  touchableStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: "#46474b",
  },
  iconTitleView: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderView: {
    width: "100%",
    alignItems: "center",
  },
  titleValueView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 15,
  },
  titleToogleView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  toogleView: {
    width: "25%",
  },
  titleText: {
    width: "75%",
    color: TapAppColors.white,
    fontSize: 15,
  },
  valueText: {
    width: "25%",
    color: TapAppColors.white,
    fontSize: 15,
    textAlign: "right",

    paddingRight: 10,
  },
  headingTextView: {
    width: "90%",
    paddingVertical: 20,
  },
  headingText: {
    width: "90%",
    fontSize: 15,
    color: TapAppColors.white,
  },

  catagoryView: {
    backgroundColor: TapAppColors.appBackground,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  //
  renderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
