function maskCPF(value: string): string {
  value = value.replace(/\D/g, ''); //Retira tudo que não é numero
  value = value.replace(/^(\d{3})(\d)/g, "$1.$2"); //Separa por blocos
  value = value.replace(/(\d{3})(\d)/, "$1.$2"); //Separa por blocos
  value = value.replace(/(\d{3})(\d{2})/g, "$1-$2"); //Separa por blocos

  return value;
}

function maskPhone(value: string): string {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  return value;
}

function maskRG(value: string): string {
  value = value.replace(/[^\dXx]/g, "");
  value = value.replace(/(\d{2})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})([\dXx]{1,2})$/, "$1-$2");

  return value;
}

function maskDate(value: string): string {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, "$1/$2");
  value = value.replace(/(\d{2})(\d)/, "$1/$2");

  return value;
}

function maskCEP(value: string): string {
  value = value.replace(/\D/g, '');
  value = value.replace(/^([\d]{5})-*([\d])/, "$1-$2");
  value = value.replace(/^([\d]{5})-*([\d]{3})(\d)/, "$1-$2");


  return value;
}

function getRawValue(value: string): string {

  value = value.replace(/[^\dX]/g, "");

  return value;
}


export { maskCPF, maskPhone, maskRG, maskDate, getRawValue, maskCEP }
