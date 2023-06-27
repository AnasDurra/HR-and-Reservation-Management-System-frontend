import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VacancyCard from "./VacancyCard";

describe("VacancyCard", () => {
  it("should display all props correctly", () => {
    const props = {
      department: "HR",
      vacancyName: "Assistant",
      vacancyDescription: "Manager assistant",
      vacancyCount: 5,
      onDepartmentClick: () => {},
      onVacancyNameClick: () => {},
    };
    render(<VacancyCard {...props} />);

    const departmentElement = screen.getByText(props.department);
    const vacancyNameElement = screen.getByText(props.vacancyName);
    const vacancyDescriptionElement = screen.getByText(
      props.vacancyDescription
    );
    const vacancyCountElement = screen.getByText(props.vacancyCount);

    expect(departmentElement.textContent).toEqual(props.department);
    expect(vacancyNameElement.textContent).toEqual(props.vacancyName);
    expect(vacancyDescriptionElement.textContent).toEqual(
      props.vacancyDescription
    );
    expect(vacancyCountElement.textContent).toEqual(
      props.vacancyCount.toString()
    );
  });
});
