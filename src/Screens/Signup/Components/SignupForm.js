
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as Yup from 'yup';
import * as Work from '../../../shared/exporter';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../store/actions/auth.action';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
const { WP, HP } = Work;
const SignupForm = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [date, setDate] = useState(null)
    const [open, setOpen] = useState(false)
    const Language = useSelector(state => state.auth.language);
    const Signup = async ({Name,Surname,DateOfBirth, Email, Password }) => {
      dispatch(
        Jobs.SignUp({
            name:Name,
            surname:Surname,
            email: Email,
            dob:date,
            password: Password,
        }),
      );
    };
    return (
        <View>
            <DatePicker
          modal
          open={open}
          locale={Language == 'ita' ? 'it-IT':'en'} 
          mode='date'
          date={new Date()}
         onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
            <Formik
                initialValues={{
                    Name: '',
                    Surname: '',
                    DateOfBirth: '',
                    Email: '',
                    Password: '',
                    ConPassword: '',
                }}
                validationSchema={Yup.object({
                    Name: Yup.string().required('Name Required').max('25'),
                    Surname: Yup.string().required('Surname Required').max('25'),
                    // DateOfBirth: Yup.string().required('Date of birth Required').max('25'),
                    Email: Yup.string().email().required('Please enter a valid Email'),
                    Password: Yup.string().min(8, 'Too Short ! At least 8 Characters Required').required('Field Required'),
                    ConPassword: Yup.string().min(8, 'Too Short ! At least 8 Characters Required').required('Field Required').oneOf([Yup.ref('Password')], 'Passwords do not match'),
                })}
                onSubmit={(values) => {
                    Signup(values)

                }}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                }) => (
                    <View>
                        <View>
                            <Input
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                placeholder={t("Name")}
                                placeholderTextColor="#757B77"
                                style={styles.input}
                                onChangeText={handleChange('Name')}
                                onBlur={handleBlur('Name')}
                                error={errors.Name}
                                touched={touched.Name}
                                autoCorrect={false}
                                errorMessage={
                                    errors.Name && touched.Name
                                        ? errors.Name
                                        : null
                                }
                                errorStyle={{ marginLeft: WP('10') }} />
                        </View>
                    
                        <View>
                            <Input
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                placeholder={t("Surname")}
                                placeholderTextColor="#757B77"
                                style={styles.input}
                                onChangeText={handleChange('Surname')}
                                onBlur={handleBlur('Surname')}
                                error={errors.Surname}
                                touched={touched.Surname}
                                autoCorrect={false}
                                errorMessage={
                                    errors.Surname && touched.Surname
                                        ? errors.Surname
                                        : null
                                }
                                errorStyle={{ marginLeft: WP('10') }} />
                        </View>
                        <View>
                            <Input
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                placeholder={t("Email")}
                                placeholderTextColor="#757B77"
                                style={styles.input}
                                onChangeText={handleChange('Email')}
                                onBlur={handleBlur('Email')}
                                error={errors.Email}
                                touched={touched.Email}
                                autoCorrect={false}
                                errorMessage={
                                    errors.Email && touched.Email
                                        ? errors.Email
                                        : null
                                }
                                errorStyle={{ marginLeft: WP('10') }} />
                        </View>
                        <TouchableOpacity
                        onPress={() => setOpen(true)}
                          style={styles.datePickerStyle}

                        >
                            <Text style={{
   fontSize: 18,color:'grey',
                            }}>
                                {
                                    date ? moment(date).format('DD/MM/YYYY')
                                :
                            t("Date of birth")
                                }
                            </Text>
                            
                            {/* <Input
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                placeholder={t("Date of birth")}
                                placeholderTextColor="#757B77"
                                style={styles.input}
                                disabled={true}
                                onChangeText={handleChange('DateOfBirth')}
                                onBlur={handleBlur('DateOfBirth')}
                                error={errors.DateOfBirth}
                                touched={touched.DateOfBirth}
                                autoCorrect={false}
                                errorMessage={
                                    errors.DateOfBirth && touched.DateOfBirth
                                        ? errors.DateOfBirth
                                        : null
                                }
                                errorStyle={{ marginLeft: WP('10') }} /> */}
                        </TouchableOpacity>

                        <View>
                            <Input
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                placeholder={t("Password")}
                                placeholderTextColor="#757B77"
                                style={styles.input}
                                onChangeText={handleChange('Password')}
                                onBlur={handleBlur('Password')}
                                error={errors.Password}
                                touched={touched.Password}
                                autoCorrect={false}
                                secureTextEntry={true}
                                errorMessage={
                                    errors.Password && touched.Password ? errors.Password : null
                                }
                                errorStyle={{ marginLeft: WP('10') }} />
                        </View>
                        <View>
                            <Input
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                placeholder={t("Confirm password")}
                                placeholderTextColor="#757B77"
                                style={styles.input}
                                onChangeText={handleChange('ConPassword')}
                                onBlur={handleBlur('ConPassword')}
                                error={errors.ConPassword}
                                touched={touched.ConPassword}
                                autoCorrect={false}
                                secureTextEntry={true}
                                errorMessage={
                                    errors.ConPassword && touched.ConPassword ? errors.Password : null
                                }
                                errorStyle={{ marginLeft: WP('10') }} />
                        </View>

                      
                        <View>
                            <TouchableOpacity
                                style={styles.loginbtn}
                                onPress={handleSubmit}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>{t(" Register")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>

    )
}

export default SignupForm

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        fontSize: 18,
        height: HP('6'),
        borderColor: "#9E9E9E",
        width: WP('40'),
        borderWidth: 1,
        paddingHorizontal: WP('4'),
        marginHorizontal: WP('10')

    },
    loginbtn: {
        backgroundColor: '#4F6EA5',
        textAlign: 'center',
        paddingVertical: WP('2'),
        color: 'black',
        borderRadius: 30,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        width: WP('32'),
        alignSelf: 'center'
    },
    passwordText: {
        textAlign: 'center',
        fontSize: WP('4.5'),
        textDecorationLine: 'underline'
    },
    datePickerStyle:{
        backgroundColor: '#fff',
        fontSize: 18,
        height: HP('6'),
        borderColor: "#9E9E9E",
       marginBottom:25,
        borderWidth: 1,
        marginHorizontal: WP('12'),
        justifyContent:'center',
        paddingHorizontal: WP('4'),


    }

})