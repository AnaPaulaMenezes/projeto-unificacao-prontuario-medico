import styled, { css } from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';
// import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}
export const Container = styled.View<ContainerProps>`
  background: #dcdcdc;
  border-width: 2px;
  border-color: #dcdcdc;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #0190b0;
    `}
`;

export const TextInput = styled(TextInputMask)`
  flex: 1;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

/* export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`; */
