
import FloorplanLogic from "../../logic/floorplanLogic";

// -------------------------------------------------- validate_position

test("VALID: Valid position is sent", () => {
    expect(FloorplanLogic.validate_position({x: 10.5, y: 20})).toEqual(true);
});

test("INVALID: Null position is sent", () => {
    expect(() => FloorplanLogic.validate_position(null)).toThrow("Position cannot be null");
});

test("INVALID: Position contains string", () => {
    expect(() => FloorplanLogic.validate_position({x: 10.5, y: "word"})).toThrow("Invalid position type");
});

// -------------------------------------------------- validate_walls

test("VALID: Valid array of walls", () => {
    expect(FloorplanLogic.validate_walls([{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}])).toEqual(true);
});

test("INVALID: Null array is sent", () => {
    expect(() => FloorplanLogic.validate_walls(null)).toThrow("Atleast 3 walls must be given");
});

test("INVALID: Short array is sent", () => {
    expect(() => FloorplanLogic.validate_walls([{x:0, y:0}, {x:1, y:0}])).toThrow("Atleast 3 walls must be given");
});

test("INVALID: Invalid wall in array", () => {
    expect(() => FloorplanLogic.validate_walls([{x:0, y:0}, "word", {x:1, y:1}, {x:0, y:1}])).toThrow("Invalid position type");
});

// -------------------------------------------------- validate_type

test("VALID: Valid type given", () => {
    expect(FloorplanLogic.validate_type("Window")).toEqual(true);
});

test("INVALID: Type is null", () => {
    expect(() => FloorplanLogic.validate_type(null)).toThrow("A type must be given");
});

test("INVALID: Type has length 0", () => {
    expect(() => FloorplanLogic.validate_type("")).toThrow("A type must be given");
});

// -------------------------------------------------- validate_rotation

test("VALID: Valid rotation given", () => {
    expect(FloorplanLogic.validate_rotation(180)).toEqual(true);
});

test("INVALID: Rotation is null", () => {
    expect(() => FloorplanLogic.validate_rotation(null)).toThrow("Invalid rotation type");
});

test("INVALID: Rotation is a string", () => {
    expect(() => FloorplanLogic.validate_rotation("word")).toThrow("Invalid rotation type");
});

test("INVALID: Rotation over 360", () => {
    expect(() => FloorplanLogic.validate_rotation(400)).toThrow("Rotation exceeds 360 degrees");
});

// -------------------------------------------------- validate_data

test("VALID: Valid data is given", () => {
    expect(FloorplanLogic.validate_data({})).toEqual(true);
});

test("INVALID: Data is null", () => {
    expect(() => FloorplanLogic.validate_data(null)).toThrow("Data cannot be null");
});

// -------------------------------------------------- validate_table_data

test("VALID: Valid table data given", () => {
    expect(FloorplanLogic.validate_table_data({capacity:5, reservable:true})).toEqual(true);
});

test("INVALID: Data is null", () => {
    expect(() => FloorplanLogic.validate_table_data(null)).toThrow("Data cannot be null");
});

test("INVALID: Capacity is null", () => {
    expect(() => FloorplanLogic.validate_table_data({capacity:null, reservable:true})).toThrow("Invalid capacity type");
});

test("INVALID: Capacity is a string", () => {
    expect(() => FloorplanLogic.validate_table_data({capacity:"word", reservable:true})).toThrow("Invalid capacity type");
});

test("INVALID: Capacity is below 1", () => {
    expect(() => FloorplanLogic.validate_table_data({capacity:0, reservable:true})).toThrow("Capacity must be atleast 1");
});

test("INVALID: Reservable is null", () => {
    expect(() => FloorplanLogic.validate_table_data({capacity:5, reservable:null})).toThrow("Invalid reservable type");
});

test("INVALID: Reservable is a string", () => {
    expect(() => FloorplanLogic.validate_table_data({capacity:5, reservable:"word"})).toThrow("Invalid reservable type");
});
