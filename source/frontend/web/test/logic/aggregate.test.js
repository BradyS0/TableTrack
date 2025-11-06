import {restaurantSearchByNameTags} from '../../js/logic/aggregate.js'

describe("restaurantSearchByNameTags", () => {

const restaurants = [
    {
      name: "Pizza Yum",
      tags: ["italian", "cheesy"],
    },
    {
      name: "Burger Town",
      tags: ["american", "fastfood"],
    },
    {
      name: "Sushi Zen",
      tags: ["japanese", "seafood"],
    },
  ];

const falseRestaurants = [
    {naam: "Pizza Yum", tag: ["american", "teez-food"]},
    {naam: "Pizza Two", tag: ["yellow"]}
]

 test("returns restaurants that match name (case-insensitive)", () => {
    const result = restaurantSearchByNameTags("pizza", restaurants);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Pizza Yum");
  });

  test("returns restaurants that match tag (case-insensitive)", () => {
    const result = restaurantSearchByNameTags("cheesy", restaurants);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Pizza Yum");
  });

  test("matches multiple results if several names or tags match", () => {
    const result = restaurantSearchByNameTags("a", restaurants); // matches many
    expect(result.length).toBeGreaterThan(1);
  });

  test("returns empty array if no matches found", () => {
    const result = restaurantSearchByNameTags("steak", restaurants);
    expect(result).toEqual([]);
  });

  test("ignores case for both name and tags", () => {
    const result1 = restaurantSearchByNameTags("BURGER", restaurants);
    const result2 = restaurantSearchByNameTags("ITALIAN", restaurants);
    expect(result1[0].name).toBe("Burger Town");
    expect(result2[0].name).toBe("Pizza Yum");
  });

  // Error-handling and invalid input tests
  test("returns empty array when restaurants is not an array", () => {
    expect(restaurantSearchByNameTags("pizza", null)).toEqual([]);
    expect(restaurantSearchByNameTags("pizza", {})).toEqual([]);
    expect(restaurantSearchByNameTags("pizza", undefined)).toEqual([]);
  });

   // Error-handling and invalid input tests
  test("returns empty array when restaurants is an array but the restaurant structure is not as expected", () => {
    expect(restaurantSearchByNameTags("pizza", falseRestaurants)).toEqual([]);
  });

  test("returns empty array when search_by is empty or not a string", () => {
    expect(restaurantSearchByNameTags("", restaurants)).toEqual([]);
    expect(restaurantSearchByNameTags(null, restaurants)).toEqual([]);
    expect(restaurantSearchByNameTags(undefined, restaurants)).toEqual([]);
  });
});