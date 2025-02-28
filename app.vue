<template>
  <div>
    <div class="background">
      <Header/>
      <CreateAcc/>
      <PublicTrading/>
      <TradingInThePast/>
      <Feedback/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import  Header  from '#components';
import CreateAcc from './components/CreateAcc.vue';
import Feedback from './components/Feedback.vue';
import PublicTrading from './components/PublicTrading.vue';
import TradingInThePast from './components/TradingInThePast.vue';
import Footer from './components/Footer.vue';
</script>
