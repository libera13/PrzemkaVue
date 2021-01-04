<template>
  <div class="exampleComposers">
    <p class="header">Latest Composers:</p>
    <ul>
      <li v-for="(item, key) in artists" :key="key">
        <div class="WorkContainer">
          <div class="albumImage">
            <img
              src="https://storage.googleapis.com/catalog-production-293822/landing_page_photos/kazuo-ota-XQF09hR_jLw-unsplash%20(2).jpg"
              alt=""
            />
          </div>
          <div>
            <p class="name">{{ item.full_name }}</p>
            <p class="year">{{ item.full_name }}, {{ item.country }}</p>
            <p class="workTitle">{{ item.full_name }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { axiosInstance } from '../../services/axiosInstance';
export default {
  name: 'ComposersInfo',
  props: ['artists'],
  data: function () {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.exampleComposers {
  width: 100%;
  text-align: center;
  font-family: Suisse;
  margin-top: -30px;
  position: relative;
  background-color: #f1f1f1;
  clip-path: polygon(0 20px, 100% 0, 100% 100%, 0% 100%);
  -webkit-box-shadow: 0px -7px 27px 5px rgba(0, 0, 0, 0.48);
  box-shadow: 0px -7px 27px 5px rgba(0, 0, 0, 0.48);
  .header {
    padding-top: 60px;
    font-size: 1.9em;
    font-weight: 700;
    letter-spacing: 1.5px;
    padding-bottom: 50px;
  }

  ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0;
    padding-bottom: 40px;
  }

  li {
    height: 500px;
    width: 300px;
    font-size: 15px;
    position: relative;
    margin-right: 50px;
    margin-bottom: 50px;
  }
}
.WorkContainer {
  border: 1px solid #e4e4e4c7;
  height: 100%;
  box-sizing: border-box;
  width: 100%;

  .albumImage {
    height: 66%;
    width: 100%;
    background-color: #a6a5a52e;
    transition: background-color 0.5s ease;
    position: relative;
    &:hover {
      background-color: #a6a5a5;
    }
    img {
      height: 100%;
      position: absolute;
      transform: translateX(-50%);
    }
  }
}

.name,
.year,
.workTitle {
  text-align: left;
  padding-left: 10px;
}
.name {
  font-size: 20px;
  margin: 10px 0px 3px 0px;
}
.year {
  font-size: 17px;
  margin-bottom: 3px;
}
.workTitle {
  font-size: 22px;
  font-style: italic;
}
</style>
