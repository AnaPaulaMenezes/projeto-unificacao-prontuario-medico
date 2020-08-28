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
import {maskCPF, maskPhone, maskRG, maskDate,getRawValue} from '../../utils/masks';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  mask?: 'date' | 'cpf' | 'rg' | 'phone' ;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon , mask, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [textValue,setTextValue] = useState('');
  const [rawValue,setRawValue] = useState('');


  const handleOnChange = useCallback(
    text => {
      let maskedValue = '';
      if (mask) {
        switch (mask) {
          case 'cpf':
            maskedValue = maskCPF(text);
            break;

          case 'rg':
            maskedValue = maskRG(text);
            break;

          case 'phone':
            maskedValue = maskPhone(text);
            break;

          case 'date':
            maskedValue = maskDate(text);
            text = maskedValue;
            break;
        }
        setTextValue(maskedValue);
        setRawValue(getRawValue(maskedValue));
      }else {
        setTextValue(text);
        setRawValue(text);
      }
    },


    [rawValue,textValue],
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

    inputValueRef.current.value = rawValue;

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
        value={textValue}
        {...rest}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(text) => {handleOnChange(text)}}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};
export default forwardRef(Input);
