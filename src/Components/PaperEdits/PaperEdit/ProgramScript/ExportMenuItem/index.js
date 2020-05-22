import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function ExportMenuItem({ onClick, title, text, tootlipDelay }) {
  return (
    <OverlayTrigger placement={'left'} delay={tootlipDelay} overlay={<Tooltip>{title}</Tooltip>}>
      <Dropdown.Item
        variant="light"
        eventKey="1"
        onClick={onClick}
        // title={title}
      >
        {text}
      </Dropdown.Item>
    </OverlayTrigger>
  );
}

export default ExportMenuItem;
