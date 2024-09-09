import { screen } from "@testing-library/react";
import { renderWithProvider } from "./utils/testUtils";
import History from "@/app/history/page";
import HistoryItems from "@/app/components/HISTORY/HistoryItems";
import { HistoryPops } from "@/app/interface/interface";

const mockHistory: HistoryPops = [
  {
    Date: 1623456789000,
    EndpointURL: "/api/test",
    generatedURL: "http://example.com",
    method: "GET",
  },
];

const mockRemoveHistoryItem = jest.fn();

test("History render 'Request History'", async () => {
  renderWithProvider(<History />);

  // Check if the text is present in the document
  const element = await screen.findAllByText("Request History");
  expect(element[0]).not.toBeNull();
});

test("History render 'Request History'", async () => {
  renderWithProvider(
    <HistoryItems
      history={mockHistory}
      removeHistoryItem={mockRemoveHistoryItem}
    />
  );

  // Check if the text is present in the document
  const element = await screen.findAllByText("12.06.2021 03:13:09");
  expect(element[0]).not.toBeNull();
});
