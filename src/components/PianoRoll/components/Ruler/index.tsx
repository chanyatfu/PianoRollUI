import { Fragment, memo } from 'react';
import useTheme from "../../hooks/useTheme";
import { usePianoRollTransform } from "../../hooks/usePianoRollTransform";
import styles from './index.module.scss'

interface RulerProps extends React.HTMLAttributes<SVGElement> {}

const Ruler: React.FC<RulerProps> = ({ ...other }) => {
  const { laneLength, canvasHeight, pixelPerBeat, pianoLaneScaleX } = usePianoRollTransform();

  const numberOfBeatMarkers = Math.ceil(laneLength / (pixelPerBeat * 4));
  const numberOfBarMarkers = Math.ceil(laneLength / (pixelPerBeat));

  const rulerHeight = 30

  const beatMarkers = Array.from({ length: numberOfBeatMarkers }, (_, index) => (
    <g key={index}>
      <line
        key={index}
        x1={index * pixelPerBeat * pianoLaneScaleX * 4}
        y1={5}
        x2={index * pixelPerBeat * pianoLaneScaleX * 4}
        y2={rulerHeight}
        // stroke={theme.grid.primaryGridColor}
        stroke="#232323"
        strokeWidth="1"
      />
      <text
        x={index * pixelPerBeat * pianoLaneScaleX * 4 + 5} // Adjust text position as needed
        y={13} // Adjust text position as needed
        className={styles['text']}
        fill="#232323" // Text color
        fontSize="13" // Adjust font size as needed
      >
        {index + 1}
      </text>
    </g>
  ));

  const barMarkers = Array.from({ length: numberOfBarMarkers }, (_, index) => (
    <line
      x1={index * pixelPerBeat * pianoLaneScaleX}
      y1={0}
      x2={index * pixelPerBeat * pianoLaneScaleX}
      y2={10}
      // stroke={theme.grid.secondaryGridColor}
      stroke="#232323"
      strokeWidth="1"
    />
  ));

  return (
    <div onClick={(event) => console.log(event.nativeEvent.offsetX)}
      className={styles['ruler-container']}
    >
      <svg
        aria-label="pianoroll-ruler"
        width="100%"
        height="100%"
        {...other}
        className={styles['ruler']}
      >
        {beatMarkers}
        {/* {barMarkers} */}
      </svg>
    </div>
  );
};

export default memo(Ruler);
