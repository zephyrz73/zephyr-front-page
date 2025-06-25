import React from 'react';
import { Typography, Box } from '@mui/material';

const events = [
  {
    title: 'University of California, Santa Barbara',
    start: new Date('2022-10-01'),
    end: new Date('2025-04-01'),
    color: '#beb8b1',
    type: 'education',
  },
  {
    title: 'University of Washington, Seattle',
    start: new Date('2018-10-01'),
    end: new Date('2021-07-01'),
    color: '#bdbdbd',
    type: 'education',
  },
  {
    title: 'Pulumi Corporation (Seattle, WA)',
    start: new Date('2020-07-01'),
    end: new Date('2020-10-01'),
    color: '#747492',
    offset: 270,
    type: 'experience',
  },
  {
    title: 'Aucean Technologies (Zhejiang, China)',
    start: new Date('2021-07-01'),
    end: new Date('2022-10-01'),
    color: '#acc8d7',
    offset: 270,
    type: 'experience',
  },
  {
    title: 'AppFolio (Santa Barbara, CA)',
    start: new Date('2023-07-01'),
    end: new Date('2023-10-01'),
    color: '#4e5a65',
    offset: 270,
    type: 'experience',
  },
  {
    title: 'Violett Inc. (Seattle, WA)',
    start: new Date('2020-10-01'),
    end: new Date('2024-06-01'),
    color: '#527698',
    offset: 80,
    type: 'experience',
  },
  {
    title: 'Beaconfire Inc. (Remote)',
    start: new Date('2025-04-01'),
    end: new Date('2025-07-01'),
    color: '#8ea9ad',
    offset: 80,
    type: 'experience',
  },
];

const startYear = 2018;
const endYear = 2025;
const yearHeight = 200;
const timelineHeight = (endYear - startYear + 1) * yearHeight;

const VerticalTimeline = () => {
  return (
    <div>
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography variant="h5">My Journey</Typography>
      </Box>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${timelineHeight}px`,
          margin: '50px auto',
          background: '#111',
        }}
      >
        {/* 中线 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-1px)',
            width: '2px',
            height: '100%',
            backgroundColor: '#aaa',
          }}
        />

        {/* 年份刻度 */}
        {/* 关键时间点（只显示经历的开始和结束月份） */}
        {[...new Set(events.flatMap((e) => [e.start, e.end]))].map(
          (date, idx) => {
            const top =
              ((date.getFullYear() + date.getMonth() / 12 - startYear) /
                (endYear - startYear + 1)) *
              timelineHeight;

            const label = date.toLocaleString('default', {
              month: 'short',
              year: 'numeric',
            }); // e.g. "Sep 2020"

            return (
              <React.Fragment key={idx}>
                {/* 刻度线 */}
                <div
                  style={{
                    position: 'absolute',
                    top: `${top}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '6px',
                    height: '1px',
                    backgroundColor: '#ccc',
                  }}
                />
                {/* 标签 */}
                <div
                  style={{
                    position: 'absolute',
                    top: `${top - 6}px`,
                    left: 'calc(50% + 15px)',
                    fontSize: '12px',
                    color: '#ccc',
                  }}
                >
                  {label}
                </div>
              </React.Fragment>
            );
          }
        )}

        {/* 时间块 */}
        {events.map((event, i) => {
          const yStart =
            ((event.start.getFullYear() +
              event.start.getMonth() / 12 -
              startYear) /
              (endYear - startYear + 1)) *
            timelineHeight;

          const yEnd =
            ((event.end.getFullYear() + event.end.getMonth() / 12 - startYear) /
              (endYear - startYear + 1)) *
            timelineHeight;

          const height = yEnd - yStart;
          const isEducation = event.type === 'education';

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${yStart}px`,
                left: isEducation
                  ? 'calc(50% - 260px)'
                  : `calc(50% + ${event.offset}px)`,
                width: '180px',
                padding: '10px',
                height: `${height}px`,
                backgroundColor: event.color,
                borderRadius: '6px',
                color: 'white',
                fontSize: '15px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                textAlign: 'left',
              }}
            >
              {event.title}
            </div>
          );
        })}
      </div>
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography variant="h5">My Journey</Typography>
      </Box>
    </div>
  );
};

export default VerticalTimeline;
