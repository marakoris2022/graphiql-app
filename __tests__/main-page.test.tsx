import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { MainUnLoggedUser } from "@/app/components/MainTemplates/MainUnLoggedUser";
import { renderWithProvider } from "./utils/renderWithProvider";

test('MainUnLoggedUser displays "mainUnLoggedUser.title"', async () => {
  renderWithProvider(<MainUnLoggedUser />);

  // Check if the text is present in the document
  const element = await screen.findByText("Welcome!");
  expect(element).not.toBeNull();
});
