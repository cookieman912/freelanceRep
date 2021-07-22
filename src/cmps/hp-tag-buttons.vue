<template>
    <section class="hp-tag-buttons">
        <div class="home-page-tag-buttons">Popular:
         <!-- TODO: ask how to shortcut it -->
            <button @click.prevent="chosenTag('Web development')">Web Design</button>
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
            console.log(choice);
            this.tag = choice;
            this.$emit('catChoice',choice);
        }
    } 
};

</script>
