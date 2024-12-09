import axios from 'axios';
import FormData from 'form-data';
import { checkAttStatus } from './checkAttStatus';
import 'dotenv/config';

export const checkOutProc = async (token: string) => {
  const attendanceId = await checkAttStatus(token);
  const data = new FormData();
  data.append('guid', token);
  data.append(
    'data',
    `{ "attendance_id": "${attendanceId}", "attendance_type_id": "1", "timezone": "Asia/Jakarta", "latitude": -6.1905344, "longitude": 106.8431857, "file_evidence": null, "quiz": { "soal_1": "Sehat", "soal_2": "WFO", "soal_3": "JALAN KRAMAT RAYA" } }`,
  );

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.API_URL + '/api_attendance/attendance/save',
    headers: {
      Cookie: `9bc0e424ec7f64f842744df7ef9b0398=9dcdf8d2ec562e09f5de11a59f330227; TS0107e10f=01d4a3ef48cb700ca9b2f9ace65c3a5738b1446212bdd230a5a84d65d1b83d674a9fc658ef3850e495917a202c886db2d442ad1253e87c1d0aced3372314ecd18ee2ec5948732e6415ac374de8789164dd1ad9e29b42d94d523ea8dbddd34c0ba99c41a606; hcms=${token}`,
      ...data.getHeaders(),
    },
    data: data,
    timeout: 10000,
  };
  const resp = await doCheckOut(config);
  return resp;
};

async function doCheckOut(config: any, retries = 5, delay = 1000) {
  try {
    const resp = await axios(config).then((res) => res.data);
    return resp;
  } catch (error) {
    if (retries > 0) {
      console.error(`do check out error:  ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return doCheckOut(config, retries - 1, delay * 2); // Exponential backoff
    } else {
      throw error;
    }
  }
}
