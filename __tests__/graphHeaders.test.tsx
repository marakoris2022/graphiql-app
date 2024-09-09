import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/testUtils";
import Headers from "@/app/GRAPHQL/components/headers/Headers";

test("Headers render 'Request Headers'", async () => {
  // Mock window.location.search for the test
  Object.defineProperty(window, "location", {
    writable: true,
    value: {
      search: "?key=value",
    },
  });

  renderWithProvider(<Headers />);

  // Check if the text is present in the document
  const element = await screen.findByText("Request Headers");
  expect(element).not.toBeNull();
});
