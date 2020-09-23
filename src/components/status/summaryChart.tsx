import React from 'react';
import {
  VictoryChart, VictoryLegend, VictoryLine, VictoryAxis, VictoryLabel,
} from 'victory';
import { PeriodSummary } from '../../utilities/types/data';
import Theme from '../shared/general/chartTheme';

const SummaryChart = ({ data }: { data: PeriodSummary[] }) => (
  <VictoryChart
    theme={Theme}
    height={240}
    width={600}
    minDomain={{ y: 0 }}
    domainPadding={{ y: 30 }}
  >
    <VictoryLegend
      x={60}
      y={0}
      itemsPerRow={2}
      gutter={20}
      data={[
        { name: 'No Outbreak', symbol: { fill: 'lightgray' } },
        { name: 'Small Outbreak', symbol: { fill: 'lightpink' } },
        { name: 'Losing', symbol: { fill: 'lightcoral' } },
        { name: 'Flattening the Curve', symbol: { fill: 'lightsalmon' } },
        { name: 'Crushing the Curve', symbol: { fill: 'lightskyblue' } },
        { name: 'Winning', symbol: { fill: 'lightgreen' } },
        { name: 'Won', symbol: { fill: 'lightseagreen' } },
      ]}
    />
    <VictoryAxis fixLabelOverlap />
    <VictoryAxis dependentAxis />
    <VictoryLabel
      text="Pandemic Status (corona.rickkln.com)"
      x={400}
      y={64}
      style={{
        fontSize: 6,
        fontFamily: `"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
      }}
    />
    <VictoryLabel
      text="Source: JHU CSSE"
      x={400}
      y={72}
      style={{
        fontSize: 6,
        fontFamily: `"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
      }}
    />
    <VictoryLine
      data={data}
      interpolation="monotoneX"
      style={{
        data: { stroke: 'lightgray' },
      }}
      x="endDate"
      y="none"
    />
    <VictoryLine
      data={data}
      interpolation="monotoneX"
      style={{
        data: { stroke: 'lightpink' },
      }}
      x="endDate"
      y="small"
    />
    <VictoryLine
      data={data}
      interpolation="monotoneX"
      style={{
        data: { stroke: 'lightcoral' },
      }}
      x="endDate"
      y="losing"
    />
    <VictoryLine
      data={data}
      interpolation="monotoneX"
      style={{
        data: { stroke: 'lightsalmon' },
      }}
      x="endDate"
      y="flattening"
    />
    <VictoryLine
      data={data}
      interpolation="monotoneX"
      style={{
        data: { stroke: 'lightskyblue' },
      }}
      x="endDate"
      y="crushing"
    />
    <VictoryLine
      data={data}
      interpolation="monotoneX"
      style={{
        data: { stroke: 'lightgreen' },
      }}
      x="endDate"
      y="winning"
    />
    <VictoryLine
      data={data}
      interpolation="monotoneX"
      style={{
        data: { stroke: 'lightseagreen' },
      }}
      x="endDate"
      y="won"
    />
  </VictoryChart>
);

export default SummaryChart;
