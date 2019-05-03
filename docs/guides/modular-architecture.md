# Modular Architecture - overview
- Client side app - React
- Backend AWS
    - Servers or serverless 
- DB: PostgreSQL
- Electron 
    - + “electron backend” 
- CEP - Adobe Panel Plugin, for Premiere 

**TL;DR**: The client can be packaged as front end for web app in AWS, but also as front end for electron cross platform desktop app. 

[autoEdit2, modular architecture presentation at textAV (12min)](https://textav.gitbook.io/textav-event-2018/projects/autoedit-panel-for-adobe-cep-pietro)


<table>
<tr>
    <th>Client</th>
    <th>Server</th>
    <th>Services and functionalities</th>
    <th>Database  </th>
  </tr>
  <tr>
    <th colspan="4"> <b>Web app (Front End + Back End) + mobile responsive</b></th>
  </tr>
  <tr>
    <td>React</td>
    <td>express</td>
    <td>Microservices</td>
    <td>AWS +postgreSQL  </td>
  </tr>
   <tr>
    <th colspan="4"><b>Electron</b></th>
  </tr>
  <tr>
    <td>React</td>
    <td>ES6 Class</td>
    <td>Node modules</td>
    <td>SQLite</td>
  </tr>
  <tr>
    <th colspan="4"><b>Adobe CEP</b></th>
  </tr>
  <tr>
    <td>React</td>
    <td>ES6 Class</td>
    <td>Node module + JSX/Adobe Premiere API</td>
    <td>SQLite</td>
  </tr>
</table>
 