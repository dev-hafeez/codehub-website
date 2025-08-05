import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FiSearch, FiArrowLeft } from 'react-icons/fi'; 
import '../styles/articleSidebar.css';
import { Link } from 'react-router-dom';
const ArticleSidebar = () => {

  const subheadings = ['Subheading', 'Subheading', 'Subheading', 'Subheading', 'Subheading', 'Subheading'];

  return (
    <div className="sidebar-container ms-4">
      <div className="sidebar-top">
        <Form.Select className="sidebar-select">
          <option>Select...</option>
          <option value="1">Drafts</option>
          <option value="2">Published</option>
          <option value="3">Archived</option>
        </Form.Select>
        <span className="arrow-icon">&rarr;</span>
      </div>

 
      <InputGroup className="search-bar my-2  ">
        <InputGroup.Text>
          <FiSearch />
        </InputGroup.Text>
        <Form.Control placeholder="Search Draft..." />
      </InputGroup>

      <hr className="sidebar-divider" />

      {/* Category Section */}
       <h3 className="category-title">CATEGORY</h3>
      <div className="category-section">
       
        <ul className="category-list">
          {subheadings.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <span className="radio-circle"></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section: Back to Home */}
      <div className="back-to-home">
        <FiArrowLeft size={20} />
        <Link to='/blogs' style={{textDecoration:'none',color:'black'}}>
        <span className="ms-2">Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ArticleSidebar;