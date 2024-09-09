import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/testUtils";
import { Footer } from "@/app/components/Footer/Footer";

test("Footer render 'Marakoris2022'", async () => {
  renderWithProvider(<Footer />);

  // Check if the text is present in the document
  const element = await screen.findByText("Marakoris2022");
  expect(element).not.toBeNull();
});
