import React from 'react';
import { Card } from 'antd'
import Pie from './Pie'
import Pie2 from './Pie2'

export default function Charts() {

  return (
    <div>
      <Card
        title="饼图"
        style={{
          width: '100%',
        }}
      >
        <Pie></Pie>
      </Card>
      <Card
        title="饼图二"
        style={{
          width: '100%',
        }}
      >
        <Pie2/>
      </Card>
    </div>
  );
}
