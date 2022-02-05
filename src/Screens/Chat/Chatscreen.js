import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import FontAicon from 'react-native-vector-icons/Ionicons';
import * as Work from '../../shared/exporter';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useDispatch, useSelector} from 'react-redux';
import * as Jobs from '../../store/actions/auth.action';
import SocketIOClient from 'socket.io-client';
import {Platform} from 'react-native';

const Chatscreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [text, onChangeText] = React.useState('');
  const dispatch = useDispatch();
  const userid = useSelector(state => state.auth?.user?.user?._id);
  const Messages = useSelector(state => state?.auth?.chatMessages);

  const socket = SocketIOClient('https://avvocateheroku.herokuapp.com/');
  const scrollViewRef = useRef(null);

  useEffect(() => {
    dispatch(Jobs.chatMessages({userId: userid}));
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

      dispatch(Jobs.chatMessages({userId: userid}));
    });
  }, []);

  useEffect(() => {
    let node = scrollViewRef.current;
    node.scrollToEnd();
  }, [Messages]);

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

      <ScrollView
        ref={scrollViewRef}
        style={styles.mainView}
        contentContainerStyle={{flexGrow: 1,paddingBottom:20}}>
        {/* <Animatable.View animation="fadeInUpBig" duration={1000}> */}
        <View style={styles.ChatboxContainer}>
        {Messages &&
          Messages?.map((item, index) => {
            if (item.receiver == userid) {
              return (
                <Text style={styles.leftUser} key={index}>
                  {item.message}
                </Text>
              );
            } else if (item.sender == userid) {
              return (
                <Text style={styles.rightUser} key={index}>
                  {item.message}
                </Text>
              );
            }
          })}
          </View>
        {/* </Animatable.View> */}
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
    height: Work.HP('81'),
    maxHeight: Work.HP('81'),
    marginBottom: Work.WP('15'),
  },
  IconContainer: {
    flexDirection: 'row',
    backgroundColor: '#BDD5EB',
    marginTop: Work.HP('2'),
    alignItems: 'center',
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
    // paddingBottom: 100
    // flex: 1,
  },
});
