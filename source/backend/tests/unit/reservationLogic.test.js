import ReservationLogic from "../../logic/reservationLogic.js"


describe("validate_int", () => {
  test("returns parsed integer when valid", () => {
    expect(ReservationLogic.validate_int("5")).toBe(5);
  });

  test("throws error on invalid integer", () => {
    expect(() => ReservationLogic.validate_int("abc", "test")).toThrow("invalid test id.");
  });

  test("throws when NaN after parseInt", () => {
    expect(() => ReservationLogic.validate_int("", "value")).toThrow("invalid value id.");
  });
});


describe("validate_guest_amount", () => {
  test("returns integer when valid", () => {
    expect(ReservationLogic.validate_guest_amount("3")).toBe(3);
  });

  test("throws when not a number", () => {
    expect(() => ReservationLogic.validate_guest_amount("abc")).toThrow(
      "Guest Amount must be a positive integer"
    );
  });

  test("throws when less than 1", () => {
    expect(() => ReservationLogic.validate_guest_amount("0")).toThrow(
      "Guest Amount must be a positive integer"
    );
  });
});

describe("validate_date", () => {
  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d
  })();

  const today = new Date().toISOString().split("T")[0];

  test("returns Date object when valid and future", () => {
    const result = ReservationLogic.validate_date(tomorrow.toDateString());
    expect(result instanceof Date).toBe(true);
  });

  test("throws on invalid date syntax", () => {
    expect(() => ReservationLogic.validate_date("not-a-date")).toThrow(
      "Invalid date syntax"
    );
  });

  test("throws when date is today or in the past", () => {
    expect(() => ReservationLogic.validate_date(today)).toThrow(
      "Same day or past reservations not allowed"
    );
  });
});

describe("create_date_stamp", () => {
  test("creates correct Date object", () => {
    const d = ReservationLogic.create_date_stamp(2025, 5, 10, 13, 30);
    expect(d instanceof Date).toBe(true);
    expect(d.getFullYear()).toBe(2025);
    expect(d.getMonth()).toBe(5); // note: no month - 1 correction in ReservationLogic
    expect(d.getDate()).toBe(10);
    expect(d.getHours()).toBe(13);
    expect(d.getMinutes()).toBe(30);
  });

  test("throws on invalid input", () => {
    expect(() => ReservationLogic.create_date_stamp("x", 10, 10, 10, 10)).toThrow(
      "Invalid date syntax."
    );
  });
});



describe("validate_reservation_time", () => {
  const reserved = [10.0, 14.5]; // 10:00 and 14:30

  test("returns true when time overlaps existing", () => {
    expect(ReservationLogic.validate_reservation_time(11.0, reserved)).toBe(true);
    expect(ReservationLogic.validate_reservation_time(13.0, reserved)).toBe(true);
  });

  test("returns false when no overlap", () => {
    expect(ReservationLogic.validate_reservation_time(18.0, reserved)).toBe(false);
  });
});




describe("generate_reservation_tickets", () => {

  test("generates correct tickets when no reservations exist", () => {
    const open = 10.0;
    const close = 18.0;
    const tickets = ReservationLogic.generate_reservation_tickets(open, close, []);

    expect(tickets.length).toBeGreaterThan(0);
    expect(tickets[0]).toBeCloseTo(10.25, 2); // 10 + 15min
  });


  test("skips times that overlap with existing reservations", () => {
    const open = 10.0;
    const close = 18.0;
    const reserved = [12.0];

    const tickets = ReservationLogic.generate_reservation_tickets(open, close, reserved);

    // tickets should NOT include anything within 2 hours of 12.0
    const blockedRange = tickets.filter(
      (t) => Math.abs(t - 12.0) < 2
    );

    expect(blockedRange.length).toBe(0);
  });


  test("returns empty list if interval is too small", () => {
    const open = 10.0;
    const close = 12.0; // not enough time for 2hr interval + 15 min

    const tickets = ReservationLogic.generate_reservation_tickets(open, close, []);
    expect(tickets).toEqual([]);
  });
});