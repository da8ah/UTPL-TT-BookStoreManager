import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigation, BottomNavigationTab, Icon, Text, useTheme } from "@ui-kitten/components";
import React from 'react';
import { View, ViewProps } from "react-native";
import Flow from "../screens/Flow";
import Home from "../screens/Home";
import User from "../screens/User";

const UiKittenBottomTabNav = ({ navigation, state }: BottomTabBarProps) => {
    const theme = useTheme()
    const barBgColor = theme['background-basic-color-1']
    const iconColor = theme['background-alternative-color-1']

    const HomeIconOpen = () => <Icon name="book-open" fill={iconColor} height="30" width="30" />;
    const HomeIconClose = () => <Icon name="book" fill={iconColor} height="30" width="30" />;
    const FlowIcon = () => <Icon name="swap" fill={iconColor} height="30" width="30" />;
    const UserIcon = () => <Icon name="person" fill={iconColor} height="30" width="30" />;

    const HomeTitle = () => <Text style={{ color: iconColor, fontSize: 10 }}>Librería</Text>;
    const FlowTitle = () => <Text style={{ color: iconColor, fontSize: 10 }}>Transacciones</Text>;
    const UserTitle = () => <Text style={{ color: iconColor, fontSize: 10 }}>Usuario</Text>;

    const [isHomeSelected, setHomeSelected] = React.useState(false)

    return (
        <BottomNavigation
            style={{ backgroundColor: barBgColor, paddingVertical: 2 }}
            indicatorStyle={{ backgroundColor: iconColor, borderWidth: 0.1 }}
            selectedIndex={state.index}
            onSelect={(index) => {
                setHomeSelected(index === 0)
                navigation.navigate(state.routeNames[index])
            }}
        >
            <BottomNavigationTab
                icon={isHomeSelected ? <HomeIconOpen /> : <HomeIconClose />}
                title={HomeTitle}
                onPressIn={() => navigation.navigate("Home")}
            />
            <BottomNavigationTab
                icon={<FlowIcon />}
                title={FlowTitle}
                onPressIn={() => navigation.navigate("Flow")}
            />
            <BottomNavigationTab
                icon={<UserIcon />}
                title={UserTitle}
                onPressIn={() => navigation.navigate("User")
                }
            />
        </BottomNavigation>
    );
};

const Tab = createBottomTabNavigator();

export default function BottomNav(props: ViewProps) {
    return (
        <View {...props} style={[props.style, { alignItems: "stretch" }]}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Home" tabBar={(props) => <UiKittenBottomTabNav {...props} />} screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Flow" component={Flow} />
                    <Tab.Screen name="User" component={User} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    )
}
