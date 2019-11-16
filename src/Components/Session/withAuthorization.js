// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';

// import AuthUserContext from './context';
// import { withFirebase } from '../Firebase';
// import * as ROUTES from '../../constants/routes.js';

// const withAuthorization = condition => Component => {
//   const WithAuthorization = props => {
//     const [ authUser, setAuthUser ] = useState();

//     useEffect(() => {

//       listener = props.firebase.onAuthUserListener(
//         authUser => {
//           if (!condition(authUser)) {
//             props.history.push(ROUTES.SIGN_IN);
//           }
//         },
//         () => props.history.push(ROUTES.SIGN_IN)
//       );

//       return () => {
//         listener();
//       };
//     }, [ props.firebase, props.history ]);

//     return (
//       <AuthUserContext.Consumer>
//         {authUser =>
//           condition(authUser) ? <Component { ...this.props } /> : null
//         }
//       </AuthUserContext.Consumer>
//     );
//   };

//   return compose(withRouter, withFirebase)(WithAuthorization);
// };
// export default withAuthorization;
