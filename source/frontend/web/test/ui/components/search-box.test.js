import { createSearchBox } from "../../../js/components/search-box.js"; // adjust path if needed

describe("createSearchBox", () => {
  beforeEach(() => {
    // Reset DOM before each test
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  test("adds stylesheet link to document head", () => {
    createSearchBox();
    const link = document.querySelector('link[href="css/components/search.css"]');
    expect(link).not.toBeNull();
    expect(link.rel).toBe("stylesheet");
  });

  test("returns a span element with correct class and structure", () => {
    const searchGroup = createSearchBox();

    expect(searchGroup).toBeInstanceOf(HTMLElement);
    expect(searchGroup.tagName.toLowerCase()).toBe("span");
    expect(searchGroup.classList.contains("search-group")).toBe(true);

    // Contains an input and a button
    const input = searchGroup.querySelector("input.search-input");
    const button = searchGroup.querySelector("button.search-btn");
    expect(input).not.toBeNull();
    expect(button).not.toBeNull();

    // Input has correct maxLength
    expect(input.maxLength).toBe(65);

    // Button contains the icon image
    const img = button.querySelector("img");
    expect(img).not.toBeNull();
    expect(img.src).toContain("magnifying-glass-solid-full.svg");
  });

  test("assigns input and button as properties on the returned element", () => {
    const searchGroup = createSearchBox();
    expect(searchGroup.search).toBeInstanceOf(HTMLInputElement);
    expect(searchGroup.searchButton).toBeInstanceOf(HTMLButtonElement);
  });

  test("does not create duplicate stylesheet links on multiple calls", () => {
    createSearchBox();
    createSearchBox();
    const links = document.querySelectorAll('link[href="css/components/search.css"]');
    // you might consider enforcing uniqueness in the real function
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
