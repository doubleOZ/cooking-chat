import NoOpenChat from "@/components/NoOpenChat";
import { render, screen } from "@testing-library/react";

describe("NoOpenChat", () => {
  it('should have "Open a chat or start a new conversation" text', () => {
    render(<NoOpenChat title="Open a chat or start a new conversation" />); // ARRANGE

    const myElem = screen.getByText("Open a chat or start a new conversation"); // ACTION

    expect(myElem).toBeInTheDocument(); // ASSERT
  });
  it('should have "This is a test" text', () => {
    render(<NoOpenChat title="This is a test" />); // ARRANGE

    const myElem = screen.getByRole("heading", {
      name: "This is a test",
    }); // ACTION

    expect(myElem).toBeInTheDocument(); // ASSERT
  });
});
// describe("AuthForm", () => {
//   it('should have "Sign in to get cooking!" text', () => {
//     render(<AuthForm />); // ARRANGE

//     const myElem = screen.getByText("Sign in to get cooking!"); // ACTION

//     expect(myElem).toBeInTheDocument(); // ASSERT
//   });
// });
// describe("Sidebar", () => {
//   it('should have "Sign in to get cooking!" text', () => {
//     render(<AuthForm />); // ARRANGE

//     const myElem = screen.getByText("Sign in to get cooking!"); // ACTION

//     expect(myElem).toBeInTheDocument(); // ASSERT
//   });
// });
