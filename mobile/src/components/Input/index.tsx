import React, {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  rawValue?:string;
}
interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, onChangeText, rawValue, ...rest },
  ref,
) => {

  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);


  const handleOnChange = useCallback(
    (text) => {
      if (inputValueRef.current) inputValueRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
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
    if(rawValue){
      inputValueRef.current.value = rawValue;
    }

    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

    });
  }, [fieldName, registerField,rawValue]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {/* <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      /> */}
      <TextInput
        ref={inputElementRef}
        {...rest}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={handleOnChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};
export default forwardRef(Input);
