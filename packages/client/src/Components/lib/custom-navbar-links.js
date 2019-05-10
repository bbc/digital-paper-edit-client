import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFolderPlus,
  faFileAlt,
  faFile,
  faTasks,
  faCut,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

const navbarLinks = projectId => {

  return [
    {
      name: (
        <span>
          {' '}
          <FontAwesomeIcon icon={ faFolderOpen } /> Projects
        </span>
      ),
      link: '/projects'
    },
    {
      name: (
        <span>
          {' '}
          <FontAwesomeIcon icon={ faFolderPlus } /> NewProject
        </span>
      ),
      link: '/projects/new'
    },
    {
      name: (
        <span>
          {' '}
          <FontAwesomeIcon icon={ faFileAlt } /> Transcripts
        </span>
      ),
      link: `/projects/${ projectId }/transcripts`
    },
    {
      name: (
        <span>
          {' '}
          <FontAwesomeIcon icon={ faFile } /> New Transcript
        </span>
      ),
      link: `/projects/${ projectId }/transcripts/new`
    },
    {
      name: (
        <span>
          {' '}
          <FontAwesomeIcon icon={ faTasks } /> Paper Edits
        </span>
      ),
      link: `/projects/${ projectId }/paperedits`
    },
    {
      name: (
        <span>
          {' '}
          <FontAwesomeIcon icon={ faCut } /> New Paper Edit
        </span>
      ),
      link: `/projects/${ projectId }/paperedits/new`
    },
    {
      name: (
        <span>
          {' '}
          <FontAwesomeIcon icon={ faUsers } /> Users
        </span>
      ),
      link: `/projects/${ projectId }/users`
    }
  ];
};

export default navbarLinks;
