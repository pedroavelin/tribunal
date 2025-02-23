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
        <div class="row demo-navwrapper">
          <div v-for="p in 10" :key="p" class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
            <div class="nav-wrapper white-x">
              <!-- <h5 class="sidebar-title">Crime</h5> -->
              <ul class="nav nav-pills nav-stacked nav-quirk">
                <li><a href="#"><i class="glyphicon glyphicon-fullscreen"></i> <span>Secção Criminal</span></a></li>
                <li class="nav-parent active">
                  <a href=""><i class="glyphicon glyphicon-info-sign"></i> <span>Detalhes</span></a>
                  <ul class="children">
                    <li><a href="">Letras: CA, CB, CC, CF, CH, CI</a></li>
                    <li><a href="">Luanda</a></li>
                    <li><a href="">Cacuaco</a></li>
                  </ul>
                </li>
                <!-- <li class="nav-parent">
                  <a href=""><i class="fa fa-file"></i> <span>Blog</span></a>
                  <ul class="children">
                    <li><a href="">Recent</a></li>
                    <li><a href="">Popular</a></li>
                  </ul>
                </li> -->
                <li><a href="#"><i class="glyphicon glyphicon-phone"></i> <span>+244 928 973 909</span></a></li>
              </ul>
            </div>
          </div>
        </div><!-- row -->
      </div>
    </div>
  </section>
</template>

<style scoped>
.nav-wrapper {
    border-radius: 12px;
    padding: 0px 0!important;
    margin-bottom: -10px!important;
}
.nav-quirk > li.nav-parent > a:after {
display:none!important;
}
</style>