

function graphQL(query) {
    // // if in browser mode, call graphQL API
    if(true){
    return fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ hello }' }),
    })
      .then(res => res.json())
      .then(res => console.log(res.data));
  // if in electron then call 
    }else{
  graphql(schema, query, root).then((response) => {
    // graphql(schema, query).then((response) => {
      console.log(response);
    });
    }
  }