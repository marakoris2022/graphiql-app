// Import the functions to be tested
// import { createQuery, createSDLQuery } from "./path-to-your-file"; // Adjust the import as per your file structure

import { createQuery } from "@/lib/actions/form.actions";
import { createSDLQuery } from "@/lib/actions/form.actions";

// Mock the fetch function globally
global.fetch = jest.fn();

// Test cases for createQuery
describe("createQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if endpointURL is missing", async () => {
    const formData = new FormData();
    formData.set("query", "sample query");

    const result = await createQuery(
      {
        title: "",
        status: null,
        message: "",
      },
      formData
    );
    expect(result).toEqual({
      title: "Error",
      status: null,
      message: "Endpoint is required",
    });
  });

  it("should throw an error if query is missing", async () => {
    const formData = new FormData();
    formData.set("endpointURL", "https://example.com/graphql");

    const result = await createQuery(
      {
        title: "",
        status: null,
        message: "",
      },
      formData
    );
    expect(result).toEqual({
      title: "Error",
      status: null,
      message: "Body of GraphQL Query is required",
    });
  });

  it("should return error if variables are in an invalid JSON format", async () => {
    const formData = new FormData();
    formData.set("endpointURL", "https://example.com/graphql");
    formData.set("query", "sample query");
    formData.set("variables", "invalid json");

    const result = await createQuery(
      {
        title: "",
        status: null,
        message: "",
      },
      formData
    );
    expect(result).toEqual({
      title: "Error",
      status: null,
      message: "Invalid JSON format for variables.",
    });
  });

  it("should handle 500 server error", async () => {
    const formData = new FormData();
    formData.set("endpointURL", "https://example.com/graphql");
    formData.set("query", "sample query");

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 500,
      text: jest.fn().mockResolvedValue("Server Error"),
    });

    const result = await createQuery(
      {
        title: "",
        status: null,
        message: "",
      },
      formData
    );
    expect(result).toEqual({
      title: "Response",
      status: 500,
      message: "Server Error",
    });
  });

  it("should handle successful response", async () => {
    const formData = new FormData();
    formData.set("endpointURL", "https://example.com/graphql");
    formData.set("query", "sample query");

    const mockResponseData = { data: { id: 1 } };
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponseData),
    });

    const result = await createQuery(
      {
        title: "",
        status: null,
        message: "",
      },
      formData
    );
    expect(result).toEqual({
      title: "Response",
      status: 200,
      message: JSON.stringify(mockResponseData, null, 2),
    });
  });
});

// Test cases for createSDLQuery
describe("createSDLQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error on 500 server error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 500,
      text: jest.fn().mockResolvedValue("Internal Server Error"),
    });

    await expect(createSDLQuery("https://example.com/graphql")).rejects.toThrow(
      "500 Internal Server Error"
    );
  });

  it("should throw error on 400 client error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 400,
      statusText: "Bad Request",
    });

    await expect(createSDLQuery("https://example.com/graphql")).rejects.toThrow(
      "Client Error: 400 Bad Request"
    );
  });

  it("should throw error if the response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 404,
      ok: false,
      statusText: "Not Found",
    });

    await expect(createSDLQuery("https://example.com/graphql")).rejects.toThrow(
      "Client Error: 404 Not Found"
    );
  });

  it("should return SDL query data on success", async () => {
    const mockSDLData = { __schema: { types: [] } };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ data: mockSDLData }),
    });

    const result = await createSDLQuery("https://example.com/graphql");
    expect(result).toEqual(mockSDLData);
  });
});
