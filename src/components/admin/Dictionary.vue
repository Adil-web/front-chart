<template>
        <v-simple-table dense>

            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">NameRu</th>
                    <th class="text-left">NameKz</th>
                </tr>
                </thead>
                <tbody>

                <div v-if="dialog">
                    <v-dialog v-model="dialog" max-width="400px">
                        <v-card height="200">
                            <v-container>
                                <v-row align="stretch">
                                    <v-col>
                                        <v-form>
                                            <v-container>
                                                <v-row>
                                                    <v-col>
                                                        <v-text-field
                                                                v-model="wordsCopy.ru[currentKey]"
                                                                label="ru"
                                                                placeholder="Placeholder"
                                                                outlined
                                                                dense
                                                                required
                                                                :rules="rules"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col>
                                                        <v-text-field
                                                                v-model="wordsCopy.kk[currentKey]"
                                                                label="kz"
                                                                placeholder="Placeholder"
                                                                outlined
                                                                dense
                                                                required
                                                                :rules="rules"
                                                        ></v-text-field>
                                                    </v-col>

                                                </v-row>
                                            </v-container>
                                            <v-btn :disabled="wordsCopy.ru[currentKey]==='' ||  wordsCopy.kk[currentKey] ==='' "
                                                   color="success" class="mr-4" type="button"
                                                   @click.stop="changeWords">
                                                добавить
                                            </v-btn>
                                            <v-btn
                                                    color="warning"
                                                    @click.stop="dialog=false"
                                            >
                                                Закрыть
                                            </v-btn>
                                        </v-form>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-dialog>
                </div>
                <tr v-for="(item, index) in Object.keys(words.ru)" :key="index">
                    <td>{{ words.ru[item]}}</td>
                    <td>{{ words.kk[item] }}</td>
                    <td>
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem( item )"
                        >
                            mdi-pencil
                        </v-icon>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
</template>


<script>
    import dictionary_api from "../../api/dictionary_api";

    export default {
        name: 'Dictionary',
        data() {
            return {
                wordsCopy: {},
                dialog: false,
                currentKey: '',
                rules: [v => !!v || 'Поле обязательное']
            }
        },
        methods: {

            editItem(key) {
                this.wordsCopy = JSON.parse(JSON.stringify(this.words));
                this.currentKey = key;
                this.dialog = true;
            },

            changeWords() {
                dictionary_api.changeDictionary(this.wordsCopy).then(rs => {
                    this.words = rs.data;
                })
            }
        },

        computed: {
            words: {
                get() {
                    return this.$store.state.dictionary
                },
                set(val) {
                    return this.$store.state.dictionary = val
                }
            },
        },
    }
</script>