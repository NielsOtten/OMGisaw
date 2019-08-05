import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { LeafletMouseEvent, LatLng, Icon } from 'leaflet';
import { Popup as LeafletPopup } from 'react-leaflet';
import {
  SubjectFragment,
  useCreateSightingMutation,
} from '../../../graphql/_generated_graphql_types';

interface Props {
  subject: SubjectFragment;
}

export default function Map(props: Props) {
  const [Leaflet, setLeaflet] = useState();
  const [newSighting, setNewSighting] = useState<LatLng>();
  const [popupRef, setPopupRef] = useState<LeafletPopup>();
  const [sightingMutation] = useCreateSightingMutation();
  const [markerIcon, setMarkerIcon] = useState<Icon>();

  useEffect(() => {
    async function loadLeaflet() {
      const {
        TileLayer,
        Map: LeafletMap,
        Popup,
        Marker,
      } = await import('react-leaflet');
      const L = await import('leaflet');

      setMarkerIcon(
        L.icon({
          iconUrl:
            'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon-2x.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      );

      setLeaflet({ TileLayer, LeafletMap, Marker, Popup });
    }

    loadLeaflet();
  }, []);

  if (!Leaflet) {
    return <div>Loading Map</div>;
  }

  let newSightingMarker;
  if (newSighting) {
    newSightingMarker = (
      <Leaflet.Marker position={newSighting}>
        <Leaflet.Popup
          ref={(ref: any) => setPopupRef(ref)}
          onClose={() => {
            console.log('closing');
            setNewSighting(undefined);
            setPopupRef(undefined);
          }}
        >
          OMG! did you see {props.subject.nickname}?
          <button
            type="button"
            onClick={() =>
              sightingMutation({
                variables: {
                  description: '',
                  location: {
                    type: 'Point',
                    coordinates: [newSighting.lng, newSighting.lat],
                  },
                  subjectId: props.subject.id,
                  timestamp: new Date().toISOString(),
                },
              })
            }
          >
            YES!
          </button>
          <button type="button">Maybe?</button>
          <button type="button">No...</button>
        </Leaflet.Popup>
      </Leaflet.Marker>
    );

    if (typeof popupRef !== 'undefined') {
      popupRef.props.leaflet!.map!.openPopup(
        // @ts-ignore
        popupRef.leafletElement,
        newSighting,
      );
    }
  }

  return (
    <Leaflet.LeafletMap
      style={{ height: '100vh', width: '100vw' }}
      zoom={5}
      center={{
        lat: 50,
        lng: 4,
      }}
      onClick={(e: LeafletMouseEvent) => setNewSighting(e.latlng)}
    >
      {props.subject.sightingsBySubjectId.nodes.map(sighting => {
        return (
          <Leaflet.Marker
            key={sighting!.id}
            position={[
              sighting!.location.latitude,
              sighting!.location.longitude,
            ]}
            icon={markerIcon}
          />
        );
      })}
      <Leaflet.TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {newSightingMarker}
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
        />
      </Head>
    </Leaflet.LeafletMap>
  );
}
