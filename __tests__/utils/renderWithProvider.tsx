import { toastContainerConfig } from "@/utils/utils";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "react-toastify";

const mockMessages = {
  Home: "Home",
};

const mockLocale = "en";

export function renderWithProvider(children: React.ReactNode) {
  return render(
    <NextIntlClientProvider messages={mockMessages} locale={mockLocale}>
      <main>{children}</main>
      <ToastContainer {...toastContainerConfig} />
    </NextIntlClientProvider>
  );
}
