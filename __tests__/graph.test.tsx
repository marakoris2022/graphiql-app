// import { expect, test, vi } from "vitest";
// import { screen } from "@testing-library/react";
// import { renderWithProvider } from "./utils/renderWithProvider";
// import GraphiQLClient from "@/app/GRAPHQL/[[...slug]]/page";

// test("GraphiQLClient render 'Marakoris2022'", async () => {
//   // Mock react-dom if necessary or mock the correct module
//   vi.mock("react-dom", async () => {
//     const actualReactDom = await vi.importActual<any>("react-dom");

//     return {
//       ...actualReactDom,
//       useFormState: () => [
//         [
//           {
//             title: "",
//             status: null,
//             message: "",
//           },
//           vi.fn(), // Mock setState function
//         ],
//       ],
//       useFormStatus: () => ({ pending: false }),
//     };
//   });

//   // Mock window location search params
//   const mockSearchParams = new URLSearchParams("?param=value");
//   vi.stubGlobal("window", { location: { search: mockSearchParams.toString() } });

//   renderWithProvider(<GraphiQLClient />);

//   // Check if the text is present in the document
//   const element = await screen.findByText("Marakoris2022");
//   expect(element).not.toBeNull();
// });

import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/renderWithProvider";
import GraphiQLClient from "@/app/GRAPHQL/[[...slug]]/page";
import SchemaDocumentation from "@/app/GRAPHQL/components/schemaDocumentation/SchemaDocumentation";
import EndpointURL from "@/app/GRAPHQL/components/endpointUrl/EndpointURL";
import EndpointSDL from "@/app/GRAPHQL/components/endpointSDL/EndpointSDL";
import Headers from "@/app/GRAPHQL/components/headers/Headers";
import SubmitButton from "@/app/GRAPHQL/components/buttons/SubmitButton";
import SDLButton from "@/app/GRAPHQL/components/SDLButton/SDLButton";
import PrettifyButton from "@/app/GRAPHQL/components/buttons/PrettifyButton";
import ExplorerButton from "@/app/GRAPHQL/components/buttons/ExplorerButton";
import QuerySection from "@/app/GRAPHQL/components/querySection/QuerySection";

test("SchemaDocumentation render 'Error fetching schema'", async () => {
  renderWithProvider(<SchemaDocumentation valueSDL={"a"} />);

  // Check if the text is present in the document
  const element = await screen.findByText("Error fetching schema");
  expect(element).not.toBeNull();
});

test("EndpointURL render 'Marakoris2022'", async () => {
  renderWithProvider(
    <EndpointURL setURL={() => {}} urlValue={"a"} setOpen={() => {}} />
  );

  // Check if the text is present in the document
  const element = await screen.findByText("Error fetching schema");
  expect(element).not.toBeNull();
});

test("EndpointSDL render 'Error fetching schema'", async () => {
  renderWithProvider(
    <EndpointSDL setSDL={() => {}} sdlValue={"a"} setOpen={() => {}} />
  );

  // Check if the text is present in the document
  const element = await screen.findByText("Error fetching schema");
  expect(element).not.toBeNull();
});

// test("Headers render 'Marakoris2022'", async () => {
//   renderWithProvider(<Headers />);

//   // Check if the text is present in the document
//   const element = await screen.findByText("Error fetching schema");
//   expect(element).not.toBeNull();
// });

// test("SubmitButton render 'Error fetching schema'", async () => {
//   renderWithProvider(<SubmitButton />);

//   // Check if the text is present in the document
//   const element = await screen.findByText("Error fetching schema");
//   expect(element).not.toBeNull();
// });

test("SubmitButton render 'Error fetching schema'", async () => {
  renderWithProvider(
    <SDLButton
      open={false}
      setOpen={() => {}}
      endpointURL={"a"}
      endpointSDL={"b"}
      setErrors={() => {}}
    />
  );

  // Check if the text is present in the document
  const element = await screen.findByText("Error fetching schema");
  expect(element).not.toBeNull();
});

test("PrettifyButton render 'Error fetching schema'", async () => {
  renderWithProvider(<PrettifyButton handler={() => {}} />);

  // Check if the text is present in the document
  const element = await screen.findByText("Error fetching schema");
  expect(element).not.toBeNull();
});

test("PrettifyButton render 'Error fetching schema'", async () => {
  renderWithProvider(<ExplorerButton showFn={() => {}} />);

  // Check if the text is present in the document
  const element = await screen.findByText("Error fetching schema");
  expect(element).not.toBeNull();
});

test("PrettifyButton render 'Error fetching schema'", async () => {
  renderWithProvider(
    <QuerySection variables={"a"} setQueryArea={() => {}} queryArea={"a"} />
  );

  // Check if the text is present in the document
  const element = await screen.findByText("Error fetching schema");
  expect(element).not.toBeNull();
});
