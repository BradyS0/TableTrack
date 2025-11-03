
import ScheduleLogic from '../../logic/ScheduleLogic.js';

const schedule_normal   = "{\"schedule\":{\"monday\":{\"open\":8.5, \"close\":20.0}, \"tuesday\":{\"open\":8.5, \"close\":20.0}}}";
const schedule_no_days  = "{\"schedule\":{}}";
const schedule_bad_day  = "{\"schedule\":{\"monday\":{\"open\":8.5, \"close\":20.0}, \"badday\":{\"open\":8.5, \"close\":20.0}}}";
const schedule_overfull = "{\"schedule\":{\"sunday\":{\"open\":8.5, \"close\":20.0}, \"monday\":{\"open\":8.5, \"close\":20.0}, \"tuesday\":{\"open\":8.5, \"close\":20.0}, \"wednesday\":{\"open\":8.5, \"close\":20.0}, \"thursday\":{\"open\":8.5, \"close\":20.0}, \"friday\":{\"open\":8.5, \"close\":20.0}, \"saturday\":{\"open\":8.5, \"close\":20.0}, \"sunday\":{\"open\":8.5, \"close\":20.0}, }}";



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



// -------------------------------------------------- validate_schedule

test("validate_schedule: normal", () => {
    const valid = ScheduleLogic.validate_schedule(schedule_normal);
    expect(valid).toBe(true);
});

test("validate_schedule: no days", () => {
    const valid = ScheduleLogic.validate_schedule(schedule_no_days);
    expect(valid).toBe(true);
});

test("validate_schedule: bad day", () => {
    const valid = ScheduleLogic.validate_schedule(schedule_bad_day);
    expect(valid).toBe(false);
});

test("validate_schedule: overfull", () => {
    const valid = ScheduleLogic.validate_schedule(schedule_overfull);
    expect(valid).toBe(false);
});



// -------------------------------------------------- parse_schedule

test("parse_schedule: normal", () => {
    const parsed = ScheduleLogic.parse_schedule(schedule_normal);
    expect((parsed[0])[0]).toBe(0.0);
    expect((parsed[1])[0]).toBe(8.5);
    expect((parsed[2])[0]).toBe(8.5);
});

test("parse_schedule: no days", () => {
    const parsed = ScheduleLogic.parse_schedule(schedule_no_days);
    expect((parsed[0])[0]).toBe(0.0);
    expect((parsed[1])[0]).toBe(0.0);
    expect((parsed[1])[0]).toBe(0.0);
});

test("parse_schedule: bad day", () => {
    const parsed = ScheduleLogic.parse_schedule(schedule_normal);
    expect((parsed[0])[0]).toBe(0.0);
    expect((parsed[1])[0]).toBe(8.5);
    expect((parsed[2])[0]).toBe(0.0);
});
