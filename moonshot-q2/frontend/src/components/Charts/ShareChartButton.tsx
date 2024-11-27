import React from "react";
import { generateShareableURL } from "../../utils/generate-shareable-url";
import { useAppSelector } from "../../redux/hooks";

const ShareChartButton: React.FC = () => {
    const filters = useAppSelector((state) => state.dataset.filtersApplied)
    const handleShare = () => {
        const shareableURL = generateShareableURL(filters);
        console.log(shareableURL)
        navigator.clipboard.writeText(shareableURL);
    };

    return (
        <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleShare}
        >
            Share Chart
        </button>
    );
};

export default ShareChartButton;