import React, { useState, CSSProperties } from 'react';
import { Link } from 'gatsby';
import Switch from 'react-switch';
import PageLayout from '../shared/layout/pageLayout';
import SEO from '../shared/layout/seo';
import {
  GrowthTable, NewDeathsTable, TotalDeathsTable, NewCasesTable, TotalCasesTable,
} from '../shared/tables/tables';
import DataChart from './dataChart';
import CountryFilter, { Tags } from './countryFilter';
import styles from './dataContent.module.css';
import { Country } from '../../types';
import { getTags } from '../../utilities/periodUtils';

const buttonStyle: CSSProperties = {
  fontSize: '0.85em',
  background: 'none',
  borderColor: 'black',
  borderRadius: '0.4em',
  margin: '0.4rem 0.6rem 1rem 0rem',
  outline: 'none',
};

const activeStyles: CSSProperties = {
  fontWeight: 900,
  padding: '1px 5px 1px',
  borderWidth: '2px',
};

export interface PeriodInfo {
  length: number
  value: string
}

type Table =
  | 'growth'
  | 'totalDeaths'
  | 'newDeaths'
  | 'totalCases'
  | 'newCases';

interface ChartInfo {
  x: string
  y: string
  title: string
}

const getChartInfo = (selectedTable: string, period: number): ChartInfo => {
  if (selectedTable === 'growth') {
    return {
      x: 'endDate',
      y: 'growthRate',
      title: 'Change in deaths between periods',
    };
  } if (selectedTable === 'newDeaths') {
    return {
      x: 'endDate',
      y: 'newDeaths',
      title: `New deaths by ${period}-day period`,
    };
  } if (selectedTable === 'totalDeaths') {
    return {
      x: 'endDate',
      y: 'totalDeaths',
      title: 'Total deaths by date',
    };
  } if (selectedTable === 'newCases') {
    return {
      x: 'endDate',
      y: 'newCases',
      title: `New cases by ${period}-day period`,
    };
  } if (selectedTable === 'totalCases') {
    return {
      x: 'endDate',
      y: 'totalCases',
      title: 'Total cases by date',
    };
  }
  return {
    x: '',
    y: '',
    title: '',
  };
};

const DataContent = ({
  countries,
  periodInfo,
  onPeriodChange,
}: {
  countries: Country[],
  periodInfo: PeriodInfo,
  onPeriodChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const possibleTags = React.useMemo(() => getTags(countries), [countries]);
  const [selectedTable, setSelectedTable] = useState<Table>('newDeaths');
  const chartInfo = React.useMemo(
    () => getChartInfo(selectedTable, periodInfo.length),
    [selectedTable, periodInfo],
  );
  const [tags, setTags] = useState<Tags>({
    currentTags: [
      { id: 'United States', name: 'United States' },
      { id: 'Brazil', name: 'Brazil' },
      { id: 'United Kingdom', name: 'United Kingdom' },
    ],
    suggestedTags: possibleTags,
  });
  const [showAll, setShowAll] = useState(true);
  const [startAtDeaths, setStartAtDeaths] = useState(false);
  return (
    <PageLayout>
      <SEO title="All Data" />
      <h1 style={{ marginBottom: '0.8rem' }}>All Data</h1>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'newDeaths'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('newDeaths')}
      >
        New Deaths
      </button>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'totalDeaths'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('totalDeaths')}
      >
        Total Deaths
      </button>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'growth'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('growth')}
      >
        Change in Deaths
      </button>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'newCases'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('newCases')}
      >
        New Cases
      </button>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'totalCases'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('totalCases')}
      >
        Total Cases
      </button>
      <div className={styles.chartSettings}>
        <label className={styles.label}>
          Period length:
          <input
            type="number"
            name="period-length"
            value={periodInfo.value}
            onChange={onPeriodChange}
            style={{
              fontWeight: 'bold',
              textDecoration: 'underline',
              width: '1.8rem',
              margin: '0 0 0 0.5rem',
              border: 'none',
            }}
          />
          days
        </label>
        {' '}
        {' '}
        <label className={styles.label}>
          <span>Include all countries</span>
          <Switch
            onChange={setShowAll}
            checked={showAll}
            onColor="#28c53c"
            offColor="#ddd"
            className={styles.switch}
          />
        </label>
        <label className={styles.label}>
          <span>Start at first death</span>
          {' '}
          {' '}
          <Switch
            onChange={setStartAtDeaths}
            checked={startAtDeaths}
            onColor="#28c53c"
            offColor="#ddd"
            className={styles.switch}
          />
        </label>
        <label className={styles.label} />
      </div>
      <CountryFilter tags={tags} setTags={setTags} />
      <DataChart
        countries={countries}
        x={chartInfo.x}
        y={chartInfo.y}
        title={chartInfo.title}
        tags={tags.currentTags}
        showAll={showAll}
        startAtDeaths={startAtDeaths}
      />
      <small>
        The table below is color coded by
        {' '}
        <Link to="/details">Outbreak Status</Link>
      </small>
      {selectedTable === 'growth' && <GrowthTable data={countries} periodLength={periodInfo.length} />}
      {selectedTable === 'newDeaths' && <NewDeathsTable data={countries} periodLength={periodInfo.length} />}
      {selectedTable === 'totalDeaths' && <TotalDeathsTable data={countries} periodLength={periodInfo.length} />}
      {selectedTable === 'newCases' && <NewCasesTable data={countries} periodLength={periodInfo.length} />}
      {selectedTable === 'totalCases' && <TotalCasesTable data={countries} periodLength={periodInfo.length} />}
    </PageLayout>
  );
};

export default DataContent;
