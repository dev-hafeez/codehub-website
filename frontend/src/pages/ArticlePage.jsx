import React from 'react'
import ArticleSidebar from '../components/ArticleSidebar.jsx'
import ArticleEditor from '../components/ArticleEditor.jsx'
import ActionPanel from '../components/ActionPanel.jsx'

import { Container, Row, Col } from 'react-bootstrap';
import "../styles/articlePage.css";

const ArticlePage = () => {
  return (
     <Container fluid className="article-container">
      <Row>
        <Col md={3} className="sidebar-col p-0">
          <ArticleSidebar />
        </Col>
         <Col md={6} className="editor-col">
          <ArticleEditor />
        </Col>
        <Col md={3} className="action-panel-col p-0">
          <ActionPanel />
        </Col> 
      </Row>
    </Container>
  )
}

export default ArticlePage