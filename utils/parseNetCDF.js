// src/utils/parseNetCDF.js
import { NetCDFReader } from 'netcdfjs';

export const parseNetCDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const reader = new NetCDFReader(arrayBuffer);

  const point_latitude = reader.getDataVariable('point_latitude');
  const point_longitude = reader.getDataVariable('point_longitude');
  const point_altitude = reader.getDataVariable('point_altitude');
  const reflectivity = reader.getDataVariable('reflectivity');

  const data = [];

  for (let i = 0; i < point_latitude.length; i++) {
    data.push({
      latitude: point_latitude[i],
      longitude: point_longitude[i],
      altitude: point_altitude[i],
      reflectivity: reflectivity[i],
    });
  }

  return data;
};
