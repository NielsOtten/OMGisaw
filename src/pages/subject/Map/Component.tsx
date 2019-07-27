import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { SubjectFragment } from '../../../graphql/_generated_graphql_types';

interface Props {
  subject: SubjectFragment;
}

export default function Map(props: Props) {
  const [Leaflet, setLeaflet] = useState();

  useEffect(() => {
    async function loadLeaflet() {
      const { TileLayer, Map: LeafletMap } = await import('react-leaflet');
      setLeaflet({ TileLayer, LeafletMap });
    }

    loadLeaflet();
  }, []);

  if (!Leaflet || !Leaflet.TileLayer || !Leaflet.LeafletMap) {
    return <div>Loading Map</div>;
  }

  return (
    <Leaflet.LeafletMap
      style={{ height: '100vh', width: '100vw' }}
      zoom={5}
      center={{
        lat: props.subject.location!.latitude,
        lng: props.subject.location!.longitude,
      }}
    >
      <Leaflet.TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
        />
      </Head>
    </Leaflet.LeafletMap>
  );
}
