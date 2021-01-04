<template>
  <div class="about">
    <div
      class="infoContainer"
      v-for="(element, key) in informations"
      :key="key + element.info"
    >
      <div class="creatorPhotoContainer">
        <img
          :class="key % 2 ? 'left' : 'right'"
          class="creatorPhoto"
          :src="element.photo"
          alt="photo"
          :style="
            element.header === 'Eneasz Kubit'
              ? 'height: 350px; width: 250px;'
              : ''
          "
        />
        <p class="photoDescription">{{ element.photographer }}</p>
      </div>
      <div class="infoContent">
        <h1>{{ element.header }}</h1>
        <div class="break"></div>
        <p class="authorInfo">{{ element.info }}</p>
      </div>
      <div class="bottomSeparator"></div>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';
export default {
  name: 'AboutInfo',
  data: function () {
    return {
      informations: [
        {
          photo:
            'https://storage.googleapis.com/catalog-production-293822/landing_page_photos/kubit%20(1).jpg',
          photographer: '',
          header: 'Eneasz Kubit',
          info:
            'Eneasz Kubit urodził się 9 marca 1983 r. Jest absolwentem Zespołu Państwowych Szkół Muzycznych im. A. Malawskiego w Przemyślu w klasie akordeonu mgr Stanisława Kucaba oraz w klasie trąbki mgr Franciszka Lotycza. W 2007 roku ukończył studia w Akademii Muzycznej im. Grażyny i Kiejstuta Bacewiczów w Łodzi w klasie akordeonu prof. Bogdana Dowlasza. Od 2007 roku jest zatrudniony w macierzystej Uczelni, obecnie na stanowisku adiunkta. W 2013 roku uzyskał stopień doktora sztuki muzycznej.'
        },
        {
          photo:
            'https://storage.googleapis.com/catalog-production-293822/landing_page_photos/pawelzaganczyk-min.jpg?fbclid=IwAR1tsB3pvuZgVJPfIX4K0fq7UJ_2GwUQIhtOyqn2x9IfhX4mruEoXn5HA1A',
          photographer: 'fot. Iwona Wojdowska',
          header: 'Paweł Zagańczyk',
          info:
            'Paweł Zagańczyk jest absolwentem Akademii Muzycznej im. Stanisława Moniuszki w Gdańsku, którą ukończył z wyróżnieniem w klasie akordeonu prof. Krzysztofa Olczaka. Laureat ponad dwudziestu konkursów akordeonowych. Koncertuje w Polsce i Europie – występował na Litwie, Ukrainie, Słowacji, w Austrii, Chorwacji, Estonii, Finlandii, Hiszpanii,  Szwecji, Niemczech, Szwajcarii i Wielkiej Brytanii. Paweł Zagańczyk koncertuje też na bandoneonie z niemieckiej manufaktury Uwe Hartenhauera. Jako solista występował z wieloma orkiestrami  pod batutą: Michała Nesterowicza, Maji Metelskiej, Jerzego Maksymiuka, Adama Klocka, Georgiosa Balatsinosa, Bohdana Jarmołowicza, Zygmunta Rycherta, Janusza Przybylskiego, Wojciecha Rajskiego, Tadeusza Dixy, Rafała Kłoczko, Szymona Morusa czy Ariela Ludwiczaka. Repertuar Pawła Zagańczyka stanowią  zamówione i prawykonane przez niego kompozycje. Dla Zagańczyka pisali m.in : Krzesimir Dębski, Mikołaj Majkusiak, Edward Sielicki, Mehmet Cän Ozer, Dariusz Mazurowski, Krzysztof Olczak, Cezary Paciorek,  Gerhard Stäbler, Marek Czerniewicz czy Maciej Zimka.'
        },
        {
          photo:
            'https://storage.googleapis.com/catalog-production-293822/landing_page_photos/palus%20(1).jpg',
          header: 'dr Grzegorz Palus',
          info:
            'Jeden z najbardziej wyróżniających się polskich akordeonistów młodego pokolenia, doktor sztuk muzycznych. W swojej działalności skupia się na wykonywaniu muzyki poważnej o przekrojowym spektrum stylistycznym, a także zajmuje się sferą dydaktyki: jest pedagogiem klasy akordeonu Uniwersytetu Muzycznego Fryderyka Chopina w Warszawie. Na ukształtowanie wyrazistego stylu artysty złożyły się międzynarodowe wykształcenie oraz bogate doświadczenie w działalności solisty i kameralisty. Absolwent Akademii Muzycznej w Krakowie, The Royal Danish Academy of Music w Kopenhadze (Dania) oraz Hochschule für Musik Detmold (Niemcy) – pracował pod kierunkiem takich znamienitych akordeonistów jak prof. Geir Draugsvoll oraz prof. Grzegorz Stopa. Regularnie koncertuje w Polsce oraz za granicą (Austria, Bośnia i Hercegowina, Chiny, Dania, Litwa, Niemcy, Słowacja, Włochy, Ukraina, USA).'
        },
        {
          photo:
            'https://storage.googleapis.com/catalog-production-293822/about_photos/kubit.jpg',
          header: '...',
          info: '...'
        }
      ]
    };
  },
  async mounted() {}
};
</script>

<style lang="scss" scoped>
.photoDescription {
  margin-left: -65px;
  margin-top: -40px;
  margin-bottom: 60px;
}

.about {
  margin-top: 50px;
}
.infoContainer:nth-child(even) {
  flex-direction: row-reverse;
}
.creatorPhoto {
  height: 400px;
  width: 300px;
  margin: 50px 120px 50px 50px;
  position: relative;
}
.creatorPhoto.right:after {
  position: absolute;
  top: -40px;
  right: -40px;
  content: '';
  width: 40px;
  height: 40px;
  border-width: 2px 2px 0 0;
  border-style: solid;
}
.creatorPhoto.left:after {
  position: absolute;
  top: -40px;
  left: -40px;
  content: '';
  width: 40px;
  height: 40px;
  border-width: 2px 0 0 2px;
  border-style: solid;
}
.infoContainer {
  display: flex;
  box-sizing: border-box;
  margin-bottom: 50px;
  position: relative;
  @media screen and (max-width: 1000px) {
    flex-direction: column !important;
    margin-bottom: 60px;
    align-items: center;
  }
}

.infoContent {
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  margin-top: 80px;
  @media screen and (max-width: 1000px) {
    margin-top: 10px;
    padding-left: 50px;
    text-align: left;
    position: relative;
  }
}
.break {
  width: 120px;
  height: 5px;
  background-color: #e4e4e4;
}
.authorInfo {
  margin-top: 10px;
  padding-right: 40px;
  padding-left: 40px;
}
.bottomSeparator {
  position: absolute;
  bottom: 0px;
  width: 50%;
  height: 2px;
  background-color: #e4e4e4;
}
</style>
<!-- "https://media.giphy.com/media/l41lOzTIL8lfZ15fy/source.gif" -->
