import { expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/renderWithProvider";
import { HeaderContainer } from "@/app/components/Header/HeaderContainer";
import { HeaderLoggedUser } from "@/app/components/HeaderTemplates/HeaderLoggedUser";
import { HeaderUnLoggedUser } from "@/app/components/HeaderTemplates/HeaderUnLoggedUser";
import { Header } from "@/app/components/Header/Header";

test("Header render 'HeaderLoggedUser'", async () => {
  renderWithProvider(
    <HeaderContainer>
      <HeaderLoggedUser />
    </HeaderContainer>
  );

  // Check if the text is present in the document
  const element = await screen.findByText("English");
  expect(element).not.toBeNull();
});

test("Header render 'HeaderUnLoggedUser'", async () => {
  renderWithProvider(
    <HeaderContainer>
      <HeaderUnLoggedUser />
    </HeaderContainer>
  );

  // Check if the text is present in the document
  const element = await screen.findAllByText("English");
  expect(element[0]).not.toBeNull();
});
