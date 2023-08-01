import * as React from 'react';
import './style.css';
import Grid from './grid';
import dataList from './data.json';

function control(today: Date, limit: number) {}

export default function App() {
  let sourceProp = dataList;
  return (
    <div>
      <h1>Dgpays Case Study </h1>
      {/* <Grid source={sourceProp} />  */}
    </div>
  );
}
