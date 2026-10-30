import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { XIcon, CheckIcon } from "@phosphor-icons/react";
import { trailFilters, blogFilters, resultsUrl } from "../lib/filters";
import "./FilterSheet.css";

/**
 * The "Filters" sheet that slides up from the bottom.
 * Opened from the filter icon in the search bar (topNav.jsx).
 *
 * Props:
 *  - onClose:         closes the sheet
 *  - initialTrails:   trail filters that are already ticked (optional)
 *  - initialBlogs:    blog filters that are already ticked (optional)
 */
export default function FilterSheet({ onClose, initialTrails = [], initialBlogs = [] }) {
  const navigate = useNavigate();
  const [trails, setTrails] = useState(initialTrails);
  const [blogs, setBlogs] = useState(initialBlogs);

  // Tick / untick one option in a list
  function toggle(list, setList, label) {
    setList(list.includes(label) ? list.filter((l) => l !== label) : [...list, label]);
  }

  function clearAll() {
    setTrails([]);
    setBlogs([]);
  }

  function showResults() {
    onClose();
    navigate(resultsUrl(trails, blogs));
  }

  // createPortal puts the sheet directly in <body>, so it sits on top of
  // everything (also the top and bottom nav)
  return createPortal(
    <div className="filter-sheet__backdrop" onClick={onClose}>
      <div
        className="filter-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="filter-sheet__header">
          <h2 id="filter-title" className="filter-sheet__title">Filters</h2>
          <button type="button" className="filter-sheet__clear" onClick={clearAll}>
            Clear all
          </button>
          <button type="button" className="filter-sheet__close" onClick={onClose} aria-label="Close filters">
            <XIcon size={20} />
          </button>
        </div>

        <FilterGroup
          title="Trails"
          options={trailFilters}
          selected={trails}
          onToggle={(label) => toggle(trails, setTrails, label)}
        />

        <hr className="filter-sheet__divider" />

        <FilterGroup
          title="Blogs"
          options={blogFilters}
          selected={blogs}
          onToggle={(label) => toggle(blogs, setBlogs, label)}
        />

        <button type="button" className="filter-sheet__show" onClick={showResults}>
          Show results
        </button>
      </div>
    </div>,
    document.body
  );
}

// One titled list of checkboxes
function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <fieldset className="filter-sheet__group">
      <legend className="filter-sheet__group-title">{title}</legend>
      {options.map(({ label }) => {
        const isOn = selected.includes(label);
        return (
          <button
            key={label}
            type="button"
            role="checkbox"
            aria-checked={isOn}
            className={isOn ? "filter-option filter-option--on" : "filter-option"}
            onClick={() => onToggle(label)}
          >
            <span className="filter-option__box">{isOn && <CheckIcon size={16} weight="bold" />}</span>
            {label}
          </button>
        );
      })}
    </fieldset>
  );
}
