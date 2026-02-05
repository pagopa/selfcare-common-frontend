import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import FilterModal, { FilterModalConfig } from '../FilterModal';
import './../../../examples/locale';

vi.mock('i18next-browser-languagedetector');

const data = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
];

const filterModalConfig: FilterModalConfig<{ id: string; label: string }, string> = {
  data,
  getLabel: (e) => e.label,
  getValue: (e) => e.id,
  onFilterChange: vi.fn(),
};

describe('FilterModal Component', () => {
  test('should display the radio buttons with the correct labels', () => {
    render(
      <FilterModal
        open={true}
        handleClose={() => {}}
        title="Test Title"
        filterModalConfig={filterModalConfig}
      />
    );
    data.forEach((item) => {
      expect(screen.getByLabelText(item.label)).not.toBeNull();
    });
  });

  test('should call onFilterChange with the correct value when a radio button is selected and the button is clicked', () => {
    render(
      <FilterModal
        open={true}
        handleClose={() => {}}
        title="Test Title"
        filterModalConfig={filterModalConfig}
      />
    );
    fireEvent.click(screen.getByLabelText('Option 2'));
    fireEvent.click(screen.getByText('Filtra'));
    expect(filterModalConfig.onFilterChange).toHaveBeenCalledWith(data[1]);
  });

  test('should call handleClose when the apply filter button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <FilterModal
        open={true}
        handleClose={handleClose}
        title="Test Title"
        filterModalConfig={filterModalConfig}
      />
    );
    fireEvent.click(screen.getByLabelText('Option 2'));
    fireEvent.click(screen.getByText('Filtra'));
    expect(handleClose).toHaveBeenCalled();
  });
});
