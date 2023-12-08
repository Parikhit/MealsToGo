import React, { useState, useContext } from 'react';

import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../infrastructure/theme/colors';

import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    Title,
    ErrorContainer,
} from '../components/account.styles';

import Spacer from '../../../utility-components/spacer/spacer.component';
import Text from '../../../utility-components/typography/text.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const { onRegister, isLoading, error } = useContext(AuthenticationContext);

    return (
        <AccountBackground>
            <AccountCover />
            <Title>Xpress Meals</Title>
            <AccountContainer>
                <AuthInput
                    label='E-mail'
                    value={email}
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={(val) => setEmail(val)}
                />

                <Spacer size='large'>
                    <AuthInput
                        label='Password'
                        value={password}
                        textContentType='password'
                        secureTextEntry
                        autoCapitalize='none'
                        onChangeText={(pass) => setPassword(pass)}
                    />
                </Spacer>

                <Spacer size='large'>
                    <AuthInput
                        label='Repeat Password'
                        value={repeatedPassword}
                        textContentType='password'
                        secureTextEntry
                        autoCapitalize='none'
                        onChangeText={(pass) => setRepeatedPassword(pass)}
                    />
                </Spacer>
                {error && (
                    <Spacer size='large'>
                        <ErrorContainer size='large'>
                            <Text variant='error'>{error}</Text>
                        </ErrorContainer>
                    </Spacer>
                )}
                <Spacer size='large'>
                    {!isLoading ? (
                        <AuthButton
                            icon='email'
                            mode='contained'
                            onPress={() => onRegister(email, password, repeatedPassword)}
                        >
                            Register
                        </AuthButton>
                    ) : (
                        <ActivityIndicator animating={true} color={colors.brand.primary} />
                    )}
                </Spacer>
            </AccountContainer>
            <Spacer size='large'>
                <AuthButton mode='contained' onPress={() => navigation.goBack()}>
                    Back
                </AuthButton>
            </Spacer>
        </AccountBackground>
    );
};

export default RegisterScreen;