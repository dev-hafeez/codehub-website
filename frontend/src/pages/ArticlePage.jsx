import React, { useState } from 'react';
import ArticleSidebar from '../components/ArticleSidebar.jsx';
import ArticleEditor from '../components/ArticleEditor.jsx';
import ActionPanel from '../components/ActionPanel.jsx';
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { FiMenu, FiSettings } from 'react-icons/fi';
import "../styles/articlePage.css";


const ArticlePage = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showActionPanel, setShowActionPanel] = useState(false);

    const handleCloseSidebar = () => setShowSidebar(false);
    const handleShowSidebar = () => setShowSidebar(true);
    const handleCloseActionPanel = () => setShowActionPanel(false);
    const handleShowActionPanel = () => setShowActionPanel(true);

    return (
        <Container fluid className="article-container">
            
            {/* The single, responsive header container */}
            <div className="article-header-toggle d-flex justify-content-between p-2 d-xl-none">
                
                {/* Sidebar toggle button (wrapped for visibility control) */}
                <div className="d-md-none">
                    <Button variant="outline-secondary" onClick={handleShowSidebar}>
                        <FiMenu />
                    </Button>
                </div>
                
                {/* Action panel toggle button (wrapped for visibility and alignment control) */}
                <div className="d-flex w-100 justify-content-end d-md-flex d-xl-none">
                    <Button variant="outline-secondary" onClick={handleShowActionPanel}>
                        <FiSettings />
                    </Button>
                </div>

            </div>

            <Row>
                
                {/* Sidebar column: Appears from medium (md) up to extra-large (xl) */}
                <Col xl={3} lg={4} md={4} className="sidebar-col d-none d-md-block p-0">
                    <ArticleSidebar />
                </Col>

                {/* Editor column: Always visible, but takes full width on small screens */}
                <Col xl={6} lg={8} md={8} xs={12} className="editor-col">
                    <ArticleEditor />
                </Col>

               
                {/* Action Panel column: Appears only on extra-large (xl) screens */}
                <Col xl={3} className="action-panel-col d-none d-xl-block p-0">
                    <ActionPanel />
                </Col>
            </Row>

            {/* Offcanvas components remain the same */}
            <Offcanvas className="Sidebar" show={showSidebar} onHide={handleCloseSidebar} backdrop={false} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Article Sidebar</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ArticleSidebar />
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas show={showActionPanel} onHide={handleCloseActionPanel} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Action Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ActionPanel />
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default ArticlePage;