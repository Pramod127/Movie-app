import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { ChevronDownCircleIcon, ChevronRightIcon } from "lucide-react";
import { toast } from "react-toastify";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleShowNow = () => {
    if (!selectedDate) {
      toast.error("कृपया पहले एक तारीख़ चुनें");
      return;
    }
    // ✅ अब सही route पर navigate करेगा
    navigate(`/movie/${id}/${selectedDate}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="dateselect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
        {/* Decorative Blur Circles */}
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0" />

        {/* Date Selection */}
        <div>
          <p className="text-lg font-semibold mb-3">Choose Date</p>

          <div className="flex items-center gap-6 text-sm -mt-2">
            <ChevronDownCircleIcon className="w-7 h-7 text-primary" />

            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => {
                const isSelected = selectedDate === date;
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-lg transition cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-gray-800 text-white hover:bg-primary/80"
                    }`}
                  >
                    <span className="text-lg font-bold">
                      {new Date(date).getDate()}
                    </span>
                    <span className="text-sm text-gray-300">
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </button>
                );
              })}
            </span>

            <ChevronRightIcon width={28} className="text-primary" />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleShowNow}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer font-medium"
          >
            {selectedDate
              ? `Show for ${new Date(selectedDate).toDateString()}`
              : "Show NOW"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelect;



