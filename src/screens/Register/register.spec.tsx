import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components/native";
import { Register } from ".";
import { AuthProvider } from "../../contexts/AuthContext";
import theme from "../../global/styles/theme";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}

describe("Register Screen", () => {
  it("shoul by open category modal when user clickon button", async () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");

    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
