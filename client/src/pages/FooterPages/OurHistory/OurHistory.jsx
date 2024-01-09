import React from 'react';
import StorySection from './ourHistoryComponents/StorySection';
import MissionSection from './ourHistoryComponents/MissionSection';
import DifferentiatorSection from './ourHistoryComponents/DifferentiatorSection';
import "./history.scss";
const History = () => {
    return (
        <div className="historycontainer">
            <div className="historyheader">
                <h1>OUR HISTORY</h1>

            </div>
            <StorySection />
            <MissionSection />
            <DifferentiatorSection />
        </div>
    );
};

export default History;
