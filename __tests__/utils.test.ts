import { describe, it, expect, vi } from "vitest";
import {
  encodeBase64,
  decodeBase64,
  stringToJSONString,
  replaceVariables,
  generateHeaders,
  generateURL,
  saveRequestToLS,
  formatTimestamp,
  FormData,
} from "../app/[...rest]/utils";

describe("Utility Functions", () => {
  it("encodeBase64 should correctly encode a string", () => {
    expect(encodeBase64("test")).toBe("dGVzdA==");
  });

  it("decodeBase64 should correctly decode a base64 string", () => {
    expect(decodeBase64("dGVzdA==")).toBe("test");
  });

  it("stringToJSONString should convert a string to a JSON string", () => {
    expect(stringToJSONString("{name: 'John', age: 30}")).toBe(
      '{\n  "name": "John",\n  "age": 30\n}'
    );
  });

  it("replaceVariables should replace variables in a string", () => {
    expect(replaceVariables("Hello {{name}}!", [["name", "World"]])).toBe(
      'Hello "World"!'
    );
  });

  it("generateHeaders should generate header query string from headers object", () => {
    const headers = {
      headerKey_0: "Content-Type",
      headerValue_0: "application/json",
      headerKey_1: "Authorization",
      headerValue_1: "Bearer token",
    };
    expect(generateHeaders(headers)).toBe(
      "Content-Type=application%2Fjson&Authorization=Bearer%20token"
    );
  });

  it("generateURL should generate a URL from FormData", () => {
    // Mock localStorage
    const mockLocalStorage: Partial<Storage> = {
      getItem: vi.fn().mockReturnValue(JSON.stringify([["key", "value"]])),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };

    global.localStorage = mockLocalStorage as Storage;

    const formData = {
      method: "POST",
      EndpointURL: "/api/test",
      body: '{"key":"value"}',
      headerKey_0: "Content-Type",
      headerValue_0: "application/json",
      headerKey_1: "Authorization",
      headerValue_1: "Bearer token",
    };

    const expectedURL =
      "/POST/" +
      encodeBase64("/api/test") +
      "/" +
      encodeBase64('{"key":"value"}') +
      "?Content-Type=application%2Fjson&Authorization=Bearer%20token";
    expect(generateURL(formData)).toBe(expectedURL);
  });

  it("formatTimestamp should format a timestamp correctly", () => {
    const timestamp = new Date("2024-09-07T12:34:56Z").getTime();
    const formatted = formatTimestamp(timestamp);
    expect(formatted).toBe("07.09.2024 15:34:56"); // Adjust based on your local time zone
  });
});
