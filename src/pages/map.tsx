import React, { useMemo} from 'react';
import { useQuery } from '@apollo/client';
import PageLayout from '../components/layout/pageLayout';
import Loading from '../components/layout/loading';
import Error from '../components/layout/error';
import SEO from '../components/layout/seo';
import MapWrapper from '../components/map/MapWrapper';
import { Countries, FeatureCollection } from '../types';
import COUNTRY_QUERY from '../queries';
import getMapData from '../utilities/getMapData';

// TODO map with timescale (weekly)
const Map = () => {
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  const mapData: FeatureCollection = useMemo(() => getMapData(data), [data]);
  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }

  async function mapEffect({ leafletElement: map } = {}) {

  }

  const mapSettings = {
    center: [38.9072, -77.0369],
    zoom: 2,
    mapEffect,
  };
  return (
    <PageLayout>
      <SEO title="World Map" />
      <MapWrapper {...mapSettings} />
    </PageLayout>
  );
};

export default Map;
