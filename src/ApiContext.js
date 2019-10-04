import { createContext } from 'react';
import ApiWrapper from './ApiWrapper';

const ApiContext = createContext(ApiWrapper);

export default ApiContext;