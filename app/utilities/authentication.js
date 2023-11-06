const sixdigitcode = (min, max) => {
  let code = "";
  let number = Math.floor(Math.random() * (max - min + 1)) + min;

  if (number >= 0 && number <= 9) code += `00000${number}`;
  else if (number >= 10 && number <= 99) code += `0000${number}`;
  else if (number >= 100 && number <= 999) code += `000${number}`;
  else if (number >= 1000 && number <= 9999) code += `00${number}`;
  else if (number >= 10000 && number <= 99999) code += `0${number}`;
  else code += `${number}`;

  return code;
};

module.exports = { sixdigitcode };
