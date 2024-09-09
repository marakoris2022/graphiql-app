import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/renderWithProvider";
import Headers from "@/app/GRAPHQL/components/headers/Headers";

test("Headers render '123'", async () => {
  renderWithProvider(<Headers />);

  // Check if the text is present in the document
  const element = await screen.findByText("Request Headers");
  expect(element).not.toBeNull();
});
