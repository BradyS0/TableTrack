import UserLogic from '../../logic/userLogic.js';

//validate_email
//valid cases
test("email has @ symbol, domain with at least one ., and no leading, trailing, or consecutive whitespace characters", () => {
    expect(UserLogic.validate_email("email@example.ca")).toEqual(true);
});

//edge cases
test("empty email", () => {
    expect(UserLogic.validate_email("")).toEqual(false);
});

test("email with no @ symbol in it", () => {
    expect(UserLogic.validate_email("emailexample.ca")).toEqual(false);
});

test("email with no username", () => {
    expect(UserLogic.validate_email("@example.ca")).toEqual(false);
});

test("email with no domain", () => {
    expect(UserLogic.validate_email("email@")).toEqual(false);
});

test("email with no mail server name, only top-level domain", () => {
    expect(UserLogic.validate_email("email@.ca")).toEqual(false);
});

test("email with mail server name, but no top-level domain", () => {
    expect(UserLogic.validate_email("email@email")).toEqual(false);
});

//validate_name
//valid cases
test("name starts with an uppercase letter, has no spaces, has no numbers or special characters and is 2-30 characters", () => {
    expect(UserLogic.validate_name("John")).toEqual(true);
});

test("names start with an uppercase letter, has a space in between each name, no numbers or special characters and is within char limit", () => {
    expect(UserLogic.validate_name("John Doe")).toEqual(true);
});

//edge cases
test("name starts with a lowercase letter", () => {
    expect(UserLogic.validate_name("john")).toEqual(false);
});

test("second part of name starts with a lowercase letter", () => {
    expect(UserLogic.validate_name("John doe")).toEqual(false);
});

test("empty name", () => {
    expect(UserLogic.validate_name("")).toEqual(false);
});

test("name has length 1", () => {
    expect(UserLogic.validate_name("A")).toEqual(false);
});

test("name has length 2", () => {
    expect(UserLogic.validate_name("Jo")).toEqual(true);
});

test("name has length 30", () => {
    //26 letters in the alphabet + 4 additional = 30
    expect(UserLogic.validate_name("Abcdefghijklmnopqrstuvwxyzabcd")).toEqual(true);
});

test("name has length 31", () => {
    expect(UserLogic.validate_name("Abcdefghijklmnopqrstuvwxyzabcde")).toEqual(false);
});

test("name contains a number", () => {
    expect(UserLogic.validate_name("John1")).toEqual(false);
});

test("name contains a special character other than whitespace", () => {
    expect(UserLogic.validate_name("John&")).toEqual(false);
});

test("name begins with a space", () => {
    expect(UserLogic.validate_name(" John")).toEqual(false);
});

test("name ends with a space", () => {
    expect(UserLogic.validate_name("John ")).toEqual(false);
});

//validate_password
//valid cases
test("password has one uppercase letter, one lowercase letter, one number, one special character and within character limit", () => {
    expect(UserLogic.validate_password("Password1!")).toEqual(true);
});

//edge cases
test("password has no uppercase letters", () => {
    expect(UserLogic.validate_password("password1!")).toEqual(false);
});

test("password has no lowercase letters", () => {
    expect(UserLogic.validate_password("PASSWORD1!")).toEqual(false);
});

test("password has no numbers", () => {
    expect(UserLogic.validate_password("Password!")).toEqual(false);
});

test("password has no special characters", () => {
    expect(UserLogic.validate_password("Password1")).toEqual(false);
});

test("empty password", () => {
    expect(UserLogic.validate_password("")).toEqual(false);
});

test("password is length 8", () => {
    expect(UserLogic.validate_password("Pass123!")).toEqual(true);
});

test("password is length 15", () => {
    expect(UserLogic.validate_password("Password123456!")).toEqual(true);
});

test("password is length 16", () => {
    expect(UserLogic.validate_password("Password1234567!")).toEqual(false);
});