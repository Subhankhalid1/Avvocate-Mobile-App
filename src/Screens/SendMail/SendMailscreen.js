import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native'
import FontAicon from 'react-native-vector-icons/Ionicons';
import * as Work from '../../shared/exporter'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SendMailForm from './Components/SendMailForm'
import * as Animatable from 'react-native-animatable'
import { useTranslation } from 'react-i18next';
import GeneralModal from '../../Modals/GeneralModal'
import {useDispatch, useSelector} from 'react-redux';
const SendMailscreen = ({navigation}) => {
    const { t, i18n } = useTranslation();
    const Loader = useSelector(state => state.auth.loadingLoader);

    return (
        <SafeAreaView style={styles.ParentView}>
            <View style={styles.IconContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <FontAicon
                        name="chevron-back-outline"
                        size={Work.WP('10')}
                        color={'#000'}
                        style={{marginStart:10}}
                    />
                </TouchableOpacity>

                <View style={{ flexGrow: 0.4 }}></View>
                <FontAicon
                   
                    name="mail-outline"
                    size={Work.WP('10')}
                    color={'#000'}
                />
            </View>

            <Animatable.View
                animation='fadeInUpBig'
                duration={1000} style={styles.mainView}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always">
                        <View style={styles.TextConatiner}>
                            <Text style={styles.FormText}>
                           {t("Please, provide you contact details in order to proceed with your legal request.")}
                            </Text>
                        </View>
                        {Loader == true ? (
          <View
            style={{
           
              justifyContent: 'center',
              marginVertical: Work.WP('5'),
            }}>
            <ActivityIndicator
              style={{alignSelf: 'center'}}
              size="large"
              color={"#4F6EA5"}
            />
            </View>
        
         ) : null} 
         <GeneralModal/>
                    <SendMailForm />

                </KeyboardAwareScrollView>
            </Animatable.View>


        </SafeAreaView>
    )
}

export default SendMailscreen

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
        backgroundColor: 'white'
    },
    IconContainer: {
        flexDirection: 'row',
        backgroundColor: '#BDD5EB',
        alignItems:'center',
        marginTop: Work.HP('2'),
       
    },
    TextConatiner:{
        marginHorizontal:Work.WP('15'),
        alignItems:'center',
        justifyContent:'center',
        marginTop:Work.WP('10')
    },
    FormText:{
        textAlign:'center',
        fontSize:17,
    
    }


})
