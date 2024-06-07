import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChoreForm from '../src/routes/ChoreForm';

describe("ChoreForm Component", () => {
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    render(<ChoreForm handleSubmit={mockHandleSubmit} />);
  });

  test("renders form fields correctly", () => {
    expect(screen.getByLabelText(/Chore/i)).toBeTruthy();
    expect(screen.getByLabelText(/Roommate/i)).toBeTruthy();
    expect(screen.getByLabelText(/Day/i)).toBeTruthy();
    expect(screen.getByText(/Add Chore/i)).toBeTruthy();
  });

  test("updates chore input value correctly", () => {
    const choreInput = screen.getByLabelText(/Chore/i);
    fireEvent.change(choreInput, { target: { value: "Dishes" } });
    expect(choreInput.value).toBe("Dishes");
  });

  test("updates roommate input value correctly", () => {
    const roommateInput = screen.getByLabelText(/Roommate/i);
    fireEvent.change(roommateInput, { target: { value: "John" } });
    expect(roommateInput.value).toBe("John");
  });

  test("updates day select value correctly", () => {
    const daySelect = screen.getByLabelText(/Day/i);
    fireEvent.change(daySelect, { target: { value: "Monday" } });
    expect(daySelect.value).toBe("Monday");
  });

  test("submits form with correct data", () => {
    fireEvent.change(screen.getByLabelText(/Chore/i), { target: { value: "Dishes" } });
    fireEvent.change(screen.getByLabelText(/Roommate/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/Day/i), { target: { value: "Monday" } });

    fireEvent.click(screen.getByText(/Add Chore/i));

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      chore: "Dishes",
      roommate: "John",
      day: "Monday",
    });
    expect(screen.getByLabelText(/Chore/i).value).toBe("");
    expect(screen.getByLabelText(/Roommate/i).value).toBe("");
    expect(screen.getByLabelText(/Day/i).value).toBe("");
  });
});
