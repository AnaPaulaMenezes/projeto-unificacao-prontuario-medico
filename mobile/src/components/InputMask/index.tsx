import React, {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';

import { useField } from '@unform/core';

import { TextInputProps } from 'react-native';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  mask: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}

const InputMask: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, mask, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const handleOnChange = useCallback(
    value => {
      inputValueRef.current.value = value;
    },
    [inputValueRef],
  );
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {/* <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      /> */}
      <TextInput
        mask={mask}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={handleOnChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        refInput={inputElementRef}
        {...rest}
      />
    </Container>
  );
};
export default forwardRef(InputMask);
