import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import ListItemsScreen from "../ListItems/ListItemsScreen.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    ProfileScreen: { screen: ProfileScreen },
    ListItems : {screen : ListItemsScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
