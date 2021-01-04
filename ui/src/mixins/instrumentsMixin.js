import { axiosInstance } from '../services/axiosInstance';
import { getIdsFromSelectedObjects, map } from '../utils/utils';

export const instrumentsMixin = {
  data: function () {
    return {
      data: {
        instrument: null
      },
      fromDB: {
        instruments: null
      },
      selectData: {
        instruments: null
      },
      selected: {
        instruments: null
      }
    };
  },
  computed: {
    selectedInstruments() {
      return this.selected.instruments;
    }
  },
  watch: {
    selectedInstruments: {
      immediate: false,
      handler(newValue) {
        this.data.instrument = this.getIdsFromSelectedObjects(
          this.fromDB.instruments,
          [newValue],
          'name'
        );
      }
    }
  },
  methods: {
    getIdsFromSelectedObjects,
    map,
    async getInstrumentsNames() {
      const { data } = await axiosInstance.get('/instruments/');
      this.fromDB.instruments = data;
      return data.map(this.map('name'));
    },
    async setAddedInstrument(data) {
      this.selectData.instrument = await this.getInstrumentsNames();
      this.selected.instruments.push(data);
    }
  }
};
