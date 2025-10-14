
// generated via chat-gpt
export function phone_num_strip(num){
  var value = num.replace(/[^0-9+\s()-]/g, '');

  // 2. Ensure "+" only appears once and only at the beginning
  value = value.replace(/(?!^)\+/g, '');
  if (value.indexOf('+') > 0) value = value.replace(/\+/g, '');

  // 3. Prevent double spaces or double dashes
  value = value.replace(/ {2,}/g, ' ');
  value = value.replace(/-{2,}/g, '-');

  // 4. Optional: Prevent more than two parentheses groups
  const openParenCount = (value.match(/\(/g) || []).length;
  const closeParenCount = (value.match(/\)/g) || []).length;
  if (openParenCount > 1) value = value.replace(/\(/g, '(').replace(/\(/g, '');
  if (closeParenCount > 1) value = value.replace(/\)/g, ')').replace(/\)/g, '');
  
  return value
}

export function phone_num_validator(num){
    
}