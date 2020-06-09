import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import CustomTranscriptCard from '../CustomTranscriptCard';
import includesText from '../../../Util/includes-text';
import whichJsEnv from '../../../Util/which-js-env';
// TODO: add error handling, eg custom alert if server is not responding
class ListPageTranscript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchInput: false,
    };
  }

  handleSearch = searchText => {
    console.log('searchText', searchText);
    const results = this.props.items.filter(transcript => {
      console.log('transcript', transcript);
      if (
        (transcript.title && includesText(transcript.title, searchText)) ||
        (transcript.description && includesText(transcript.description, searchText)) ||
        (transcript.clipName && includesText(transcript.clipName, searchText)) ||
        (transcript.sttEngine && includesText(transcript.sttEngine, searchText))
      ) {
        transcript.display = true;

        return transcript;
      } else {
        transcript.display = false;

        return transcript;
      }
    });

    this.props.handleUpdateList(results);
  };

  render() {
    let itemsCards;
    let description;
    if (this.props.items) {
      itemsCards = this.props.items
        .map(item => {
          if (item.display) {
            return (
              <CustomTranscriptCard
                sttEngine={item.sttEngine}
                clipName={item.clipName}
                icon={this.props.icon}
                key={'key__' + item.id}
                id={item.id}
                projectId={item.id}
                title={item.title}
                subtitle={item.description}
                handleEdit={this.props.handleEdit}
                handleDelete={() => {
                  this.props.handleDelete(item.id);
                }}
                // To be able to do REST for cards for - Projects, transcripts, paperedits
                showLink={() => {
                  return this.props.showLinkPath(item.id);
                }}
                status={item.status}
                description={description}
                disabled={item.status === 'done' ? true : false}
                errorMessage={item.status === 'error' ? item.errorMessage : null}
              />
            );
          } else {
            return null;
          }
        })
        .filter(item => {
          return item !== null;
        });
    }

    let content;
    let searchEl;
    // TODO: better error handling
    // eg there should be a loading/fetching? and then if it gets error 404 or 505(?) from server
    // then it displays error from server
    // also add `navigator.onLine` to raise error if offline?

    if (this.props.items !== null && this.props.items.length !== 0) {
      searchEl = <SearchBar handleSearch={this.handleSearch} />;
    }
    if (this.props.items !== null && this.props.items.length !== 0) {
      content = (
        <>
          <ListGroup
            style={{ height: '75vh', overflow: 'scroll' }}
            //  variant="flush"
          >
            {itemsCards}
          </ListGroup>
        </>
      );
    } else {
      content = <i>No {this.props.model}, create a new one to get started </i>;
    }

    return (
      <>
        <Row>
          <Col xs={12} sm={6} md={7} lg={7} xl={7}>
            {searchEl}
          </Col>
          {whichJsEnv() !== 'cep' ? (
            <>
              <Col xs={12} sm={3} md={2} lg={2} xl={2}>
                <Button onClick={this.props.handleShowCreateNewItemForm} variant="secondary" size="sm" block>
                  New {this.props.model}
                </Button>
              </Col>
              <Col xs={12} sm={3} md={3} lg={3} xl={3}>
                <Button onClick={this.props.handleShowCreateNewBatchForm} variant="secondary" size="sm" block>
                  New Batch {this.props.model}s
                </Button>
              </Col>
            </>
          ) : (
            <Col xs={12} sm={6} md={5} lg={5} xl={5}>
              <Button onClick={this.props.handleShowCreateNewItemForm} variant="secondary" size="sm" block>
                New {this.props.model}
              </Button>
            </Col>
          )}
        </Row>
        {content}
      </>
    );
  }
}

export default ListPageTranscript;
