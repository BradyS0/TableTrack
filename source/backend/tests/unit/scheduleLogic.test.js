
import ScheduleLogic from '../../logic/scheduleLogic.js';

const schedule_normal   = { monday: { open: 8.5, close: 20.0 }, tuesday: { open: 8.5, close: 20.0 }}
const schedule_no_days  = {}
const schedule_bad_day  = {monday: { open: 8.5, close: 20.0 },badday: { open: 8.5, close: 20.0 }}  // invalid day



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



// -------------------------------------------------- parse_schedule

test("parse_schedule: normal", () => {
    const parsed = ScheduleLogic.parse_schedule(schedule_normal);
    expect((parsed[0])[0]).toEqual(-1.0);
    expect((parsed[1])[0]).toEqual(8.5);
    expect((parsed[2])[0]).toEqual(8.5);
});

test("parse_schedule: no days", () => {
    const parsed = ScheduleLogic.parse_schedule(schedule_no_days);
    expect((parsed[0])[0]).toEqual(-1.0);
    expect((parsed[1])[0]).toEqual(-1.0);
    expect((parsed[1])[0]).toEqual(-1.0);
});

test("parse_schedule: bad day", () => {
    const parsed = ScheduleLogic.parse_schedule(schedule_bad_day);
    expect((parsed[0])[0]).toEqual(-1.0);
    expect((parsed[1])[0]).toEqual(8.5);
    expect((parsed[2])[0]).toEqual(-1.0);
});
