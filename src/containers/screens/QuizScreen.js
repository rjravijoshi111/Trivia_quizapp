import React, {Component} from 'react';
import { View, Keyboard, StyleSheet, Dimensions,Alert, TouchableOpacity, ActivityIndicator,Modal } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions , StackActions} from "react-navigation";
import { Container, Header, Content, Card, CardItem, Body, Text, Form, Item, Input, Label, Icon} from 'native-base';
import { setQuestions } from '../../redux/action';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import globalStyles from '../../globals/globalStyle';
import Button from "../../components/_Button";
import * as colors from '../../globals/colors';
import APPCONSTANTS from "../../globals/appContsants";
import { API } from '../../utils/api';
import Animbutton from "../../components/_Animbutton";
var _this = null
const {height , width} = Dimensions.get("window");
var timer = null
class QuizScreen extends Component{

    //=======================================================================
    // navigationOptions Method
    //=======================================================================

    static navigationOptions = ({ navigation, screenProps, }) => {
        const { state } = navigation;
        return {
            headerTitle : "Quiz",
            headerTintColor : colors.headerTintColor,
            headerStyle : globalStyles.headerStyle
        }
    }

    //=======================================================================
    // constructor Method
    //=======================================================================

    constructor(props){
        super(props)
        _this = this
        this.state = {
            quetionsList : [],
            currentQuestions : '',
            currentOptions  : [],
            currenctAns : '',
            countCheck : 1,
            score : 0,
            timerVal : 15,
            modalVisible : false
        }
    }

    //=======================================================================
    // componentWillReceiveProps Method
    //=======================================================================

    componentDidMount(){
        API.getQuetions(this.getQuetionsResponse, {}, true)
    }

    componentWillUnmount() {
      clearInterval(timer); 
    }

    //======================================================================
    // getQuetionsResponse
    //======================================================================

    getQuetionsResponse = {
        success: (response) => {
            // this.props.setQuestions(response.results)
            let queOptions = response.results[0].incorrect_answers.map((item)=>{
                    let op = {
                        title : item,
                        isSelected : false
                    }
                    return op
            })
            currenctOption = {
                title : response.results[0].correct_answer,
                isSelected : false
            }
            this.setState({
                quetionsList : response.results,
                currentQuestions : response.results[0].question,
                currentOptions : [...queOptions, currenctOption],
                currenctAns : response.results[0].correct_answer
            })
            timer = setInterval(() => {
                if(this.state.timerVal == 0){
                    if (this.state.countCheck < this.state.quetionsList.length) {
                        let queOptions = this.state.quetionsList[this.state.countCheck].incorrect_answers.map((item) => {
                            let op = {
                                title: item,
                                isSelected: false
                            }
                            return op
                        })
                        currenctOption = {
                            title: this.state.quetionsList[this.state.countCheck].correct_answer,
                            isSelected: false
                        }
      
                        this.setState({ currentQuestions: this.state.quetionsList[this.state.countCheck].question, currentOptions: [...queOptions, currenctOption], currenctAns: this.state.quetionsList[this.state.countCheck].correct_answer, countCheck: this.state.countCheck + 1,timerVal : 15 })
                    } else {
                      this.setState({
                          modalVisible : true
                      })
                    }
                }
                this.setState({
                    timerVal : this.state.timerVal - 1
                })
            }, 1000);
        },
        error: (err) => {
            console.log('questions getting error ' + JSON.stringify(err));
        },
        complete: () => {
        }
    }

    //=======================================================================
    // componentWillReceiveProps Method
    //=======================================================================

    componentWillReceiveProps(newProps){
        this.setState({
            quetionsList : newProps.quetionsList
        })
    }

    next(){
        
        let obj = this.state.currentOptions.find(x => x.isSelected == true)
          if (obj != undefined) {
              if (this.state.countCheck < this.state.quetionsList.length) {
                  let queOptions = this.state.quetionsList[this.state.countCheck].incorrect_answers.map((item) => {
                      let op = {
                          title: item,
                          isSelected: false
                      }
                      return op
                  })
                  currenctOption = {
                      title: this.state.quetionsList[this.state.countCheck].correct_answer,
                      isSelected: false
                  }

                  this.setState({ currentQuestions: this.state.quetionsList[this.state.countCheck].question, currentOptions: [...queOptions, currenctOption], currenctAns: this.state.quetionsList[this.state.countCheck].correct_answer, countCheck: this.state.countCheck + 1,timerVal : 15 })
              } else {
                this.setState({
                    modalVisible : true
                })
              }
          }else{
              Alert.alert(APPCONSTANTS.APP_NAME,APPCONSTANTS.ERROR_NOSELECT)
          }
      }
      _answer(status,ans){
        
        let tempOptions = this.state.currentOptions
        tempOptions.map((k) =>{
            return k.isSelected = false
        })
        tempOptions[ans].isSelected = true
        if(this.state.currenctAns == this.state.currentOptions[ans].title){
            this.setState({score : this.state.score + 1})
        }

        this.setState({
            currentOptions : tempOptions
        })
    }

    quizOverView(){
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                style={{backgroundColor : 'rgba(0,0,0,0.5)'}}
                onRequestClose={() => {this.setState({modalVisible:false})}}>
                <View style={{backgroundColor:'rgba(0,0,0,0.5)',flex:1}}>
                    <View style={{ alignItems:'center',justifyContent:'center',marginHorizontal: 20, marginVertical:50,backgroundColor:colors.headerTintColor,flex:1}}>
                        <View style={{marginVertical:20,alignItems:'center',justifyContent:'center'}}>
                            <Text>{"Exam Over"}</Text>
                            <Text>{"You Have Get"}</Text>
                            <Text>{this.state.score +" / "+ this.state.quetionsList.length}</Text>
                        </View>

                        <Button buttonText="Play again" color="#fff" bgColor={"#00BBB1"} onPress={()=> this.setState({modalVisible :false},() => this.props.navigation.navigate("StartScreen"))} width="80%" />

                    </View>
                    
                </View>
            </Modal>
        )
    }

    //=======================================================================
    // render Method
    //=======================================================================

    render(){

        
        const currentOptions = this.state.currentOptions
        const options = Object.keys(currentOptions).map(function (k) {
            return (<View key={k} style={{ margin: 10 }}>
                <Animbutton countCheck={_this.state.countCheck} status={currentOptions[k].isSelected} onColor={colors.backgroundColor} effect={"tada"} _onPress={(status) => _this._answer(status, k)} text={currentOptions[k].title} />
            </View>)
        });
        return(
            <Container>
                {(this.state.quetionsList.length > 0 )?
                <Content style={{flex:1}} bounces={false}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',marginTop:20 }}>

                        <View style={{padding:10,justifyContent:'space-between',flexDirection:'row',width:'100%'}}>
                            <Text>{this.state.timerVal+ " Time Remaing"}</Text>
                            <Text>{this.state.countCheck+ " Of "+ this.state.quetionsList.length}</Text>
                        </View>

                        <View style={styles.oval} >
                            <Text style={styles.welcome}>
                                {this.state.currentQuestions}
                            </Text>
                        </View>
                        <View>
                            {options}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => this.next()} >
                                <View style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: colors.backgroundColor }}>
                                    <Icon name="md-arrow-round-forward" size={30} color="#fff" />
                                </View>
                            </TouchableOpacity >

                        </View>
                    </View>
                {this.quizOverView()}
                </Content> :
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <ActivityIndicator size="large" color="#000" />
                </View>}
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    quetionsList : state.quetionsList,
})

const mapDispatchToProps = dispatch =>({
    setQuestions: (user) => dispatch(setQuestions(user)),
})

export default connect(mapStateToProps,mapDispatchToProps)(QuizScreen)

//=======================================================================
// Styles
//=======================================================================

const styles = StyleSheet.create({
    oval: {
        width: width * 90 / 100,
        borderRadius: 20,
        backgroundColor: colors.backgroundColor
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        margin: 15,
        color: "white"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});