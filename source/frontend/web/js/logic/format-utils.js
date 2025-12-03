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


export function isoTo12hr(isoString) {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
}



/**
 * Checks if the password is at least 8 characters long.
 * @param {string} password - The password string to check.
 * @returns {boolean} True if the length is >= 8.
 */
function checkMinLength(password) {
    // Regex: .{8,} matches any character (.) 8 or more times ({8,}).
    return /.{8,}/.test(password);
}

/**
 * Checks if the password contains at least one uppercase letter (A-Z).
 * @param {string} password - The password string to check.
 * @returns {boolean} True if at least one uppercase letter is present.
 */
function checkUppercase(password) {
    // Regex: [A-Z] matches any uppercase letter.
    return /[A-Z]/.test(password);
}

/**
 * Checks if the password contains at least one lowercase letter (a-z).
 * @param {string} password - The password string to check.
 * @returns {boolean} True if at least one lowercase letter is present.
 */
function checkLowercase(password) {
    // Regex: [a-z] matches any lowercase letter.
    return /[a-z]/.test(password);
}

/**
 * Checks if the password contains at least one digit (0-9).
 * @param {string} password - The password string to check.
 * @returns {boolean} True if at least one digit is present.
 */
function checkNumber(password) {
    // Regex: [0-9] or \d matches any digit.
    return /[0-9]/.test(password);
}

/**
 * Checks if the password contains at least one special character.
 * (Common non-alphanumeric characters: !@#$%^&*)
 * @param {string} password - The password string to check.
 * @returns {boolean} True if at least one special character is present.
 */
function checkSpecialCharacter(password) {
    // Regex: [!@#$%^&*] matches any character inside the brackets.
    // The characters are escaped if necessary, but !@#$%^&* are safe here.
    return /[ !@#$%^&*()_+={}[\]:;"'<>,.?/\\|~`-]/.test(password);
}

export const passValidator = (pass)=>{
    const hasUpperAndLower = checkLowercase(pass) && checkUppercase(pass)
    const hasSpecial = checkSpecialCharacter(pass)
    const hasNumber = checkNumber(pass)
    const hasMinLength = checkMinLength(pass)
    const allValid = hasMinLength && hasSpecial && hasNumber && hasUpperAndLower
    return {hasUpperAndLower,hasSpecial,hasNumber,hasMinLength, allValid}
}