import { toastContainerConfig } from "@/utils/utils";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "react-toastify";
import { vi } from "vitest";

const mockMessages = {
  Home: "Home",
};

const mockLocale = "en";

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => "/mocked-pathname",
    useSearchParams: () => ({
      keys: () => ["key1", "key2"].values(), // Mock `keys` method
      get: (key: string) => `mocked-${key}`,
      toString: () => "mocked-search-params",
    }),
  };
});

export function renderWithProvider(children: React.ReactNode) {
  return render(
    <NextIntlClientProvider messages={mockMessages} locale={mockLocale}>
      <main>{children}</main>
      <ToastContainer {...toastContainerConfig} />
    </NextIntlClientProvider>
  );
}
