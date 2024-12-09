import axios from 'axios';
import FormData from 'form-data';
import 'dotenv/config';

export const checkInProc = async (token: string) => {
  const data = new FormData();
  data.append('guid', token);
  data.append(
    'data',
    '{\n    "attendance_id": "",\n    "attendance_type_id": "1",\n    "timezone": "Asia/Jakarta",\n    "latitude": -6.1905344,\n    "longitude": 106.8431857,\n    "file_evidence": "",\n    "quiz": {\n        "soal_1": "Sehat",\n        "soal_2": "WFO",\n        "soal_3": "JALAN KRAMAT RAYA"\n    }\n}',
  );

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.API_URL + '/api_attendance/attendance/save',
    headers: {
      Cookie: `9bc0e424ec7f64f842744df7ef9b0398=5f88176c021950d00c1615f405264b7c; TS0107e10f=01d4a3ef488c1ffb18fecce0f2efdb9c5eb7dbe05e3d732ccf542d95ee613baef33150a9c75b6f9d91925116b1b892c03b54d397047776cd62860fde152f81b91bf4ff7bfd65ed7510801695ef14fbd773ccaeff852cf8a8a8d29bf6a982a73902dfb41956; hcms=${token}`,
      ...data.getHeaders(),
    },
    timeout: 10000,
    data: data,
  };
  const resp = await doCheckIn(config);
  return resp;
};

async function doCheckIn(config: any, retries = 5, delay = 1000) {
  try {
    const resp = await axios(config).then((res) => res.data);
    return resp;
  } catch (error) {
    if (retries > 0) {
      console.error(`do check in error:  ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return doCheckIn(config, retries - 1, delay * 2); // Exponential backoff
    } else {
      throw error;
    }
  }
}
