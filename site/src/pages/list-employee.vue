<template>
  <div class="o-produto">
    <q-btn no-caps icon="add" class="a-btn _add" @click="openUpdate()">
      Cadastrar usuario
    </q-btn>
    <q-table
        :data="filterProducts"
        :columns="columns"
        row-key="name"
        class="m-table-produto"
        virtual-scroll
        :pagination.sync="pagination"
      >
      <template v-slot:top>
        <p class="m-table-produto_title">Usuarios</p>
        <q-space />

        <q-input
          placeholder="Procurar"
          v-model="filter"
        >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      </template>
      <template class="m-table-template" v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nome" :props="props">
            {{ props.row.nome }}
          </q-td>
          <q-td key="email" :props="props">
            <div class="a-table-descricao">
              {{ props.row.email }}
            </div>
          </q-td>
          <q-td key="telefone" :props="props">
            {{ props.row.telefone }}
          </q-td>
          <q-td key="cpf" :props="props">
            {{ props.row.cpf}}
          </q-td>
          <q-td>
            <q-btn size="md" round icon="edit"
            @click="openUpdate(
            props.row.nome,
            props.row.email,
            props.row.telefone,
            props.row.bairro,
            props.row.rua,
            props.row.numero,
            props.row.cpf,
            props.row.password,
            props.row.id,
            )">
              <q-tooltip>Editar dados</q-tooltip>
            </q-btn>
            <q-btn @click="confirm = true" size="md" round icon="delete">
              <q-tooltip>Deletar item</q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">Deseja realmente excluir este usuario?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Não" color="primary" v-close-popup />
              <q-btn flat label="Sim" color="primary" @click="deleteItem(props.row.id)" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </template>
    </q-table>
    <updateModalCli
    :updateModalCli="updateModalCli"
    :isNew="isNew"
    :usuario="usuario"
    @closeModal="closeModal"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';
import updateModalCli from '../components/modal-employee';
import store from '../store';

const columns = [
  {
    name: 'nome', align: 'left', label: 'Nome', field: 'nome',
  },
  {
    name: 'email', align: 'left', label: 'E-mail', field: 'email',
  },
  {
    name: 'telefone', align: 'left', label: 'Telefone', field: 'telefone',
  },
  {
    name: 'cpf', align: 'left', label: 'CPF', field: 'cpf',
  },
];

export default {
  components: {
    updateModalCli,
  },
  data() {
    return {
      filter: '',
      data: this.getUser,
      columns,
      updateModalCli: false,
      usuario: {},
      isNew: false,
      pagination: {
        rowsPerPage: 5,
      },
      confirm: false,
    };
  },
  methods: {
    openUpdate(nome, email, telefone, bairro, rua, numero, cpf, password, id) {
      if (nome) {
        this.usuario = {
          nome,
          email,
          telefone,
          bairro,
          rua,
          numero,
          cpf,
          password,
          id,
        };
        this.isNew = false;
      } else {
        this.isNew = true;
        this.user = {};
      }
      this.updateModalCli = true;
    },

    async deleteItem(id) {
      const response = await store().dispatch('user/deleteUser', id);
      if(response) {
        await store().dispatch('user/getUser');
        this.$q.notify({
          color: 'positive',
          message: 'usuario deletado com sucesso',
          icon: 'done',
        });
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Ocorreu algum erro',
          icon: 'report_problem'
        });
      }
    },

    closeModal() {
      this.updateModalCli = false;
    },
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    filterProducts() {
      return this.filter ? this.getUser.filter((user) => { /* eslint-disable-line arrow-body-style */
        return user.nome.toLowerCase().includes(this.filter.toLowerCase());
      }) : this.getUser;
    },
  },
  async mounted() {
    await store().dispatch('user/getUser');
  },
};
</script>
