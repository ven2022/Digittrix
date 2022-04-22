import React from 'react';
import axios from 'axios';
import { resolve } from './resolve.js';
const apiurl="http://172.105.159.222:5000";
class Api extends  React.Component {

  static async adminlogin(email,password){
    let body={email:email,password:password};
    return await resolve(axios.post(apiurl+`/admin/login`,body).then(res => res.data));
  }

  static async categoriesAdd(name){
    let body={name:name};
    return await resolve(axios.post(apiurl+`/categories/add`,body).then(res => res.data));
  }

  static async categoriesList(){
    return await resolve(axios.get(apiurl+`/categories`).then(res => res.data));
  }

  static async categoriesById(id){
    return await resolve(axios.get(apiurl+`/categories/edit/`+id).then(res => res.data));
  }

  static async categoriesUpdateById(id,name){
    let formData = new FormData();
    formData.append('name', name);   
    formData.append('id', id);
    return await resolve(axios.post(apiurl+`/categories/update`,formData).then(res => res.data));
  }

  static async notificationAdd(formData){
    return await resolve(axios.post(apiurl+`/notifications/add`,formData).then(res => res.data));
  }

  static async categoriesDeleteById(id){
    return await resolve(axios.get(apiurl+`/categories/delete/`+id).then(res => res.data));
  }

  static async restaurantsAdd(body){
    return await resolve(axios.post(apiurl+`/restaurants/add`,body).then(res => res.data));
  }

  static async sendnotification(body){
    return await resolve(axios.post(apiurl+`/notifications/send`,body).then(res => res.data));
  }

  static async restaurantsList(){
    return await resolve(axios.get(apiurl+`/restaurants`).then(res => res.data));
  }

  static async notificationList(id){
    return await resolve(axios.get(apiurl+`/notifications/get/`+id).then(res => res.data));
  }

  static async restaurantsById(id){
    return await resolve(axios.get(apiurl+`/restaurants/edit/`+id).then(res => res.data));
  }

  static async restaurantsCount(){
    return await resolve(axios.get(apiurl+`/restaurants/count`).then(res => res.data));
  }

  static async restaurantsUpdateById(id,formData){
    return await resolve(axios.post(apiurl+`/restaurants/update/`+id,formData).then(res => res.data));
  }

  static async restaurantsDeleteById(id){
    return await resolve(axios.get(apiurl+`/restaurants/delete/`+id).then(res => res.data));
  }

  static async couponsAdd(body){
    return await resolve(axios.post(apiurl+`/coupons/add`,body).then(res => res.data));
  }

  static async couponsList(){
    return await resolve(axios.get(apiurl+`/coupons`).then(res => res.data));
  }

  static async couponsById(id){
    return await resolve(axios.get(apiurl+`/coupons/edit/`+id).then(res => res.data));
  }

  static async couponsUpdateById(id,formData){
    return await resolve(axios.post(apiurl+`/coupons/update/`+id,formData).then(res => res.data));
  }

  static async couponsDeleteById(id){
    return await resolve(axios.get(apiurl+`/coupons/delete/`+id).then(res => res.data));
  }

  static async pageById(id){
    return await resolve(axios.get(apiurl+`/pages/edit/`+id).then(res => res.data));
  }

  static async pageUpdateById(id,formData){
    return await resolve(axios.post(apiurl+`/pages/update/`+id,formData).then(res => res.data));
  }

  static async goodwordsAdd(body){
    return await resolve(axios.post(apiurl+`/goodwords/add`,body).then(res => res.data));
  }

  static async goodwordsList(){
    return await resolve(axios.get(apiurl+`/goodwords`).then(res => res.data));
  }

  static async goodwordsById(id){
    return await resolve(axios.get(apiurl+`/goodwords/edit/`+id).then(res => res.data));
  }

  static async goodwordsUpdateById(id,formData){
    return await resolve(axios.post(apiurl+`/goodwords/update/`+id,formData).then(res => res.data));
  }

  static async goodwordsDeleteById(id){
    return await resolve(axios.get(apiurl+`/goodwords/delete/`+id).then(res => res.data));
  }

  static async usersList(){
    return await resolve(axios.get(apiurl+`/user`).then(res => res.data));
  }

  static async userDeleteById(id){
    return await resolve(axios.get(apiurl+`/user/delete/`+id).then(res => res.data));
  }

  static async userDeleteById(id){
    return await resolve(axios.get(apiurl+`/user/delete/`+id).then(res => res.data));
  }

  static async fetchdishesh(body){
    return await resolve(axios.post(apiurl+`/vendor/fetch_restu_dish`,body).then(res => res.data));
  }
  //store
  static async storeAdd(body){
    return await resolve(axios.post(apiurl+`/store/add`,body).then(res => res.data));
  }

  static async storeList(){
    return await resolve(axios.get(apiurl+`/store`).then(res => res.data));
  }

  static async storeById(id){
    return await resolve(axios.get(apiurl+`/store/edit/`+id).then(res => res.data));
  }

  static async storeUpdateById(id,body){
    return await resolve(axios.post(apiurl+`/store/update/`+id,body).then(res => res.data));
  }

  static async storeDeleteById(id){
    return await resolve(axios.get(apiurl+`/store/delete/`+id).then(res => res.data));
  }


  

}
export default Api;


