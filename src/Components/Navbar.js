import React, { useState, useRef, useEffect } from "react";
import NavMenu from '../Assets/icons_FEtask/Display.svg';
import Drop from '../Assets/icons_FEtask/down.svg';

const Navbar = ({ grouping: propGrouping, setGrouping, ordering: propOrdering, setOrdering, call }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initialGrouping = localStorage.getItem("grouping") || propGrouping;
  const initialOrdering = localStorage.getItem("ordering") || propOrdering;

  const [grouping, setLocalGrouping] = useState(initialGrouping);
  const [ordering, setLocalOrdering] = useState(initialOrdering);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    setGrouping(grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
    setOrdering(ordering);
  }, [ordering]);

  const handleGrouping = (event) => {
    const newValue = event.target.value;
    localStorage.setItem("grouping", newValue);
    setGrouping(newValue);
    if (newValue === "users") {
      call();
    }
  };

  const handleOrdering = (event) => {
    const newValue = event.target.value;
    localStorage.setItem("ordering", newValue);
    setOrdering(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Navbar">
      <div className="dropdown-container" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
          <img src={NavMenu} alt="NavMenu" />
          <div className="btn-txt">Display</div>
          <img src={Drop} alt="Drop" />
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div className="Grouping">
              <label>Grouping</label>
              <select value={propGrouping} onChange={handleGrouping}>
                <option value="status">Status</option>
                <option value="users">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="Ordering">
              <label>Ordering</label>
              <select value={propOrdering} onChange={handleOrdering}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;