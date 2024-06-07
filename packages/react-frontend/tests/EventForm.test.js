import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventForm from '../src/routes/EventForm';

describe("EventForm Component", () => {
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    render(<EventForm handleSubmit={mockHandleSubmit} />);
  });

  test("renders form fields correctly", () => {
    expect(screen.getByLabelText(/Date/i)).toBeTruthy();
    expect(screen.getByLabelText(/Time/i)).toBeTruthy();
    expect(screen.getByLabelText(/Name/i)).toBeTruthy();
    expect(screen.getByLabelText(/Event/i)).toBeTruthy();
    expect(screen.getByLabelText(/Description/i)).toBeTruthy();
    expect(screen.getByText(/Add Event/i)).toBeTruthy();
  });

  test("updates date input value correctly", () => {
    const dateInput = screen.getByLabelText(/Date/i);
    fireEvent.change(dateInput, { target: { value: "2023-06-01" } });
    expect(dateInput.value).toBe("2023-06-01");
  });

  test("updates time input value correctly", () => {
    const timeInput = screen.getByLabelText(/Time/i);
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    expect(timeInput.value).toBe("12:00");
  });

  test("updates name input value correctly", () => {
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "Birthday Party" } });
    expect(nameInput.value).toBe("Birthday Party");
  });

  test("updates event input value correctly", () => {
    const eventInput = screen.getByLabelText(/Event/i);
    fireEvent.change(eventInput, { target: { value: "Party" } });
    expect(eventInput.value).toBe("Party");
  });

  test("updates description input value correctly", () => {
    const descriptionInput = screen.getByLabelText(/Description/i);
    fireEvent.change(descriptionInput, { target: { value: "John's 30th birthday" } });
    expect(descriptionInput.value).toBe("John's 30th birthday");
  });

  test("submits form with correct data", () => {
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: "2023-06-01" } });
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: "12:00" } });
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Birthday Party" } });
    fireEvent.change(screen.getByLabelText(/Event/i), { target: { value: "Party" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "John's 30th birthday" } });

    fireEvent.click(screen.getByText(/Add Event/i));

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      date: "2023-06-01",
      time: "12:00",
      name: "Birthday Party",
      event: "Party",
      description: "John's 30th birthday",
    });

    expect(screen.getByLabelText(/Date/i).value).toBe("");
    expect(screen.getByLabelText(/Time/i).value).toBe("");
    expect(screen.getByLabelText(/Name/i).value).toBe("");
    expect(screen.getByLabelText(/Event/i).value).toBe("");
    expect(screen.getByLabelText(/Description/i).value).toBe("");
  });
});
