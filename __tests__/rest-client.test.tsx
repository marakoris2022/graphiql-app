import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/renderWithProvider";
import { MainForm } from "@/app/components/REST/MainForm";
import { ResultBlock } from "@/app/components/REST/components/ResultBlock";
import { ErrorBlock } from "@/app/components/REST/components/ErrorBlock";

test("REST MainForm / ResultBlock render 'Endpoint URL'", async () => {
  renderWithProvider(
    <>
      <MainForm />

      <ResultBlock
        title={"test Title"}
        responseData={"test response"}
        statusCode={"200"}
      />

      <ErrorBlock errorText="Error Text" />
    </>
  );

  // Check if the text is present in the document
  const element = await screen.findAllByText("Endpoint URL");
  expect(element[0]).not.toBeNull();
});
