export const required = (v) => !!v || 'Pole jest wymagane';
export const maxLength1000 = (v) => {
  if (v) {
    return v.length <= 1000 || 'Pole musi mieć mniej niż 1000 znaków';
  } else return true;
};
export const maxLength500 = (v) =>
  (v && v.length <= 500) || 'Pole musi mieć mniej niż 500 znaków';
export const maxLength250 = (v) => {
  if (v) {
    return v.length <= 250 || 'Pole musi mieć mniej niż 250 znaków';
  } else return true;
};
export const correctYear = (v) => {
  if (v) {
    v = Number.parseInt(v);
    return (
      (v >= 1910 && v <= new Date().getFullYear()) ||
      'Rok musi znajdować się w przedziale "1910 - obecny rok"'
    );
  } else return true;
};
