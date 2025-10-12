const {validate_email, validate_name} = require('../../logic/userLogic.js');

//validate_email
test("email has @ symbol with in it", () => {
    expect(validate_email("email@example.ca")).toEqual(true);
});

test("email with no @ symbol in it", () => {
    expect(validate_email("emailexample.ca")).toEqual(false);
});

//validate_name
//valid
test("name starts with an uppercase letter, has no spaces, has no numbers or special characters and is 2-30 characters", () => {
    expect(validate_name("John")).toEqual(true);
});

test("names start with an uppercase letter, has a space in between each name, no numbers or special characters and is within char limit", () => {
    expect(validate_name("John Doe")).toEqual(true);
});

//edge
test("name starts with a lowercase letter", () => {
    expect(validate_name("john")).toEqual(false);
});

test("second part of name starts with a lowercase letter", () => {
    expect(validate_name("John doe")).toEqual(false);
});

test("empty name", () => {
    expect(validate_name("")).toEqual(false);
});

test("name has length 1", () => {
    expect(validate_name("A")).toEqual(false);
});

test("name has length 2", () => {
    expect(validate_name("Jo")).toEqual(true);
});

test("name has length 30", () => {
    //26 letters in the alphabet + 4 additional = 30
    expect(validate_name("Abcdefghijklmnopqrstuvwxyzabcd")).toEqual(true)
});

test("name has length 31", () => {
    expect(validate_name("Abcdefghijklmnopqrstuvwxyzabcde")).toEqual(false)
});

test("name contains a number", () => {
    expect(validate_name("John1")).toEqual(false)
});

test("name contains a special character other than whitespace", () => {
    expect(validate_name("John&")).toEqual(false)
});

test("name begins with a space", () => {
    expect(validate_name(" John")).toEqual(false)
});

test("name ends with a space", () => {
    expect(validate_name("John ")).toEqual(false)
});

//validate_password