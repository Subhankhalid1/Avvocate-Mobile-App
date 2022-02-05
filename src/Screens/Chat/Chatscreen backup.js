import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Button,
    TextInput,
  } from 'react-native';
  import React, {useState, useEffect, useCallback, useRef} from 'react';
  import FontAicon from 'react-native-vector-icons/Ionicons';
  import {Input} from 'react-native-elements';
  import * as Work from '../../shared/exporter';
  import * as Animatable from 'react-native-animatable';
  import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
  import {
    Bubble,
    GiftedChat,
    Send,
    InputToolbar,
    Composer,
  } from 'react-native-gifted-chat';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import {useTranslation} from 'react-i18next';
  import {useDispatch, useSelector} from 'react-redux';
  import * as Jobs from '../../store/actions/auth.action';
  import SocketIOClient from 'socket.io-client';
  import {Platform} from 'react-native';
  const Chatscreen = ({navigation}) => {
    const [messages, setMessages] = useState([]);
    const [text, onChangeText] = React.useState('Useless Text');
    const dispatch = useDispatch();
    // const { t, i18n } = useTranslation();
    const userid = useSelector(state => state.auth?.user?.user?._id);
  
    const Messages = useSelector(state => state?.auth?.chatMessages);
    // const Language = useSelector(state => state?.auth?.language);
    //   socket.on('connect', () => console.log('connected 26'));
    //   socket.on('disconnect', () => console.log('disconnected'));
    // console.log(socket);
    const socket = SocketIOClient('http://192.168.0.110:5000');
    //   let _filterMessages
    const scrollViewRef = useRef();
  
    //   useEffect(() => {
    //     console.log('in messages---->', Messages[Messages.length - 1]);
    //     // _filterMessages = Messages && Messages?.filter(item => {
    //     //     if (item.sender === userid.toString() || item.receiver === userid.toString()) {
    //     //     return item;
    //     //   }
    //     // });
    //     // setTimeout(() => {
    //     //     scrollViewRef.root.scrollToEnd({animated: true})
    //     // }, 1000);
    //   }, [Messages]);
    useEffect(() => {
      // console.log('userid---->', Messages[Messages.length - 1]);
      // Language == 'ita' ?
      //     setMessages([
      //         {
      //             _id: 1,
      //             text: 'Ciao, in questa chat ti forniremo un orientamento legale in modo da guidarti nella risoluzione del tuo problema legale.',
      //             createdAt: new Date(),
      //             user: {
      //                 _id: 2,
      //                 name: 'React Native',
      //                 //avatar: 'https://placeimg.com/140/140/any',
      //             },
      //         },
      //         {
      //             _id: 2,
      //             text: 'In questa chat non forniamo consulenza legale. Se hai bisogno di questo servizio usa il nostro servizio di consulenza online.',
      //             createdAt: new Date(),
      //             user: {
      //                 _id: 2,
      //                 name: 'React Native',
      //                 //avatar: 'https://placeimg.com/140/140/any',
      //             },
      //         },
      //     ]) :
      // setMessages([
      //     {
      //         _id: 1,
      //         text: 'Hello, in this chat we will help you to undestand the legal guidelines in order to resolve your legal problem.',
      //         createdAt: new Date(),
      //         user: {
      //             _id: 2,
      //             name: 'React Native',
      //             //avatar: 'https://placeimg.com/140/140/any',
      //         },
      //     },
      //     {
      //         _id: 2,
      //         text: 'We dont provide legal consulting services hereIf you need the service you can use our online consultant services',
      //         createdAt: new Date(),
      //         user: {
      //             _id: 2,
      //             name: 'React Native',
      //             //avatar: 'https://placeimg.com/140/140/any',
      //         },
      //     },
  
      // ]);
  
      dispatch(Jobs.chatMessages({userId: userid}));
      // let getList = [];
      // Messages && Messages?.map(data => {
      //     getList.push({
      //         _id: data.id,
      //         text: data.message,
      //         createdAt: new Date(data.created_at),
      //         user: {
      //             _id: data.sender,
      //             name: 'sheraz',
      //         },
      //     });
      // });
      //   console.log(getList);
      // socket.emit('join', {}, (error) => {
      //     if(error) {
      //       Alert.alert(error);
      //       return;
      //     }
      socket.on('message', (userMessage, message) => {
        //   console.log('userMessage----> 98');
        let msg = {
          _id: userMessage._id,
          text: userMessage.message,
          createdAt: new Date(),
          user: {
            _id: userMessage.sender,
            name: 'React Native',
            //avatar: 'https://placeimg.com/140/140/any',
          },
        };
        // setMessages((previousMessages) =>
        //     GiftedChat.append(previousMessages, msg),
        // );
        dispatch(Jobs.chatMessages({userId: userid}));
      });
    }, []);
  
    const onSend = () => {
      // console.log('messages[0].text----->', text);
      // const Message = {
      //     User_id: userid,
      //     message: messages[0].text,
      //     // user_id:
      //     //   userid === route.params.data?.sender_id
      //     //     ? route.params.data?.receiver_id
      //     //     : route.params.data?.sender_id,
      //     // chat_id: chat_id,
      //     // photo: pic,
      //   };
      onChangeText('');
      socket.emit('message', {sender: userid, message: text});
      dispatch(Jobs.chatMessages({userId: userid}));
  
      // setMessages((previousMessages) =>
      //     GiftedChat.append(previousMessages, messages),
      // );
    };
  
    //   console.log('Kuch bhiii');
  
    //   console.log("_filterMessages");
    //   console.log(_filterMessages);
    const renderSend = props => {
      return (
        <Send {...props}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              style={{marginBottom: 5, marginRight: 5}}
              size={32}
              color="#2e64e5"
            />
          </View>
        </Send>
      );
    };
  
    const renderBubble = props => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#2e64e5',
            },
          }}
          textStyle={{
            right: {
              color: '#fff',
            },
          }}
        />
      );
    };
    const renderInputToolbar = props => {
      return (
        <InputToolbar
          {...props}
          // placeholder={Language == 'ita' ? "Messaggio" : "Message"}
          placeholder={'Message'}
          textInputStyle={styles.input}
          //containerStyle={{ borderRadius: 30,borderWidth:1,borderColor:"grey",borderTopColor:'grey'}}
          //  textInputStyle={{borderWidth: 1.5,borderRadius: 30,borderWidth:2,borderColor:"lightgrey",}}
          //containerStyle={{marginBottom:20,borderWidth: 1.5,borderRadius: 30,alignItems:'center',justifyContent:'center'}}
        />
      );
    };
    const scrollToBottomComponent = () => {
      return <FontAwesome name="angle-double-down" size={22} color="#333" />;
    };
    const renderComposer = props => {
      return (
        <Composer
          {...props}
          placeholder="Message"
          //containerStyle={{ borderRadius: 30,borderWidth:1,borderColor:"grey",borderTopColor:'grey'}}
          textInputStyle={{
            borderWidth: 1.5,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: 'lightgrey',
            height: 40,
          }}
          //containerStyle={{marginBottom:20,borderWidth: 1.5,borderRadius: 30,alignItems:'center',justifyContent:'center'}}
        />
      );
    };
  
    return (
      <SafeAreaView style={styles.ParentView}>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAicon
              name="chevron-back-outline"
              size={Work.WP('10')}
              color={'#000'}
              style={{marginStart: 10}}
            />
          </TouchableOpacity>
  
          <View style={{flexGrow: 0.4}}></View>
          <FontAicon
            name="chatbubbles-outline"
            size={Work.WP('10')}
            color={'#000'}
          />
        </View>
        {/* 
  //  <KeyboardAwareScrollView> */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.mainView}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          <Animatable.View animation="fadeInUpBig" duration={1000}>
            <View style={styles.ChatboxContainer}>
              <KeyboardAwareScrollView>
                {/* Messages?.filter(item => {
          if (item.sender === userid.toString() || item.receiver === userid.toString()) {
          return item;
        } */}
                {/* // {_filterMessages &&
              //   _filterMessages.map((item, index) => {
              //     if (item.sender !== userid) {
              //       return <Text style={styles.leftUser}>{item.message}</Text>;
              //     } else if (item.sender === userid) {
              //       return <Text style={styles.rightUser}>{item.message}</Text>;
              //     }
              //   })} */}
                {Messages &&
                  Messages?.map((item, index) => {
                    if (item.receiver == userid) {
                      return <Text style={styles.leftUser}>{item.message}</Text>;
                    } else if (item.sender == userid) {
                      return <Text style={styles.rightUser}>{item.message}</Text>;
                    }
                  })}
  
                {/* <Text style={styles.leftUser}>
                Hello, in this chat we will help you to understand the legal
                guidelines in order to resolve your legal problem , We don't
                provide legal consulting services here. If you need the service
                you can use our online consultant services.
              </Text>
  
              <Text style={styles.rightUser}>
                Hello, in this chat we will help you to understand the legal
                guidelines in order to resolve your legal problem , We don't
                provide legal consulting services here. If you need the service
                you can use our online consultant services.
              </Text> */}
              </KeyboardAwareScrollView>
            </View>
  
            {/* <KeyboardAwareScrollView> */}
          </Animatable.View>
        </ScrollView>
        <View style={styles.bottomWrapper}>
          <View style={styles.bottomView}>
            <TextInput
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Message"
              placeholderTextColor="#757B77"
              multiline={true}
              style={styles.input}
              value={text}
              onChangeText={onChangeText}
            />
          </View>
          <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
            <Text style={{fontSize: 18, color: 'white'}}>Send</Text>
          </TouchableOpacity>
        </View>
  
        {/* </KeyboardAwareScrollView> */}
      </SafeAreaView>
    );
  };
  
  export default Chatscreen;
  
  const styles = StyleSheet.create({
    ParentView: {
      flex: 1,
      backgroundColor: '#BDD5EB',
    },
    mainView: {
      flex: 1,
      borderColor: 'grey',
      borderWidth: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: Work.WP('5'),
      backgroundColor: 'white',
      // paddingBottom: Work.HP('5')
    },
    IconContainer: {
      flexDirection: 'row',
      backgroundColor: '#BDD5EB',
      marginTop: Work.HP('2'),
      alignItems: 'center',
    },
    TextConatiner: {
      marginHorizontal: Work.WP('20'),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Work.WP('10'),
    },
    FormText: {
      textAlign: 'center',
      fontSize: 17,
    },
    chatText: {
      fontSize: 18,
      marginStart: Work.WP('10'),
      marginTop: Work.WP('10'),
      marginHorizontal: Work.WP('10'),
    },
    leftUser: {
      fontSize: 18,
      marginTop: Work.WP('3'),
      marginLeft: Work.WP('3'),
      backgroundColor: '#dcf8c685',
      paddingHorizontal: Work.WP('5'),
      paddingVertical: Work.WP('3'),
      borderRadius: Work.WP('5'),
      width: Work.WP('75'),
      borderTopLeftRadius: 0,
    },
    rightUser: {
      fontSize: 18,
      marginTop: Work.WP('3'),
      marginRight: Work.WP('3'),
      marginLeft: 'auto',
      backgroundColor: '#aed78e',
      paddingHorizontal: Work.WP('5'),
      paddingVertical: Work.WP('3'),
      borderRadius: Work.WP('5'),
      width: Work.WP('75'),
      borderTopRightRadius: 0,
    },
    sendBtn: {
      backgroundColor: '#aed78e',
      fontSize: 18,
      height: Work.HP('6'),
      lineHeight: Platform.OS == 'ios' ? 15 : 0,
      borderColor: '#9E9E9E',
      borderWidth: 1,
      paddingHorizontal: Work.WP('4'),
      borderRadius: 20,
      // position: 'relative',
      // top: -13,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    input: {
      backgroundColor: '#fff',
      fontSize: 18,
      height: Work.HP('6'),
      lineHeight: Platform.OS == 'ios' ? 15 : 0,
      borderColor: '#9E9E9E',
      borderWidth: 1,
      paddingHorizontal: Work.WP('4'),
      borderRadius: 20,
    },
    bottomView: {
      width: '75%',
      marginRight: 10,
      marginLeft: 5,
    },
    bottomWrapper: {
      width: '100%',
      padding: 10,
      flexDirection: 'row',
      //marginVertical: 10,
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick,
      backgroundColor: 'white',
    },
    ChatboxContainer: {
      // backgroundColor: 'red',
      maxHeight: Work.HP('80'),
      marginBottom: Work.WP('2'),
      // paddingBottom: 100
      // flex: 1,
    },
  });
  