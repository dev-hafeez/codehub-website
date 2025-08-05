// src/components/ActionPanel.jsx
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import '../styles/actionPanel.css';
import { BsEmojiSmile, BsEmojiFrown } from 'react-icons/bs'; // React icons
import { FaRegImage } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

function ActionPanel() {
  const handlePublish = () => {
    console.log('Publish button clicked');
    
  };
  
  const handleAddToDraft = () => {
    console.log('Add to Draft button clicked');
    
  };

  return (
    <div className="action-panel-container p-3">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <BsEmojiSmile size={24} className="" />
         <RiArrowDropDownLine size={40} style={{fontWeight:"lighter"}}/>
        </div>
        <Button variant="primary" className="preview-btn">Preview</Button>
      </div>
      
      <Card className="cover-card mb-3">
        <Card.Body className="d-flex flex-column align-items-center">
          <div className="placeholder-image"><FaRegImage  className="image-icon"/></div>
        </Card.Body>
        <Button  className="add-cover-btn mx-auto mt-3 mb-1">Add Cover</Button>  
      </Card>
<hr></hr>
      <Card className="tags-card mb-3">
        <Card.Body>
          <div className="placeholder-tags">Tags add</div>
        </Card.Body>
      </Card>
      <div className="d-flex flex-column " style={{marginLeft:"30%"}}>
        <Button variant="primary" size="lg" className="publish-btn w-50 mb-2 " onClick={handlePublish}>Publish</Button>
      <Button variant="outline-secondary" size="lg" className="draft-btn w-50 "  onClick={handleAddToDraft}>Add to Draft</Button>

      </div>
      
    </div>
  );
}

export default ActionPanel;