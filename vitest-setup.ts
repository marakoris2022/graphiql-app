import { createTranslator, useTranslations } from "next-intl";
import { Mock, vi, beforeAll } from "vitest";

vi.mock("next-intl", async () => {
  const actual = (await vi.importActual("next-intl")) as any;

  return {
    ...actual,
    useTranslations: vi.fn(),
    getTranslations: vi
      .fn()
      .mockResolvedValue((namespace: string) => (key: string) => key),
  };
});

beforeAll(async () => {
  const messages = (await import("./messages/en.json")).default;

  const translate = createTranslator({
    locale: "en",
    messages,
  });

  (useTranslations as Mock).mockImplementation((namespace: string) => {
    return (key: string) => translate(`${namespace}.${key}`);
  });
});
