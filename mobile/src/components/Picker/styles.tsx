import styled, { css } from 'styled-components/native';

interface PickerProps {

  isErrored: boolean;
}

export const PickerComponent = styled.Picker`
  width: 100%;
  height: 60px;
  padding: 0 16px;

`;

export const Container = styled.View<PickerProps>`
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
`;

