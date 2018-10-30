import { createStackNavigator } from 'react-navigation'
import StartScreen from "../screens/StartScreen";
import QuizScreen from "../screens/QuizScreen";

export const MainRoot = createStackNavigator({
    StartScreen : {
        screen : StartScreen
    },
    QuizScreen : {
        screen : QuizScreen
    },
},{
    initialRouteName : "StartScreen"
})
