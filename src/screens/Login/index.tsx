import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    LoginTitle,
    Footer,
    FooterWrapper
} from './styles';

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { LoginSocialButton } from '../../components/LoginSocialButton';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from 'react-native';


export function Login() {

    const { signInWithGoggle, signInWithApple } = useAuth()
    
    async function handleSignInWithGoggle() {
        try {
            await signInWithGoggle()
        } catch (err:any) {
            console.log(err)
            Alert.alert('Não foi possivel conectar a conta google')
        }
    }

    async function handleSignInWithApple() {
        try {
            await signInWithApple()
        } catch (err:any) {
            Alert.alert('Não foi possivel conectar a conta apple')
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <LoginTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </LoginTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <LoginSocialButton onPress={handleSignInWithGoggle} title="Entrar com o Google" svg={GoogleSvg}/>
                    <LoginSocialButton onPress={handleSignInWithApple} title="Entrar com a Apple" svg={AppleSvg}/>
                </FooterWrapper>
            </Footer>
        </Container>
    );
}