import React from 'react';

interface Props {
  color?: string;
  size?: number;
}

type WaveShapeProps = Props;

const WaveShape: React.FC<WaveShapeProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1920.5 473.551">
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.067"
          y1="0.407"
          x2="0.946"
          y2="0.359"
          gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#db0060" />
          <stop offset="1" stop-color="#149289" />
        </linearGradient>
      </defs>
      <path
        id="Path_1698"
        data-name="Path 1698"
        d="M2222.495,694.538c-187.317,114.419-395.333,190.956-608.321,224.711a1639.368,1639.368,0,0,1-636.15-24.037C772.36,846.178,578.082,757.364,409.9,635.731q-18.338-13.223-36.263-26.946c-28.906-22.141,2.18-65.932,33.2-46.843q18.223,11.213,36.74,21.9a1515.92,1515.92,0,0,0,557.207,189.746c193.985,25.7,390.54,13.228,575.48-36.023A1456.852,1456.852,0,0,0,2079,493.21c54.241-40.915,133.009-35.882,175.843,16.867a123.908,123.908,0,0,1-21.1,176.822q-5.018,3.823-10.287,7.049Z"
        transform="translate(-362.148 -466.039)"
        opacity="0.292"
        fill="url(#linear-gradient)"
      />
    </svg>
  );
};

export default WaveShape;
