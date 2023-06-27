import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import DepartmentModal from './DepartmentModal';
import { it } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
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
  const arabicTextMatcher = (content, element) => {
    const regex = new RegExp(content, 'u'); // 'u' flag for Unicode support
    const elementText = element.textContent;
    return regex.test(elementText);
  };

describe('DepartmentModal', () => {
  it('calls handleCancel callback when cancel button is clicked', () => {
    const handleCancel = vi.fn();
    render(<DepartmentModal open={true} handleCancel={handleCancel} />);
    fireEvent.click(screen.getByText('إلغاء'));
    expect(handleCancel).toHaveBeenCalled();
  });
});
