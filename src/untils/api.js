import {
  get,
  post
} from './ajax';
import api_config from '../config/api_config';
const baseurl = api_config.api_http;
const appKey = '69800851-4554-4EEC-8D12-E4211B952798';
const weatherKey = '7fd9344bdbe691777e2dd83a5dbfdfc2';

export const getSaveUserInfo = data => get(`${baseurl}/api/MessBoard/GetPaDataRowUnSafeUserInfo`, data, appKey);

export const getDetailInfo = data => get(`${baseurl}/api/MessBoard/GetPaDataRowProDetailInfo`, data, appKey);

export const getWeather = data => get(`http://v.juhe.cn/weather/index?cityname=上海&key=${weatherKey}`);

export const test = data => post(`http://obdapi.obdkudu.lunz.cn/freeter-api/rpregulatoryriskscore/alarmVolumeOfTheDay`);

export const bdApi = data => get(`http://api.map.baidu.com/staticimage/v2?ak=SKflr1sBOKSqwUn6vNTeeq96XmbbWkYj&mcode=666666&center=116.403874,39.914888&width=300&height=200&zoom=11`);