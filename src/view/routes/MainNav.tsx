import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigation, BottomNavigationTab, Icon, Text } from "@ui-kitten/components";
import Flow from "../screens/Flow";
import Home from "../screens/Home";
import User from "../screens/User";


const UiKittenBottomTabNav = ({ navigation, state }: BottomTabBarProps) => {
    const HomeIcon = () => <Icon name="book-open" fill="black" height="30" width="30" />;
    const FlowIcon = () => <Icon name="swap" fill="black" height="30" width="30" />;
    const UserIcon = () => <Icon name="person" fill="black" height="30" width="30" />;

    const HomeTitle = () => <Text style={{ color: "black", fontSize: 10 }}>Librería</Text>;
    const FlowTitle = () => <Text style={{ color: "black", fontSize: 10 }}>Transacciones</Text>;
    const UserTitle = () => <Text style={{ color: "black", fontSize: 10 }}>Usuario</Text>;

    return (
        <BottomNavigation
            style={{ height: "7%" }}
            indicatorStyle={{ backgroundColor: "black", borderWidth: 0.1 }}
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}
        >
            <BottomNavigationTab
                icon={<HomeIcon />}
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

export default function MainNav() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" tabBar={(props) => <UiKittenBottomTabNav {...props} />} screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Flow" component={Flow} />
                <Tab.Screen name="User" component={User} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
