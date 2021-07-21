<template>
    <section class="hp-tag-buttons">
        <div class="home-page-tag-buttons">Popular:
            <button @click.prevent="chosenTag('website')">Web Design</button>
            <button @click.prevent="chosenTag('business')">Business Plan</button>
            <button @click.prevent="chosenTag('sound')">Podcast</button>
            <button @click.prevent="chosenTag('cooking')">Cooking Recepies</button>
        </div>
    </section>
</template>
<script>
export default{
    methods:{
        chosenTag(choice){
            this.tag = choice;
            this.$emit('catChoice',choice);
        }
    } 
};

</script>
