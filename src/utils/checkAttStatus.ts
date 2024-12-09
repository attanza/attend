import axios from 'axios';
import FormData from 'form-data';
export const checkAttStatus = async (
  token: string,
): Promise<string | undefined> => {
  const data = new FormData();

  data.append('guid', token);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hcms.pegadaian.co.id/api_attendance/attendance/Time',
    headers: {
      Cookie: `9bc0e424ec7f64f842744df7ef9b0398=9dcdf8d2ec562e09f5de11a59f330227; TS0107e10f=01d4a3ef48cb700ca9b2f9ace65c3a5738b1446212bdd230a5a84d65d1b83d674a9fc658ef3850e495917a202c886db2d442ad1253e87c1d0aced3372314ecd18ee2ec5948732e6415ac374de8789164dd1ad9e29b42d94d523ea8dbddd34c0ba99c41a606; hcms=${token}`,
      ...data.getHeaders(),
    },
    timeout: 10000,
    data: data,
  };
  try {
    const result = await doCheckStatus(config);
    return result;
  } catch (error) {
    console.log('check status error after retry ', error.message);
  }
};

async function doCheckStatus(config: any, retries = 5, delay = 1000) {
  console.log('CHECK STATUS RETRIES', retries);
  try {
    const resp = await axios(config).then((res) => res.data);
    return resp?.data?.attendance?.id || undefined;
  } catch (error) {
    if (retries > 0) {
      console.error(`check status error retrying:  ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return doCheckStatus(config, retries - 1, delay * 2);
    } else {
      throw error;
    }
  }
}
