import {
  formatPhoneNumber,
  floatToTime,
  timeToFloat,
  passValidator,
} from "../../js/logic/format-utils.js";

describe("formatPhoneNumber", () => {
  test("formats 10-digit number correctly", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
  });

  test("handles shorter numbers gracefully", () => {
    expect(formatPhoneNumber("123")).toBe("(123");
    expect(formatPhoneNumber("1234")).toBe("(123) 4");
    expect(formatPhoneNumber("1234567")).toBe("(123) 456-7");
  });

  test("removes all non-digit characters", () => {
    expect(formatPhoneNumber("(123) 456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123-456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123.456.7890")).toBe("(123) 456-7890");
  });

  test("truncates input longer than 10 digits", () => {
    expect(formatPhoneNumber("1234567890123")).toBe("(123) 456-7890");
  });

  test("returns empty string for empty input", () => {
    expect(formatPhoneNumber("")).toBe("");
  });
});

describe("floatToTime", () => {
  test("converts float to HH:MM correctly", () => {
    expect(floatToTime(14.5)).toBe("14:30");
    expect(floatToTime(9.25)).toBe("09:15");
    expect(floatToTime(0)).toBe("00:00");
    expect(floatToTime(24)).toBe("00:00");
  });

  test("rounds minutes properly", () => {
    expect(floatToTime(10.9999)).toBe("11:00"); // rounds up to next hour
    expect(floatToTime(23.999)).toBe("00:00"); // rounds up to next hour
    expect(floatToTime(24.999)).toBe("01:00"); // rounds up to next hour
    expect(floatToTime(24.59)).toBe("00:35"); // rounds up to next hour
    expect(floatToTime(5.01)).toBe("05:01"); // near-zero fractional part
  });

  test("returns empty string for null/undefined", () => {
    expect(floatToTime(null)).toBe("");
    expect(floatToTime(undefined)).toBe("");
  });
});

describe("timeToFloat", () => {
  test("converts HH:MM to float correctly", () => {
    expect(timeToFloat("14:30")).toBeCloseTo(14.5);
    expect(timeToFloat("09:15")).toBeCloseTo(9.25);
    expect(timeToFloat("00:00")).toBeCloseTo(0);
  });

  test("handles edge cases", () => {
    expect(timeToFloat("23:59")).toBeCloseTo(23.9833, 3); // near midnight
  });

  test("returns empty string for invalid or empty input", () => {
    expect(timeToFloat("")).toBe("");
    expect(timeToFloat(null)).toBe("");
    expect(timeToFloat(undefined)).toBe("");
  });
});

describe("password validation", () => {
  const passwords = ["T3st!ngP@ss","aB1!CdeF",
    "","Abc1!","Abc1!23",
    "password!23","PASSWORD!23",
    "P@ssword!#","OnlyLetters",
    "12345678","123456!@#",
  ];

  test("test valid passwords", () => {
    let result = passValidator(passwords[0]);
    for (let r in result) expect(result[r]).toBe(true);

    result = passValidator(passwords[1]);
    for (let r in result) expect(result[r]).toBe(true);
  });

  test("test invalid length passwords", ()=>{
    let result = passValidator(passwords[2]);
    expect(result.hasMinLength).toBe(false)
    expect(result.allValid).toBe(false)

    result = passValidator(passwords[3]);
    expect(result.hasMinLength).toBe(false)
    expect(result.allValid).toBe(false)

    result = passValidator(passwords[4]);
    expect(result.hasMinLength).toBe(false)
    expect(result.allValid).toBe(false)
  })

  test("test invalid case within passwords", ()=>{
    let result = passValidator(passwords[5]);
    expect(result.hasUpperAndLower).toBe(false)
    expect(result.allValid).toBe(false)

    result = passValidator(passwords[6]);
    expect(result.hasUpperAndLower).toBe(false)
    expect(result.allValid).toBe(false)
  })

  test("test missing requirements for passwords", ()=>{
    let result = passValidator(passwords[7]);
    expect(result.hasNumber).toBe(false)
    expect(result.allValid).toBe(false)

    result = passValidator(passwords[8]);
    expect(result.hasUpperAndLower).toBe(true)
    expect(result.hasMinLength).toBe(true)
    expect(result.hasSpecial).toBe(false)
    expect(result.hasNumber).toBe(false)
    expect(result.allValid).toBe(false)

    result = passValidator(passwords[9]);
    expect(result.hasNumber).toBe(true)
    expect(result.allValid).toBe(false)

    result = passValidator(passwords[10]);
    expect(result.hasNumber).toBe(true)
    expect(result.hasSpecial).toBe(true)
    expect(result.allValid).toBe(false)
  })


});
