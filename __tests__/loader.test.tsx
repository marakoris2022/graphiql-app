import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/renderWithProvider";

import Loader from "@/app/components/Loader/Loader";

test("Loader render 'Loading...'", async () => {
  renderWithProvider(<Loader />);

  // Check if the text is present in the document
  const element = await screen.findByText("Loading...");
  expect(element).not.toBeNull();
});
