import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/renderWithProvider";
import SignIn from "@/app/sign-in/page";
import SignUp from "@/app/sign-up/page";

test("SignIn render 'E-mail'", async () => {
  renderWithProvider(<SignIn />);

  // Check if the text is present in the document
  const element = await screen.findAllByText("E-mail");
  expect(element[0]).not.toBeNull();
});

test("SignUp render 'E-mail'", async () => {
  renderWithProvider(<SignUp />);

  // Check if the text is present in the document
  const element = await screen.findAllByText("E-mail");
  expect(element[0]).not.toBeNull();
});
