import { fireEvent, screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/testUtils";
import SchemaDocumentation from "@/app/GRAPHQL/components/schemaDocumentation/SchemaDocumentation";
import EndpointURL from "@/app/GRAPHQL/components/endpointUrl/EndpointURL";
import EndpointSDL from "@/app/GRAPHQL/components/endpointSDL/EndpointSDL";
import SubmitButton from "@/app/GRAPHQL/components/buttons/SubmitButton";
import SDLButton from "@/app/GRAPHQL/components/SDLButton/SDLButton";
import PrettifyButton from "@/app/GRAPHQL/components/buttons/PrettifyButton";
import ExplorerButton from "@/app/GRAPHQL/components/buttons/ExplorerButton";
import QuerySection from "@/app/GRAPHQL/components/querySection/QuerySection";
import VariablesSection from "@/app/GRAPHQL/components/variables/VariablesSection";
import GQLForm from "@/app/GRAPHQL/components/GqlForm/GQLForm";

jest.mock("react-dom", () => {
  const actual = jest.requireActual("react-dom");

  return {
    ...actual,
    useFormStatus: () => ({ pending: false }), // Mock for useFormStatus
  };
});

// test("SchemaDocumentation renders 'Error fetching schema'", async () => {
//   renderWithProvider(<SchemaDocumentation valueSDL={"a"} />);

//   const element = await screen.findByText("Error fetching schema");
//   expect(element).not.toBeNull();
// });

test("EndpointURL renders 'Endpoint URL:'", async () => {
  renderWithProvider(
    <EndpointURL
      setURL={() => {}}
      urlValue={"Endpoint URL:"}
      setOpen={() => {}}
    />
  );

  const element = await screen.findByText("Endpoint URL:");
  expect(element).not.toBeNull();
});

test("EndpointSDL renders 'Endpoint SDL:'", async () => {
  renderWithProvider(
    <EndpointSDL setSDL={() => {}} sdlValue={"SDL"} setOpen={() => {}} />
  );

  const element = await screen.findAllByText("Endpoint SDL:");
  expect(element[0]).not.toBeNull();
});

// Update the SubmitButton test
test("SubmitButton renders with correct text based on pending state", async () => {
  renderWithProvider(<SubmitButton />);

  // Check for 'Submit' text
  let element = await screen.findByText("Submit");
  expect(element).not.toBeNull();
});

test("SDLButton renders 'Get Schema'", async () => {
  renderWithProvider(
    <SDLButton
      open={false}
      setOpen={() => {}}
      endpointURL={"a"}
      endpointSDL={"b"}
      setErrors={() => {}}
      errors={{ a: "b" }}
    />
  );

  const element = await screen.findByText("Get Schema");
  expect(element).not.toBeNull();
});

test("PrettifyButton renders 'Prettify'", async () => {
  renderWithProvider(<PrettifyButton handler={() => {}} />);

  const element = await screen.findByText("Prettify");
  expect(element).not.toBeNull();
});

test("ExplorerButton renders 'Explorer'", async () => {
  renderWithProvider(<ExplorerButton showFn={() => {}} />);

  const element = await screen.findByText("Explorer");
  expect(element).not.toBeNull();
});

test("QuerySection renders and interacts correctly", async () => {
  // Render the component
  renderWithProvider(
    <QuerySection
      variables={`{ "Variables" : "Test Variables" }`}
      setQueryArea={() => {}}
      queryArea={`{ "Query" : "Test Query" }`}
    />
  );

  // Check if the text is rendered
  const element = await screen.findByText(`{ "Query" : "Test Query" }`);
  expect(element).not.toBeNull();

  // Check if the textarea is rendered
  const textarea: HTMLInputElement = screen.getByPlaceholderText("Query...");
  expect(textarea).not.toBeNull();

  // Check if the textarea value is correct
  expect(textarea.value).toBe(`{ "Query" : "Test Query" }`);

  // Simulate change event
  fireEvent.change(textarea, {
    target: { value: '{ "Query" : "Updated Query" }' },
  });

  // Simulate blur event
  fireEvent.blur(textarea);
  // You can add expectations for what should happen on blur if needed
});

test("VariablesSection renders 'Explorer'", async () => {
  renderWithProvider(
    <VariablesSection setVariables={() => {}} variables={"a=b"} />
  );

  const element = await screen.findByText("Variables");
  expect(element).not.toBeNull();
});

// test("GQLForm renders 'GQLForm'", async () => {
//   renderWithProvider(<GQLForm />);

//   const element = await screen.findByText("Explorer");
//   expect(element).not.toBeNull();
// });
