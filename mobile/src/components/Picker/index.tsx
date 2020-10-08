import React, {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import { TextInputProps, PickerProps} from 'react-native';
import {PickerComponent, Container} from './styles';

import { useField } from '@unform/core';

export interface ListValue {
  id: string;
  value: string;
}
interface PickerProperties extends PickerProps {
  name: string;
  values: ListValue[];
  initialTextValue: string;

}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Picker: React.ForwardRefRenderFunction<InputRef, PickerProperties> = (
  { name,values,initialTextValue,...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '0', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [selectedValue, setSelectedValue] = useState("0");
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleOnChange = useCallback(
    value => {
      setSelectedValue(value);
    },
    [selectedValue],
  );

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });

    inputValueRef.current.value = selectedValue;


  }, [fieldName, registerField,selectedValue]);

  return (
    <Container  isErrored={!!error}>
      <PickerComponent
        ref={inputElementRef}
        selectedValue={selectedValue}
        {...rest}
        onValueChange ={(value) => {handleOnChange(value)}}

        >
          <PickerComponent.Item label={initialTextValue} value="0"  />
          {values.map((item)=>{
            return ( <PickerComponent.Item key={item.id} label={item.value} value={item.id} />);
          })}

      </PickerComponent>
    </Container>
  );
};
export default forwardRef(Picker);

