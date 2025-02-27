<template>
  <div>
    <div class="background">
      <Header/>
      <CreateAcc/>
      <PublicTrading/>
      <TradingInThePast/>
    </div>
  </div>
</template>

<script>
import  Header  from '#components';
import CreateAcc from './components/CreateAcc.vue';
import PublicTrading from './components/PublicTrading.vue';
import TradingInThePast from './components/TradingInThePast.vue';
</script>
