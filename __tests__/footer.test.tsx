import { Footer } from "@/app/components/Footer/Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  it("renders a heading", () => {
    render(<Footer />);
    const heading = screen.getByText("Marakoris2022");
    expect(heading).toBeInTheDocument();
  });
});
