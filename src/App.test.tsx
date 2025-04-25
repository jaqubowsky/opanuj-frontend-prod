import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("@featurevisor/react");

import { useFlag, useStatus } from "@featurevisor/react";

const mockedUseFlag = vi.mocked(useFlag);
const mockedUseStatus = vi.mocked(useStatus);

describe("App Component", () => {
  beforeEach(() => {
    mockedUseStatus.mockReturnValue({ isReady: true });
  });

  describe("when feature flag is enabled", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockedUseFlag.mockReturnValue(true);
      mockedUseStatus.mockReturnValue({ isReady: true });
    });

    it("renders the main headings and logos", () => {
      render(<App />);
      expect(screen.getByText("Vite + React")).toBeInTheDocument();
      expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
      expect(screen.getByAltText("React logo")).toBeInTheDocument();
    });

    it("has working logo links with correct URLs", () => {
      render(<App />);
      const viteLink = screen.getByRole("link", { name: /vite logo/i });
      const reactLink = screen.getByRole("link", { name: /react logo/i });
      expect(viteLink).toHaveAttribute("href", "https://vite.dev");
      expect(reactLink).toHaveAttribute("href", "https://react.dev");
    });

    it("handles counter increment correctly", () => {
      render(<App />);
      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("count is 0");
      fireEvent.click(button);
      expect(button).toHaveTextContent("count is 1");
      fireEvent.click(button);
      expect(button).toHaveTextContent("count is 2");
    });

    it("renders the HMR instruction text", () => {
      render(<App />);
      expect(screen.getByText(/Edit/i)).toBeInTheDocument();
      expect(
        screen.getByText("src/App.tsx", { selector: "code" })
      ).toBeInTheDocument();
      expect(screen.getByText(/and save to test HMR/i)).toBeInTheDocument();
    });

    it("renders the documentation link text", () => {
      render(<App />);
      expect(
        screen.getByText(/Click on the Vite and React logos to learn more/i)
      ).toBeInTheDocument();
    });
  });

  describe("when feature flag is disabled", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockedUseFlag.mockReturnValue(false);
      mockedUseStatus.mockReturnValue({ isReady: true });
    });

    it("does not render the counter button", () => {
      render(<App />);
      const button = screen.queryByRole("button", { name: /count is/i });
      expect(button).not.toBeInTheDocument();
    });

    it("renders the main headings and logos", () => {
      render(<App />);
      expect(screen.getByText("Vite + React")).toBeInTheDocument();
      expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
      expect(screen.getByAltText("React logo")).toBeInTheDocument();
    });
  });
});
