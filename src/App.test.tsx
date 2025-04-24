import { FeaturevisorProvider } from "@featurevisor/react";
import { createInstance, FeaturevisorInstance } from "@featurevisor/sdk";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

const renderAppWithFeaturevisor = (sdk: FeaturevisorInstance) => {
  return render(
    <FeaturevisorProvider instance={sdk}>
      <App />
    </FeaturevisorProvider>
  );
};

const DATAFILE_URL = `${import.meta.env.VITE_FEATUREVISOR_DATAFILE_URL}/${
  import.meta.env.VITE_ENV_NAME
}/datafile-tag-all.json`;

describe("App Component", () => {
  let defaultSdk: FeaturevisorInstance;

  beforeEach(() => {
    defaultSdk = createInstance({
      initialFeatures: {
        showSetCountButton: { enabled: false },
      },
      datafileUrl: DATAFILE_URL,
    });
  });

  it("renders the main headings and logos", () => {
    renderAppWithFeaturevisor(defaultSdk);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();
  });

  it("has working logo links with correct URLs", () => {
    renderAppWithFeaturevisor(defaultSdk);

    const viteLink = screen.getByRole("link", { name: /vite logo/i });
    const reactLink = screen.getByRole("link", { name: /react logo/i });

    expect(viteLink).toHaveAttribute("href", "https://vite.dev");
    expect(reactLink).toHaveAttribute("href", "https://react.dev");
  });

  it("renders the HMR instruction text", () => {
    renderAppWithFeaturevisor(defaultSdk);

    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(
      screen.getByText("src/App.tsx", { selector: "code" })
    ).toBeInTheDocument();
    expect(screen.getByText(/and save to test HMR/i)).toBeInTheDocument();
  });

  it("renders the documentation link text", () => {
    renderAppWithFeaturevisor(defaultSdk);

    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i)
    ).toBeInTheDocument();
  });

  describe("when 'showSetCountButton' feature is enabled", () => {
    let sdkEnabled: FeaturevisorInstance;

    beforeEach(() => {
      sdkEnabled = createInstance({
        initialFeatures: {
          showSetCountButton: { enabled: true },
        },
        datafileUrl: DATAFILE_URL,
      });
    });

    it("renders the counter button", () => {
      renderAppWithFeaturevisor(sdkEnabled);
      expect(
        screen.getByRole("button", { name: /count is/i })
      ).toBeInTheDocument();
    });

    it("handles counter increment correctly", () => {
      renderAppWithFeaturevisor(sdkEnabled);

      const button = screen.getByRole("button", { name: /count is/i });
      expect(button).toHaveTextContent("count is 0");

      fireEvent.click(button);
      expect(button).toHaveTextContent("count is 1");

      fireEvent.click(button);
      expect(button).toHaveTextContent("count is 2");
    });
  });

  describe("when 'showSetCountButton' feature is disabled", () => {
    let sdkDisabled: FeaturevisorInstance;

    beforeEach(() => {
      sdkDisabled = createInstance({
        initialFeatures: {
          showSetCountButton: { enabled: false },
        },
        datafileUrl: DATAFILE_URL,
      });
    });

    it("does not render the counter button", () => {
      renderAppWithFeaturevisor(sdkDisabled);

      expect(
        screen.queryByRole("button", { name: /count is/i })
      ).not.toBeInTheDocument();
    });
  });
});
