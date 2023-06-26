import React from "react";
import {
  render,
  fireEvent,
  getByLabelText,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Form } from "antd";
import DrivingLicense from "./DrivingLicense";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("DrivingLicense", () => {
  it("renders without crashing empty driver license", () => {
    const Wrapper = () => {
      const [form] = Form.useForm();
      return <DrivingLicense form={form} show={true} />;
    };

    const { getByText } = render(<Wrapper />);
    expect(getByText("لا يوجد شهادة قيادة مضافة")).toBeInTheDocument();
  });

  it("adds a driving license when the add button is clicked", () => {
    const Wrapper = () => {
      const [form] = Form.useForm();
      return <DrivingLicense form={form} show={true} editMode={true} />;
    };

    const { getByText } = render(<Wrapper />);
    fireEvent.click(getByText("إضافة شهادة"));
    // expect the driving license form to be displayed
    const drivingLicenseInput = screen.getByLabelText("نوع الشهادة");
    expect(drivingLicenseInput).toBeInTheDocument();
  });
});
