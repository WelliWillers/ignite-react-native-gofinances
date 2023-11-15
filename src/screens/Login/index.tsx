import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  LoginTitle,
  Title,
  TitleWrapper,
} from "./styles";

import { ActivityIndicator, Alert, Platform } from "react-native";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { LoginSocialButton } from "../../components/LoginSocialButton";
import theme from "../../global/styles/theme";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const { signInWithGoggle } = useAuth();

  async function handleSignInWithGoggle() {
    try {
      setIsLoading(true);
      return await signInWithGoggle();
    } catch (err: any) {
      console.log(err);
      Alert.alert("Não foi possivel conectar a conta google");
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return; //await signInWithApple()
    } catch (err: any) {
      Alert.alert("Não foi possivel conectar a conta apple");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <LoginTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </LoginTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <LoginSocialButton
            onPress={handleSignInWithGoggle}
            title="Entrar com o Google"
            svg={GoogleSvg}
          />
          {Platform.OS === "ios" && (
            <LoginSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com a Apple"
              svg={AppleSvg}
            />
          )}
        </FooterWrapper>
      </Footer>

      {isLoading && (
        <ActivityIndicator
          color={theme.colors.shape}
          style={{ marginTop: 18 }}
        />
      )}
    </Container>
  );
}
