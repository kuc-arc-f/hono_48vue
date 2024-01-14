import React from 'react';

//
export default function Page(props: any) {
  return (
  <html>
    <head>
      <title>title</title>
      <link href="/static/style.css" rel="stylesheet" />
    </head>    
    <div>
        <div id="app"></div>
        {/* JS */}
        <script type="module" src="/static/main.js"></script>
    </div>
  </html>
  )
}
/*
*/