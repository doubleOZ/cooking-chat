import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/Button";
import { useState } from "react";

const mockText = "text";

describe("Button", () => {
  describe("Render", () => {
    it("should render a button", () => {
      render(<Button></Button>); // ARRANGE

      const button = screen.getByRole("button"); // ACT

      expect(button).toBeInTheDocument(); // ASSERT
    });

    it('should render a button with "text" inside', () => {
      render(<Button>{mockText}</Button>); // ARRANGE

      const button = screen.getByRole("button", { name: "text" }); // ACT

      expect(button).toBeInTheDocument(); // ASSERT
    });

    it("should be in the ghost styling", () => {
      const { container } = render(<Button variant={"ghost"}></Button>); // ARRANGE

      expect(container.firstChild).toHaveClass(
        "bg-transparent hover:text-slate-900 hover:bg-slate-200"
      ); // ASSERT
    });
  });
});

// describe("Behavior", () => {
//   it('should be disabled when pressed', async () => {
//     const [isLoading, setIsLoading] = useState(false)
//     render(<Button disabled={isLoading}></Button>); // ARRANGE

//     const button = screen.getByRole("button"); // ACT
//     await userEvent.click(button)
//     expect(button).(); // ASSERT
//   });
// });
