<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import LeftpanelComponent from '@/components/LeftpanelComponent.vue';
</script>
<template>
  <HeaderComponent/>
  <LeftpanelComponent/>

  <section>
    <div class="mainpanel">
      <div class="contentpanel">
        <div class="row">
          <div class="col-sm-4 col-lg-3" v-for="p in 6" key="p">
            <div class="panel panel-primary panel-weather">
              <div class="panel-heading">
                <h4 class="panel-title">Nome do tribunal</h4>
              </div>
              <div class="panel-body inverse">
                <div class="row mb10">
                  <div class="col-xs-6">
                    <img width="120" src="@/assets/images/tribunal.jpg">
                  </div>
                  <div class="col-xs-6">
                    <h2 class="today-day">7</h2>
                    <h3 class="today-date">Secções</h3>
                  </div>
                </div>
                <!-- <p class="nomargin">Luanda</p> -->
                <!-- <div class="row mt10">
                  <div class="col-xs-7">
                    <strong>Secções:</strong> 19
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
 
      </div>
    </div>
  </section>
</template>