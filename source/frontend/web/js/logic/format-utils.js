//this file contains any string formatting logic fucntions


//generated using gemini -- 
// takes input(string) keeps only digits(Numbers) within the length 10
// then applies formatting to it and returns the formatted output
export function formatPhoneNumber(input){
  input = input.replace(/\D/g, "");
  input = input.substring(0, 10);

  // Apply formatting: (111) 111-1111
  let formatted = "";
  if (input.length > 0) formatted = "(" + input.substring(0, 3);
  if (input.length >= 4) formatted += ") " + input.substring(3, 6);
  if (input.length >= 7) formatted += "-" + input.substring(6, 10);

  return formatted
}