import React, { useState } from 'react';
import { IoReorderThreeOutline } from 'react-icons/io5';
import {RiPencilLine} from 'react-icons/ri';
import Switch from 'react-switch';
import './App.css';

const SectionList = [
  {
    id: 1,
    name: 'Profile summary',
    description: 'Summary of your professional profile',
    enabled: true
  },
  {
    id: 2,
    name: 'Academic and Cocurricular Achievements',
    description: 'List of your academic and cocurricular achievements',
    enabled: true
  },
  {
    id: 3,
    name: 'Summer Internship Experience',
    description: 'Details of your summer internship experience',
    enabled: true
  },
  {
    id: 4,
    name: 'Work Experience',
    description: 'List of your work experience',
    enabled: true
  },
  {
    id: 5,
    name: 'Projects',
    description: 'Description of the projects you worked on',
    enabled: true
  },
  {
    id: 6,
    name: 'Certificates',
    description: 'List of your certificates and achievements',
    enabled: true
  },
  {
    id: 7,
    name: 'Leadership Positions',
    description: 'Details of any leadership positions you held',
    enabled: true
  },
  {
    id: 8,
    name: 'Extracurricular',
    description: 'List of your extracurricular activities',
    enabled: true
  },
  {
    id: 9,
    name: 'Education',
    description: 'Details of your education',
    enabled: true
  }
];

const App = () => {
  const [sections, setSections] = useState(SectionList);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('sectionId', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, id) => {
    const sectionId = e.dataTransfer.getData('sectionId');
    const newSections = [...sections];
    const draggedSectionIndex = newSections.findIndex(
      (section) => section.id.toString() === sectionId
    );
    const targetSectionIndex = newSections.findIndex(
      (section) => section.id.toString() === id
    );

    const draggedSection = newSections[draggedSectionIndex];
    newSections.splice(draggedSectionIndex, 1);
    newSections.splice(targetSectionIndex, 0, draggedSection);

    setSections(newSections);
  };

  const handleSectionNameChange = (id, newName) => {
    const newSections = sections.map((section) =>
      section.id === id ? { ...section, name: newName } : section
    );

    setSections(newSections);
  };

  const handleToggleSection = (id) => {
    const newSections = sections.map((section) =>
      section.id === id ? { ...section, enabled: !section.enabled } : section
    );

    setSections(newSections);
  };

  const handleEdit = (id) => {
  const newSections = sections.map((section) => ({
    ...section,
    isEditing: section.id === id,
    isHighlighted: section.id !== id
  }));

  setSections(newSections);
};

  const handleSave = (id) => {
    const newSections = sections.map((section) =>
      section.id === id ? { ...section, isEditing: false } : section
    );

    setSections(newSections);
  };

  const handleDescriptionClick = (id) => {
    const newSections = sections.map((section) =>
      section.id === id ? { ...section, showDescription: !section.showDescription } : section
    );

    setSections(newSections);
  };

  return (
    <div className="app-container">
      <div className="sections-container">
        <h2 className="section-header">Select your Sections</h2>
        {sections.map((section) => (
          <div
  key={section.id}
  className={`section${section.isHighlighted ? ' highlight' : ''}${section.isEditing ? ' selected' : ''}`}
  draggable
  onDragStart={(e) => handleDragStart(e, section.id)}
  onDragOver={handleDragOver}
  onDrop={(e) => handleDrop(e, section.id.toString())}
>

            <div className="drag-icon">
              <IoReorderThreeOutline />
            </div>
            <span className="info-button" onClick={() => handleDescriptionClick(section.id)}>
              ℹ
            </span>
            {section.isEditing ? (
              <input
                type="text"
                value={section.name}
                onChange={(e) => handleSectionNameChange(section.id, e.target.value)}
                onBlur={() => handleSave(section.id)}
                autoFocus
                className="edit-input"
              />
            ) : (
              <>
                <span className="section-name">{section.name}</span>
                {section.showDescription && (
                  <span className="section-description">{section.description}</span>
                )}
              </>
            )}
            {!section.isEditing ? (
              <div className="button-container">
                
                <button className="edit-button" onClick={() => handleEdit(section.id)}>
                  <RiPencilLine />
                </button>
              </div>
            ) : (
              <button className="save-button" onClick={() => handleSave(section.id)}>
                Save
              </button>
              
            )}
            <button
                  className={`toggle-button ${section.enabled ? 'enabled' : 'disabled'}`}
                  onClick={() => handleToggleSection(section.id)}
                >
                  <Switch
                    onChange={() => handleToggleSection(section.id)}
                    checked={section.enabled}
                    onColor="#6a5acd"
                    offColor="#ccc"
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </button>
          </div>
        ))}
        <div className="save-next-button">
          <button className="save-next-button-text">Save and Next</button>
        </div>
      </div>
    </div>
  );
};

export default App;