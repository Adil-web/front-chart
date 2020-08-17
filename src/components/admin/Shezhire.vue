<template>
    <div>
        <div v-on:click="setIsActiveStatus(test)">{{test.name}}</div>
        <div v-if="test.isActive">
            <div v-bind:key="item1.name" v-for="item1 in test.child"  v-on:click="setIsActiveStatus(item1)">
                {{item1.name}}
                <div v-if="item1.isActive && item1.child.length!==0">
                    <div v-bind:key="item.name" v-for="item in item1.child"  v-on:click="setIsActiveStatus(item)">{{item.name}}</div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

    export default {
        name: "Shezhire",
        data:()=>({
            test: {
                name: 'Табын',
                isActive:false,
                child: [
                    {name: 'Асан', isActive:false, child: [{name: 'с„', child: []}, {name: 'b1', child: []},]},
                    {name: 'Үсен', isActive:false, child: [{name: 'c1', child: []}]},
                    {name: 'Қайырқожа', isActive:false, child: [{name: 'c1', child: []}]},
                    {
                        name: 'Қарақойлы', isActive:false,  child: [{
                            name: 'Қоңыр', child: [{
                                name: 'Жаңқара', child: [{
                                    name: 'Бекше', child: [{
                                        name: 'Баспан', child: [{
                                            name: 'Қашақ', child: [{
                                                name: 'Досжан', child: [
                                                    {name: 'Хабибулла', child: []},
                                                    {name: 'Абдулла', child: []},
                                                    {name: 'Әби', child: []},
                                                    {name: 'Аққұбаш', child: []},
                                                    {name: 'Ұммагүлсім', child: []},
                                                ]
                                            }]
                                        }]
                                    }]
                                }]
                            }]
                        }]
                    }]
            }
        }),

        methods:{
            setIsActiveStatus(node){
                node.isActive= !node.isActive;
                console.log(node)
            }
        },
        created() {

        }
    }

</script>

<style scoped>

</style>