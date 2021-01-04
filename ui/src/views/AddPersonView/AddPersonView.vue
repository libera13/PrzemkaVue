<template>
  <MainView>
    <template #header>
      Dodaj osobę
    </template>
    <template #component>
      <PersonaForm />
    </template>
  </MainView>
</template>

<script>
import PersonaForm from '../../components/AddPerson/PersonaForm';
import MainView from '../../components/Common/MainView';
export default {
  name: 'AddPersonView',
  components: { MainView, PersonaForm }
};
</script>

<style scoped></style>
