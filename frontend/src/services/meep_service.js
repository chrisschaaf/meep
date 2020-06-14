import {GoogleMapsAPIKey} from '../../private/google_maps';
import firebase from '../firebase';

const GEODATA_API = 'https://maps.googleapis.com/maps/api/geocode/json';

/**
 * Meep Service Class
 */
export class MeepService {
  /**
   * @return {any}
   */
  getLocations() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/location-markers').once('value')
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * @param {any} id
   * @return {any}
   */
  getLocationsById(id) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/locations/${id}`).once('value')
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * @return {any}
   */
  getProjects() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/projects').once('value')
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * @param {any} id
   * @return {any}
   */
  getProjectSummaryById(id) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${REMOTE_API}/projects/${id}/summary`).once('value')
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * @param {any} id
   * @return {any}
   */
  getProjectDetailsById(id) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${REMOTE_API}/projects/${id}/detail`).once('value')
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  /**
   * @param {any} zipcode
   * @return {any}
   */
  getGeoDataByZipCode(zipcode) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${GEODATA_API}?address=${zipcode}&key=${GoogleMapsAPIKey}`).once('value')
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}
