<template>
  <div class="container">
    <div class="form">
      <v-form ref="form" v-model="valid">
        <!--      title-->
        <v-textarea
          v-model.trim="data.title"
          :rules="rules.title"
          label="tytuł"
          required
          rows="1"
          auto-grow
          counter="500"
        ></v-textarea>

        <!--      composer-->
        <div class="form__divGrid">
          <v-autocomplete
            v-model="data.composer"
            :rules="rules.required"
            label="kompozytor"
            required
            :items="fromDB.composer"
            item-text="full_name"
            item-value="id"
          ></v-autocomplete>
          <PersonaModalForm
            limitAddTo="composer"
            @added-composer="setAddedComposer"
          />
        </div>

        <!--      year_end, year_start-->
        <v-switch
          v-model="isCreationYearAnInterval"
          :label="`Czas powstawania utworu trwał dłużej niż rok`"
        ></v-switch>
        <div v-if="isCreationYearAnInterval" class="form__divGrid-withGap">
          <v-text-field
            type="number"
            @input="validateStartYear"
            v-model.number="data.year_start"
            :rules="rules.validationStartYear"
            label="rok początkowy"
          ></v-text-field>
          <v-text-field
            type="number"
            @input="validateStartYear"
            v-model.number="data.year_end"
            label="rok końcowy"
            :rules="rules.yearEnd"
          ></v-text-field>
        </div>
        <v-text-field
          v-else
          type="number"
          v-model.number="data.year_end"
          label="rok powstania"
          :rules="rules.yearEnd"
        ></v-text-field>

        <!--      is_cyclical_form-->
        <v-switch
          v-model="data.is_cyclical_form"
          label="Utwór jest cykliczny"
        ></v-switch>

        <!--      movements-->
        <div v-if="isWorkCyclical">
          <p>Wprowadź części utworu</p>
          <v-text-field
            type="text"
            hint="nazwa części (opcjonalna)"
            :key="`movements-${index}`"
            v-for="(item, index) in data.movements"
            v-model.trim="item.name"
            label=""
            :prefix="getRomanNumberFromIndex(index + 1)"
            append-outer-icon="mdi-plus"
            :append-icon="showCorrectMovementsIcon('mdi-minus', index)"
            @click:append-outer="addMovementsField(index)"
            @click:append="deleteMovementsField(index)"
          ></v-text-field>
        </div>

        <!--      type-->
        <v-autocomplete
          v-model="data.type"
          :rules="rules.required"
          label="rodzaj utworu"
          required
          :items="selectData.type"
        ></v-autocomplete>

        <!--      category-->
        <v-autocomplete
          v-model="data.category"
          :rules="rules.required"
          label="kategoria"
          required
          :items="fromDB.category"
          item-text="name"
          item-value="id"
        ></v-autocomplete>

        <template v-if="isCategorySelected">
          <template v-if="isWorkCategorySolo">
            <!--      solo-instruments-->
            <div class="form__divGrid">
              <v-autocomplete
                v-model="data.instrument"
                :rules="rules.required"
                label="instrument"
                required
                :items="fromDB.instrument"
                item-text="name"
                item-value="id"
                chips
                deletable-chips
              ></v-autocomplete>
              <InstrumentModalForm @added-instrument="setAddedInstrument" />
            </div>

            <!--solo artist-->
            <div v-if="isWorkCategorySolo" class="form__divGrid">
              <v-autocomplete
                v-model="data.artist"
                label="artysta"
                required
                :items="fromDB.artists"
                item-text="full_name"
                item-value="id"
                chips
                deletable-chips
              ></v-autocomplete>
              <PersonaModalForm
                limitAddTo="artist"
                @added-artist="setAddedArtist"
              />
            </div>
          </template>

          <template v-else>
            <!--     instrumentalComposition-->
            <div class="form__divGrid">
              <v-autocomplete
                v-model="data.instrumental_composition"
                :rules="rules.required"
                label="skład instrumentalny"
                required
                :items="instrumentsCompositionsWithCountedInstruments"
                item-text="name"
                item-value="id"
                chips
                deletable-chips
              >
                <template v-slot:item="data">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        :key="`key-v-list-item-subtitle-${el[0]}`"
                        v-for="el in data.item.instrument"
                      >
                        {{ el[1] }} {{ el[0] }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
              <InstrumentalCompositionModalForm
                @added-instrumental-composition="
                  setAddedInstrumentalComposition
                "
              />
            </div>

            <!--      multi-artists-->
            <v-switch
              v-model="isArtistsAnMusicalGroup"
              :label="`zespół muzyczny`"
            ></v-switch>
            <div v-if="isArtistsAnMusicalGroup" class="form__divGrid">
              <!--          Musical Group-->
              <v-autocomplete
                v-model="data.musicalGroups"
                label="zespół muzyczny (opcjonalny)"
                required
                :items="fromDB.musicalGroups"
                item-text="name"
                item-value="id"
                chips
                deletable-chips
              ></v-autocomplete>
              <MusicalGroupModalForm
                @added-musical-group="setAddedMusicalGroup"
              />
            </div>
            <div v-else class="form__divGrid">
              <!--          Multi Artists-->
              <v-autocomplete
                v-model="data.artists"
                label="artyści"
                required
                :items="fromDB.artists"
                item-text="full_name"
                item-value="id"
                multiple
                chips
                deletable-chips
              ></v-autocomplete>
              <PersonaModalForm
                limitAddTo="artist"
                @added-artist="setAddedArtist"
              />
            </div>
          </template>
        </template>
        <!--      first performance date-->

        <!--      first performance date-->
        <v-switch
          v-model="data.is_only_year"
          :label="`Znany jest tylko rok prawykonania`"
        ></v-switch>
        <v-text-field
          :type="data.is_only_year ? 'number' : 'date'"
          v-model="data.first_performance_date"
          label="data prawykonania (opcjonalnie)"
        ></v-text-field>
        <!--      first performance place-->
        <v-textarea
          v-model="data.firstPerformancePlace"
          label="miejsce prawykonania (opcjonalnie)"
          rows="1"
          auto-grow
          counter="500"
        ></v-textarea>

        <!--      duration-->
        <div class="form__durationBox">
          <label for="duration">Czas trwania (hh:mm:ss) (opcjonalnie)</label>
          <a-time-picker
            id="duration"
            :default-value="moment('00:00:00', 'HH:mm:ss')"
            :open="openTimePicker"
            @openChange="handleOpenChangeDuration"
            @change="changeDuration"
          ></a-time-picker>
        </div>

        <v-textarea
          v-model.trim="data.dedication"
          label="dedykacja (opcjonalnie)"
          rows="1"
          auto-grow
          counter="500"
        ></v-textarea>

        <v-textarea
          v-model.trim="data.publisher"
          label="wydawnictwo (opcjonalnie)"
          rows="1"
          auto-grow
          counter="500"
        ></v-textarea>

        <v-textarea
          v-model.trim="data.additionalInformation"
          label="informacje dodatkowe (opcjonalnie)"
          rows="1"
          auto-grow
          counter="1000"
        ></v-textarea>

        <v-text-field
          type="number"
          v-model.number="data.version"
          label="Wersja utworu"
          :rules="rules.required"
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
          Wyślij
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Reset
        </v-btn>

        <v-btn :disabled="valid" color="success" class="mr-4" @click="validate">
          Sprawdź
        </v-btn>
      </v-form>
    </div>
    <v-card
      shaped
      v-if="versionWorksFilteredByTheSameTitle.length > 0"
      class="version-box"
    >
      <v-card-text>
        <div class="font-weight-bold ml-8 mb-2">
          Podobne utwory
        </div>

        <v-timeline align-top dense>
          <v-timeline-item
            v-for="el in versionWorksFilteredByTheSameTitle"
            :key="Math.random() + el.title"
            color="#2e2e2f"
            small
          >
            <div>
              <div class="font-weight-normal">
                <strong>{{ el.composer.full_name }}</strong>
                v.{{ el.version }}
              </div>
              <div>{{ el.title }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment';
import { axiosInstance } from '../../services/axiosInstance';
import InstrumentModalForm from '../ModalForms/InstrumentModalForm';
import CategoryModalForm from '../ModalForms/CategoryModalForm';
import { maxLength500, required, correctYear } from '../../utils/rules';
import { getRomanNumberFromIndex } from '../../utils/utils';
import PersonaModalForm from '../ModalForms/PersonaModalForm';
import MusicalGroupModalForm from '../ModalForms/MusicalGroupModalForm';
import InstrumentalCompositionModalForm from '../ModalForms/InstrumentalCompositionModalForm';
import debounce from 'lodash/debounce';
const obj = {
  title: '',
  composer: '',
  year_start: 2020,
  year_end: 2020,
  is_cyclical_form: false,
  movements: [{ name: '' }],
  type: null,
  category: null,
  instrument: 1,
  instrumental_composition: [],
  artists: [],
  artist: null,
  musicalGroups: null,
  publisher: '',
  additionalInformation: null,
  duration: null,
  first_performance_date: null,
  is_only_year: false,
  firstPerformancePlace: '',
  dedication: '',
  parts: null,
  version: 1
};
export default {
  name: 'WorkForm',
  components: {
    InstrumentalCompositionModalForm,
    MusicalGroupModalForm,
    PersonaModalForm,
    CategoryModalForm,
    InstrumentModalForm
  },
  data: () => ({
    valid: false,
    data: { ...obj },
    rules: {
      required: [required],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      title: [required, maxLength500],
      validationStartYear: [true],
      yearEnd: [correctYear, required]
    },
    selectData: {
      type: [
        'Utwór koncertowy',
        'Utwór pedagogiczny',
        'Utwór koncertowy, Utwór pedagogiczny'
      ]
    },
    fromDB: {
      composer: [],
      category: [],
      instrument: [],
      instrumental_composition: [],
      artists: [],
      musicalGroups: []
    },
    openTimePicker: false,
    isCreationYearAnInterval: false,
    isArtistsAnMusicalGroup: false,
    versionWorksFromDB: []
  }),
  mounted() {
    this.getComposersNames();
    this.getCategoriesNames();
    this.getInstrumentsNames();
    this.getInstrumentalCompositionNames();
    this.getArtistsNames();
    this.getMusicalGroupsNames();
    // TODO: użyć debounce na tytule z poniższą metodą
    // this.loadVersions();
  },
  computed: {
    isWorkCyclical() {
      return this.data.is_cyclical_form;
    },
    isWorkCategorySolo() {
      return this.data.category === this.getIdOfCategorySoloFromDB;
    },
    dateYearEnd() {
      return this.data.year_end;
    },
    selectedCategories() {
      return this.data.category;
    },
    isCategorySelected() {
      return this.data.category;
    },
    dataTitle() {
      return this.data.title;
    },
    dataIsOnlyYear() {
      return this.data.is_only_year;
    },
    getIdOfCategorySoloFromDB() {
      const obj = this.fromDB.category.find(
        (obj) => obj.name === 'utwór solowy'
      );
      return obj?.id;
    },
    instrumentsCompositionsWithCountedInstruments() {
      return this.fromDB.instrumental_composition.map((item) => {
        item.instrument = this.uniqueCounts(item.instrument);
        return item;
      });
    },
    versionWorksFilteredByTheSameTitle() {
      if (this.data.title <= 3) {
        return [];
      } else {
        return this.versionWorksFromDB.filter(
          (item) => item.title.toLowerCase() === this.data.title.toLowerCase()
        );
      }
    }
  },
  watch: {
    // if year_start doesn't exist, set year_start equal year_end
    dateYearEnd: {
      immediate: false,
      handler(newValue) {
        if (this.isCreationYearAnInterval) return;
        this.data.year_start = newValue;
      }
    },
    selectedCategories: {
      immediate: false,
      handler(newValue) {
        // reset artists when change category from solo to multi
        if (this.isWorkCategorySolo) {
          // solo
          this.data.artists = [];
          this.data.musicalGroups = null;
          this.data.instrumental_composition = [];
        } else {
          // multi
          this.data.artist = null;
          this.data.instrument = null;
        }
      }
    },
    isArtistsAnMusicalGroup: {
      immediate: false,
      handler(newValue) {
        // reset when change artists to musicalGroups
        if (newValue) {
          this.data.musicalGroups = null;
        } else {
          this.data.artists = [];
        }
      }
    },
    dataTitle: {
      immediate: true,
      handler(newVal) {
        this.debounceInput(newVal);
      }
    },
    dataIsOnlyYear: {
      immediate: true,
      handler(newVal) {
        this.data.first_performance_date = null;
      }
    }
  },
  methods: {
    moment,
    validate() {
      this.$refs.form.validate();
    },
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        const dataToSend = this.makeLogicBeforeSend(this.data);
        this.sendDataToDB(dataToSend);
      }
    },
    makeLogicBeforeSend(data) {
      const dataToSend = { ...data };
      // movements logic before send
      dataToSend.movements = { ...dataToSend.movements };
      dataToSend.movements = JSON.stringify(dataToSend.movements);
      if (!this.isWorkCyclical) {
        delete dataToSend.movements;
      }
      // instrument logic
      if (typeof dataToSend.instrument === 'number')
        dataToSend.instrument = [dataToSend.instrument];
      else if (!dataToSend.instrument) dataToSend.instrument = [];
      // instrumental_composition logic
      if (typeof dataToSend.instrumental_composition === 'number')
        dataToSend.instrumental_composition = [
          dataToSend.instrumental_composition
        ];
      // is_only_year
      if (dataToSend.is_only_year) {
        dataToSend.first_performance_date = `${dataToSend.first_performance_date}-09-01`;
      }
      return dataToSend;
    },
    reset() {
      this.$refs.form.reset();
      this.data = { ...obj };
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    sendDataToDB(data) {
      axiosInstance
        .post('/work/', JSON.stringify(data))
        .then(() => {
          this.$notify({
            group: 'app',
            type: 'success',
            text: 'Pomyslnie dodano utwór!'
          });
          this.reset();
        })
        .catch((error) => {
          this.$notify({
            group: 'app',
            type: 'error',
            text: 'Podczas dodawania utworu wystąpił błąd!'
          });
          console.log('new Error', error);
        });
    },
    // instruments/category/composers
    async getComposersNames() {
      const { data } = await axiosInstance.get('/composers/');
      this.fromDB.composer = data;
      return data;
    },
    async getCategoriesNames() {
      const { data } = await axiosInstance.get('/categories/');
      this.fromDB.category = data;
      return data;
    },
    async getInstrumentsNames() {
      const { data } = await axiosInstance.get('/instruments/');
      this.fromDB.instrument = data;
      return data;
    },
    async getInstrumentalCompositionNames() {
      const { data } = await axiosInstance.get('/instrumental_composition/');
      this.fromDB.instrumental_composition = data;
      return data;
    },
    async getArtistsNames() {
      const { data } = await axiosInstance.get('/artists/');
      this.fromDB.artists = data;
      return data;
    },
    async getMusicalGroupsNames() {
      const { data } = await axiosInstance.get('/musicalGroups/');
      this.fromDB.musicalGroups = data;
      return data;
    },
    async setAddedComposer(data) {
      this.fromDB.composer = await this.getComposersNames();
      this.data.composer = data;
    },
    async setAddedInstrument(data) {
      this.fromDB.instrument = await this.getInstrumentsNames();
      this.data.instrument = data;
    },
    async setAddedInstrumentalComposition(data) {
      this.fromDB.instrumental_composition = await this.getInstrumentalCompositionNames();
      this.data.instrumental_composition = data;
    },
    async setAddedCategory(data) {
      this.fromDB.category = await this.getCategoriesNames();
      this.data.category = data;
    },
    async setAddedArtist(data) {
      this.fromDB.artists = await this.getArtistsNames();
      if (this.isWorkCategorySolo) this.data.artists = data;
      else this.data.artists.push(data);
    },
    async setAddedMusicalGroup(data) {
      this.fromDB.musicalGroups = await this.getMusicalGroupsNames();
      this.data.musicalGroups = data;
    },
    // movements
    getRomanNumberFromIndex,
    showCorrectMovementsIcon(item, index) {
      if (index === 0) return '';
      else return item;
    },
    addMovementsField(index) {
      const item = { name: '' };
      this.data.movements.splice(index + 1, 0, item);
    },
    deleteMovementsField(counter) {
      this.data.movements.splice(counter, 1);
    },
    // start_year
    validateStartYear: function () {
      const valid = this.data.year_start <= this.data.year_end;
      if (valid) {
        this.rules.validationStartYear = [true];
        return;
      }
      this.rules.validationStartYear = [
        'Rok początkowy nie może być większy od końcowego'
      ];
    },
    // duration
    handleOpenChangeDuration(open) {
      this.openTimePicker = open;
    },
    changeDuration(data, time) {
      this.data.duration = time;
    },
    //   instruments
    uniqueCounts(array) {
      // count repeating elements and return array. [0] - abbreviation; [1] - counter
      const count = {};
      if (array)
        array.forEach(function (i) {
          count[i.abbreviation] = (count[i.abbreviation] || 0) + 1;
        });
      return Object.entries(count);
    },
    debounceInput: debounce(async function (title) {
      const params = {
        title: title
      };
      if (title.length <= 3) return;
      try {
        const { data } = await axiosInstance.get('/work/', { params });
        this.versionWorksFromDB = data;
      } catch (error) {
        this.$notify({
          group: 'app',
          type: 'error',
          text: 'Podczas ładowania wersji wystąpił błąd!'
        });
        console.log('new Error', error);
      }
    }, 3000)
  }
};
</script>
<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
.form {
  max-width: 500px;
  grid-column-start: 2;
  &__divGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    &-withGap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      grid-column-gap: 1rem;
    }
  }
  &__durationBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    & label {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
.version-box {
  margin: 1rem 1rem 0;
  max-width: 300px;
  height: fit-content;
}
</style>
