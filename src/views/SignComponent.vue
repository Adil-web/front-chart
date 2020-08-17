<template>
    <div>
        <v-card flat>
            <v-card-title>
                <div class="headline">Вход по ЭЦП</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-form ref="electronForm" class="pr-2 pl-2">
                <v-container>

                    <span style="font-size:18px; color: blue">Тип хранилища ключа:</span>
                    <select name="LeaveType" @change="chooseStoragePath($event)" class="form-control">
                        <option value="">Выберите тип</option>
                        <option value="PKCS12">Ваш Компьютер</option>
                        <option value="AKKaztokenStore">Казтокен</option>
                        <option value="AKKZIDCardStore">Личное Удостоверение</option>
                        <option value="AKEToken72KStore">EToken Java 72k</option>
                        <option value="AKJaCartaStore">AK JaCarta</option>
                    </select>

                    <v-text-field
                            v-model="password"
                            type="password"
                            label="Пароль для хранилища">
                    </v-text-field>


                    <div>{{ecpOwnerName}}</div>

                    <v-btn :disabled="!( storageAlias && password && storagePath)" color="grey darken-3" @click="fillKeys">
                        Проверка ЭЦП
                        <v-icon right>mdi-close-circle</v-icon>
                    </v-btn>

                    <v-btn :disabled="!( storageAlias && password && storagePath && alias )"
                           color="primary"
                           @click="getSubjectDN">
                        Войти
                    </v-btn>

                </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey lighten-1 white--text" @click="closeElectronCard">{{$t('Закрыть')}}</v-btn>

                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import crypto_api from '../service/crypto_object';
    const keyType ='SIGN';

    export default {
        name: "SignComponent",
        data(){
            return{
                storageAlias:null,
                storagePath:null,
                password:null,
                ecpOwnerName:null,
                alias:null,
                iin: null

            }
        },
        // props:{
        //     toBeSignXml:{
        //         type:Array,
        //         default : null
        //     }
        // },



        methods: {
            closeElectronCard () {
                this.$emit("close-electron-card")
            },

            chooseStoragePath(event) {
                this.storageAlias= event.target.value;
                if(this.storageAlias!==''){
                    crypto_api.browseKeyStore (this.storageAlias, "P12", this.storagePath, this.getEcpPath );
                }
            },

            getEcpPath(result){
                if (result.getErrorCode() === "NONE") {
                    this.storagePath = result.getResult();
                } else {
                    this.storageAlias=null;
                    this.storagePath=null;
                }
            },

            fillKeys() {
                crypto_api.getKeys(this.storageAlias, this.storagePath, this.password, keyType, this.fillKeysBack);
            },


            fillKeysBack(result){
                if (result['errorCode'] === "NONE") {
                    let res = result.getResult();
                    this.ecpOwnerName = res.split("|")[1];
                    this.alias =res.split("|")[3];
                }
                else{
                   alert(result.errorCode)
                }
            },


            createCMSSignatureCall() {
                crypto_api.createCMSSignature(this.storageAlias, this.storagePath, this.alias, this.password, JSON.stringify(this.toBeSignXml), false, this.createCMSSignatureBack);

            },


            createCMSSignatureBack(result){
                this.$emit('sign_result',result)
            },

            getSubjectDN(){
                crypto_api.getSubjectDN(this.storageAlias, this.storagePath, this.alias, this.password, this.getSubjectDNBack);
            },

            getSubjectDNBack(result){
                if (result['errorCode'] === "NONE") {
                    let res = result.getResult();
                    this.iin = res.split(",")[2].substr(16);
                    this.$emit('sign_result',this.iin)
                }
                else{
                    alert(result.errorCode)
                }

            }

        }


    }
</script>

<style scoped>

</style>