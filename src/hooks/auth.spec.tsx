import { act, renderHook } from "@testing-library/react-hooks";
import { AuthProvider } from "../contexts/AuthContext";
import { useAuth } from "./useAuth";

jest.mock("expo-auth-session", () => {
  return {
    startAsync: () => {
      return {
        type: "success",
        params: {
          access_token: "google-token",
        },
      };
    },
  };
});

describe("Auth Hook", () => {
  it("Google account login", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: `userInfo.id`,
            email: `userInfo.email`,
            name: `userInfo.given_name`,
            photo: `userInfo.picture`,
          }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() => result.current.signInWithGoggle());

    expect(result.current.user).toBeTruthy();
  });
});
