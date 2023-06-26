import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Icon, Text, useTheme } from "@ui-kitten/components";
import { useContext, useState } from 'react';
import { ThemeContext } from "../../hooks/context/ThemeContext";
import Flow from "../screens/Flow";
import Home from "../screens/Home";
import User from "../screens/User";

const UiKittenBottomTabNav = ({ navigation, state }: BottomTabBarProps) => {
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()
    const tabBgDarkColor = theme['tab-dark-basic-color']
    const tabBgColor = theme['tab-basic-color']
    const indicatorColor = theme['background-alternative-color-1']

    const HomeIconOpen = () => <Icon name="book-open" fill={indicatorColor} height="30" width="30" />;
    const HomeIconClose = () => <Icon name="book" fill={indicatorColor} height="30" width="30" />;
    const FlowIcon = () => <Icon name="swap" fill={indicatorColor} height="30" width="30" />;
    const UserIcon = () => <Icon name="person" fill={indicatorColor} height="30" width="30" />;

    const HomeTitle = () => <Text style={{ color: indicatorColor, fontSize: 10 }}>Librería</Text>;
    const FlowTitle = () => <Text style={{ color: indicatorColor, fontSize: 10 }}>Transacciones</Text>;
    const UserTitle = () => <Text style={{ color: indicatorColor, fontSize: 10 }}>Usuario</Text>;

    const [isHomeSelected, setHomeSelected] = useState(true)

    return (
        <BottomNavigation
            style={{ backgroundColor: themeMode === 'dark' ? tabBgDarkColor : tabBgColor, paddingVertical: 2 }}
            indicatorStyle={{ backgroundColor: themeMode === 'dark' ? theme['color-info-500'] : indicatorColor, height: 2 }}
            selectedIndex={state.index}
            onSelect={(index) => {
                setHomeSelected(index === 0)
                navigation.navigate(state.routeNames[index])
            }}
        >
            <BottomNavigationTab
                icon={isHomeSelected ? <HomeIconOpen /> : <HomeIconClose />}
                title={HomeTitle}
            />
            <BottomNavigationTab
                icon={<FlowIcon />}
                title={FlowTitle}
            />
            <BottomNavigationTab
                icon={<UserIcon />}
                title={UserTitle}
            />
        </BottomNavigation>
    );
};

const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tab.Navigator initialRouteName="Home" tabBar={(props) => <UiKittenBottomTabNav {...props} />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Flow" component={Flow} />
            <Tab.Screen name="User" component={User} />
        </Tab.Navigator>
    )
}
