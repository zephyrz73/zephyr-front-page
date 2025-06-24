import React from 'react';
import HomeMain from '../component/HomeMain.jsx';
import Skills from '../component/Skills.jsx';
import Education from '../component/Timeline.jsx';

export default function Home() {
  return (
    <div>
      <HomeMain />
      <Skills />
      <Education />
    </div>
  );
}
