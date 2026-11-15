import { useState } from "react";
import {
  MdSchool,
  MdLocationOn,
  MdMenuBook,
  MdCallSplit,
  MdCheckCircle,
} from "react-icons/md";
import "./styles/Education.css";

interface RoadmapItem {
  id: string;
  year: string;
  status: string;
  isDualTrack?: boolean;
  tracks: {
    institution: string;
    location: string;
    degree: string;
    department?: string;
    note?: string;
    score?: string;
    tag: string;
  }[];
}

const educationRoadmap: RoadmapItem[] = [
  {
    id: "dual-degree-2025",
    year: "2025 – Present",
    status: "Active Concurrent Track",
    isDualTrack: true,
    tracks: [
      {
        institution: "Delhi Technological University (DTU)",
        location: "Delhi, India",
        degree: "BS-MS in Physics",
        department: "Department of Applied Physics",
        tag: "Core Physics Major",
      },
      {
        institution: "Indian Institute of Management (IIM) Bangalore",
        location: "Bangalore, India",
        degree: "BBA in Digital Business & Entrepreneurship",
        department: "Online Dual Degree Program",
        tag: "Digital Business & Ventures",
      },
    ],
  },
  {
    id: "iisc-2025",
    year: "2025",
    status: "Research Semester",
    tracks: [
      {
        institution: "Indian Institute of Science (IISc), Bangalore",
        location: "Bangalore, India",
        degree: "Bachelor of Science (Research)",
        department:
          "Intended Major: Earth & Environmental Science | Intended Minor: Materials Science",
        note: "Withdrew after the first semester to pursue Physics at DTU alongside the IIM Bangalore BBA.",
        tag: "Research Scholar (1 Semester)",
      },
    ],
  },
  {
    id: "kairali-2025",
    year: "2023 – 2025",
    status: "Completed",
    tracks: [
      {
        institution: "Kairali School, Dhurwa",
        location: "Ranchi, Jharkhand",
        degree: "12th Grade (CBSE)",
        department: "Physics, Chemistry, Mathematics + Computer Science",
        score: "84.46%",
        tag: "Senior Secondary",
      },
    ],
  },
  {
    id: "kv-hinoo-2023",
    year: "2021 – 2023",
    status: "Completed",
    tracks: [
      {
        institution: "PM SHRI Kendriya Vidyalaya, Hinoo (1st Shift)",
        location: "Ranchi, Jharkhand",
        degree: "10th Grade (CBSE)",
        department: "Core Foundations in Mathematics & Natural Sciences",
        score: "91.2%",
        tag: "Secondary School",
      },
    ],
  },
];

const Education = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<string>("dual-degree-2025");

  return (
    <section className="education-section section-container" id="education">
      <div className="education-container">
        {/* Section Header */}
        <div className="education-header">
          <h2 className="education-title">
            Academic <span>Path</span>
          </h2>
          <p className="education-subtitle">
            Year-wise roadmap in Physics, Quantitative Science &amp; Digital Business
          </p>
        </div>

        {/* Split Layout: Left Avatar Space & Right Roadmap */}
        <div className="education-split-layout">
          {/* Left Column: Clean space for 3D studying character */}
          <div className="education-avatar-spacer"></div>

          {/* Right Column: Year-Wise Graphic Roadmap */}
          <div className="education-roadmap-column">
            <div className="roadmap-path-container">
              {/* Minimal SVG Graphic Connecting Circuit */}
              <div className="roadmap-vertical-line">
                <div className="roadmap-line-glow"></div>
              </div>

              {/* Milestones Sequence */}
              <div className="roadmap-milestones-list">
                {educationRoadmap.map((milestone, idx) => {
                  const isSelected = selectedMilestone === milestone.id;

                  return (
                    <div
                      key={milestone.id}
                      className={`roadmap-step-item ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedMilestone(milestone.id)}
                      data-cursor="disable"
                    >
                      {/* Step Connector Node */}
                      <div className="step-connector">
                        <div className="step-node-dot">
                          <div className="node-inner-core"></div>
                        </div>
                        <span className="step-node-index">0{idx + 1}</span>
                      </div>

                      {/* Milestone Card Content */}
                      <div className="step-content-card">
                        <div className="card-header-bar">
                          <div className="step-year-pill">
                            <span>{milestone.year}</span>
                          </div>
                          <div className="step-status-chip">
                            {milestone.isDualTrack ? (
                              <MdCallSplit className="status-icon" />
                            ) : (
                              <MdCheckCircle className="status-icon" />
                            )}
                            <span>{milestone.status}</span>
                          </div>
                        </div>

                        {/* If Dual Track, display both tracks side by side or grouped */}
                        {milestone.isDualTrack ? (
                          <div className="dual-tracks-group">
                            {milestone.tracks.map((track, tIdx) => (
                              <div key={tIdx} className="dual-track-subcard">
                                <div className="track-sub-header">
                                  <div className="track-icon-bubble">
                                    <MdSchool />
                                  </div>
                                  <div className="track-titles">
                                    <h4 className="track-inst-name">{track.institution}</h4>
                                    <p className="track-loc">
                                      <MdLocationOn /> {track.location}
                                    </p>
                                  </div>
                                </div>
                                <div className="track-degree-box">
                                  <div className="degree-title-row">
                                    <MdMenuBook className="deg-icon" />
                                    <h5>{track.degree}</h5>
                                  </div>
                                  {track.department && (
                                    <p className="track-dept">{track.department}</p>
                                  )}
                                  <span className="track-tag-badge">{track.tag}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Single Track Milestone
                          <div className="single-track-wrapper">
                            {milestone.tracks.map((track, tIdx) => (
                              <div key={tIdx} className="single-track-inner">
                                <div className="track-sub-header">
                                  <div className="track-icon-bubble">
                                    <MdSchool />
                                  </div>
                                  <div className="track-titles">
                                    <h4 className="track-inst-name">{track.institution}</h4>
                                    <p className="track-loc">
                                      <MdLocationOn /> {track.location}
                                    </p>
                                  </div>
                                </div>

                                <div className="track-degree-box">
                                  <div className="degree-title-row">
                                    <MdMenuBook className="deg-icon" />
                                    <h5>{track.degree}</h5>
                                  </div>

                                  {track.department && (
                                    <p className="track-dept">{track.department}</p>
                                  )}

                                  {track.score && (
                                    <div className="track-score-pill">
                                      <span className="score-lbl">Score:</span>
                                      <span className="score-num">{track.score}</span>
                                    </div>
                                  )}

                                  {track.note && (
                                    <div className="track-withdrawal-note">
                                      <span className="note-star">●</span>
                                      <p>{track.note}</p>
                                    </div>
                                  )}

                                  <span className="track-tag-badge">{track.tag}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
