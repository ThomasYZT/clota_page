<template>
    <div class="loader">
        <div class="container">
            <div class="center">
                <h1></h1>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <!--<h1></h1>-->
            <!--<span></span>-->
            <!--<span></span>-->
            <!--<span></span>-->
        </div>
    </div>
</template>

<script>
    export default {
        props : ['visible'],
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .loader{
        @include absolute_pos(absolute,0,0,0,0);
        background: rgba($color_fff,0.6);
        z-index: 9999;

        .container{
            position: relative;
            @include center_center();
        }
    }
    h1{
        font-family: 'Actor', sans-serif;
        color:#FFF;
        font-size:16px;
        letter-spacing:1px;
        font-weight:200;
        text-align:center;
    }
    .loader span{
        width:16px;
        height:16px;
        border-radius:50%;
        display:inline-block;
        position:absolute;
        left:50%;
        margin-left:-10px;
        animation : 3s infinite linear;

    }


    .loader span:nth-child(2){
        width: 10px;
        height: 10px;
        background:#ee4141;
        animation: kiri 1.2s infinite linear;

    }
    .loader span:nth-child(3){
        width: 10px;
        height: 10px;
        background:#636363;
        z-index:100;
    }
    .loader span:nth-child(4){
        width: 10px;
        height: 10px;
        background:#2f70df;
        animation: kanan 1.2s infinite linear;
    }

</style>
