//this file contains any input formatting logic fucntions


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


// Converts float -> readable HH:MM for input type=time
export const floatToTime = (f) => {
    if (!f && f !== 0) return "";
    let hour = Math.floor(f) >23 ? 0 : Math.floor(f);
    let minute = Math.round((f % 1) * 60);
    if(minute>59){
      hour = hour+1>=23 ? 0 : hour+1
      minute = 0
    }
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

// Converts back to float
export const timeToFloat = (val) => {
    if (!val) return "";
    const [h, m] = val.split(":").map(Number);
    return h + m / 60;
};