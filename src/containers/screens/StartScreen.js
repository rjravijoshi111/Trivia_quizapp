import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { Container} from 'native-base';
import Button from "../../components/_Button";
const {height , width} = Dimensions.get("window");
var _this = null
export default class StartScreen extends Component{

    //=======================================================================
    // navigationOptions Method
    //=======================================================================

    static navigationOptions = ({ navigation, screenProps, }) => {
        const { state } = navigation;
        return {
            header : null
        }
    }

    //=======================================================================
    // constructor Method
    //=======================================================================

    constructor(props){
        super(props)
        _this =  this
        this.state = {
            
        }
        
    }

    //=======================================================================
    // render Method
    //=======================================================================

    render(){
        return(
            <Container style={styles.container}>
                <Image source={require("../../assets/image/quiz.png")} style={{height:100,width:100,marginBottom:50}} />
                <Button buttonText="Start Quiz" color="#fff" bgColor={"#00BBB1"} onPress={()=>this.props.navigation.navigate("QuizScreen")} width="80%" />
            </Container>
        )
    }
}


//=======================================================================
// Styles
//=======================================================================

const styles = StyleSheet.create({
    container:{
        flex:1, alignItems:'center',justifyContent:'center'
    }
});