import AuthForm from "@/components/AuthForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Session } from "next-auth";
import client, { useSession } from "next-auth/react";

const mockSession: Session = {
  user: {
    name: "Gordon Ramsey",
    email: "ramsey@hotelnightmares.com",
    image: "https://avatars.githubusercontent.com/u/88427234?v=4",
  },
  expires: "2023-10-19T10:46:33.198Z",
};

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    user: {
      name: "Gordon Ramsey",
      email: "ramsey@hotelnightmares.com",
      image: "https://avatars.githubusercontent.com/u/88427234?v=4",
    },
    expires: "2023-10-19T10:46:33.198Z",
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe("AuthForm", () => {
  it("should contain a button", async () => {
    render(<AuthForm />); // ACT

    const button = screen.getByRole("Button");
    expect(button).toBeInTheDocument(); // ASSERT
  });
  //   it('should have "Open a chat or start a new conversation" text', () => {
  //     render(<NoOpenChat title="Open a chat or start a new conversation" />); // ARRANGE

  //     const myElem = screen.getByText("Open a chat or start a new conversation"); // ACTION

  //     expect(myElem).toBeInTheDocument(); // ASSERT
  //   });
});
