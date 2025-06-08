"use client";
import React, { useEffect, useRef } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarBoxPopupProps {
  initialRange: Range;
  onClose: () => void;
  onSelectRange: (range: Range) => void;
}

export default function CalendarBoxPopup({
  initialRange,
  onClose,
  onSelectRange,
}: CalendarBoxPopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selected = ranges.selection;
    onSelectRange(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-20">
      <div
        ref={ref}
        className="bg-white rounded-xl shadow-xl p-4 w-[320px]"
      >
        <DateRange
          ranges={[initialRange]}
          onChange={handleSelect}
          rangeColors={["#f97316"]}
          showDateDisplay={false}
          moveRangeOnFirstSelection={false}
          editableDateInputs={true}
        />
      </div>
    </div>
  );
}
