# ghpages demo page - draft

`npm run deploy:ghpages` in npm scripts deploys a demo build of the React client onto the github pages branch.

```
"deploy:ghpages": "rimraf build && cross-env REACT_APP_NODE_ENV=demo npm run build && gh-pages -d build"
```

In terminal `gh-pages -d build` pushes `build` folder in github pages branch.

Uses `cross-env` when building React to pass ENV - as it's compatible with windows dev environment as well.


##`cross-env `

[`cross-env `](https://www.npmjs.com/package/cross-env) (mentioned in [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)) 

> Run scripts that set and use environment variables across platforms

>Most Windows command prompts will choke when you set environment variables with NODE_ENV=production like that. (The exception is Bash on Windows, which uses native Bash.) Similarly, there's a difference in how windows and POSIX commands utilize environment variables. With POSIX, you use: $ENV_VAR and on windows you use %ENV_VAR%.

>cross-env makes it so you can have a single command without worrying about setting or using the environment variable properly for the platform. Just set it like you would if it's running on a POSIX system, and cross-env will take care of setting it properly.

[see their README for more info](https://github.com/kentcdodds/cross-env#readme)

## Links


- [`gh-pages`](https://www.npmjs.com/package/gh-pages)
- [Github Pages](https://pages.github.com/)
- [`cross-env`](https://www.npmjs.com/package/cross-env)
- from issue [Windows does not recognize the "PORT=3006" command in package.json ](https://github.com/bbc/react-transcript-editor/issues/100#issuecomment-468968248)
