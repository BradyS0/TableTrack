import ScheduleLogic from '../../logic/scheduleLogic.js';

// -------------------------------------------------- check_open

test("check_open: open", () => {
    const open = ScheduleLogic.check_open(10,8,12);
    expect(open).toBe(true);
});

test("check_open: too early", () => {
    const open = ScheduleLogic.check_open(7.5,8,12);
    expect(open).toBe(false);
});

test("check_open: too late", () => {
    const open = ScheduleLogic.check_open(12,8,12);
    expect(open).toBe(false);
});

test("check_open: open cant be equal to close", () => {
    const open = ScheduleLogic.check_open(5,8,8);
    expect(open).toBe(false);
});


// -------------------------------------------------- get_day_index

test("get_day_index: valid day", () => {
    let result = ScheduleLogic.get_day_index('Monday')
    expect(result).toBe(1);

    result = ScheduleLogic.get_day_index('monday')
    expect(result).toBe(1);

    result = ScheduleLogic.get_day_index('MONDAY')
    expect(result).toBe(1);
});

test("get_day_index: invalid day or format", () => {
    let result = ScheduleLogic.get_day_index('some_day')
    expect(result).toBe(-1);

    result = ScheduleLogic.get_day_index(5)
    expect(result).toBe(-1);

    result = ScheduleLogic.get_day_index({json:"wrong format"})
    expect(result).toBe(-1);

    result = ScheduleLogic.get_day_index(null)
    expect(result).toBe(-1);
});